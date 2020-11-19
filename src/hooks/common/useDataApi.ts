import { getTranslation } from '@esss-swap/duo-localisation';
import crossFetch from 'cross-fetch';
import { GraphQLClient } from 'graphql-request';
import { Variables, ClientError } from 'graphql-request/dist/types';
import { decode } from 'jsonwebtoken';
import { useSnackbar, WithSnackbarProps } from 'notistack';
import { useCallback, useContext } from 'react';

import { UserContext } from 'context/UserContext';
import { getSdk, SdkFunctionWrapper } from 'generated/sdk';

const BACKEND_ENDPOINT = process.env.REACT_APP_API_URL || '';

const endpoint = BACKEND_ENDPOINT + '/gateway';

const getErrorMessage = (code: string | undefined): string | void => {
  switch (code) {
    case 'UNAUTHENTICATED':
      return 'Token expired or bad token';
    case 'INSUFFICIENT_PERMISSIONS':
      return getTranslation('INSUFFICIENT_PERMISSIONS');
    default:
      return;
  }
};

const checkNamedErrors = (
  errObj: any,
  enqueueSnackbar: WithSnackbarProps['enqueueSnackbar']
) => {
  // it is a graphql error
  if (Array.isArray(errObj.errors)) {
    const rest = errObj.errors.filter((err: any) => {
      const errorMessage = getErrorMessage(err?.extensions?.code);
      if (errorMessage) {
        enqueueSnackbar(errorMessage, {
          variant: 'error',
          preventDuplicate: true,
        });
      }

      return !errorMessage;
    });

    return rest.length > 0 ? rest : null;
  }

  if ('error' in errObj) {
    return errObj.error;
  }

  return errObj;
};

// avoid flooding the backend with the same errors
const errorCache = new Set<string>();

const notificationWithClientLog = async (error: unknown = '') => {
  if (error) {
    let stringifiedError: string;

    if (error instanceof Error) {
      const { message, stack, ...rest } = error;
      stringifiedError = JSON.stringify({
        message: message,
        stack: stack,
        additionalFields: rest,
      });
    } else if (typeof error === 'object') {
      stringifiedError = JSON.stringify({
        message: 'Client error',
        stack: new Error().stack,
        additionalFields: error,
      });
    } else {
      stringifiedError = String(error);
    }

    if (errorCache.has(stringifiedError)) {
      return;
    }

    errorCache.add(stringifiedError);

    try {
      await getSdk(
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        unauthorizedGraphQLClient.getGraphQLClient()
      ).addClientLog({ error: stringifiedError });
    } catch (e) {
      // if this fails we can't do anything
      console.error('Failed to log client error', e);
    }
  }
};

class UserOfficeGraphQLClient extends GraphQLClient {
  private queryQueue: {
    query: string;
    variables?: Variables;
    resolve: (value?: PromiseLike<any>) => void;
  }[] = [];
  private nextFlushTimeoutId: number | null = null;

  private headers: { [k: string]: any } = {};
  private tokenInfo: { token: string | null; renewalDate: number } = {
    token: null,
    renewalDate: 0,
  };

  private newTokenRequested = false;
  private tokenRequestedNotificationQueue: CallableFunction[] = [];

  constructor(private endpoint: string) {
    super(endpoint);
  }

  setToken(token: string) {
    if (token === this.tokenInfo.token) {
      return;
    }

    const renewalDate =
      ((decode(token) as { iat: number }).iat + 60 * 60) * 1000;

    // keep the latest token
    if (this.tokenInfo.renewalDate > renewalDate) {
      return;
    }

    this.tokenInfo = { token, renewalDate };
    this.setHeader('Authorization', `Bearer ${token}`);
    this.headers['Authorization'] = `Bearer ${token}`;
  }

  getToken() {
    return this.tokenInfo.token;
  }

  async request<T extends any>(
    query: string,
    variables?: Variables
  ): Promise<T> {
    if (/^\s*mutation/i.test(query)) {
      return this.mutation(query, variables);
    }

    return new Promise<T>(resolve => {
      this.queryQueue.push({ query, variables, resolve });
      this.scheduleFlush();
    });
  }

  private scheduleFlush() {
    if (this.nextFlushTimeoutId === null) {
      this.nextFlushTimeoutId = window.setTimeout(() => {
        this.nextFlushTimeoutId = null;
        this.flushQueuedQueries();
      }, 0);
    }
  }

  private async checkTokenLifetime() {
    if (this.tokenInfo.renewalDate > Date.now() || !this.tokenInfo.token) {
      return;
    }

    return this.requestNewToken();
  }

  private async requestNewToken() {
    if (!this.tokenInfo.token) {
      return;
    }

    if (this.newTokenRequested) {
      return new Promise(resolve => {
        this.tokenRequestedNotificationQueue.push(resolve);
      });
    }

    this.newTokenRequested = true;

    const gqClient = new GraphQLClient(this.endpoint);

    let hadError: Error | string;

    return getSdk(gqClient)
      .getRefreshedToken({
        token: this.tokenInfo.token,
      })
      .then(({ token: { error, token } }) => {
        if (error) {
          console.error({ error });

          hadError = error;

          throw error;
        }

        token && this.setToken(token);
      })
      .catch(err => {
        hadError = err;

        throw err;
      })
      .finally(() => {
        const queue = this.tokenRequestedNotificationQueue;
        this.tokenRequestedNotificationQueue = [];
        this.newTokenRequested = false;

        queue.forEach(resolve =>
          resolve(hadError ? Promise.reject(hadError) : undefined)
        );
      });
  }

