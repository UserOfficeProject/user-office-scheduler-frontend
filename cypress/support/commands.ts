import {
  ActivateScheduledEventMutation,
  ActivateScheduledEventMutationVariables,
  AssignEquipmentToScheduledEventMutation,
  AssignEquipmentToScheduledEventMutationVariables,
  CreateEquipmentMutation,
  CreateEquipmentMutationVariables,
  CreateScheduledEventMutation,
  CreateScheduledEventMutationVariables,
  FinalizeScheduledEventMutation,
  FinalizeScheduledEventMutationVariables,
  UpdateEquipmentMutation,
  UpdateEquipmentMutationVariables,
  UpdateScheduledEventMutation,
  UpdateScheduledEventMutationVariables,
} from '../../src/generated/sdk';
import { getE2EApi } from '../utils/e2eApi';

const resetDB = (includeSeeds = false) => {
  const api = getE2EApi();
  const request = api.prepareDB({ includeSeeds });

  cy.wrap(request);
};

const resetSchedulerDB = (includeSeeds = false) => {
  const api = getE2EApi();
  const request = api.prepareSchedulerDB({ includeSeeds });

  cy.wrap(request);
};

const createEvent = (
  createScheduledEventInput: CreateScheduledEventMutationVariables
): Cypress.Chainable<CreateScheduledEventMutation> => {
  const api = getE2EApi();
  const request = api.createScheduledEvent(createScheduledEventInput);

  return cy.wrap(request);
};

const updateEvent = (
  updateScheduledEventInput: UpdateScheduledEventMutationVariables
): Cypress.Chainable<UpdateScheduledEventMutation> => {
  const api = getE2EApi();
  const request = api.updateScheduledEvent(updateScheduledEventInput);

  return cy.wrap(request);
};

const activateEvent = (
  activateScheduledEventInput: ActivateScheduledEventMutationVariables
): Cypress.Chainable<ActivateScheduledEventMutation> => {
  const api = getE2EApi();
  const request = api.activateScheduledEvent(activateScheduledEventInput);

  return cy.wrap(request);
};

const completeEvent = (
  completeScheduledEventInput: FinalizeScheduledEventMutationVariables
): Cypress.Chainable<FinalizeScheduledEventMutation> => {
  const api = getE2EApi();
  const request = api.finalizeScheduledEvent(completeScheduledEventInput);

  return cy.wrap(request);
};

const createEquipment = (
  createEquipmentInput: CreateEquipmentMutationVariables
): Cypress.Chainable<CreateEquipmentMutation> => {
  const api = getE2EApi();
  const request = api.createEquipment(createEquipmentInput);

  return cy.wrap(request);
};

const updateEquipment = (
  updateEquipmentInput: UpdateEquipmentMutationVariables
): Cypress.Chainable<UpdateEquipmentMutation> => {
  const api = getE2EApi();
  const request = api.updateEquipment(updateEquipmentInput);

  return cy.wrap(request);
};

const assignEquipmentToScheduledEvent = (
  assignEquipmentToScheduledEventInput: AssignEquipmentToScheduledEventMutationVariables
): Cypress.Chainable<AssignEquipmentToScheduledEventMutation> => {
  const api = getE2EApi();
  const request = api.assignEquipmentToScheduledEvent(
    assignEquipmentToScheduledEventInput
  );

  return cy.wrap(request);
};

const initializeSession = (token: string) => {
  cy.configureClock();
  cy.configureSession(token);
};

const finishedLoading = () => {
  cy.get('[role="progressbar"]').should('not.exist');
};

Cypress.Commands.add('initializeSession', initializeSession);
Cypress.Commands.add('configureClock', () => {
  const now = new Date();
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);

  cy.clock(now, ['Date']);
});
Cypress.Commands.add('configureSession', (token: string) => {
  cy.clearCookies();

  cy.fixture('tokens').then((tokens) => {
    cy.setCookie('token', tokens[token], {
      path: '/',
      secure: false,
    });
  });
});
Cypress.Commands.add('finishedLoading', finishedLoading);

Cypress.Commands.add('resetDB', resetDB);
Cypress.Commands.add('resetSchedulerDB', resetSchedulerDB);

Cypress.Commands.add('createEvent', createEvent);
Cypress.Commands.add('updateEvent', updateEvent);
Cypress.Commands.add('activateEvent', activateEvent);
Cypress.Commands.add('completeEvent', completeEvent);
Cypress.Commands.add('createEquipment', createEquipment);
Cypress.Commands.add('updateEquipment', updateEquipment);
Cypress.Commands.add(
  'assignEquipmentToScheduledEvent',
  assignEquipmentToScheduledEvent
);