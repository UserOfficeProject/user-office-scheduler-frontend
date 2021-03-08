// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
import { GraphQLClient } from 'graphql-request';

Cypress.Commands.add('initializeSession', token => {
  cy.configureClock();
  cy.configureSession(token);
});

Cypress.Commands.add('configureClock', () => {
  const now = new Date(Date.UTC(2020, 8, 21, 12, 0, 0)).getTime();

  cy.clock(now, ['Date']);
});

Cypress.Commands.add('configureSession', token => {
  cy.clearCookies();

  cy.fixture('tokens').then(tokens => {
    cy.setCookie('token', tokens[token], {
      path: '/',
      secure: false,
    });
  });
});

Cypress.Commands.add('resetDB', () => {
  const query = `mutation {
    prepareDB {
      log
      error
    }
  }`;
  const authHeader = `Bearer ${Cypress.env('SVC_ACC_TOKEN')}`;
  const request = new GraphQLClient('/gateway', {
    credentials: { token: authHeader },
  }).rawRequest(query, null);

  cy.wrap(request);
});

Cypress.Commands.add('resetSchedulerDB', () => {
  const query = `mutation {
    resetSchedulerDb
  }`;
  const authHeader = `Bearer ${Cypress.env('SVC_ACC_TOKEN')}`;
  const request = new GraphQLClient('/gateway', {
    credentials: { token: authHeader },
  }).rawRequest(query, null);

  cy.wrap(request);
});

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