  private async _request(body: string) {
    const response = await crossFetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
      },
      body,
    });

    const getResult = (response: Response) => {
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.startsWith('application/json')) {
        return response.json();
      } else {
        return response.text();
      }
    };

    const result: { errors: any[]; data: any }[] = await getResult(response);

    return { response, result };
  }

  private async mutation(query: string, variables?: Variables) {
    await this.checkTokenLifetime();

    return super.request(query, variables);
  }

  private async flushQueuedQueries() {
    const queue = this.queryQueue;
    this.queryQueue = [];

    try {
      await this.checkTokenLifetime();

      const body = JSON.stringify(
        queue.map(({ query, variables }) => ({ query, variables }))
      );

      const { response, result } = await this._request(body);

      if (response.ok) {
        queue.forEach(({ resolve, ...request }, indx) => {
          resolve(this.handleResult(request, response.status, result[indx]));
        });
      } else {
        queue.forEach(({ resolve, ...request }) => {
          resolve(
            this.handleResult(request, response.status, {
              data: null,
              errors: result,
            })
          );
        });
      }
    } catch (err) {
      queue.forEach(({ resolve, ...request }) => {
        resolve(this.handleResult(request, 500, { data: null, errors: err }));
      });
    }
  }

  private handleResult(
    { query, variables }: { query: string; variables?: Variables },
    status: number,
    { data, errors }: { data: any; errors: any }
  ) {
    if (errors) {
      const errorResult =
        typeof errors === 'string' ? { error: errors } : { errors, data };
      const err = new ClientError(
        { ...errorResult, status },
        { query, variables }
      );

      return Promise.reject(err);
    } else {
      return data;
    }
  }
}

function handleErrorResponse(
  error: any,
  enqueueSnackbar: WithSnackbarProps['enqueueSnackbar']
) {
  // if the connection fails the `error` exists
  // otherwise it won't, so this `includes` would fail
  if (error.response.error?.includes('ECONNREFUSED')) {
    enqueueSnackbar('Connection problem!', {
      variant: 'error',
      preventDuplicate: true,
    });
  } else {
    const unnamedErrors = checkNamedErrors(error.response, enqueueSnackbar);

    if (unnamedErrors) {
      enqueueSnackbar('Something went wrong!', {
        variant: 'error',
        preventDuplicate: true,
      });

      notificationWithClientLog(
        // Server error's should have `errors`
        // everything else `error`
        unnamedErrors
      );
    }
  }
}

class UnauthorizedGraphQLClient {
  private gqClient: UserOfficeGraphQLClient;

  constructor(endpoint: string) {
    this.gqClient = new UserOfficeGraphQLClient(endpoint);
  }

  getGraphQLClient() {
    return this.gqClient;
  }

  wrapResponse({
    enqueueSnackbar,
  }: {
    enqueueSnackbar: WithSnackbarProps['enqueueSnackbar'];
  }): SdkFunctionWrapper {
    return async fn => {
      return fn().catch(error => {
        handleErrorResponse(error, enqueueSnackbar);

        return error;
      });
    };
  }
}

class AuthorizedGraphQLClient {
  private gqClient: UserOfficeGraphQLClient;

  constructor(endpoint: string) {
    this.gqClient = new UserOfficeGraphQLClient(endpoint);
  }

  getGraphQLClient(token: string) {
    console.log('called with ', { token: token.substr(-10) });

    this.gqClient.setToken(token);

    return this.gqClient;
  }

  wrapResponse({
    enqueueSnackbar,
    errorHandler,
    handleNewToken,
  }: {
    enqueueSnackbar: WithSnackbarProps['enqueueSnackbar'];
    handleNewToken: (token: string | null) => void;
    errorHandler?: (reason: any) => void;
  }): SdkFunctionWrapper {
    return async fn => {
      return fn()
        .then(result => {
          handleNewToken(this.gqClient.getToken());

          return result;
        })
        .catch(error => {
          handleErrorResponse(error, enqueueSnackbar);
          errorHandler?.(error);

          return error;
        });
    };
  }
}

const unauthorizedGraphQLClient = new UnauthorizedGraphQLClient(endpoint);
const authorizedGraphQLClient = new AuthorizedGraphQLClient(endpoint);

export function useDataApi() {
  const { token, handleNewToken, handleLogout } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(
    () =>
      getSdk(
        token
          ? authorizedGraphQLClient.getGraphQLClient(token)
          : unauthorizedGraphQLClient.getGraphQLClient(),
        token
          ? authorizedGraphQLClient.wrapResponse({
              enqueueSnackbar,
              errorHandler: reason => {
                // note: maybe we want to disable it in prod builds
                console.warn('User logged out because', { reason });
                handleLogout();
              },
              handleNewToken: usedToken => {
                if (usedToken && token !== usedToken) {
                  handleNewToken(usedToken);
                }
              },
            })
          : unauthorizedGraphQLClient.wrapResponse({ enqueueSnackbar })
      ),
    [token, handleNewToken, handleLogout, enqueueSnackbar]
  );
}

export function useUnauthorizedApi() {
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(
    () =>
      getSdk(
        unauthorizedGraphQLClient.getGraphQLClient(),
        unauthorizedGraphQLClient.wrapResponse({ enqueueSnackbar })
      ),
    [enqueueSnackbar]
  );
}
