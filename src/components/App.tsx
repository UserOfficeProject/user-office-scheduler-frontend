import { ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import React, { useContext } from 'react';
import { CookiesProvider } from 'react-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from 'react-router-dom';
import { getTheme } from 'theme';

import { AppContextProvider } from 'context/AppContext';
import { UserContextProvider, UserContext } from 'context/UserContext';
// import { useUnauthorizedApi } from 'hooks/common/useDataApi';

import Dashboard from './Dashboard';
import NotAuthenticated from './NotAuthenticated';
import { PATH_ROOT, PATH_NOT_AUTHENTICATED } from './paths';

const PrivateRoute: React.FC<RouteProps> = ({
  component,
  ...rest
}: RouteProps) => {
  const { user } = useContext(UserContext);

  if (!component) {
    throw new Error('`component` is missing!');
  }

  const Component = component;

  return (
    <Route
      {...{ rest }}
      render={(props): JSX.Element => {
        if (!user) {
          return <Redirect to={PATH_NOT_AUTHENTICATED} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

class App extends React.Component {
  static getDerivedStateFromError(error: any) {
    console.error('getDerivedStateFromError', error);
  }

  componentDidCatch(error: any): void {
    console.log('componentDidCatch', error);

    // const api = useUnauthorizedApi();
    // api().addClientLog(error);
  }

  render() {
    return (
      <ThemeProvider theme={getTheme()}>
        <SnackbarProvider
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          maxSnack={1}
        >
          <CookiesProvider>
            <AppContextProvider>
              <UserContextProvider>
                <Router basename={process.env.PUBLIC_URL}>
                  <div className="App">
                    <Switch>
                      <Route
                        path={PATH_NOT_AUTHENTICATED}
                        component={NotAuthenticated}
                      />
                      <PrivateRoute path={PATH_ROOT} component={Dashboard} />
                    </Switch>
                  </div>
                </Router>
              </UserContextProvider>
            </AppContextProvider>
          </CookiesProvider>
        </SnackbarProvider>
      </ThemeProvider>
    );
  }
}

export default App;
