import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  IntStringDateBoolArray: { input: any; output: any; }
  TzLessDateTime: { input: string; output: string; }
};

export type ActivateScheduledEventsInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type AddLostTimeInput = {
  lostTime: SimpleLostTimeInput;
  proposalBookingId: Scalars['Int']['input'];
};

export type AddProposalWorkflowStatusInput = {
  droppableGroupId: Scalars['String']['input'];
  nextProposalStatusId?: InputMaybe<Scalars['Int']['input']>;
  parentDroppableGroupId?: InputMaybe<Scalars['String']['input']>;
  prevProposalStatusId?: InputMaybe<Scalars['Int']['input']>;
  proposalStatusId: Scalars['Int']['input'];
  proposalWorkflowId: Scalars['Int']['input'];
  sortOrder: Scalars['Int']['input'];
};

export type AddStatusChangingEventsToConnectionInput = {
  proposalWorkflowConnectionId: Scalars['Int']['input'];
  statusChangingEvents: Array<Scalars['String']['input']>;
};

export type AddTechnicalReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Scalars['String']['input']>;
  proposalPk: Scalars['Int']['input'];
  publicComment?: InputMaybe<Scalars['String']['input']>;
  reviewerId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<TechnicalReviewStatus>;
  submitted?: InputMaybe<Scalars['Boolean']['input']>;
  timeAllocation?: InputMaybe<Scalars['Int']['input']>;
};

export enum AllocationTimeUnits {
  DAY = 'Day',
  HOUR = 'Hour'
}

export type Answer = {
  answerId: Maybe<Scalars['Int']['output']>;
  config: FieldConfig;
  dependencies: Array<FieldDependency>;
  dependenciesOperator: Maybe<DependenciesLogicOperator>;
  question: Question;
  sortOrder: Scalars['Int']['output'];
  topicId: Scalars['Int']['output'];
  value: Maybe<Scalars['IntStringDateBoolArray']['output']>;
};

export type AnswerBasic = {
  answer: Scalars['IntStringDateBoolArray']['output'];
  answerId: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  questionId: Scalars['String']['output'];
  questionaryId: Scalars['Int']['output'];
};

export type AnswerInput = {
  questionId: Scalars['String']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};

export type AssignChairOrSecretaryToSepInput = {
  roleId: UserRole;
  sepId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type AssignEquipmentsToScheduledEventInput = {
  equipmentIds: Array<Scalars['Int']['input']>;
  proposalBookingId: Scalars['Int']['input'];
  scheduledEventId: Scalars['Int']['input'];
};

export type AssignInstrumentsToCallInput = {
  callId: Scalars['Int']['input'];
  instrumentIds: Array<Scalars['Int']['input']>;
};

export type AuthJwtApiTokenPayload = {
  accessTokenId: Scalars['String']['output'];
};

export type AuthJwtPayload = {
  currentRole: Role;
  roles: Array<Role>;
  user: UserJwt;
};

export type BasicUserDetails = {
  created: Maybe<Scalars['DateTime']['output']>;
  email: Maybe<Scalars['String']['output']>;
  firstname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastname: Scalars['String']['output'];
  organisation: Scalars['String']['output'];
  organizationId: Scalars['Int']['output'];
  placeholder: Maybe<Scalars['Boolean']['output']>;
  position: Scalars['String']['output'];
  preferredname: Maybe<Scalars['String']['output']>;
};

export type BooleanConfig = {
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export type Call = {
  allocationTimeUnit: AllocationTimeUnits;
  cycleComment: Scalars['String']['output'];
  description: Maybe<Scalars['String']['output']>;
  endCall: Scalars['DateTime']['output'];
  endCallInternal: Maybe<Scalars['DateTime']['output']>;
  endCycle: Scalars['DateTime']['output'];
  endNotify: Scalars['DateTime']['output'];
  endReview: Scalars['DateTime']['output'];
  endSEPReview: Maybe<Scalars['DateTime']['output']>;
  esiTemplateId: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  instruments: Array<InstrumentWithAvailabilityTime>;
  isActive: Scalars['Boolean']['output'];
  isActiveInternal: Scalars['Boolean']['output'];
  pdfTemplateId: Maybe<Scalars['Int']['output']>;
  proposalCount: Scalars['Int']['output'];
  proposalSequence: Maybe<Scalars['Int']['output']>;
  proposalWorkflow: Maybe<ProposalWorkflow>;
  proposalWorkflowId: Maybe<Scalars['Int']['output']>;
  referenceNumberFormat: Maybe<Scalars['String']['output']>;
  seps: Maybe<Array<Sep>>;
  shortCode: Scalars['String']['output'];
  startCall: Scalars['DateTime']['output'];
  startCycle: Scalars['DateTime']['output'];
  startNotify: Scalars['DateTime']['output'];
  startReview: Scalars['DateTime']['output'];
  startSEPReview: Maybe<Scalars['DateTime']['output']>;
  submissionMessage: Maybe<Scalars['String']['output']>;
  surveyComment: Scalars['String']['output'];
  template: Template;
  templateId: Scalars['Int']['output'];
  title: Maybe<Scalars['String']['output']>;
};

export type CallsFilter = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isActiveInternal?: InputMaybe<Scalars['Boolean']['input']>;
  isCallEndedByEvent?: InputMaybe<Scalars['Boolean']['input']>;
  isEnded?: InputMaybe<Scalars['Boolean']['input']>;
  isEndedInternal?: InputMaybe<Scalars['Boolean']['input']>;
  isReviewEnded?: InputMaybe<Scalars['Boolean']['input']>;
  isSEPReviewEnded?: InputMaybe<Scalars['Boolean']['input']>;
  sepIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  templateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type ChangeProposalsStatusInput = {
  proposals: Array<ProposalPkWithCallId>;
  statusId: Scalars['Int']['input'];
};

export type CloneProposalsInput = {
  callId: Scalars['Int']['input'];
  proposalsToClonePk: Array<Scalars['Int']['input']>;
};

export type ConfirmEquipmentAssignmentInput = {
  equipmentId: Scalars['Int']['input'];
  newStatus: EquipmentAssignmentStatus;
  scheduledEventId: Scalars['Int']['input'];
};

export type ConflictResolution = {
  itemId: Scalars['String']['input'];
  strategy: ConflictResolutionStrategy;
};

export enum ConflictResolutionStrategy {
  UNRESOLVED = 'UNRESOLVED',
  USE_EXISTING = 'USE_EXISTING',
  USE_NEW = 'USE_NEW'
}

export type CopyAnswerInput = {
  sourceQuestionaryId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type CreateApiAccessTokenInput = {
  accessPermissions: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateCallInput = {
  allocationTimeUnit: AllocationTimeUnits;
  cycleComment: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  endCall: Scalars['DateTime']['input'];
  endCallInternal?: InputMaybe<Scalars['DateTime']['input']>;
  endCycle: Scalars['DateTime']['input'];
  endNotify: Scalars['DateTime']['input'];
  endReview: Scalars['DateTime']['input'];
  endSEPReview?: InputMaybe<Scalars['DateTime']['input']>;
  esiTemplateId?: InputMaybe<Scalars['Int']['input']>;
  pdfTemplateId?: InputMaybe<Scalars['Int']['input']>;
  proposalSequence?: InputMaybe<Scalars['Int']['input']>;
  proposalWorkflowId: Scalars['Int']['input'];
  referenceNumberFormat?: InputMaybe<Scalars['String']['input']>;
  seps?: InputMaybe<Array<Scalars['Int']['input']>>;
  shortCode: Scalars['String']['input'];
  startCall: Scalars['DateTime']['input'];
  startCycle: Scalars['DateTime']['input'];
  startNotify: Scalars['DateTime']['input'];
  startReview: Scalars['DateTime']['input'];
  startSEPReview?: InputMaybe<Scalars['DateTime']['input']>;
  submissionMessage?: InputMaybe<Scalars['String']['input']>;
  surveyComment: Scalars['String']['input'];
  templateId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePredefinedMessageInput = {
  key: Scalars['String']['input'];
  message: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateProposalStatusInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  shortCode: Scalars['String']['input'];
};

export type CreateProposalWorkflowInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export enum DataType {
  BOOLEAN = 'BOOLEAN',
  DATE = 'DATE',
  DYNAMIC_MULTIPLE_CHOICE = 'DYNAMIC_MULTIPLE_CHOICE',
  EMBELLISHMENT = 'EMBELLISHMENT',
  FEEDBACK_BASIS = 'FEEDBACK_BASIS',
  FILE_UPLOAD = 'FILE_UPLOAD',
  GENERIC_TEMPLATE = 'GENERIC_TEMPLATE',
  GENERIC_TEMPLATE_BASIS = 'GENERIC_TEMPLATE_BASIS',
  INTERVAL = 'INTERVAL',
  NUMBER_INPUT = 'NUMBER_INPUT',
  PROPOSAL_BASIS = 'PROPOSAL_BASIS',
  PROPOSAL_ESI_BASIS = 'PROPOSAL_ESI_BASIS',
  RICH_TEXT_INPUT = 'RICH_TEXT_INPUT',
  SAMPLE_BASIS = 'SAMPLE_BASIS',
  SAMPLE_DECLARATION = 'SAMPLE_DECLARATION',
  SAMPLE_ESI_BASIS = 'SAMPLE_ESI_BASIS',
  SELECTION_FROM_OPTIONS = 'SELECTION_FROM_OPTIONS',
  SHIPMENT_BASIS = 'SHIPMENT_BASIS',
  TEXT_INPUT = 'TEXT_INPUT',
  VISIT_BASIS = 'VISIT_BASIS'
}

export type DateConfig = {
  defaultDate: Maybe<Scalars['String']['output']>;
  includeTime: Scalars['Boolean']['output'];
  maxDate: Maybe<Scalars['String']['output']>;
  minDate: Maybe<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export type DbStat = {
  state: Maybe<Scalars['String']['output']>;
  total: Scalars['Float']['output'];
};

export type DeleteApiAccessTokenInput = {
  accessTokenId: Scalars['String']['input'];
};

export type DeleteEquipmentAssignmentInput = {
  equipmentId: Scalars['Int']['input'];
  proposalBookingId: Scalars['Int']['input'];
  scheduledEventId: Scalars['Int']['input'];
};

export type DeleteLostTimeInput = {
  id: Scalars['Int']['input'];
};

export type DeletePredefinedMessageInput = {
  id: Scalars['Int']['input'];
};

export type DeleteProposalWorkflowStatusInput = {
  proposalStatusId: Scalars['Int']['input'];
  proposalWorkflowId: Scalars['Int']['input'];
  sortOrder: Scalars['Int']['input'];
};

export type DeleteScheduledEventsInput = {
  ids: Array<Scalars['Int']['input']>;
  instrumentId: Scalars['Int']['input'];
  proposalBookingId: Scalars['Int']['input'];
};

export enum DependenciesLogicOperator {
  AND = 'AND',
  OR = 'OR'
}

export type DynamicMultipleChoiceConfig = {
  externalApiCall: Scalars['Boolean']['output'];
  isMultipleSelect: Scalars['Boolean']['output'];
  jsonPath: Scalars['String']['output'];
  options: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
  url: Scalars['String']['output'];
  variant: Scalars['String']['output'];
};

export type EmbellishmentConfig = {
  html: Scalars['String']['output'];
  omitFromPdf: Scalars['Boolean']['output'];
  plain: Scalars['String']['output'];
};

export type Entry = {
  id: Scalars['Int']['output'];
  value: Scalars['String']['output'];
};

export type Equipment = {
  autoAccept: Scalars['Boolean']['output'];
  color: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  equipmentInstruments: Maybe<Array<Instrument>>;
  equipmentResponsible: Maybe<Array<BasicUserDetails>>;
  events: Maybe<Array<ScheduledEvent>>;
  id: Scalars['Int']['output'];
  maintenanceEndsAt: Maybe<Scalars['TzLessDateTime']['output']>;
  maintenanceStartsAt: Maybe<Scalars['TzLessDateTime']['output']>;
  name: Scalars['String']['output'];
  owner: Maybe<BasicUserDetails>;
  updatedAt: Scalars['DateTime']['output'];
};


export type EquipmentEventsArgs = {
  endsAt: Scalars['TzLessDateTime']['input'];
  startsAt: Scalars['TzLessDateTime']['input'];
};

export enum EquipmentAssignmentStatus {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}

export type EquipmentInput = {
  autoAccept: Scalars['Boolean']['input'];
  color?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  equipmentResponsible?: InputMaybe<Array<Scalars['Int']['input']>>;
  instrumentIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  maintenanceEndsAt?: InputMaybe<Scalars['TzLessDateTime']['input']>;
  maintenanceStartsAt?: InputMaybe<Scalars['TzLessDateTime']['input']>;
  name: Scalars['String']['input'];
  ownerUserId: Scalars['Int']['input'];
};

export type EquipmentResponseWrap = {
  equipment: Maybe<Equipment>;
  error: Maybe<Scalars['String']['output']>;
};

export type EquipmentWithAssignmentStatus = {
  autoAccept: Scalars['Boolean']['output'];
  color: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  equipmentInstruments: Maybe<Array<Instrument>>;
  equipmentResponsible: Maybe<Array<BasicUserDetails>>;
  events: Maybe<Array<ScheduledEvent>>;
  id: Scalars['Int']['output'];
  maintenanceEndsAt: Maybe<Scalars['TzLessDateTime']['output']>;
  maintenanceStartsAt: Maybe<Scalars['TzLessDateTime']['output']>;
  name: Scalars['String']['output'];
  owner: Maybe<BasicUserDetails>;
  status: EquipmentAssignmentStatus;
  updatedAt: Scalars['DateTime']['output'];
};


export type EquipmentWithAssignmentStatusEventsArgs = {
  endsAt: Scalars['TzLessDateTime']['input'];
  startsAt: Scalars['TzLessDateTime']['input'];
};

export enum EvaluatorOperator {
  EQ = 'eq',
  NEQ = 'neq'
}

export enum Event {
  CALL_CREATED = 'CALL_CREATED',
  CALL_ENDED = 'CALL_ENDED',
  CALL_ENDED_INTERNAL = 'CALL_ENDED_INTERNAL',
  CALL_REVIEW_ENDED = 'CALL_REVIEW_ENDED',
  CALL_SEP_REVIEW_ENDED = 'CALL_SEP_REVIEW_ENDED',
  EMAIL_INVITE = 'EMAIL_INVITE',
  INSTRUMENT_CREATED = 'INSTRUMENT_CREATED',
  INSTRUMENT_DELETED = 'INSTRUMENT_DELETED',
  INSTRUMENT_UPDATED = 'INSTRUMENT_UPDATED',
  PREDEFINED_MESSAGE_CREATED = 'PREDEFINED_MESSAGE_CREATED',
  PREDEFINED_MESSAGE_DELETED = 'PREDEFINED_MESSAGE_DELETED',
  PREDEFINED_MESSAGE_UPDATED = 'PREDEFINED_MESSAGE_UPDATED',
  PROPOSAL_ACCEPTED = 'PROPOSAL_ACCEPTED',
  PROPOSAL_ALL_SEP_REVIEWERS_SELECTED = 'PROPOSAL_ALL_SEP_REVIEWERS_SELECTED',
  PROPOSAL_ALL_SEP_REVIEWS_SUBMITTED = 'PROPOSAL_ALL_SEP_REVIEWS_SUBMITTED',
  PROPOSAL_BOOKING_TIME_ACTIVATED = 'PROPOSAL_BOOKING_TIME_ACTIVATED',
  PROPOSAL_BOOKING_TIME_COMPLETED = 'PROPOSAL_BOOKING_TIME_COMPLETED',
  PROPOSAL_BOOKING_TIME_REOPENED = 'PROPOSAL_BOOKING_TIME_REOPENED',
  PROPOSAL_BOOKING_TIME_SLOTS_REMOVED = 'PROPOSAL_BOOKING_TIME_SLOTS_REMOVED',
  PROPOSAL_BOOKING_TIME_SLOT_ADDED = 'PROPOSAL_BOOKING_TIME_SLOT_ADDED',
  PROPOSAL_BOOKING_TIME_UPDATED = 'PROPOSAL_BOOKING_TIME_UPDATED',
  PROPOSAL_CLONED = 'PROPOSAL_CLONED',
  PROPOSAL_CREATED = 'PROPOSAL_CREATED',
  PROPOSAL_DELETED = 'PROPOSAL_DELETED',
  PROPOSAL_FEASIBILITY_REVIEW_SUBMITTED = 'PROPOSAL_FEASIBILITY_REVIEW_SUBMITTED',
  PROPOSAL_FEASIBILITY_REVIEW_UPDATED = 'PROPOSAL_FEASIBILITY_REVIEW_UPDATED',
  PROPOSAL_FEASIBLE = 'PROPOSAL_FEASIBLE',
  PROPOSAL_INSTRUMENT_SELECTED = 'PROPOSAL_INSTRUMENT_SELECTED',
  PROPOSAL_INSTRUMENT_SUBMITTED = 'PROPOSAL_INSTRUMENT_SUBMITTED',
  PROPOSAL_MANAGEMENT_DECISION_SUBMITTED = 'PROPOSAL_MANAGEMENT_DECISION_SUBMITTED',
  PROPOSAL_MANAGEMENT_DECISION_UPDATED = 'PROPOSAL_MANAGEMENT_DECISION_UPDATED',
  PROPOSAL_NOTIFIED = 'PROPOSAL_NOTIFIED',
  PROPOSAL_REJECTED = 'PROPOSAL_REJECTED',
  PROPOSAL_RESERVED = 'PROPOSAL_RESERVED',
  PROPOSAL_SAMPLE_REVIEW_SUBMITTED = 'PROPOSAL_SAMPLE_REVIEW_SUBMITTED',
  PROPOSAL_SAMPLE_SAFE = 'PROPOSAL_SAMPLE_SAFE',
  PROPOSAL_SEP_MEETING_RANKING_OVERWRITTEN = 'PROPOSAL_SEP_MEETING_RANKING_OVERWRITTEN',
  PROPOSAL_SEP_MEETING_REORDER = 'PROPOSAL_SEP_MEETING_REORDER',
  PROPOSAL_SEP_MEETING_SAVED = 'PROPOSAL_SEP_MEETING_SAVED',
  PROPOSAL_SEP_MEETING_SUBMITTED = 'PROPOSAL_SEP_MEETING_SUBMITTED',
  PROPOSAL_SEP_REVIEW_SUBMITTED = 'PROPOSAL_SEP_REVIEW_SUBMITTED',
  PROPOSAL_SEP_REVIEW_UPDATED = 'PROPOSAL_SEP_REVIEW_UPDATED',
  PROPOSAL_SEP_SELECTED = 'PROPOSAL_SEP_SELECTED',
  PROPOSAL_STATUS_CHANGED_BY_USER = 'PROPOSAL_STATUS_CHANGED_BY_USER',
  PROPOSAL_STATUS_CHANGED_BY_WORKFLOW = 'PROPOSAL_STATUS_CHANGED_BY_WORKFLOW',
  PROPOSAL_STATUS_UPDATED = 'PROPOSAL_STATUS_UPDATED',
  PROPOSAL_SUBMITTED = 'PROPOSAL_SUBMITTED',
  PROPOSAL_UNFEASIBLE = 'PROPOSAL_UNFEASIBLE',
  PROPOSAL_UPDATED = 'PROPOSAL_UPDATED',
  SEP_CREATED = 'SEP_CREATED',
  SEP_MEMBERS_ASSIGNED = 'SEP_MEMBERS_ASSIGNED',
  SEP_MEMBER_ASSIGNED_TO_PROPOSAL = 'SEP_MEMBER_ASSIGNED_TO_PROPOSAL',
  SEP_MEMBER_REMOVED = 'SEP_MEMBER_REMOVED',
  SEP_MEMBER_REMOVED_FROM_PROPOSAL = 'SEP_MEMBER_REMOVED_FROM_PROPOSAL',
  SEP_PROPOSAL_REMOVED = 'SEP_PROPOSAL_REMOVED',
  SEP_REVIEWER_NOTIFIED = 'SEP_REVIEWER_NOTIFIED',
  SEP_UPDATED = 'SEP_UPDATED',
  TOPIC_ANSWERED = 'TOPIC_ANSWERED',
  USER_CREATED = 'USER_CREATED',
  USER_DELETED = 'USER_DELETED',
  USER_PASSWORD_RESET_EMAIL = 'USER_PASSWORD_RESET_EMAIL',
  USER_ROLE_UPDATED = 'USER_ROLE_UPDATED',
  USER_UPDATED = 'USER_UPDATED'
}

export type EventLog = {
  changedBy: User;
  changedObjectId: Scalars['String']['output'];
  eventTStamp: Scalars['DateTime']['output'];
  eventType: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  rowData: Scalars['String']['output'];
};

export type ExperimentSafetyInput = {
  created: Scalars['DateTime']['output'];
  creatorId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isSubmitted: Scalars['Boolean']['output'];
  proposal: Proposal;
  questionary: Questionary;
  questionaryId: Scalars['Int']['output'];
  sampleEsis: Array<SampleExperimentSafetyInput>;
  scheduledEventId: Scalars['Int']['output'];
};

export type ExternalTokenResult = {
  isValid: Scalars['Boolean']['output'];
};

export type Feature = {
  description: Scalars['String']['output'];
  id: FeatureId;
  isEnabled: Scalars['Boolean']['output'];
};

export enum FeatureId {
  EMAIL_INVITE = 'EMAIL_INVITE',
  EMAIL_SEARCH = 'EMAIL_SEARCH',
  INSTRUMENT_MANAGEMENT = 'INSTRUMENT_MANAGEMENT',
  OAUTH = 'OAUTH',
  RISK_ASSESSMENT = 'RISK_ASSESSMENT',
  SAMPLE_SAFETY = 'SAMPLE_SAFETY',
  SCHEDULER = 'SCHEDULER',
  SEP_REVIEW = 'SEP_REVIEW',
  SHIPPING = 'SHIPPING',
  STFC_IDLE_TIMER = 'STFC_IDLE_TIMER',
  TECHNICAL_REVIEW = 'TECHNICAL_REVIEW',
  USER_MANAGEMENT = 'USER_MANAGEMENT',
  VISIT_MANAGEMENT = 'VISIT_MANAGEMENT'
}

export enum FeatureUpdateAction {
  DISABLE = 'DISABLE',
  ENABLE = 'ENABLE'
}

export type Feedback = {
  createdAt: Scalars['DateTime']['output'];
  creatorId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  questionary: Questionary;
  questionaryId: Scalars['Int']['output'];
  scheduledEventId: Scalars['Int']['output'];
  status: FeedbackStatus;
  submittedAt: Maybe<Scalars['DateTime']['output']>;
};

export type FeedbackBasisConfig = {
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export type FeedbackRequest = {
  id: Scalars['Int']['output'];
  requestedAt: Scalars['DateTime']['output'];
  scheduledEventId: Scalars['Int']['output'];
};

export enum FeedbackStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED'
}

export type FeedbacksFilter = {
  creatorId?: InputMaybe<Scalars['Int']['input']>;
  scheduledEventId?: InputMaybe<Scalars['Int']['input']>;
};

export type FieldCondition = {
  condition: EvaluatorOperator;
  params: Scalars['IntStringDateBoolArray']['output'];
};

export type FieldConditionInput = {
  condition: EvaluatorOperator;
  params: Scalars['String']['input'];
};

export type FieldConfig = BooleanConfig | DateConfig | DynamicMultipleChoiceConfig | EmbellishmentConfig | FeedbackBasisConfig | FileUploadConfig | GenericTemplateBasisConfig | IntervalConfig | NumberInputConfig | ProposalBasisConfig | ProposalEsiBasisConfig | RichTextInputConfig | SampleBasisConfig | SampleDeclarationConfig | SampleEsiBasisConfig | SelectionFromOptionsConfig | ShipmentBasisConfig | SubTemplateConfig | TextInputConfig | VisitBasisConfig;

export type FieldDependency = {
  condition: FieldCondition;
  dependencyId: Scalars['String']['output'];
  dependencyNaturalKey: Scalars['String']['output'];
  questionId: Scalars['String']['output'];
};

export type FieldDependencyInput = {
  condition: FieldConditionInput;
  dependencyId: Scalars['String']['input'];
};

export type FileMetadata = {
  createdDate: Scalars['DateTime']['output'];
  fileId: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
  originalFileName: Scalars['String']['output'];
  sizeInBytes: Scalars['Int']['output'];
};

export type FileUploadConfig = {
  file_type: Array<Scalars['String']['output']>;
  max_files: Scalars['Int']['output'];
  pdf_page_limit: Scalars['Int']['output'];
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export type FilesMetadataFilter = {
  fileIds: Array<Scalars['String']['input']>;
};

export type FinalizeScheduledEventInput = {
  action: ProposalBookingFinalizeAction;
  id: Scalars['Int']['input'];
};

export type GenericTemplate = {
  created: Scalars['DateTime']['output'];
  creatorId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  proposal: Proposal;
  proposalPk: Scalars['Int']['output'];
  questionId: Scalars['String']['output'];
  questionary: Questionary;
  questionaryId: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type GenericTemplateBasisConfig = {
  questionLabel: Scalars['String']['output'];
  titlePlaceholder: Scalars['String']['output'];
};

export type GenericTemplatesFilter = {
  creatorId?: InputMaybe<Scalars['Int']['input']>;
  genericTemplateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  proposalPk?: InputMaybe<Scalars['Int']['input']>;
  questionId?: InputMaybe<Scalars['String']['input']>;
  questionaryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type HealthStats = {
  dbStats: Array<DbStat>;
  message: Scalars['String']['output'];
};

export type IndexWithGroupId = {
  droppableId: Scalars['String']['input'];
  index: Scalars['Int']['input'];
};

export type Institution = {
  country: Maybe<Entry>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type InstitutionsFilter = {
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Instrument = {
  beamlineManager: Maybe<BasicUserDetails>;
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  managerUserId: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  scientists: Array<BasicUserDetails>;
  shortCode: Scalars['String']['output'];
};

export type InstrumentWithAvailabilityTime = {
  availabilityTime: Maybe<Scalars['Int']['output']>;
  beamlineManager: Maybe<BasicUserDetails>;
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  managerUserId: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  scientists: Array<BasicUserDetails>;
  shortCode: Scalars['String']['output'];
  submitted: Scalars['Boolean']['output'];
};

export type InstrumentsQueryResult = {
  instruments: Array<Instrument>;
  totalCount: Scalars['Int']['output'];
};

export type IntervalConfig = {
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
  units: Array<Unit>;
};

export type LostTime = {
  createdAt: Scalars['DateTime']['output'];
  endsAt: Scalars['TzLessDateTime']['output'];
  id: Scalars['Int']['output'];
  proposalBookingId: Scalars['Int']['output'];
  scheduledEventId: Scalars['Int']['output'];
  startsAt: Scalars['TzLessDateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LostTimeResponseWrap = {
  error: Maybe<Scalars['String']['output']>;
  lostTime: Maybe<LostTime>;
};

export type MoveProposalWorkflowStatusInput = {
  from: IndexWithGroupId;
  proposalWorkflowId: Scalars['Int']['input'];
  to: IndexWithGroupId;
};

export type Mutation = {
  activateProposalBooking: ProposalBookingResponseWrap;
  activateScheduledEvents: ScheduledEventsResponseWrap;
  addClientLog: Scalars['Boolean']['output'];
  addLostTime: LostTimeResponseWrap;
  addProposalWorkflowStatus: ProposalWorkflowConnection;
  addSamplesToShipment: Shipment;
  addStatusChangingEventsToConnection: Array<StatusChangingEvent>;
  addTechnicalReview: TechnicalReview;
  addUserForReview: Review;
  addUserRole: Scalars['Boolean']['output'];
  administrationProposal: Proposal;
  answerTopic: QuestionaryStep;
  applyPatches: Scalars['String']['output'];
  assignChairOrSecretary: Sep;
  assignInstrumentsToCall: Call;
  assignProposalsToInstrument: Scalars['Boolean']['output'];
  assignProposalsToSep: Scalars['Boolean']['output'];
  assignReviewersToSEP: Sep;
  assignScientistsToInstrument: Scalars['Boolean']['output'];
  assignSepReviewersToProposal: Sep;
  assignToScheduledEvents: Scalars['Boolean']['output'];
  changeProposalsStatus: Scalars['Boolean']['output'];
  cloneGenericTemplate: GenericTemplate;
  cloneProposals: Array<Proposal>;
  cloneSample: Sample;
  cloneSampleEsi: SampleExperimentSafetyInput;
  cloneTemplate: Template;
  confirmEquipmentAssignment: SchedulerSuccessResponseWrap;
  createApiAccessToken: PermissionsWithAccessToken;
  createCall: Call;
  createEquipment: EquipmentResponseWrap;
  createEsi: ExperimentSafetyInput;
  createFeedback: Feedback;
  createGenericTemplate: GenericTemplate;
  createGenericTemplateWithCopiedAnswers: Array<GenericTemplate>;
  createInstitution: Institution;
  createInstrument: Instrument;
  createPdfTemplate: PdfTemplate;
  createPredefinedMessage: PredefinedMessage;
  createProposal: Proposal;
  createProposalStatus: ProposalStatus;
  createProposalWorkflow: ProposalWorkflow;
  createQuestion: Question;
  createQuestionTemplateRelation: Template;
  createQuestionary: Questionary;
  createSEP: Sep;
  createSample: Sample;
  createSampleEsi: SampleExperimentSafetyInput;
  createScheduledEvent: ScheduledEventResponseWrap;
  createShipment: Shipment;
  createTemplate: Template;
  createTopic: Template;
  createUnit: Unit;
  createUser: User;
  createUserByEmailInvite: Scalars['Int']['output'];
  createVisit: Visit;
  createVisitRegistration: VisitRegistration;
  deleteApiAccessToken: Scalars['Boolean']['output'];
  deleteCall: Call;
  deleteEquipmentAssignment: Scalars['Boolean']['output'];
  deleteFeedback: Feedback;
  deleteGenericTemplate: GenericTemplate;
  deleteInstitution: Institution;
  deleteInstrument: Instrument;
  deleteLostTime: LostTimeResponseWrap;
  deletePdfTemplate: PdfTemplate;
  deletePredefinedMessage: PredefinedMessage;
  deleteProposal: Proposal;
  deleteProposalStatus: ProposalStatus;
  deleteProposalWorkflow: ProposalWorkflow;
  deleteProposalWorkflowStatus: Scalars['Boolean']['output'];
  deleteQuestion: Question;
  deleteQuestionTemplateRelation: Template;
  deleteSEP: Sep;
  deleteSample: Sample;
  deleteSampleEsi: SampleExperimentSafetyInput;
  deleteScheduledEvents: ScheduledEventsResponseWrap;
  deleteShipment: Shipment;
  deleteTemplate: Template;
  deleteTopic: Template;
  deleteUnit: Unit;
  deleteUser: User;
  deleteVisit: Visit;
  emailVerification: Scalars['Boolean']['output'];
  externalTokenLogin: Scalars['String']['output'];
  finalizeProposalBooking: ProposalBookingResponseWrap;
  finalizeScheduledEvent: ScheduledEventResponseWrap;
  getTokenForUser: Scalars['String']['output'];
  importProposal: Proposal;
  importTemplate: Template;
  importUnits: Array<Unit>;
  logout: Scalars['String']['output'];
  mergeInstitutions: Institution;
  moveProposalWorkflowStatus: ProposalWorkflowConnection;
  notifyProposal: Proposal;
  prepareDB: Scalars['String']['output'];
  redeemCode: RedeemCode;
  removeAssignedInstrumentFromCall: Call;
  removeMemberFromSEPProposal: Sep;
  removeMemberFromSep: Sep;
  removeProposalsFromInstrument: Scalars['Boolean']['output'];
  removeProposalsFromSep: Sep;
  removeScientistFromInstrument: Scalars['Boolean']['output'];
  removeUserForReview: Review;
  reopenProposalBooking: ProposalBookingResponseWrap;
  reopenScheduledEvent: ScheduledEventResponseWrap;
  reorderSepMeetingDecisionProposals: SepMeetingDecision;
  requestFeedback: FeedbackRequest;
  resetPassword: BasicUserDetails;
  resetPasswordEmail: Scalars['Boolean']['output'];
  resetSchedulerDb: Scalars['String']['output'];
  saveSepMeetingDecision: SepMeetingDecision;
  selectRole: Scalars['String']['output'];
  setActiveTemplate: Scalars['Boolean']['output'];
  setInstrumentAvailabilityTime: Scalars['Boolean']['output'];
  setPageContent: Page;
  setUserEmailVerified: User;
  setUserNotPlaceholder: User;
  submitInstrument: Scalars['Boolean']['output'];
  submitProposal: Proposal;
  submitProposalsReview: Scalars['Boolean']['output'];
  submitShipment: Shipment;
  submitTechnicalReviews: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
  updateAnswer: Scalars['String']['output'];
  updateApiAccessToken: PermissionsWithAccessToken;
  updateCall: Call;
  updateEquipment: EquipmentResponseWrap;
  updateEsi: ExperimentSafetyInput;
  updateFeatures: Array<Feature>;
  updateFeedback: Feedback;
  updateGenericTemplate: GenericTemplate;
  updateInstitution: Institution;
  updateInstrument: Instrument;
  updateLostTime: LostTimeResponseWrap;
  updatePassword: BasicUserDetails;
  updatePdfTemplate: PdfTemplate;
  updatePredefinedMessage: PredefinedMessage;
  updateProposal: Proposal;
  updateProposalStatus: ProposalStatus;
  updateProposalWorkflow: ProposalWorkflow;
  updateQuestion: Question;
  updateQuestionTemplateRelation: Template;
  updateQuestionTemplateRelationSettings: Template;
  updateReview: Review;
  updateSEP: Sep;
  updateSEPTimeAllocation: SepProposal;
  updateSample: Sample;
  updateSampleEsi: SampleExperimentSafetyInput;
  updateScheduledEvent: ScheduledEventResponseWrap;
  updateSettings: Settings;
  updateShipment: Shipment;
  updateTechnicalReviewAssignee: Array<TechnicalReview>;
  updateTemplate: Template;
  updateTopic: Template;
  updateUser: User;
  updateUserRoles: User;
  updateVisit: Visit;
  updateVisitRegistration: VisitRegistration;
  validateTemplateImport: TemplateValidation;
  validateUnitsImport: UnitsImportWithValidation;
};


export type MutationActivateProposalBookingArgs = {
  id: Scalars['Int']['input'];
};


export type MutationActivateScheduledEventsArgs = {
  activateScheduledEvents: ActivateScheduledEventsInput;
};


export type MutationAddClientLogArgs = {
  error: Scalars['String']['input'];
};


export type MutationAddLostTimeArgs = {
  addLostTimeInput: AddLostTimeInput;
};


export type MutationAddProposalWorkflowStatusArgs = {
  newProposalWorkflowStatusInput: AddProposalWorkflowStatusInput;
};


export type MutationAddSamplesToShipmentArgs = {
  sampleIds: Array<Scalars['Int']['input']>;
  shipmentId: Scalars['Int']['input'];
};


export type MutationAddStatusChangingEventsToConnectionArgs = {
  addStatusChangingEventsToConnectionInput: AddStatusChangingEventsToConnectionInput;
};


export type MutationAddTechnicalReviewArgs = {
  addTechnicalReviewInput: AddTechnicalReviewInput;
};


export type MutationAddUserForReviewArgs = {
  proposalPk: Scalars['Int']['input'];
  sepID: Scalars['Int']['input'];
  userID: Scalars['Int']['input'];
};


export type MutationAddUserRoleArgs = {
  roleID: Scalars['Int']['input'];
  userID: Scalars['Int']['input'];
};


export type MutationAdministrationProposalArgs = {
  commentForManagement?: InputMaybe<Scalars['String']['input']>;
  commentForUser?: InputMaybe<Scalars['String']['input']>;
  finalStatus?: InputMaybe<ProposalEndStatus>;
  managementDecisionSubmitted?: InputMaybe<Scalars['Boolean']['input']>;
  managementTimeAllocation?: InputMaybe<Scalars['Int']['input']>;
  proposalPk: Scalars['Int']['input'];
  statusId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationAnswerTopicArgs = {
  answers: Array<AnswerInput>;
  isPartialSave?: InputMaybe<Scalars['Boolean']['input']>;
  questionaryId: Scalars['Int']['input'];
  topicId: Scalars['Int']['input'];
};


export type MutationAssignChairOrSecretaryArgs = {
  assignChairOrSecretaryToSEPInput: AssignChairOrSecretaryToSepInput;
};


export type MutationAssignInstrumentsToCallArgs = {
  assignInstrumentsToCallInput: AssignInstrumentsToCallInput;
};


export type MutationAssignProposalsToInstrumentArgs = {
  instrumentId: Scalars['Int']['input'];
  proposals: Array<ProposalPkWithCallId>;
};


export type MutationAssignProposalsToSepArgs = {
  proposals: Array<ProposalPkWithCallId>;
  sepId: Scalars['Int']['input'];
};


export type MutationAssignReviewersToSepArgs = {
  memberIds: Array<Scalars['Int']['input']>;
  sepId: Scalars['Int']['input'];
};


export type MutationAssignScientistsToInstrumentArgs = {
  instrumentId: Scalars['Int']['input'];
  scientistIds: Array<Scalars['Int']['input']>;
};


export type MutationAssignSepReviewersToProposalArgs = {
  memberIds: Array<Scalars['Int']['input']>;
  proposalPk: Scalars['Int']['input'];
  sepId: Scalars['Int']['input'];
};


export type MutationAssignToScheduledEventsArgs = {
  assignEquipmentsToScheduledEventInput: AssignEquipmentsToScheduledEventInput;
};


export type MutationChangeProposalsStatusArgs = {
  changeProposalsStatusInput: ChangeProposalsStatusInput;
};


export type MutationCloneGenericTemplateArgs = {
  genericTemplateId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCloneProposalsArgs = {
  cloneProposalsInput: CloneProposalsInput;
};


export type MutationCloneSampleArgs = {
  isPostProposalSubmission?: InputMaybe<Scalars['Boolean']['input']>;
  sampleId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCloneSampleEsiArgs = {
  esiId: Scalars['Int']['input'];
  newSampleTitle?: InputMaybe<Scalars['String']['input']>;
  sampleId: Scalars['Int']['input'];
};


export type MutationCloneTemplateArgs = {
  templateId: Scalars['Int']['input'];
};


export type MutationConfirmEquipmentAssignmentArgs = {
  confirmEquipmentAssignmentInput: ConfirmEquipmentAssignmentInput;
};


export type MutationCreateApiAccessTokenArgs = {
  createApiAccessTokenInput: CreateApiAccessTokenInput;
};


export type MutationCreateCallArgs = {
  createCallInput: CreateCallInput;
};


export type MutationCreateEquipmentArgs = {
  newEquipmentInput: EquipmentInput;
};


export type MutationCreateEsiArgs = {
  scheduledEventId: Scalars['Int']['input'];
};


export type MutationCreateFeedbackArgs = {
  scheduledEventId: Scalars['Int']['input'];
};


export type MutationCreateGenericTemplateArgs = {
  proposalPk: Scalars['Int']['input'];
  questionId: Scalars['String']['input'];
  templateId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateGenericTemplateWithCopiedAnswersArgs = {
  copyAnswersInput: Array<CopyAnswerInput>;
  proposalPk: Scalars['Int']['input'];
  questionId: Scalars['String']['input'];
  templateId: Scalars['Int']['input'];
};


export type MutationCreateInstitutionArgs = {
  country: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  verified: Scalars['Boolean']['input'];
};


export type MutationCreateInstrumentArgs = {
  description: Scalars['String']['input'];
  managerUserId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  shortCode: Scalars['String']['input'];
};


export type MutationCreatePdfTemplateArgs = {
  templateData: Scalars['String']['input'];
  templateId: Scalars['Int']['input'];
};


export type MutationCreatePredefinedMessageArgs = {
  createPredefinedMessageInput: CreatePredefinedMessageInput;
};


export type MutationCreateProposalArgs = {
  callId: Scalars['Int']['input'];
};


export type MutationCreateProposalStatusArgs = {
  newProposalStatusInput: CreateProposalStatusInput;
};


export type MutationCreateProposalWorkflowArgs = {
  newProposalWorkflowInput: CreateProposalWorkflowInput;
};


export type MutationCreateQuestionArgs = {
  categoryId: TemplateCategoryId;
  dataType: DataType;
};


export type MutationCreateQuestionTemplateRelationArgs = {
  questionId: Scalars['String']['input'];
  sortOrder: Scalars['Int']['input'];
  templateId: Scalars['Int']['input'];
  topicId: Scalars['Int']['input'];
};


export type MutationCreateQuestionaryArgs = {
  templateId: Scalars['Int']['input'];
};


export type MutationCreateSepArgs = {
  active: Scalars['Boolean']['input'];
  code: Scalars['String']['input'];
  description: Scalars['String']['input'];
  numberRatingsRequired?: Scalars['Int']['input'];
};


export type MutationCreateSampleArgs = {
  isPostProposalSubmission?: InputMaybe<Scalars['Boolean']['input']>;
  proposalPk: Scalars['Int']['input'];
  questionId: Scalars['String']['input'];
  templateId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateSampleEsiArgs = {
  esiId: Scalars['Int']['input'];
  sampleId: Scalars['Int']['input'];
};


export type MutationCreateScheduledEventArgs = {
  newScheduledEvent: NewScheduledEventInput;
};


export type MutationCreateShipmentArgs = {
  proposalPk: Scalars['Int']['input'];
  scheduledEventId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateTemplateArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  groupId: TemplateGroupId;
  name: Scalars['String']['input'];
};


export type MutationCreateTopicArgs = {
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  templateId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateUnitArgs = {
  id: Scalars['String']['input'];
  quantity: Scalars['String']['input'];
  siConversionFormula: Scalars['String']['input'];
  symbol: Scalars['String']['input'];
  unit: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  birthdate: Scalars['DateTime']['input'];
  department: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  middlename?: InputMaybe<Scalars['String']['input']>;
  nationality: Scalars['Int']['input'];
  organisation: Scalars['Int']['input'];
  organizationCountry?: InputMaybe<Scalars['Int']['input']>;
  otherOrganisation?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  position: Scalars['String']['input'];
  preferredname?: InputMaybe<Scalars['String']['input']>;
  telephone: Scalars['String']['input'];
  telephone_alt?: InputMaybe<Scalars['String']['input']>;
  user_title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateUserByEmailInviteArgs = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  userRole: UserRole;
};


export type MutationCreateVisitArgs = {
  scheduledEventId: Scalars['Int']['input'];
  team: Array<Scalars['Int']['input']>;
  teamLeadUserId: Scalars['Int']['input'];
};


export type MutationCreateVisitRegistrationArgs = {
  visitId: Scalars['Int']['input'];
};


export type MutationDeleteApiAccessTokenArgs = {
  deleteApiAccessTokenInput: DeleteApiAccessTokenInput;
};


export type MutationDeleteCallArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteEquipmentAssignmentArgs = {
  deleteEquipmentAssignmentInput: DeleteEquipmentAssignmentInput;
};


export type MutationDeleteFeedbackArgs = {
  feedbackId: Scalars['Int']['input'];
};


export type MutationDeleteGenericTemplateArgs = {
  genericTemplateId: Scalars['Int']['input'];
};


export type MutationDeleteInstitutionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteInstrumentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteLostTimeArgs = {
  deleteLostTimeInput: DeleteLostTimeInput;
};


export type MutationDeletePdfTemplateArgs = {
  pdfTemplateId: Scalars['Int']['input'];
};


export type MutationDeletePredefinedMessageArgs = {
  deletePredefinedMessageInput: DeletePredefinedMessageInput;
};


export type MutationDeleteProposalArgs = {
  proposalPk: Scalars['Int']['input'];
};


export type MutationDeleteProposalStatusArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteProposalWorkflowArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteProposalWorkflowStatusArgs = {
  deleteProposalWorkflowStatusInput: DeleteProposalWorkflowStatusInput;
};


export type MutationDeleteQuestionArgs = {
  questionId: Scalars['String']['input'];
};


export type MutationDeleteQuestionTemplateRelationArgs = {
  questionId: Scalars['String']['input'];
  templateId: Scalars['Int']['input'];
};


export type MutationDeleteSepArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteSampleArgs = {
  sampleId: Scalars['Int']['input'];
};


export type MutationDeleteSampleEsiArgs = {
  esiId: Scalars['Int']['input'];
  sampleId: Scalars['Int']['input'];
};


export type MutationDeleteScheduledEventsArgs = {
  deleteScheduledEventsInput: DeleteScheduledEventsInput;
};


export type MutationDeleteShipmentArgs = {
  shipmentId: Scalars['Int']['input'];
};


export type MutationDeleteTemplateArgs = {
  templateId: Scalars['Int']['input'];
};


export type MutationDeleteTopicArgs = {
  topicId: Scalars['Int']['input'];
};


export type MutationDeleteUnitArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteVisitArgs = {
  visitId: Scalars['Int']['input'];
};


export type MutationEmailVerificationArgs = {
  token: Scalars['String']['input'];
};


export type MutationExternalTokenLoginArgs = {
  externalToken: Scalars['String']['input'];
  redirectUri: Scalars['String']['input'];
};


export type MutationFinalizeProposalBookingArgs = {
  action: ProposalBookingFinalizeAction;
  id: Scalars['Int']['input'];
};


export type MutationFinalizeScheduledEventArgs = {
  finalizeScheduledEvent: FinalizeScheduledEventInput;
};


export type MutationGetTokenForUserArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationImportProposalArgs = {
  abstract?: InputMaybe<Scalars['String']['input']>;
  callId: Scalars['Int']['input'];
  proposerId?: InputMaybe<Scalars['Int']['input']>;
  referenceNumber: Scalars['Int']['input'];
  submitterId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type MutationImportTemplateArgs = {
  conflictResolutions: Array<ConflictResolution>;
  subTemplatesConflictResolutions: Array<Array<ConflictResolution>>;
  templateAsJson: Scalars['String']['input'];
};


export type MutationImportUnitsArgs = {
  conflictResolutions: Array<ConflictResolution>;
  json: Scalars['String']['input'];
};


export type MutationLogoutArgs = {
  token: Scalars['String']['input'];
};


export type MutationMergeInstitutionsArgs = {
  institutionIdFrom: Scalars['Int']['input'];
  institutionIdInto: Scalars['Int']['input'];
  newTitle: Scalars['String']['input'];
};


export type MutationMoveProposalWorkflowStatusArgs = {
  moveProposalWorkflowStatusInput: MoveProposalWorkflowStatusInput;
};


export type MutationNotifyProposalArgs = {
  proposalPk: Scalars['Int']['input'];
};


export type MutationPrepareDbArgs = {
  includeSeeds?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationRedeemCodeArgs = {
  code: Scalars['String']['input'];
};


export type MutationRemoveAssignedInstrumentFromCallArgs = {
  removeAssignedInstrumentFromCallInput: RemoveAssignedInstrumentFromCallInput;
};


export type MutationRemoveMemberFromSepProposalArgs = {
  memberId: Scalars['Int']['input'];
  proposalPk: Scalars['Int']['input'];
  sepId: Scalars['Int']['input'];
};


export type MutationRemoveMemberFromSepArgs = {
  memberId: Scalars['Int']['input'];
  roleId: UserRole;
  sepId: Scalars['Int']['input'];
};


export type MutationRemoveProposalsFromInstrumentArgs = {
  proposalPks: Array<Scalars['Int']['input']>;
};


export type MutationRemoveProposalsFromSepArgs = {
  proposalPks: Array<Scalars['Int']['input']>;
  sepId: Scalars['Int']['input'];
};


export type MutationRemoveScientistFromInstrumentArgs = {
  instrumentId: Scalars['Int']['input'];
  scientistId: Scalars['Int']['input'];
};


export type MutationRemoveUserForReviewArgs = {
  reviewId: Scalars['Int']['input'];
  sepId: Scalars['Int']['input'];
};


export type MutationReopenProposalBookingArgs = {
  id: Scalars['Int']['input'];
};


export type MutationReopenScheduledEventArgs = {
  id: Scalars['Int']['input'];
};


export type MutationReorderSepMeetingDecisionProposalsArgs = {
  reorderSepMeetingDecisionProposalsInput: ReorderSepMeetingDecisionProposalsInput;
};


export type MutationRequestFeedbackArgs = {
  scheduledEventId: Scalars['Int']['input'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationResetPasswordEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationResetSchedulerDbArgs = {
  includeSeeds?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationSaveSepMeetingDecisionArgs = {
  saveSepMeetingDecisionInput: SaveSepMeetingDecisionInput;
};


export type MutationSelectRoleArgs = {
  selectedRoleId?: InputMaybe<Scalars['Int']['input']>;
  token: Scalars['String']['input'];
};


export type MutationSetActiveTemplateArgs = {
  templateGroupId: TemplateGroupId;
  templateId: Scalars['Int']['input'];
};


export type MutationSetInstrumentAvailabilityTimeArgs = {
  availabilityTime: Scalars['Int']['input'];
  callId: Scalars['Int']['input'];
  instrumentId: Scalars['Int']['input'];
};


export type MutationSetPageContentArgs = {
  id: PageName;
  text: Scalars['String']['input'];
};


export type MutationSetUserEmailVerifiedArgs = {
  id: Scalars['Int']['input'];
};


export type MutationSetUserNotPlaceholderArgs = {
  id: Scalars['Int']['input'];
};


export type MutationSubmitInstrumentArgs = {
  callId: Scalars['Int']['input'];
  instrumentId: Scalars['Int']['input'];
  sepId: Scalars['Int']['input'];
};


export type MutationSubmitProposalArgs = {
  proposalPk: Scalars['Int']['input'];
};


export type MutationSubmitProposalsReviewArgs = {
  submitProposalsReviewInput: SubmitProposalsReviewInput;
};


export type MutationSubmitShipmentArgs = {
  shipmentId: Scalars['Int']['input'];
};


export type MutationSubmitTechnicalReviewsArgs = {
  submitTechnicalReviewsInput: SubmitTechnicalReviewsInput;
};


export type MutationTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationUpdateAnswerArgs = {
  answer: AnswerInput;
  questionaryId: Scalars['Int']['input'];
};


export type MutationUpdateApiAccessTokenArgs = {
  updateApiAccessTokenInput: UpdateApiAccessTokenInput;
};


export type MutationUpdateCallArgs = {
  updateCallInput: UpdateCallInput;
};


export type MutationUpdateEquipmentArgs = {
  id: Scalars['Int']['input'];
  updateEquipmentInput: EquipmentInput;
};


export type MutationUpdateEsiArgs = {
  esiId: Scalars['Int']['input'];
  isSubmitted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateFeaturesArgs = {
  updatedFeaturesInput: UpdateFeaturesInput;
};


export type MutationUpdateFeedbackArgs = {
  feedbackId: Scalars['Int']['input'];
  status?: InputMaybe<FeedbackStatus>;
};


export type MutationUpdateGenericTemplateArgs = {
  genericTemplateId: Scalars['Int']['input'];
  safetyComment?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateInstitutionArgs = {
  country: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateInstrumentArgs = {
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  managerUserId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  shortCode: Scalars['String']['input'];
};


export type MutationUpdateLostTimeArgs = {
  updateLostTimeInput: UpdateLostTimeInput;
};


export type MutationUpdatePasswordArgs = {
  id: Scalars['Int']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdatePdfTemplateArgs = {
  pdfTemplateId: Scalars['Int']['input'];
  templateData?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdatePredefinedMessageArgs = {
  updatePredefinedMessageInput: UpdatePredefinedMessageInput;
};


export type MutationUpdateProposalArgs = {
  abstract?: InputMaybe<Scalars['String']['input']>;
  proposalPk: Scalars['Int']['input'];
  proposerId?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type MutationUpdateProposalStatusArgs = {
  updatedProposalStatusInput: UpdateProposalStatusInput;
};


export type MutationUpdateProposalWorkflowArgs = {
  updatedProposalWorkflowInput: UpdateProposalWorkflowInput;
};


export type MutationUpdateQuestionArgs = {
  config?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  naturalKey?: InputMaybe<Scalars['String']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateQuestionTemplateRelationArgs = {
  config?: InputMaybe<Scalars['String']['input']>;
  questionId: Scalars['String']['input'];
  sortOrder: Scalars['Int']['input'];
  templateId: Scalars['Int']['input'];
  topicId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateQuestionTemplateRelationSettingsArgs = {
  config?: InputMaybe<Scalars['String']['input']>;
  dependencies: Array<FieldDependencyInput>;
  dependenciesOperator?: InputMaybe<DependenciesLogicOperator>;
  questionId: Scalars['String']['input'];
  templateId: Scalars['Int']['input'];
};


export type MutationUpdateReviewArgs = {
  comment: Scalars['String']['input'];
  grade: Scalars['Int']['input'];
  reviewID: Scalars['Int']['input'];
  sepID: Scalars['Int']['input'];
  status: ReviewStatus;
};


export type MutationUpdateSepArgs = {
  active: Scalars['Boolean']['input'];
  code: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  numberRatingsRequired?: Scalars['Int']['input'];
};


export type MutationUpdateSepTimeAllocationArgs = {
  proposalPk: Scalars['Int']['input'];
  sepId: Scalars['Int']['input'];
  sepTimeAllocation?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateSampleArgs = {
  safetyComment?: InputMaybe<Scalars['String']['input']>;
  safetyStatus?: InputMaybe<SampleStatus>;
  sampleId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateSampleEsiArgs = {
  esiId: Scalars['Int']['input'];
  isSubmitted?: InputMaybe<Scalars['Boolean']['input']>;
  sampleId: Scalars['Int']['input'];
};


export type MutationUpdateScheduledEventArgs = {
  updateScheduledEvent: UpdateScheduledEventInput;
};


export type MutationUpdateSettingsArgs = {
  updatedSettingsInput: UpdateSettingsInput;
};


export type MutationUpdateShipmentArgs = {
  externalRef?: InputMaybe<Scalars['String']['input']>;
  proposalPk?: InputMaybe<Scalars['Int']['input']>;
  shipmentId: Scalars['Int']['input'];
  status?: InputMaybe<ShipmentStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateTechnicalReviewAssigneeArgs = {
  proposalPks: Array<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};


export type MutationUpdateTemplateArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  templateId: Scalars['Int']['input'];
};


export type MutationUpdateTopicArgs = {
  id: Scalars['Int']['input'];
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  templateId?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  birthdate?: InputMaybe<Scalars['DateTime']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  lastname?: InputMaybe<Scalars['String']['input']>;
  middlename?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['Int']['input']>;
  organisation?: InputMaybe<Scalars['Int']['input']>;
  organizationCountry?: InputMaybe<Scalars['Int']['input']>;
  otherOrganisation?: InputMaybe<Scalars['String']['input']>;
  placeholder?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  preferredname?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<Scalars['Int']['input']>>;
  telephone?: InputMaybe<Scalars['String']['input']>;
  telephone_alt?: InputMaybe<Scalars['String']['input']>;
  user_title?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserRolesArgs = {
  id: Scalars['Int']['input'];
  roles?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type MutationUpdateVisitArgs = {
  status?: InputMaybe<VisitStatus>;
  team?: InputMaybe<Array<Scalars['Int']['input']>>;
  teamLeadUserId?: InputMaybe<Scalars['Int']['input']>;
  visitId: Scalars['Int']['input'];
};


export type MutationUpdateVisitRegistrationArgs = {
  endsAt?: InputMaybe<Scalars['DateTime']['input']>;
  isRegistrationSubmitted?: InputMaybe<Scalars['Boolean']['input']>;
  startsAt?: InputMaybe<Scalars['DateTime']['input']>;
  trainingExpiryDate?: InputMaybe<Scalars['DateTime']['input']>;
  visitId: Scalars['Int']['input'];
};


export type MutationValidateTemplateImportArgs = {
  templateAsJson: Scalars['String']['input'];
};


export type MutationValidateUnitsImportArgs = {
  unitsAsJson: Scalars['String']['input'];
};

export type NewScheduledEventInput = {
  bookingType: ScheduledEventBookingType;
  description?: InputMaybe<Scalars['String']['input']>;
  endsAt: Scalars['TzLessDateTime']['input'];
  instrumentId: Scalars['Int']['input'];
  proposalBookingId?: InputMaybe<Scalars['Int']['input']>;
  startsAt: Scalars['TzLessDateTime']['input'];
};

export type NumberInputConfig = {
  numberValueConstraint: Maybe<NumberValueConstraint>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
  units: Array<Unit>;
};

export enum NumberValueConstraint {
  NONE = 'NONE',
  ONLY_NEGATIVE = 'ONLY_NEGATIVE',
  ONLY_NEGATIVE_INTEGER = 'ONLY_NEGATIVE_INTEGER',
  ONLY_POSITIVE = 'ONLY_POSITIVE',
  ONLY_POSITIVE_INTEGER = 'ONLY_POSITIVE_INTEGER'
}

export type Page = {
  content: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
};

export enum PageName {
  COOKIEPAGE = 'COOKIEPAGE',
  FOOTERCONTENT = 'FOOTERCONTENT',
  GRADEGUIDEPAGE = 'GRADEGUIDEPAGE',
  HELPPAGE = 'HELPPAGE',
  HOMEPAGE = 'HOMEPAGE',
  LOGINHELPPAGE = 'LOGINHELPPAGE',
  PRIVACYPAGE = 'PRIVACYPAGE',
  REVIEWPAGE = 'REVIEWPAGE'
}

export type PdfTemplate = {
  created: Scalars['DateTime']['output'];
  creatorId: Scalars['Int']['output'];
  pdfTemplateId: Scalars['Int']['output'];
  templateData: Scalars['String']['output'];
  templateId: Scalars['Int']['output'];
};

export type PdfTemplatesFilter = {
  creatorId?: InputMaybe<Scalars['Int']['input']>;
  pdfTemplateData?: InputMaybe<Scalars['String']['input']>;
  pdfTemplateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  templateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type PermissionsWithAccessToken = {
  accessPermissions: Scalars['String']['output'];
  accessToken: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type PredefinedMessage = {
  dateModified: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  lastModifiedBy: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  modifiedBy: BasicUserDetails;
  title: Scalars['String']['output'];
};

export type PredefinedMessagesFilter = {
  key?: InputMaybe<Scalars['String']['input']>;
};

export type Proposal = {
  abstract: Scalars['String']['output'];
  call: Maybe<Call>;
  callId: Scalars['Int']['output'];
  commentForManagement: Maybe<Scalars['String']['output']>;
  commentForUser: Maybe<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  finalStatus: Maybe<ProposalEndStatus>;
  genericTemplates: Maybe<Array<GenericTemplate>>;
  instrument: Maybe<Instrument>;
  managementDecisionSubmitted: Scalars['Boolean']['output'];
  managementTimeAllocation: Maybe<Scalars['Int']['output']>;
  notified: Scalars['Boolean']['output'];
  primaryKey: Scalars['Int']['output'];
  proposalBooking: Maybe<ProposalBooking>;
  proposalBookingCore: Maybe<ProposalBookingCore>;
  proposalId: Scalars['String']['output'];
  proposer: Maybe<BasicUserDetails>;
  proposerId: Scalars['Int']['output'];
  publicStatus: ProposalPublicStatus;
  questionary: Questionary;
  questionaryId: Scalars['Int']['output'];
  reviews: Maybe<Array<Review>>;
  samples: Maybe<Array<Sample>>;
  sep: Maybe<Sep>;
  sepMeetingDecision: Maybe<SepMeetingDecision>;
  status: Maybe<ProposalStatus>;
  statusId: Scalars['Int']['output'];
  submitted: Scalars['Boolean']['output'];
  technicalReview: Maybe<TechnicalReview>;
  title: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
  users: Array<BasicUserDetails>;
  visits: Maybe<Array<Visit>>;
};


export type ProposalProposalBookingArgs = {
  filter?: InputMaybe<ProposalProposalBookingFilter>;
};


export type ProposalProposalBookingCoreArgs = {
  filter?: InputMaybe<ProposalBookingFilter>;
};

export type ProposalBasisConfig = {
  tooltip: Scalars['String']['output'];
};

export type ProposalBooking = {
  allocatedTime: Scalars['Int']['output'];
  call: Maybe<Call>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  instrument: Maybe<Instrument>;
  proposal: Maybe<Proposal>;
  scheduledEvents: Array<ScheduledEvent>;
  status: ProposalBookingStatusCore;
  updatedAt: Scalars['DateTime']['output'];
};


export type ProposalBookingScheduledEventsArgs = {
  filter: ProposalBookingScheduledEventFilter;
};

export type ProposalBookingCore = {
  id: Scalars['Int']['output'];
  scheduledEvents: Array<ScheduledEventCore>;
};


export type ProposalBookingCoreScheduledEventsArgs = {
  filter: ProposalBookingScheduledEventFilterCore;
};

export type ProposalBookingFilter = {
  status?: InputMaybe<Array<ProposalBookingStatusCore>>;
};

export enum ProposalBookingFinalizeAction {
  COMPLETE = 'COMPLETE',
  RESTART = 'RESTART'
}

export type ProposalBookingResponseWrap = {
  error: Maybe<Scalars['String']['output']>;
  proposalBooking: Maybe<ProposalBooking>;
};

export type ProposalBookingScheduledEventFilter = {
  bookingType?: InputMaybe<ScheduledEventBookingType>;
  endsAfter?: InputMaybe<Scalars['TzLessDateTime']['input']>;
  endsBefore?: InputMaybe<Scalars['TzLessDateTime']['input']>;
};

export type ProposalBookingScheduledEventFilterCore = {
  bookingType?: InputMaybe<ScheduledEventBookingType>;
  endsAfter?: InputMaybe<Scalars['DateTime']['input']>;
  endsBefore?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Array<ProposalBookingStatusCore>>;
};

export enum ProposalBookingStatusCore {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  DRAFT = 'DRAFT'
}

export enum ProposalEndStatus {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  RESERVED = 'RESERVED',
  UNSET = 'UNSET'
}

export type ProposalEsiBasisConfig = {
  tooltip: Scalars['String']['output'];
};

export type ProposalEvent = {
  description: Maybe<Scalars['String']['output']>;
  name: Event;
};

export type ProposalPkWithCallId = {
  callId: Scalars['Int']['input'];
  primaryKey: Scalars['Int']['input'];
};

export type ProposalPkWithRankOrder = {
  proposalPk: Scalars['Int']['input'];
  rankOrder: Scalars['Int']['input'];
};

export type ProposalPkWithReviewId = {
  proposalPk: Scalars['Int']['input'];
  reviewId: Scalars['Int']['input'];
};

export type ProposalProposalBookingFilter = {
  status?: InputMaybe<Array<ProposalBookingStatusCore>>;
};

export enum ProposalPublicStatus {
  ACCEPTED = 'accepted',
  DRAFT = 'draft',
  REJECTED = 'rejected',
  RESERVED = 'reserved',
  SUBMITTED = 'submitted',
  UNKNOWN = 'unknown'
}

export type ProposalStatus = {
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isDefault: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  shortCode: Scalars['String']['output'];
};

export type ProposalTemplate = {
  callCount: Scalars['Int']['output'];
  complementaryQuestions: Array<Question>;
  description: Maybe<Scalars['String']['output']>;
  group: TemplateGroup;
  groupId: TemplateGroupId;
  isArchived: Scalars['Boolean']['output'];
  json: Scalars['String']['output'];
  name: Scalars['String']['output'];
  pdfTemplate: Maybe<PdfTemplate>;
  questionaryCount: Scalars['Int']['output'];
  steps: Array<TemplateStep>;
  templateId: Scalars['Int']['output'];
};

export type ProposalTemplatesFilter = {
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  templateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type ProposalView = {
  allocationTimeUnit: AllocationTimeUnits;
  callId: Scalars['Int']['output'];
  callShortCode: Maybe<Scalars['String']['output']>;
  finalStatus: Maybe<ProposalEndStatus>;
  instrumentId: Maybe<Scalars['Int']['output']>;
  instrumentName: Maybe<Scalars['String']['output']>;
  managementTimeAllocation: Maybe<Scalars['Int']['output']>;
  notified: Scalars['Boolean']['output'];
  primaryKey: Scalars['Int']['output'];
  principalInvestigator: Maybe<User>;
  principalInvestigatorId: Scalars['Int']['output'];
  proposalId: Scalars['String']['output'];
  rankOrder: Maybe<Scalars['Int']['output']>;
  reviewAverage: Maybe<Scalars['Float']['output']>;
  reviewDeviation: Maybe<Scalars['Float']['output']>;
  sepCode: Maybe<Scalars['String']['output']>;
  sepId: Maybe<Scalars['Int']['output']>;
  statusDescription: Scalars['String']['output'];
  statusId: Scalars['Int']['output'];
  statusName: Scalars['String']['output'];
  submitted: Scalars['Boolean']['output'];
  technicalReviewAssigneeFirstName: Maybe<Scalars['String']['output']>;
  technicalReviewAssigneeId: Maybe<Scalars['Int']['output']>;
  technicalReviewAssigneeLastName: Maybe<Scalars['String']['output']>;
  technicalReviewSubmitted: Maybe<Scalars['Int']['output']>;
  technicalStatus: Maybe<TechnicalReviewStatus>;
  technicalTimeAllocation: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
};

export type ProposalWorkflow = {
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  proposalWorkflowConnectionGroups: Array<ProposalWorkflowConnectionGroup>;
};

export type ProposalWorkflowConnection = {
  droppableGroupId: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  nextProposalStatusId: Maybe<Scalars['Int']['output']>;
  prevProposalStatusId: Maybe<Scalars['Int']['output']>;
  proposalStatus: ProposalStatus;
  proposalStatusId: Scalars['Int']['output'];
  proposalWorkflowId: Scalars['Int']['output'];
  sortOrder: Scalars['Int']['output'];
  statusChangingEvents: Maybe<Array<StatusChangingEvent>>;
};

export type ProposalWorkflowConnectionGroup = {
  connections: Array<ProposalWorkflowConnection>;
  groupId: Scalars['String']['output'];
  parentGroupId: Maybe<Scalars['String']['output']>;
};

export type ProposalsFilter = {
  callId?: InputMaybe<Scalars['Int']['input']>;
  instrumentId?: InputMaybe<Scalars['Int']['input']>;
  proposalStatusId?: InputMaybe<Scalars['Int']['input']>;
  questionFilter?: InputMaybe<QuestionFilterInput>;
  questionaryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  referenceNumbers?: InputMaybe<Array<Scalars['String']['input']>>;
  reviewer?: InputMaybe<ReviewerFilter>;
  shortCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type ProposalsQueryResult = {
  proposals: Array<Proposal>;
  totalCount: Scalars['Int']['output'];
};

export type ProposalsViewQueryResult = {
  proposalViews: Array<ProposalView>;
  totalCount: Scalars['Int']['output'];
};

export type ProposalsViewResult = {
  proposals: Array<ProposalView>;
  totalCount: Scalars['Int']['output'];
};

export type Quantity = {
  id: Scalars['String']['output'];
};

export type QueriesAndMutations = {
  mutations: Array<Scalars['String']['output']>;
  queries: Array<Scalars['String']['output']>;
};

export type QueriesMutationsAndServices = {
  mutations: Array<QueryMutationAndServicesGroup>;
  queries: Array<QueryMutationAndServicesGroup>;
  services: Array<QueryMutationAndServicesGroup>;
};

export type Query = {
  accessTokenAndPermissions: Maybe<PermissionsWithAccessToken>;
  activeTemplateId: Maybe<Scalars['Int']['output']>;
  allAccessTokensAndPermissions: Maybe<Array<PermissionsWithAccessToken>>;
  availableEquipments: Array<Equipment>;
  basicUserDetails: Maybe<BasicUserDetails>;
  basicUserDetailsByEmail: Maybe<BasicUserDetails>;
  blankQuestionary: Questionary;
  blankQuestionarySteps: Maybe<Array<QuestionaryStep>>;
  call: Maybe<Call>;
  calls: Maybe<Array<Call>>;
  callsByInstrumentScientist: Maybe<Array<Call>>;
  checkEmailExist: Maybe<Scalars['Boolean']['output']>;
  checkExternalToken: ExternalTokenResult;
  checkToken: TokenResult;
  countries: Maybe<Array<Entry>>;
  equipment: Maybe<Equipment>;
  equipments: Array<Equipment>;
  esi: Maybe<ExperimentSafetyInput>;
  eventLogs: Maybe<Array<EventLog>>;
  factoryVersion: Scalars['String']['output'];
  features: Array<Feature>;
  feedback: Maybe<Feedback>;
  feedbacks: Array<Feedback>;
  fileMetadata: Maybe<FileMetadata>;
  filesMetadata: Array<FileMetadata>;
  genericTemplate: Maybe<GenericTemplate>;
  genericTemplates: Maybe<Array<GenericTemplate>>;
  healthCheck: HealthStats;
  institutions: Maybe<Array<Institution>>;
  instrument: Maybe<Instrument>;
  instrumentProposalBookings: Array<ProposalBooking>;
  instrumentScientistHasAccess: Maybe<Scalars['Boolean']['output']>;
  instrumentScientistHasInstrument: Maybe<Scalars['Boolean']['output']>;
  instrumentScientistProposals: Maybe<ProposalsViewResult>;
  instruments: Maybe<InstrumentsQueryResult>;
  instrumentsBySep: Maybe<Array<InstrumentWithAvailabilityTime>>;
  isNaturalKeyPresent: Maybe<Scalars['Boolean']['output']>;
  me: Maybe<User>;
  myShipments: Maybe<Array<Shipment>>;
  myVisits: Array<Visit>;
  nationalities: Maybe<Array<Entry>>;
  pageContent: Maybe<Scalars['String']['output']>;
  pdfTemplate: Maybe<PdfTemplate>;
  pdfTemplates: Maybe<Array<PdfTemplate>>;
  predefinedMessage: Maybe<PredefinedMessage>;
  predefinedMessages: Array<PredefinedMessage>;
  previousCollaborators: Maybe<UserQueryResult>;
  proposal: Maybe<Proposal>;
  proposalBooking: Maybe<ProposalBooking>;
  proposalBookingLostTimes: Array<LostTime>;
  proposalBookingScheduledEvent: Maybe<ScheduledEvent>;
  proposalBookingScheduledEvents: Array<ScheduledEvent>;
  proposalById: Maybe<Proposal>;
  proposalEvents: Maybe<Array<ProposalEvent>>;
  proposalReviews: Maybe<Array<Review>>;
  proposalStatus: Maybe<ProposalStatus>;
  proposalStatuses: Maybe<Array<ProposalStatus>>;
  proposalTemplates: Maybe<Array<ProposalTemplate>>;
  proposalWorkflow: Maybe<ProposalWorkflow>;
  proposalWorkflows: Maybe<Array<ProposalWorkflow>>;
  proposals: Maybe<ProposalsQueryResult>;
  proposalsView: Maybe<ProposalsViewQueryResult>;
  quantities: Array<Quantity>;
  queriesMutationsAndServices: Maybe<QueriesMutationsAndServices>;
  questionByNaturalKey: Question;
  questionary: Maybe<Questionary>;
  questions: Array<QuestionWithUsage>;
  review: Maybe<Review>;
  roles: Maybe<Array<Role>>;
  sample: Maybe<Sample>;
  sampleEsi: Maybe<SampleExperimentSafetyInput>;
  samples: Maybe<Array<Sample>>;
  samplesByCallId: Maybe<Array<Sample>>;
  scheduledEvent: Maybe<ScheduledEvent>;
  scheduledEventCore: Maybe<ScheduledEventCore>;
  scheduledEvents: Array<ScheduledEvent>;
  scheduledEventsCore: Array<ScheduledEventCore>;
  schedulerConfig: SchedulerConfig;
  schedulerQueriesAndMutations: Maybe<QueriesAndMutations>;
  schedulerVersion: Scalars['String']['output'];
  sep: Maybe<Sep>;
  sepMembers: Maybe<Array<SepReviewer>>;
  sepProposal: Maybe<SepProposal>;
  sepProposals: Maybe<Array<SepProposal>>;
  sepProposalsByInstrument: Maybe<Array<SepProposal>>;
  sepReviewers: Maybe<Array<SepReviewer>>;
  seps: Maybe<SePsQueryResult>;
  settings: Array<Settings>;
  shipment: Maybe<Shipment>;
  shipments: Maybe<Array<Shipment>>;
  template: Maybe<Template>;
  templateCategories: Maybe<Array<TemplateCategory>>;
  templates: Maybe<Array<Template>>;
  units: Maybe<Array<Unit>>;
  unitsAsJson: Maybe<Scalars['String']['output']>;
  user: Maybe<User>;
  userByOIDCSub: Maybe<User>;
  userHasAccessToProposal: Maybe<Scalars['Boolean']['output']>;
  userInstruments: Maybe<InstrumentsQueryResult>;
  users: Maybe<UserQueryResult>;
  version: Scalars['String']['output'];
  visit: Maybe<Visit>;
  visitRegistration: Maybe<VisitRegistration>;
  visits: Array<Visit>;
};


export type QueryAccessTokenAndPermissionsArgs = {
  accessTokenId: Scalars['String']['input'];
};


export type QueryActiveTemplateIdArgs = {
  templateGroupId: TemplateGroupId;
};


export type QueryAvailableEquipmentsArgs = {
  scheduledEventId: Scalars['Int']['input'];
};


export type QueryBasicUserDetailsArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryBasicUserDetailsByEmailArgs = {
  email: Scalars['String']['input'];
  role?: InputMaybe<UserRole>;
};


export type QueryBlankQuestionaryArgs = {
  templateId: Scalars['Int']['input'];
};


export type QueryBlankQuestionaryStepsArgs = {
  templateId: Scalars['Int']['input'];
};


export type QueryCallArgs = {
  callId: Scalars['Int']['input'];
};


export type QueryCallsArgs = {
  filter?: InputMaybe<CallsFilter>;
};


export type QueryCallsByInstrumentScientistArgs = {
  scientistId: Scalars['Int']['input'];
};


export type QueryCheckEmailExistArgs = {
  email: Scalars['String']['input'];
};


export type QueryCheckExternalTokenArgs = {
  token: Scalars['String']['input'];
};


export type QueryCheckTokenArgs = {
  token: Scalars['String']['input'];
};


export type QueryEquipmentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryEquipmentsArgs = {
  equipmentIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type QueryEsiArgs = {
  esiId: Scalars['Int']['input'];
};


export type QueryEventLogsArgs = {
  changedObjectId: Scalars['String']['input'];
  eventType: Scalars['String']['input'];
};


export type QueryFeedbackArgs = {
  feedbackId: Scalars['Int']['input'];
};


export type QueryFeedbacksArgs = {
  filter?: InputMaybe<FeedbacksFilter>;
};


export type QueryFileMetadataArgs = {
  fileId: Scalars['String']['input'];
};


export type QueryFilesMetadataArgs = {
  filter: FilesMetadataFilter;
};


export type QueryGenericTemplateArgs = {
  genericTemplateId: Scalars['Int']['input'];
};


export type QueryGenericTemplatesArgs = {
  filter?: InputMaybe<GenericTemplatesFilter>;
};


export type QueryInstitutionsArgs = {
  filter?: InputMaybe<InstitutionsFilter>;
};


export type QueryInstrumentArgs = {
  instrumentId: Scalars['Int']['input'];
};


export type QueryInstrumentProposalBookingsArgs = {
  instrumentIds: Array<Scalars['Int']['input']>;
};


export type QueryInstrumentScientistHasAccessArgs = {
  instrumentId: Scalars['Int']['input'];
  proposalPk: Scalars['Int']['input'];
};


export type QueryInstrumentScientistHasInstrumentArgs = {
  instrumentId: Scalars['Int']['input'];
};


export type QueryInstrumentScientistProposalsArgs = {
  filter?: InputMaybe<ProposalsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryInstrumentsArgs = {
  callIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type QueryInstrumentsBySepArgs = {
  callId: Scalars['Int']['input'];
  sepId: Scalars['Int']['input'];
};


export type QueryIsNaturalKeyPresentArgs = {
  naturalKey: Scalars['String']['input'];
};


export type QueryPageContentArgs = {
  pageId: PageName;
};


export type QueryPdfTemplateArgs = {
  pdfTemplateId: Scalars['Int']['input'];
};


export type QueryPdfTemplatesArgs = {
  filter?: InputMaybe<PdfTemplatesFilter>;
};


export type QueryPredefinedMessageArgs = {
  predefinedMessageId: Scalars['Int']['input'];
};


export type QueryPredefinedMessagesArgs = {
  filter?: InputMaybe<PredefinedMessagesFilter>;
};


export type QueryPreviousCollaboratorsArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  subtractUsers?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  userId: Scalars['Int']['input'];
  userRole?: InputMaybe<UserRole>;
};


export type QueryProposalArgs = {
  primaryKey: Scalars['Int']['input'];
};


export type QueryProposalBookingArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProposalBookingLostTimesArgs = {
  proposalBookingId: Scalars['Int']['input'];
  scheduledEventId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProposalBookingScheduledEventArgs = {
  proposalBookingId: Scalars['Int']['input'];
  scheduledEventId: Scalars['Int']['input'];
};


export type QueryProposalBookingScheduledEventsArgs = {
  proposalBookingId: Scalars['Int']['input'];
};


export type QueryProposalByIdArgs = {
  proposalId: Scalars['String']['input'];
};


export type QueryProposalReviewsArgs = {
  proposalPk: Scalars['Int']['input'];
};


export type QueryProposalStatusArgs = {
  proposalStatusId: Scalars['Int']['input'];
};


export type QueryProposalTemplatesArgs = {
  filter?: InputMaybe<ProposalTemplatesFilter>;
};


export type QueryProposalWorkflowArgs = {
  proposalWorkflowId: Scalars['Int']['input'];
};


export type QueryProposalsArgs = {
  filter?: InputMaybe<ProposalsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProposalsViewArgs = {
  filter?: InputMaybe<ProposalsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<Scalars['String']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
};


export type QueryQuestionByNaturalKeyArgs = {
  naturalKey: Scalars['String']['input'];
};


export type QueryQuestionaryArgs = {
  questionaryId: Scalars['Int']['input'];
};


export type QueryQuestionsArgs = {
  filter?: InputMaybe<QuestionsFilter>;
};


export type QueryReviewArgs = {
  reviewId: Scalars['Int']['input'];
};


export type QuerySampleArgs = {
  sampleId: Scalars['Int']['input'];
};


export type QuerySampleEsiArgs = {
  esiId: Scalars['Int']['input'];
  sampleId: Scalars['Int']['input'];
};


export type QuerySamplesArgs = {
  filter?: InputMaybe<SamplesFilter>;
};


export type QuerySamplesByCallIdArgs = {
  callId: Scalars['Int']['input'];
};


export type QueryScheduledEventArgs = {
  id: Scalars['Int']['input'];
};


export type QueryScheduledEventCoreArgs = {
  scheduledEventId: Scalars['Int']['input'];
};


export type QueryScheduledEventsArgs = {
  filter: ScheduledEventFilter;
};


export type QueryScheduledEventsCoreArgs = {
  filter?: InputMaybe<ScheduledEventsCoreFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySepArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySepMembersArgs = {
  sepId: Scalars['Int']['input'];
};


export type QuerySepProposalArgs = {
  proposalPk: Scalars['Int']['input'];
  sepId: Scalars['Int']['input'];
};


export type QuerySepProposalsArgs = {
  callId?: InputMaybe<Scalars['Int']['input']>;
  sepId: Scalars['Int']['input'];
};


export type QuerySepProposalsByInstrumentArgs = {
  callId: Scalars['Int']['input'];
  instrumentId: Scalars['Int']['input'];
  sepId: Scalars['Int']['input'];
};


export type QuerySepReviewersArgs = {
  sepId: Scalars['Int']['input'];
};


export type QuerySepsArgs = {
  filter?: InputMaybe<SePsFilter>;
};


export type QueryShipmentArgs = {
  shipmentId: Scalars['Int']['input'];
};


export type QueryShipmentsArgs = {
  filter?: InputMaybe<ShipmentsFilter>;
};


export type QueryTemplateArgs = {
  templateId: Scalars['Int']['input'];
};


export type QueryTemplatesArgs = {
  filter?: InputMaybe<TemplatesFilter>;
};


export type QueryUserArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryUserByOidcSubArgs = {
  oidcSub: Scalars['String']['input'];
};


export type QueryUserHasAccessToProposalArgs = {
  proposalPk: Scalars['Int']['input'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  subtractUsers?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  userRole?: InputMaybe<UserRole>;
};


export type QueryVisitArgs = {
  visitId: Scalars['Int']['input'];
};


export type QueryVisitRegistrationArgs = {
  visitId: Scalars['Int']['input'];
};


export type QueryVisitsArgs = {
  filter?: InputMaybe<VisitsFilter>;
};

export type QueryMutationAndServicesGroup = {
  groupName: QueryMutationAndServicesGroups;
  items: Array<Scalars['String']['output']>;
};

export enum QueryMutationAndServicesGroups {
  CORE = 'CORE',
  SCHEDULER = 'SCHEDULER'
}

export type Question = {
  categoryId: TemplateCategoryId;
  config: FieldConfig;
  dataType: DataType;
  id: Scalars['String']['output'];
  naturalKey: Scalars['String']['output'];
  question: Scalars['String']['output'];
};

export type QuestionComparison = {
  conflictResolutionStrategy: ConflictResolutionStrategy;
  existingQuestion: Maybe<Question>;
  newQuestion: Question;
  status: QuestionComparisonStatus;
};

export enum QuestionComparisonStatus {
  DIFFERENT = 'DIFFERENT',
  NEW = 'NEW',
  SAME = 'SAME'
}

export enum QuestionFilterCompareOperator {
  EQUALS = 'EQUALS',
  EXISTS = 'EXISTS',
  GREATER_THAN = 'GREATER_THAN',
  INCLUDES = 'INCLUDES',
  LESS_THAN = 'LESS_THAN'
}

export type QuestionFilterInput = {
  compareOperator: QuestionFilterCompareOperator;
  dataType: DataType;
  questionId: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type QuestionTemplateRelation = {
  config: FieldConfig;
  dependencies: Array<FieldDependency>;
  dependenciesOperator: Maybe<DependenciesLogicOperator>;
  question: Question;
  sortOrder: Scalars['Int']['output'];
  topicId: Scalars['Int']['output'];
};

export type QuestionWithUsage = {
  answers: Array<AnswerBasic>;
  categoryId: TemplateCategoryId;
  config: FieldConfig;
  dataType: DataType;
  id: Scalars['String']['output'];
  naturalKey: Scalars['String']['output'];
  question: Scalars['String']['output'];
  templates: Array<Template>;
};

export type Questionary = {
  created: Scalars['DateTime']['output'];
  isCompleted: Scalars['Boolean']['output'];
  questionaryId: Scalars['Int']['output'];
  steps: Array<QuestionaryStep>;
  templateId: Scalars['Int']['output'];
};

export type QuestionaryStep = {
  fields: Array<Answer>;
  isCompleted: Scalars['Boolean']['output'];
  topic: Topic;
};

export type QuestionsFilter = {
  category?: InputMaybe<TemplateCategoryId>;
  dataType?: InputMaybe<Array<DataType>>;
  excludeDataType?: InputMaybe<Array<DataType>>;
  questionIds?: InputMaybe<Array<Scalars['String']['input']>>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type RedeemCode = {
  claimedAt: Maybe<Scalars['DateTime']['output']>;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['Int']['output'];
  placeholderUserId: Scalars['Int']['output'];
};

export type Rejection = {
  reason: Scalars['String']['output'];
};

export type RemoveAssignedInstrumentFromCallInput = {
  callId: Scalars['Int']['input'];
  instrumentId: Scalars['Int']['input'];
};

export type ReorderSepMeetingDecisionProposalsInput = {
  proposals: Array<ProposalPkWithRankOrder>;
};

export type Review = {
  comment: Maybe<Scalars['String']['output']>;
  grade: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  proposal: Maybe<Proposal>;
  reviewer: Maybe<BasicUserDetails>;
  sepID: Scalars['Int']['output'];
  status: ReviewStatus;
  userID: Scalars['Int']['output'];
};

export enum ReviewStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED'
}

export enum ReviewerFilter {
  ALL = 'ALL',
  ME = 'ME'
}

export type RichTextInputConfig = {
  max: Maybe<Scalars['Int']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export type Role = {
  id: Scalars['Int']['output'];
  shortCode: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Sep = {
  active: Scalars['Boolean']['output'];
  code: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  numberRatingsRequired: Scalars['Float']['output'];
  proposalCount: Scalars['Int']['output'];
  sepChair: Maybe<BasicUserDetails>;
  sepChairProposalCount: Maybe<Scalars['Int']['output']>;
  sepSecretary: Maybe<BasicUserDetails>;
  sepSecretaryProposalCount: Maybe<Scalars['Int']['output']>;
};

export type SepAssignment = {
  dateAssigned: Scalars['DateTime']['output'];
  dateReassigned: Maybe<Scalars['DateTime']['output']>;
  emailSent: Scalars['Boolean']['output'];
  proposal: Proposal;
  proposalPk: Scalars['Int']['output'];
  reassigned: Scalars['Boolean']['output'];
  review: Maybe<Review>;
  role: Maybe<Role>;
  sepId: Scalars['Int']['output'];
  sepMemberUserId: Maybe<Scalars['Int']['output']>;
  user: Maybe<BasicUserDetails>;
};

export type SepProposal = {
  assignments: Maybe<Array<SepAssignment>>;
  dateAssigned: Scalars['DateTime']['output'];
  instrumentSubmitted: Scalars['Boolean']['output'];
  proposal: Proposal;
  proposalPk: Scalars['Int']['output'];
  sepId: Scalars['Int']['output'];
  sepTimeAllocation: Maybe<Scalars['Int']['output']>;
};

export type SepReviewer = {
  proposalsCount: Scalars['Int']['output'];
  role: Maybe<Role>;
  sepId: Scalars['Int']['output'];
  user: BasicUserDetails;
  userId: Scalars['Int']['output'];
};

export type SePsFilter = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  callIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type SePsQueryResult = {
  seps: Array<Sep>;
  totalCount: Scalars['Int']['output'];
};

export type Sample = {
  created: Scalars['DateTime']['output'];
  creatorId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isPostProposalSubmission: Scalars['Boolean']['output'];
  proposal: Proposal;
  proposalPk: Scalars['Int']['output'];
  questionId: Scalars['String']['output'];
  questionary: Questionary;
  questionaryId: Scalars['Int']['output'];
  safetyComment: Scalars['String']['output'];
  safetyStatus: SampleStatus;
  title: Scalars['String']['output'];
};

export type SampleBasisConfig = {
  titlePlaceholder: Scalars['String']['output'];
};

export type SampleDeclarationConfig = {
  addEntryButtonLabel: Scalars['String']['output'];
  esiTemplateId: Maybe<Scalars['Int']['output']>;
  maxEntries: Maybe<Scalars['Int']['output']>;
  minEntries: Maybe<Scalars['Int']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  templateCategory: Scalars['String']['output'];
  templateId: Maybe<Scalars['Int']['output']>;
};

export type SampleEsiBasisConfig = {
  tooltip: Scalars['String']['output'];
};

export type SampleExperimentSafetyInput = {
  esiId: Scalars['Int']['output'];
  isSubmitted: Scalars['Boolean']['output'];
  questionary: Questionary;
  questionaryId: Scalars['Int']['output'];
  sample: Sample;
  sampleId: Scalars['Int']['output'];
};

export enum SampleStatus {
  ELEVATED_RISK = 'ELEVATED_RISK',
  HIGH_RISK = 'HIGH_RISK',
  LOW_RISK = 'LOW_RISK',
  PENDING_EVALUATION = 'PENDING_EVALUATION'
}

export type SamplesFilter = {
  creatorId?: InputMaybe<Scalars['Int']['input']>;
  proposalPk?: InputMaybe<Scalars['Int']['input']>;
  questionId?: InputMaybe<Scalars['String']['input']>;
  questionaryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  sampleIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  status?: InputMaybe<SampleStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
  visitId?: InputMaybe<Scalars['Int']['input']>;
};

export type SaveSepMeetingDecisionInput = {
  commentForManagement?: InputMaybe<Scalars['String']['input']>;
  commentForUser?: InputMaybe<Scalars['String']['input']>;
  proposalPk: Scalars['Int']['input'];
  rankOrder?: InputMaybe<Scalars['Int']['input']>;
  recommendation?: InputMaybe<ProposalEndStatus>;
  submitted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ScheduledEvent = {
  bookingType: ScheduledEventBookingType;
  color: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  endsAt: Scalars['TzLessDateTime']['output'];
  equipmentAssignmentStatus: Maybe<EquipmentAssignmentStatus>;
  equipmentId: Maybe<Scalars['Int']['output']>;
  equipments: Array<EquipmentWithAssignmentStatus>;
  id: Scalars['Int']['output'];
  instrument: Maybe<Instrument>;
  localContact: Maybe<BasicUserDetails>;
  proposalBooking: Maybe<ProposalBooking>;
  proposalBookingId: Maybe<Scalars['Int']['output']>;
  scheduledBy: Maybe<BasicUserDetails>;
  startsAt: Scalars['TzLessDateTime']['output'];
  status: ProposalBookingStatusCore;
  updatedAt: Scalars['DateTime']['output'];
};

export enum ScheduledEventBookingType {
  EQUIPMENT = 'EQUIPMENT',
  MAINTENANCE = 'MAINTENANCE',
  SHUTDOWN = 'SHUTDOWN',
  USER_OPERATIONS = 'USER_OPERATIONS'
}

export type ScheduledEventCore = {
  bookingType: ScheduledEventBookingType;
  endsAt: Scalars['DateTime']['output'];
  esi: Maybe<ExperimentSafetyInput>;
  feedback: Maybe<Feedback>;
  feedbackRequests: Array<FeedbackRequest>;
  id: Scalars['Int']['output'];
  localContact: Maybe<BasicUserDetails>;
  localContactId: Maybe<Scalars['Int']['output']>;
  proposal: Proposal;
  proposalPk: Maybe<Scalars['Int']['output']>;
  shipments: Array<Shipment>;
  startsAt: Scalars['DateTime']['output'];
  status: ProposalBookingStatusCore;
  visit: Maybe<Visit>;
};

export type ScheduledEventFilter = {
  endsAt: Scalars['TzLessDateTime']['input'];
  instrumentIds: Array<Scalars['Int']['input']>;
  localContactIds: Array<Scalars['Int']['input']>;
  startsAt: Scalars['TzLessDateTime']['input'];
};

export type ScheduledEventResponseWrap = {
  error: Maybe<Scalars['String']['output']>;
  scheduledEvent: Maybe<ScheduledEvent>;
};

export type ScheduledEventWithRejection = Rejection | ScheduledEvent;

export type ScheduledEventsCoreFilter = {
  callId?: InputMaybe<Scalars['Int']['input']>;
  endsAfter?: InputMaybe<Scalars['DateTime']['input']>;
  endsBefore?: InputMaybe<Scalars['DateTime']['input']>;
  instrumentId?: InputMaybe<Scalars['Int']['input']>;
  overlaps?: InputMaybe<TimeSpan>;
  startsAfter?: InputMaybe<Scalars['DateTime']['input']>;
  startsBefore?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ScheduledEventsResponseWrap = {
  error: Maybe<Scalars['String']['output']>;
  scheduledEvents: Array<ScheduledEventWithRejection>;
};

export type SchedulerConfig = {
  authRedirect: Scalars['String']['output'];
};

export type SchedulerSuccessResponseWrap = {
  error: Maybe<Scalars['String']['output']>;
  isSuccess: Maybe<Scalars['Boolean']['output']>;
};

export type SelectionFromOptionsConfig = {
  isMultipleSelect: Scalars['Boolean']['output'];
  options: Array<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
  variant: Scalars['String']['output'];
};

export type SepMeetingDecision = {
  commentForManagement: Maybe<Scalars['String']['output']>;
  commentForUser: Maybe<Scalars['String']['output']>;
  proposalPk: Scalars['Int']['output'];
  rankOrder: Maybe<Scalars['Int']['output']>;
  recommendation: Maybe<ProposalEndStatus>;
  submitted: Scalars['Boolean']['output'];
  submittedBy: Maybe<Scalars['Int']['output']>;
};

export type Settings = {
  description: Maybe<Scalars['String']['output']>;
  id: SettingsId;
  settingsValue: Maybe<Scalars['String']['output']>;
};

export enum SettingsId {
  DATE_FORMAT = 'DATE_FORMAT',
  DATE_TIME_FORMAT = 'DATE_TIME_FORMAT',
  DEFAULT_INST_SCI_REVIEWER_FILTER = 'DEFAULT_INST_SCI_REVIEWER_FILTER',
  DEFAULT_INST_SCI_STATUS_FILTER = 'DEFAULT_INST_SCI_STATUS_FILTER',
  EXTERNAL_AUTH_LOGIN_URL = 'EXTERNAL_AUTH_LOGIN_URL',
  EXTERNAL_AUTH_LOGOUT_URL = 'EXTERNAL_AUTH_LOGOUT_URL',
  FEEDBACK_EXHAUST_DAYS = 'FEEDBACK_EXHAUST_DAYS',
  FEEDBACK_FREQUENCY_DAYS = 'FEEDBACK_FREQUENCY_DAYS',
  FEEDBACK_MAX_REQUESTS = 'FEEDBACK_MAX_REQUESTS',
  HEADER_LOGO_FILENAME = 'HEADER_LOGO_FILENAME',
  IDLE_TIMEOUT = 'IDLE_TIMEOUT',
  PALETTE_ERROR_MAIN = 'PALETTE_ERROR_MAIN',
  PALETTE_INFO_MAIN = 'PALETTE_INFO_MAIN',
  PALETTE_PRIMARY_ACCENT = 'PALETTE_PRIMARY_ACCENT',
  PALETTE_PRIMARY_CONTRAST = 'PALETTE_PRIMARY_CONTRAST',
  PALETTE_PRIMARY_DARK = 'PALETTE_PRIMARY_DARK',
  PALETTE_PRIMARY_LIGHT = 'PALETTE_PRIMARY_LIGHT',
  PALETTE_PRIMARY_MAIN = 'PALETTE_PRIMARY_MAIN',
  PALETTE_SECONDARY_CONTRAST = 'PALETTE_SECONDARY_CONTRAST',
  PALETTE_SECONDARY_DARK = 'PALETTE_SECONDARY_DARK',
  PALETTE_SECONDARY_LIGHT = 'PALETTE_SECONDARY_LIGHT',
  PALETTE_SECONDARY_MAIN = 'PALETTE_SECONDARY_MAIN',
  PALETTE_SUCCESS_MAIN = 'PALETTE_SUCCESS_MAIN',
  PALETTE_WARNING_MAIN = 'PALETTE_WARNING_MAIN',
  PROFILE_PAGE_LINK = 'PROFILE_PAGE_LINK',
  TIMEZONE = 'TIMEZONE'
}

export type Shipment = {
  created: Scalars['DateTime']['output'];
  creatorId: Scalars['Int']['output'];
  externalRef: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  proposal: Proposal;
  proposalPk: Scalars['Int']['output'];
  questionary: Questionary;
  questionaryId: Scalars['Int']['output'];
  samples: Array<Sample>;
  scheduledEventId: Scalars['Int']['output'];
  status: ShipmentStatus;
  title: Scalars['String']['output'];
};

export type ShipmentBasisConfig = {
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export enum ShipmentStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED'
}

export type ShipmentsFilter = {
  creatorId?: InputMaybe<Scalars['Int']['input']>;
  externalRef?: InputMaybe<Scalars['String']['input']>;
  proposalPk?: InputMaybe<Scalars['Int']['input']>;
  questionaryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  scheduledEventId?: InputMaybe<Scalars['Int']['input']>;
  shipmentIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  status?: InputMaybe<ShipmentStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SimpleLostTimeInput = {
  endsAt: Scalars['TzLessDateTime']['input'];
  newlyCreated?: InputMaybe<Scalars['Boolean']['input']>;
  scheduledEventId?: InputMaybe<Scalars['Int']['input']>;
  startsAt: Scalars['TzLessDateTime']['input'];
};

export type StatusChangingEvent = {
  proposalWorkflowConnectionId: Scalars['Int']['output'];
  statusChangingEvent: Scalars['String']['output'];
  statusChangingEventId: Scalars['Int']['output'];
};

export type SubTemplateConfig = {
  addEntryButtonLabel: Scalars['String']['output'];
  canCopy: Scalars['Boolean']['output'];
  copyButtonLabel: Maybe<Scalars['String']['output']>;
  isCompleteOnCopy: Maybe<Scalars['Boolean']['output']>;
  isMultipleCopySelect: Maybe<Scalars['Boolean']['output']>;
  maxEntries: Maybe<Scalars['Int']['output']>;
  minEntries: Maybe<Scalars['Int']['output']>;
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  templateCategory: Scalars['String']['output'];
  templateId: Maybe<Scalars['Int']['output']>;
};

export type SubmitProposalsReviewInput = {
  proposals: Array<ProposalPkWithReviewId>;
};

export type SubmitTechnicalReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Scalars['String']['input']>;
  proposalPk: Scalars['Int']['input'];
  publicComment?: InputMaybe<Scalars['String']['input']>;
  reviewerId: Scalars['Int']['input'];
  status?: InputMaybe<TechnicalReviewStatus>;
  submitted: Scalars['Boolean']['input'];
  timeAllocation?: InputMaybe<Scalars['Int']['input']>;
};

export type SubmitTechnicalReviewsInput = {
  technicalReviews: Array<SubmitTechnicalReviewInput>;
};

export type TechnicalReview = {
  comment: Maybe<Scalars['String']['output']>;
  files: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  proposal: Maybe<Proposal>;
  proposalPk: Scalars['Int']['output'];
  publicComment: Maybe<Scalars['String']['output']>;
  reviewer: Maybe<BasicUserDetails>;
  reviewerId: Scalars['Int']['output'];
  status: Maybe<TechnicalReviewStatus>;
  submitted: Scalars['Boolean']['output'];
  technicalReviewAssignee: Maybe<BasicUserDetails>;
  technicalReviewAssigneeId: Maybe<Scalars['Int']['output']>;
  timeAllocation: Maybe<Scalars['Int']['output']>;
};

export enum TechnicalReviewStatus {
  FEASIBLE = 'FEASIBLE',
  PARTIALLY_FEASIBLE = 'PARTIALLY_FEASIBLE',
  UNFEASIBLE = 'UNFEASIBLE'
}

export type Template = {
  complementaryQuestions: Array<Question>;
  description: Maybe<Scalars['String']['output']>;
  group: TemplateGroup;
  groupId: TemplateGroupId;
  isArchived: Scalars['Boolean']['output'];
  json: Scalars['String']['output'];
  name: Scalars['String']['output'];
  pdfTemplate: Maybe<PdfTemplate>;
  questionaryCount: Scalars['Int']['output'];
  steps: Array<TemplateStep>;
  templateId: Scalars['Int']['output'];
};

export type TemplateCategory = {
  categoryId: TemplateCategoryId;
  name: Scalars['String']['output'];
};

export enum TemplateCategoryId {
  FEEDBACK = 'FEEDBACK',
  GENERIC_TEMPLATE = 'GENERIC_TEMPLATE',
  PDF = 'PDF',
  PROPOSAL_QUESTIONARY = 'PROPOSAL_QUESTIONARY',
  SAMPLE_DECLARATION = 'SAMPLE_DECLARATION',
  SHIPMENT_DECLARATION = 'SHIPMENT_DECLARATION',
  VISIT_REGISTRATION = 'VISIT_REGISTRATION'
}

export type TemplateGroup = {
  categoryId: TemplateCategoryId;
  groupId: TemplateGroupId;
};

export enum TemplateGroupId {
  FEEDBACK = 'FEEDBACK',
  GENERIC_TEMPLATE = 'GENERIC_TEMPLATE',
  PDF_TEMPLATE = 'PDF_TEMPLATE',
  PROPOSAL = 'PROPOSAL',
  PROPOSAL_ESI = 'PROPOSAL_ESI',
  SAMPLE = 'SAMPLE',
  SAMPLE_ESI = 'SAMPLE_ESI',
  SHIPMENT = 'SHIPMENT',
  VISIT_REGISTRATION = 'VISIT_REGISTRATION'
}

export type TemplateStep = {
  fields: Array<QuestionTemplateRelation>;
  topic: Topic;
};

export type TemplateValidation = {
  exportDate: Scalars['DateTime']['output'];
  json: Scalars['String']['output'];
  validationData: TemplateValidationData;
  version: Scalars['String']['output'];
};

export type TemplateValidationData = {
  errors: Array<Scalars['String']['output']>;
  isValid: Scalars['Boolean']['output'];
  questionComparisons: Array<QuestionComparison>;
  subTemplateValidationData: Array<TemplateValidationData>;
};

export type TemplatesFilter = {
  group?: InputMaybe<TemplateGroupId>;
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  templateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type TextInputConfig = {
  htmlQuestion: Maybe<Scalars['String']['output']>;
  isCounterHidden: Scalars['Boolean']['output'];
  isHtmlQuestion: Scalars['Boolean']['output'];
  max: Maybe<Scalars['Int']['output']>;
  min: Maybe<Scalars['Int']['output']>;
  multiline: Scalars['Boolean']['output'];
  placeholder: Scalars['String']['output'];
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export type TimeSpan = {
  from?: InputMaybe<Scalars['DateTime']['input']>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TokenPayloadUnion = AuthJwtApiTokenPayload | AuthJwtPayload;

export type TokenResult = {
  isValid: Scalars['Boolean']['output'];
  payload: Maybe<TokenPayloadUnion>;
};

export type Topic = {
  id: Scalars['Int']['output'];
  isEnabled: Scalars['Boolean']['output'];
  sortOrder: Scalars['Int']['output'];
  templateId: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export enum TrainingStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  NONE = 'NONE'
}

export type Unit = {
  id: Scalars['String']['output'];
  quantity: Scalars['String']['output'];
  siConversionFormula: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  unit: Scalars['String']['output'];
};

export type UnitComparison = {
  conflictResolutionStrategy: ConflictResolutionStrategy;
  existingUnit: Maybe<Unit>;
  newUnit: Unit;
  status: QuestionComparisonStatus;
};

export type UnitsImportWithValidation = {
  errors: Array<Scalars['String']['output']>;
  exportDate: Scalars['DateTime']['output'];
  isValid: Scalars['Boolean']['output'];
  json: Scalars['String']['output'];
  unitComparisons: Array<UnitComparison>;
  version: Scalars['String']['output'];
};

export type UpdateApiAccessTokenInput = {
  accessPermissions: Scalars['String']['input'];
  accessTokenId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpdateCallInput = {
  allocationTimeUnit: AllocationTimeUnits;
  callEnded?: InputMaybe<Scalars['Int']['input']>;
  callEndedInternal?: InputMaybe<Scalars['Boolean']['input']>;
  callReviewEnded?: InputMaybe<Scalars['Int']['input']>;
  callSEPReviewEnded?: InputMaybe<Scalars['Int']['input']>;
  cycleComment: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  endCall: Scalars['DateTime']['input'];
  endCallInternal?: InputMaybe<Scalars['DateTime']['input']>;
  endCycle: Scalars['DateTime']['input'];
  endNotify: Scalars['DateTime']['input'];
  endReview: Scalars['DateTime']['input'];
  endSEPReview?: InputMaybe<Scalars['DateTime']['input']>;
  esiTemplateId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  pdfTemplateId?: InputMaybe<Scalars['Int']['input']>;
  proposalSequence?: InputMaybe<Scalars['Int']['input']>;
  proposalWorkflowId: Scalars['Int']['input'];
  referenceNumberFormat?: InputMaybe<Scalars['String']['input']>;
  seps?: InputMaybe<Array<Scalars['Int']['input']>>;
  shortCode: Scalars['String']['input'];
  startCall: Scalars['DateTime']['input'];
  startCycle: Scalars['DateTime']['input'];
  startNotify: Scalars['DateTime']['input'];
  startReview: Scalars['DateTime']['input'];
  startSEPReview?: InputMaybe<Scalars['DateTime']['input']>;
  submissionMessage?: InputMaybe<Scalars['String']['input']>;
  surveyComment: Scalars['String']['input'];
  templateId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFeaturesInput = {
  action: FeatureUpdateAction;
  featureIds: Array<FeatureId>;
};

export type UpdateLostTimeInput = {
  endsAt: Scalars['TzLessDateTime']['input'];
  id: Scalars['Int']['input'];
  startsAt: Scalars['TzLessDateTime']['input'];
};

export type UpdatePredefinedMessageInput = {
  id: Scalars['Int']['input'];
  key: Scalars['String']['input'];
  message: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateProposalStatusInput = {
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  shortCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProposalWorkflowInput = {
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type UpdateScheduledEventInput = {
  endsAt: Scalars['TzLessDateTime']['input'];
  localContact?: InputMaybe<Scalars['Int']['input']>;
  scheduledEventId: Scalars['Int']['input'];
  startsAt: Scalars['TzLessDateTime']['input'];
};

export type UpdateSettingsInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  settingsId: SettingsId;
  settingsValue?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  birthdate: Scalars['DateTime']['output'];
  created: Scalars['String']['output'];
  department: Scalars['String']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  firstname: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  instruments: Array<Instrument>;
  lastname: Scalars['String']['output'];
  middlename: Maybe<Scalars['String']['output']>;
  nationality: Maybe<Scalars['Int']['output']>;
  oauthRefreshToken: Maybe<Scalars['String']['output']>;
  oidcSub: Maybe<Scalars['String']['output']>;
  organisation: Scalars['Int']['output'];
  placeholder: Scalars['Boolean']['output'];
  position: Scalars['String']['output'];
  preferredname: Maybe<Scalars['String']['output']>;
  proposals: Array<Proposal>;
  reviews: Array<Review>;
  roles: Array<Role>;
  seps: Array<Sep>;
  telephone: Scalars['String']['output'];
  telephone_alt: Maybe<Scalars['String']['output']>;
  updated: Scalars['String']['output'];
  user_title: Scalars['String']['output'];
  username: Scalars['String']['output'];
};


export type UserProposalsArgs = {
  filter?: InputMaybe<UserProposalsFilter>;
};


export type UserReviewsArgs = {
  callId?: InputMaybe<Scalars['Int']['input']>;
  instrumentId?: InputMaybe<Scalars['Int']['input']>;
  reviewer?: InputMaybe<ReviewerFilter>;
  status?: InputMaybe<ReviewStatus>;
};

export type UserJwt = {
  created: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastname: Scalars['String']['output'];
  oidcSub: Maybe<Scalars['String']['output']>;
  organisation: Scalars['Float']['output'];
  placeholder: Scalars['Boolean']['output'];
  position: Scalars['String']['output'];
  preferredname: Maybe<Scalars['String']['output']>;
};

export type UserProposalsFilter = {
  finalStatus?: InputMaybe<ProposalEndStatus>;
  instrumentId?: InputMaybe<Scalars['Int']['input']>;
  managementDecisionSubmitted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserQueryResult = {
  totalCount: Scalars['Int']['output'];
  users: Array<BasicUserDetails>;
};

export enum UserRole {
  INSTRUMENT_SCIENTIST = 'INSTRUMENT_SCIENTIST',
  SAMPLE_SAFETY_REVIEWER = 'SAMPLE_SAFETY_REVIEWER',
  SEP_CHAIR = 'SEP_CHAIR',
  SEP_REVIEWER = 'SEP_REVIEWER',
  SEP_SECRETARY = 'SEP_SECRETARY',
  USER = 'USER',
  USER_OFFICER = 'USER_OFFICER'
}

export type Visit = {
  creatorId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  proposal: Proposal;
  proposalPk: Scalars['Int']['output'];
  registrations: Array<VisitRegistration>;
  samples: Array<Sample>;
  scheduledEventId: Scalars['Int']['output'];
  status: VisitStatus;
  teamLead: BasicUserDetails;
  teamLeadUserId: Scalars['Int']['output'];
};

export type VisitBasisConfig = {
  required: Scalars['Boolean']['output'];
  small_label: Scalars['String']['output'];
  tooltip: Scalars['String']['output'];
};

export type VisitRegistration = {
  endsAt: Maybe<Scalars['DateTime']['output']>;
  isRegistrationSubmitted: Scalars['Boolean']['output'];
  questionary: Questionary;
  registrationQuestionaryId: Maybe<Scalars['Int']['output']>;
  startsAt: Maybe<Scalars['DateTime']['output']>;
  trainingExpiryDate: Maybe<Scalars['DateTime']['output']>;
  trainingStatus: TrainingStatus;
  user: Maybe<BasicUserDetails>;
  userId: Scalars['Int']['output'];
  visitId: Scalars['Int']['output'];
};

export enum VisitStatus {
  ACCEPTED = 'ACCEPTED',
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED'
}

export type VisitsFilter = {
  creatorId?: InputMaybe<Scalars['Int']['input']>;
  proposalPk?: InputMaybe<Scalars['Int']['input']>;
  scheduledEventId?: InputMaybe<Scalars['Int']['input']>;
};

export type GetSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSettingsQuery = { settings: Array<{ id: SettingsId, settingsValue: string | null, description: string | null }> };

export type PrepareDbMutationVariables = Exact<{
  includeSeeds: Scalars['Boolean']['input'];
}>;


export type PrepareDbMutation = { prepareDB: string };

export type PrepareSchedulerDbMutationVariables = Exact<{
  includeSeeds: Scalars['Boolean']['input'];
}>;


export type PrepareSchedulerDbMutation = { resetSchedulerDb: string };

export type CheckTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type CheckTokenQuery = { checkToken: { isValid: boolean } };

export type AssignEquipmentToScheduledEventMutationVariables = Exact<{
  assignEquipmentsToScheduledEventInput: AssignEquipmentsToScheduledEventInput;
}>;


export type AssignEquipmentToScheduledEventMutation = { assignToScheduledEvents: boolean };

export type ConfirmEquipmentAssignmentMutationVariables = Exact<{
  confirmEquipmentAssignmentInput: ConfirmEquipmentAssignmentInput;
}>;


export type ConfirmEquipmentAssignmentMutation = { confirmEquipmentAssignment: { error: string | null, isSuccess: boolean | null } };

export type CreateEquipmentMutationVariables = Exact<{
  newEquipmentInput: EquipmentInput;
}>;


export type CreateEquipmentMutation = { createEquipment: { error: string | null, equipment: { id: number, createdAt: any, updatedAt: any, name: string, description: string | null, color: string | null, maintenanceStartsAt: string | null, maintenanceEndsAt: string | null, autoAccept: boolean } | null } };

export type DeleteEquipmentAssignmentMutationVariables = Exact<{
  deleteEquipmentAssignmentInput: DeleteEquipmentAssignmentInput;
}>;


export type DeleteEquipmentAssignmentMutation = { deleteEquipmentAssignment: boolean };

export type EquipmentFragment = { id: number, name: string, description: string | null, createdAt: any, updatedAt: any, color: string | null, maintenanceStartsAt: string | null, maintenanceEndsAt: string | null, autoAccept: boolean };

export type EquipmentWithStatusFragment = { id: number, name: string, description: string | null, color: string | null, maintenanceStartsAt: string | null, maintenanceEndsAt: string | null, status: EquipmentAssignmentStatus };

export type GetAvailableEquipmentsQueryVariables = Exact<{
  scheduledEventId: Scalars['Int']['input'];
}>;


export type GetAvailableEquipmentsQuery = { availableEquipments: Array<{ id: number, createdAt: any, updatedAt: any, name: string, description: string | null, color: string | null, maintenanceStartsAt: string | null, maintenanceEndsAt: string | null, autoAccept: boolean }> };

export type GetEquipmentQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetEquipmentQuery = { equipment: { id: number, createdAt: any, updatedAt: any, name: string, description: string | null, color: string | null, maintenanceStartsAt: string | null, maintenanceEndsAt: string | null, autoAccept: boolean, owner: { id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null } | null, equipmentResponsible: Array<{ id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null }> | null, equipmentInstruments: Array<{ id: number, name: string }> | null } | null };

export type GetEquipmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEquipmentsQuery = { equipments: Array<{ id: number, name: string, description: string | null, createdAt: any, updatedAt: any, color: string | null, maintenanceStartsAt: string | null, maintenanceEndsAt: string | null, autoAccept: boolean, equipmentInstruments: Array<{ id: number, name: string }> | null }> };

export type UpdateEquipmentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  updateEquipmentInput: EquipmentInput;
}>;


export type UpdateEquipmentMutation = { updateEquipment: { error: string | null, equipment: { id: number, name: string, description: string | null, color: string | null, maintenanceStartsAt: string | null, maintenanceEndsAt: string | null, autoAccept: boolean } | null } };

export type GetUserInstrumentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserInstrumentsQuery = { userInstruments: { totalCount: number, instruments: Array<{ id: number, name: string }> } | null };

export type AddLostTimeMutationVariables = Exact<{
  input: AddLostTimeInput;
}>;


export type AddLostTimeMutation = { addLostTime: { error: string | null, lostTime: { id: number, startsAt: string, endsAt: string, scheduledEventId: number } | null } };

export type DeleteLostTimeMutationVariables = Exact<{
  input: DeleteLostTimeInput;
}>;


export type DeleteLostTimeMutation = { deleteLostTime: { error: string | null, lostTime: { id: number, startsAt: string, endsAt: string, scheduledEventId: number } | null } };

export type GetProposalBookingLostTimesQueryVariables = Exact<{
  proposalBookingId: Scalars['Int']['input'];
  scheduledEventId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetProposalBookingLostTimesQuery = { proposalBookingLostTimes: Array<{ id: number, startsAt: string, scheduledEventId: number, endsAt: string }> };

export type UpdateLostTimeMutationVariables = Exact<{
  input: UpdateLostTimeInput;
}>;


export type UpdateLostTimeMutation = { updateLostTime: { error: string | null, lostTime: { id: number, startsAt: string, endsAt: string, scheduledEventId: number } | null } };

export type AddClientLogMutationVariables = Exact<{
  error: Scalars['String']['input'];
}>;


export type AddClientLogMutation = { addClientLog: boolean };

export type GetRefreshedTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type GetRefreshedTokenMutation = { token: string };

export type GetSchedulerConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSchedulerConfigQuery = { schedulerConfig: { authRedirect: string } };

export type ServerHealthCheckQueryVariables = Exact<{ [key: string]: never; }>;


export type ServerHealthCheckQuery = { healthCheck: { message: string, dbStats: Array<{ total: number, state: string | null }> } };

export type ActivateProposalBookingMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ActivateProposalBookingMutation = { activateProposalBooking: { error: string | null } };

export type FinalizeProposalBookingMutationVariables = Exact<{
  action: ProposalBookingFinalizeAction;
  id: Scalars['Int']['input'];
}>;


export type FinalizeProposalBookingMutation = { finalizeProposalBooking: { error: string | null } };

export type GetInstrumentProposalBookingsQueryVariables = Exact<{
  instrumentIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  filter: ProposalBookingScheduledEventFilter;
}>;


export type GetInstrumentProposalBookingsQuery = { instrumentProposalBookings: Array<{ id: number, createdAt: any, updatedAt: any, status: ProposalBookingStatusCore, allocatedTime: number, call: { id: number, shortCode: string, startCycle: any, endCycle: any, cycleComment: string } | null, proposal: { primaryKey: number, title: string, proposalId: string, proposer: { id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null } | null } | null, instrument: { id: number, name: string } | null, scheduledEvents: Array<{ id: number, startsAt: string, endsAt: string }> }> };

export type GetProposalBookingQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  filter: ProposalBookingScheduledEventFilter;
}>;


export type GetProposalBookingQuery = { proposalBooking: { id: number, createdAt: any, updatedAt: any, status: ProposalBookingStatusCore, allocatedTime: number, call: { id: number, shortCode: string, startCycle: any, endCycle: any, cycleComment: string } | null, proposal: { primaryKey: number, title: string, proposalId: string, proposer: { id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null } | null } | null, scheduledEvents: Array<{ id: number, startsAt: string, endsAt: string, bookingType: ScheduledEventBookingType, status: ProposalBookingStatusCore, description: string | null, scheduledBy: { id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null } | null, localContact: { id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null } | null }>, instrument: { id: number, name: string, beamlineManager: { id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null } | null, scientists: Array<{ id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null }> } | null } | null };

export type ReopenProposalBookingMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ReopenProposalBookingMutation = { reopenProposalBooking: { error: string | null } };

export type ActivateScheduledEventsMutationVariables = Exact<{
  input: ActivateScheduledEventsInput;
}>;


export type ActivateScheduledEventsMutation = { activateScheduledEvents: { error: string | null, scheduledEvents: Array<{ reason: string } | { id: number, startsAt: string, endsAt: string }> } };

export type CreateScheduledEventMutationVariables = Exact<{
  input: NewScheduledEventInput;
}>;


export type CreateScheduledEventMutation = { createScheduledEvent: { error: string | null, scheduledEvent: { id: number, startsAt: string, endsAt: string, bookingType: ScheduledEventBookingType, status: ProposalBookingStatusCore, description: string | null, scheduledBy: { id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null } | null } | null } };

export type DeleteScheduledEventsMutationVariables = Exact<{
  input: DeleteScheduledEventsInput;
}>;


export type DeleteScheduledEventsMutation = { deleteScheduledEvents: { error: string | null, scheduledEvents: Array<{ reason: string } | { id: number, startsAt: string, endsAt: string }> } };

export type FinalizeScheduledEventMutationVariables = Exact<{
  input: FinalizeScheduledEventInput;
}>;


export type FinalizeScheduledEventMutation = { finalizeScheduledEvent: { error: string | null } };

type ScheduledEventWithRejection_Rejection_Fragment = { reason: string };

type ScheduledEventWithRejection_ScheduledEvent_Fragment = { id: number, startsAt: string, endsAt: string };

export type ScheduledEventWithRejectionFragment = ScheduledEventWithRejection_Rejection_Fragment | ScheduledEventWithRejection_ScheduledEvent_Fragment;

export type GetEquipmentScheduledEventsQueryVariables = Exact<{
  equipmentIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  endsAt: Scalars['TzLessDateTime']['input'];
  startsAt: Scalars['TzLessDateTime']['input'];
}>;


export type GetEquipmentScheduledEventsQuery = { equipments: Array<{ id: number, name: string, color: string | null, events: Array<{ id: number, startsAt: string, endsAt: string, status: ProposalBookingStatusCore, equipmentAssignmentStatus: EquipmentAssignmentStatus | null, equipmentId: number | null, proposalBooking: { status: ProposalBookingStatusCore, proposal: { primaryKey: number, title: string, proposalId: string, proposer: { id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null } | null } | null } | null, instrument: { id: number, name: string } | null, scheduledBy: { id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null } | null, localContact: { id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null } | null }> | null }> };

export type GetProposalBookingScheduledEventsQueryVariables = Exact<{
  proposalBookingId: Scalars['Int']['input'];
}>;


export type GetProposalBookingScheduledEventsQuery = { proposalBookingScheduledEvents: Array<{ id: number, startsAt: string, endsAt: string, bookingType: ScheduledEventBookingType, status: ProposalBookingStatusCore, description: string | null, scheduledBy: { id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null } | null, localContact: { id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null } | null }> };

export type GetScheduledEventEquipmentsQueryVariables = Exact<{
  proposalBookingId: Scalars['Int']['input'];
  scheduledEventId: Scalars['Int']['input'];
}>;


export type GetScheduledEventEquipmentsQuery = { proposalBookingScheduledEvent: { equipments: Array<{ id: number, name: string, description: string | null, color: string | null, maintenanceStartsAt: string | null, maintenanceEndsAt: string | null, status: EquipmentAssignmentStatus }> } | null };

export type GetScheduledEventWithEquipmentsQueryVariables = Exact<{
  proposalBookingId: Scalars['Int']['input'];
  scheduledEventId: Scalars['Int']['input'];
  scheduledEventFilter: ProposalBookingScheduledEventFilter;
}>;


export type GetScheduledEventWithEquipmentsQuery = { proposalBookingScheduledEvent: { id: number, startsAt: string, endsAt: string, status: ProposalBookingStatusCore, proposalBooking: { id: number, status: ProposalBookingStatusCore, allocatedTime: number, scheduledEvents: Array<{ id: number, startsAt: string, endsAt: string }>, proposal: { primaryKey: number, title: string, proposalId: string, proposer: { id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null } | null } | null, call: { id: number, shortCode: string, startCycle: any, endCycle: any, cycleComment: string } | null } | null, scheduledBy: { id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null } | null, equipments: Array<{ id: number, name: string, description: string | null, color: string | null, maintenanceStartsAt: string | null, maintenanceEndsAt: string | null, status: EquipmentAssignmentStatus }> } | null };

export type GetScheduledEventsQueryVariables = Exact<{
  filter: ScheduledEventFilter;
  scheduledEventFilter: ProposalBookingScheduledEventFilter;
}>;


export type GetScheduledEventsQuery = { scheduledEvents: Array<{ id: number, bookingType: ScheduledEventBookingType, equipmentId: number | null, startsAt: string, endsAt: string, status: ProposalBookingStatusCore, description: string | null, color: string | null, instrument: { id: number, name: string } | null, scheduledBy: { id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null } | null, localContact: { id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null } | null, proposalBooking: { id: number, createdAt: any, updatedAt: any, status: ProposalBookingStatusCore, allocatedTime: number, proposal: { primaryKey: number, title: string, proposalId: string, proposer: { id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null } | null } | null, call: { id: number, shortCode: string, startCycle: any, endCycle: any, cycleComment: string } | null, scheduledEvents: Array<{ id: number, startsAt: string, endsAt: string }> } | null }> };

export type GetScheduledEventsWithEquipmentsQueryVariables = Exact<{
  proposalBookingId: Scalars['Int']['input'];
}>;


export type GetScheduledEventsWithEquipmentsQuery = { proposalBookingScheduledEvents: Array<{ id: number, startsAt: string, endsAt: string, status: ProposalBookingStatusCore, equipments: Array<{ id: number, name: string, description: string | null, color: string | null, maintenanceStartsAt: string | null, maintenanceEndsAt: string | null, status: EquipmentAssignmentStatus }> }> };

export type ReopenScheduledEventMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ReopenScheduledEventMutation = { reopenScheduledEvent: { error: string | null } };

export type UpdateScheduledEventMutationVariables = Exact<{
  input: UpdateScheduledEventInput;
}>;


export type UpdateScheduledEventMutation = { updateScheduledEvent: { error: string | null, scheduledEvent: { id: number, startsAt: string, endsAt: string, localContact: { id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null } | null } | null } };

export type BasicUserDetailsFragment = { id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null };

export type ExternalTokenLoginMutationVariables = Exact<{
  externalToken: Scalars['String']['input'];
  redirectUri: Scalars['String']['input'];
}>;


export type ExternalTokenLoginMutation = { externalTokenLogin: string };

export type GetMyRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyRolesQuery = { me: { firstname: string, lastname: string, roles: Array<{ id: number, shortCode: string, title: string }> } | null };

export type GetUsersQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userRole?: InputMaybe<UserRole>;
  subtractUsers?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type GetUsersQuery = { users: { totalCount: number, users: Array<{ id: number, firstname: string, lastname: string, organisation: string, position: string, placeholder: boolean | null }> } | null };

export type LogoutMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type LogoutMutation = { logout: string };

export type SelectRoleMutationVariables = Exact<{
  token: Scalars['String']['input'];
  selectedRoleId: Scalars['Int']['input'];
}>;


export type SelectRoleMutation = { selectRole: string };

export const EquipmentFragmentDoc = gql`
    fragment equipment on Equipment {
  id
  name
  description
  createdAt
  updatedAt
  color
  maintenanceStartsAt
  maintenanceEndsAt
  autoAccept
}
    `;
export const EquipmentWithStatusFragmentDoc = gql`
    fragment equipmentWithStatus on EquipmentWithAssignmentStatus {
  id
  name
  description
  color
  maintenanceStartsAt
  maintenanceEndsAt
  status
}
    `;
export const ScheduledEventWithRejectionFragmentDoc = gql`
    fragment scheduledEventWithRejection on ScheduledEventWithRejection {
  ... on Rejection {
    reason
  }
  ... on ScheduledEvent {
    id
    startsAt
    endsAt
  }
}
    `;
export const BasicUserDetailsFragmentDoc = gql`
    fragment basicUserDetails on BasicUserDetails {
  id
  firstname
  lastname
  organisation
  position
  placeholder
}
    `;
export const GetSettingsDocument = gql`
    query getSettings {
  settings {
    id
    settingsValue
    description
  }
}
    `;
export const PrepareDbDocument = gql`
    mutation prepareDB($includeSeeds: Boolean!) {
  prepareDB(includeSeeds: $includeSeeds)
}
    `;
export const PrepareSchedulerDbDocument = gql`
    mutation prepareSchedulerDB($includeSeeds: Boolean!) {
  resetSchedulerDb(includeSeeds: $includeSeeds)
}
    `;
export const CheckTokenDocument = gql`
    query checkToken($token: String!) {
  checkToken(token: $token) {
    isValid
  }
}
    `;
export const AssignEquipmentToScheduledEventDocument = gql`
    mutation assignEquipmentToScheduledEvent($assignEquipmentsToScheduledEventInput: AssignEquipmentsToScheduledEventInput!) {
  assignToScheduledEvents(
    assignEquipmentsToScheduledEventInput: $assignEquipmentsToScheduledEventInput
  )
}
    `;
export const ConfirmEquipmentAssignmentDocument = gql`
    mutation confirmEquipmentAssignment($confirmEquipmentAssignmentInput: ConfirmEquipmentAssignmentInput!) {
  confirmEquipmentAssignment(
    confirmEquipmentAssignmentInput: $confirmEquipmentAssignmentInput
  ) {
    error
    isSuccess
  }
}
    `;
export const CreateEquipmentDocument = gql`
    mutation createEquipment($newEquipmentInput: EquipmentInput!) {
  createEquipment(newEquipmentInput: $newEquipmentInput) {
    error
    equipment {
      id
      createdAt
      updatedAt
      name
      description
      color
      maintenanceStartsAt
      maintenanceEndsAt
      autoAccept
    }
  }
}
    `;
export const DeleteEquipmentAssignmentDocument = gql`
    mutation deleteEquipmentAssignment($deleteEquipmentAssignmentInput: DeleteEquipmentAssignmentInput!) {
  deleteEquipmentAssignment(
    deleteEquipmentAssignmentInput: $deleteEquipmentAssignmentInput
  )
}
    `;
export const GetAvailableEquipmentsDocument = gql`
    query getAvailableEquipments($scheduledEventId: Int!) {
  availableEquipments(scheduledEventId: $scheduledEventId) {
    id
    createdAt
    updatedAt
    name
    description
    color
    maintenanceStartsAt
    maintenanceEndsAt
    autoAccept
  }
}
    `;
export const GetEquipmentDocument = gql`
    query getEquipment($id: Int!) {
  equipment(id: $id) {
    id
    createdAt
    updatedAt
    name
    description
    color
    maintenanceStartsAt
    maintenanceEndsAt
    autoAccept
    owner {
      ...basicUserDetails
    }
    equipmentResponsible {
      ...basicUserDetails
    }
    equipmentInstruments {
      id
      name
    }
  }
}
    ${BasicUserDetailsFragmentDoc}`;
export const GetEquipmentsDocument = gql`
    query getEquipments {
  equipments {
    ...equipment
    equipmentInstruments {
      id
      name
    }
  }
}
    ${EquipmentFragmentDoc}`;
export const UpdateEquipmentDocument = gql`
    mutation updateEquipment($id: Int!, $updateEquipmentInput: EquipmentInput!) {
  updateEquipment(id: $id, updateEquipmentInput: $updateEquipmentInput) {
    error
    equipment {
      id
      name
      description
      color
      maintenanceStartsAt
      maintenanceEndsAt
      autoAccept
    }
  }
}
    `;
export const GetUserInstrumentsDocument = gql`
    query getUserInstruments {
  userInstruments {
    totalCount
    instruments {
      id
      name
    }
  }
}
    `;
export const AddLostTimeDocument = gql`
    mutation addLostTime($input: AddLostTimeInput!) {
  addLostTime(addLostTimeInput: $input) {
    error
    lostTime {
      id
      startsAt
      endsAt
      scheduledEventId
    }
  }
}
    `;
export const DeleteLostTimeDocument = gql`
    mutation deleteLostTime($input: DeleteLostTimeInput!) {
  deleteLostTime(deleteLostTimeInput: $input) {
    error
    lostTime {
      id
      startsAt
      endsAt
      scheduledEventId
    }
  }
}
    `;
export const GetProposalBookingLostTimesDocument = gql`
    query getProposalBookingLostTimes($proposalBookingId: Int!, $scheduledEventId: Int) {
  proposalBookingLostTimes(
    proposalBookingId: $proposalBookingId
    scheduledEventId: $scheduledEventId
  ) {
    id
    startsAt
    scheduledEventId
    endsAt
  }
}
    `;
export const UpdateLostTimeDocument = gql`
    mutation updateLostTime($input: UpdateLostTimeInput!) {
  updateLostTime(updateLostTimeInput: $input) {
    error
    lostTime {
      id
      startsAt
      endsAt
      scheduledEventId
    }
  }
}
    `;
export const AddClientLogDocument = gql`
    mutation addClientLog($error: String!) {
  addClientLog(error: $error)
}
    `;
export const GetRefreshedTokenDocument = gql`
    mutation getRefreshedToken($token: String!) {
  token(token: $token)
}
    `;
export const GetSchedulerConfigDocument = gql`
    query getSchedulerConfig {
  schedulerConfig {
    authRedirect
  }
}
    `;
export const ServerHealthCheckDocument = gql`
    query serverHealthCheck {
  healthCheck {
    message
    dbStats {
      total
      state
    }
  }
}
    `;
export const ActivateProposalBookingDocument = gql`
    mutation activateProposalBooking($id: Int!) {
  activateProposalBooking(id: $id) {
    error
  }
}
    `;
export const FinalizeProposalBookingDocument = gql`
    mutation finalizeProposalBooking($action: ProposalBookingFinalizeAction!, $id: Int!) {
  finalizeProposalBooking(action: $action, id: $id) {
    error
  }
}
    `;
export const GetInstrumentProposalBookingsDocument = gql`
    query getInstrumentProposalBookings($instrumentIds: [Int!]!, $filter: ProposalBookingScheduledEventFilter!) {
  instrumentProposalBookings(instrumentIds: $instrumentIds) {
    id
    call {
      id
      shortCode
      startCycle
      endCycle
      cycleComment
    }
    proposal {
      primaryKey
      title
      proposalId
      proposer {
        ...basicUserDetails
      }
    }
    createdAt
    updatedAt
    status
    allocatedTime
    instrument {
      id
      name
    }
    scheduledEvents(filter: $filter) {
      id
      startsAt
      endsAt
    }
  }
}
    ${BasicUserDetailsFragmentDoc}`;
export const GetProposalBookingDocument = gql`
    query getProposalBooking($id: Int!, $filter: ProposalBookingScheduledEventFilter!) {
  proposalBooking(id: $id) {
    id
    call {
      id
      shortCode
      startCycle
      endCycle
      cycleComment
    }
    proposal {
      primaryKey
      title
      proposalId
      proposer {
        ...basicUserDetails
      }
    }
    scheduledEvents(filter: $filter) {
      id
      startsAt
      endsAt
      bookingType
      scheduledBy {
        ...basicUserDetails
      }
      localContact {
        ...basicUserDetails
      }
      status
      description
    }
    instrument {
      id
      name
      beamlineManager {
        ...basicUserDetails
      }
      scientists {
        ...basicUserDetails
      }
    }
    createdAt
    updatedAt
    status
    allocatedTime
  }
}
    ${BasicUserDetailsFragmentDoc}`;
export const ReopenProposalBookingDocument = gql`
    mutation reopenProposalBooking($id: Int!) {
  reopenProposalBooking(id: $id) {
    error
  }
}
    `;
export const ActivateScheduledEventsDocument = gql`
    mutation activateScheduledEvents($input: ActivateScheduledEventsInput!) {
  activateScheduledEvents(activateScheduledEvents: $input) {
    error
    scheduledEvents {
      ...scheduledEventWithRejection
    }
  }
}
    ${ScheduledEventWithRejectionFragmentDoc}`;
export const CreateScheduledEventDocument = gql`
    mutation createScheduledEvent($input: NewScheduledEventInput!) {
  createScheduledEvent(newScheduledEvent: $input) {
    error
    scheduledEvent {
      id
      startsAt
      endsAt
      bookingType
      scheduledBy {
        ...basicUserDetails
      }
      status
      description
    }
  }
}
    ${BasicUserDetailsFragmentDoc}`;
export const DeleteScheduledEventsDocument = gql`
    mutation deleteScheduledEvents($input: DeleteScheduledEventsInput!) {
  deleteScheduledEvents(deleteScheduledEventsInput: $input) {
    error
    scheduledEvents {
      ...scheduledEventWithRejection
    }
  }
}
    ${ScheduledEventWithRejectionFragmentDoc}`;
export const FinalizeScheduledEventDocument = gql`
    mutation finalizeScheduledEvent($input: FinalizeScheduledEventInput!) {
  finalizeScheduledEvent(finalizeScheduledEvent: $input) {
    error
  }
}
    `;
export const GetEquipmentScheduledEventsDocument = gql`
    query getEquipmentScheduledEvents($equipmentIds: [Int!]!, $endsAt: TzLessDateTime!, $startsAt: TzLessDateTime!) {
  equipments(equipmentIds: $equipmentIds) {
    id
    name
    color
    events(startsAt: $startsAt, endsAt: $endsAt) {
      id
      startsAt
      endsAt
      status
      equipmentAssignmentStatus
      equipmentId
      proposalBooking {
        status
        proposal {
          primaryKey
          title
          proposalId
          proposer {
            ...basicUserDetails
          }
        }
      }
      instrument {
        id
        name
      }
      scheduledBy {
        ...basicUserDetails
      }
      localContact {
        ...basicUserDetails
      }
    }
  }
}
    ${BasicUserDetailsFragmentDoc}`;
export const GetProposalBookingScheduledEventsDocument = gql`
    query getProposalBookingScheduledEvents($proposalBookingId: Int!) {
  proposalBookingScheduledEvents(proposalBookingId: $proposalBookingId) {
    id
    startsAt
    endsAt
    bookingType
    scheduledBy {
      ...basicUserDetails
    }
    localContact {
      ...basicUserDetails
    }
    status
    description
  }
}
    ${BasicUserDetailsFragmentDoc}`;
export const GetScheduledEventEquipmentsDocument = gql`
    query getScheduledEventEquipments($proposalBookingId: Int!, $scheduledEventId: Int!) {
  proposalBookingScheduledEvent(
    proposalBookingId: $proposalBookingId
    scheduledEventId: $scheduledEventId
  ) {
    equipments {
      ...equipmentWithStatus
    }
  }
}
    ${EquipmentWithStatusFragmentDoc}`;
export const GetScheduledEventWithEquipmentsDocument = gql`
    query getScheduledEventWithEquipments($proposalBookingId: Int!, $scheduledEventId: Int!, $scheduledEventFilter: ProposalBookingScheduledEventFilter!) {
  proposalBookingScheduledEvent(
    proposalBookingId: $proposalBookingId
    scheduledEventId: $scheduledEventId
  ) {
    id
    startsAt
    endsAt
    status
    proposalBooking {
      id
      status
      allocatedTime
      scheduledEvents(filter: $scheduledEventFilter) {
        id
        startsAt
        endsAt
      }
      proposal {
        primaryKey
        title
        proposalId
        proposer {
          ...basicUserDetails
        }
      }
      call {
        id
        shortCode
        startCycle
        endCycle
        cycleComment
      }
    }
    scheduledBy {
      ...basicUserDetails
    }
    equipments {
      ...equipmentWithStatus
    }
  }
}
    ${BasicUserDetailsFragmentDoc}
${EquipmentWithStatusFragmentDoc}`;
export const GetScheduledEventsDocument = gql`
    query getScheduledEvents($filter: ScheduledEventFilter!, $scheduledEventFilter: ProposalBookingScheduledEventFilter!) {
  scheduledEvents(filter: $filter) {
    id
    bookingType
    equipmentId
    startsAt
    endsAt
    status
    description
    color
    instrument {
      id
      name
    }
    scheduledBy {
      ...basicUserDetails
    }
    localContact {
      ...basicUserDetails
    }
    proposalBooking {
      id
      createdAt
      updatedAt
      status
      allocatedTime
      proposal {
        primaryKey
        title
        proposalId
        proposer {
          ...basicUserDetails
        }
      }
      call {
        id
        shortCode
        startCycle
        endCycle
        cycleComment
      }
      scheduledEvents(filter: $scheduledEventFilter) {
        id
        startsAt
        endsAt
      }
    }
  }
}
    ${BasicUserDetailsFragmentDoc}`;
export const GetScheduledEventsWithEquipmentsDocument = gql`
    query getScheduledEventsWithEquipments($proposalBookingId: Int!) {
  proposalBookingScheduledEvents(proposalBookingId: $proposalBookingId) {
    id
    startsAt
    endsAt
    status
    equipments {
      ...equipmentWithStatus
    }
  }
}
    ${EquipmentWithStatusFragmentDoc}`;
export const ReopenScheduledEventDocument = gql`
    mutation reopenScheduledEvent($id: Int!) {
  reopenScheduledEvent(id: $id) {
    error
  }
}
    `;
export const UpdateScheduledEventDocument = gql`
    mutation updateScheduledEvent($input: UpdateScheduledEventInput!) {
  updateScheduledEvent(updateScheduledEvent: $input) {
    error
    scheduledEvent {
      id
      startsAt
      endsAt
      localContact {
        ...basicUserDetails
      }
    }
  }
}
    ${BasicUserDetailsFragmentDoc}`;
export const ExternalTokenLoginDocument = gql`
    mutation externalTokenLogin($externalToken: String!, $redirectUri: String!) {
  externalTokenLogin(externalToken: $externalToken, redirectUri: $redirectUri)
}
    `;
export const GetMyRolesDocument = gql`
    query getMyRoles {
  me {
    firstname
    lastname
    roles {
      id
      shortCode
      title
    }
  }
}
    `;
export const GetUsersDocument = gql`
    query getUsers($filter: String, $first: Int, $offset: Int, $userRole: UserRole, $subtractUsers: [Int!]) {
  users(
    filter: $filter
    first: $first
    offset: $offset
    userRole: $userRole
    subtractUsers: $subtractUsers
  ) {
    users {
      ...basicUserDetails
    }
    totalCount
  }
}
    ${BasicUserDetailsFragmentDoc}`;
export const LogoutDocument = gql`
    mutation logout($token: String!) {
  logout(token: $token)
}
    `;
export const SelectRoleDocument = gql`
    mutation selectRole($token: String!, $selectedRoleId: Int!) {
  selectRole(token: $token, selectedRoleId: $selectedRoleId)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getSettings(variables?: GetSettingsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetSettingsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSettingsQuery>(GetSettingsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSettings', 'query');
    },
    prepareDB(variables: PrepareDbMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PrepareDbMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PrepareDbMutation>(PrepareDbDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'prepareDB', 'mutation');
    },
    prepareSchedulerDB(variables: PrepareSchedulerDbMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PrepareSchedulerDbMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PrepareSchedulerDbMutation>(PrepareSchedulerDbDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'prepareSchedulerDB', 'mutation');
    },
    checkToken(variables: CheckTokenQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CheckTokenQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CheckTokenQuery>(CheckTokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'checkToken', 'query');
    },
    assignEquipmentToScheduledEvent(variables: AssignEquipmentToScheduledEventMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AssignEquipmentToScheduledEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AssignEquipmentToScheduledEventMutation>(AssignEquipmentToScheduledEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'assignEquipmentToScheduledEvent', 'mutation');
    },
    confirmEquipmentAssignment(variables: ConfirmEquipmentAssignmentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ConfirmEquipmentAssignmentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ConfirmEquipmentAssignmentMutation>(ConfirmEquipmentAssignmentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'confirmEquipmentAssignment', 'mutation');
    },
    createEquipment(variables: CreateEquipmentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateEquipmentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateEquipmentMutation>(CreateEquipmentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createEquipment', 'mutation');
    },
    deleteEquipmentAssignment(variables: DeleteEquipmentAssignmentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteEquipmentAssignmentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteEquipmentAssignmentMutation>(DeleteEquipmentAssignmentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteEquipmentAssignment', 'mutation');
    },
    getAvailableEquipments(variables: GetAvailableEquipmentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAvailableEquipmentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAvailableEquipmentsQuery>(GetAvailableEquipmentsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAvailableEquipments', 'query');
    },
    getEquipment(variables: GetEquipmentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetEquipmentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEquipmentQuery>(GetEquipmentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getEquipment', 'query');
    },
    getEquipments(variables?: GetEquipmentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetEquipmentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEquipmentsQuery>(GetEquipmentsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getEquipments', 'query');
    },
    updateEquipment(variables: UpdateEquipmentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateEquipmentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateEquipmentMutation>(UpdateEquipmentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateEquipment', 'mutation');
    },
    getUserInstruments(variables?: GetUserInstrumentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserInstrumentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserInstrumentsQuery>(GetUserInstrumentsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserInstruments', 'query');
    },
    addLostTime(variables: AddLostTimeMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddLostTimeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddLostTimeMutation>(AddLostTimeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addLostTime', 'mutation');
    },
    deleteLostTime(variables: DeleteLostTimeMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteLostTimeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteLostTimeMutation>(DeleteLostTimeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteLostTime', 'mutation');
    },
    getProposalBookingLostTimes(variables: GetProposalBookingLostTimesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProposalBookingLostTimesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProposalBookingLostTimesQuery>(GetProposalBookingLostTimesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProposalBookingLostTimes', 'query');
    },
    updateLostTime(variables: UpdateLostTimeMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateLostTimeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateLostTimeMutation>(UpdateLostTimeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateLostTime', 'mutation');
    },
    addClientLog(variables: AddClientLogMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddClientLogMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddClientLogMutation>(AddClientLogDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addClientLog', 'mutation');
    },
    getRefreshedToken(variables: GetRefreshedTokenMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetRefreshedTokenMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRefreshedTokenMutation>(GetRefreshedTokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getRefreshedToken', 'mutation');
    },
    getSchedulerConfig(variables?: GetSchedulerConfigQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetSchedulerConfigQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSchedulerConfigQuery>(GetSchedulerConfigDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSchedulerConfig', 'query');
    },
    serverHealthCheck(variables?: ServerHealthCheckQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ServerHealthCheckQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ServerHealthCheckQuery>(ServerHealthCheckDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'serverHealthCheck', 'query');
    },
    activateProposalBooking(variables: ActivateProposalBookingMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ActivateProposalBookingMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ActivateProposalBookingMutation>(ActivateProposalBookingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'activateProposalBooking', 'mutation');
    },
    finalizeProposalBooking(variables: FinalizeProposalBookingMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FinalizeProposalBookingMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<FinalizeProposalBookingMutation>(FinalizeProposalBookingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'finalizeProposalBooking', 'mutation');
    },
    getInstrumentProposalBookings(variables: GetInstrumentProposalBookingsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetInstrumentProposalBookingsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetInstrumentProposalBookingsQuery>(GetInstrumentProposalBookingsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getInstrumentProposalBookings', 'query');
    },
    getProposalBooking(variables: GetProposalBookingQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProposalBookingQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProposalBookingQuery>(GetProposalBookingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProposalBooking', 'query');
    },
    reopenProposalBooking(variables: ReopenProposalBookingMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ReopenProposalBookingMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ReopenProposalBookingMutation>(ReopenProposalBookingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'reopenProposalBooking', 'mutation');
    },
    activateScheduledEvents(variables: ActivateScheduledEventsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ActivateScheduledEventsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ActivateScheduledEventsMutation>(ActivateScheduledEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'activateScheduledEvents', 'mutation');
    },
    createScheduledEvent(variables: CreateScheduledEventMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateScheduledEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateScheduledEventMutation>(CreateScheduledEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createScheduledEvent', 'mutation');
    },
    deleteScheduledEvents(variables: DeleteScheduledEventsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteScheduledEventsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteScheduledEventsMutation>(DeleteScheduledEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteScheduledEvents', 'mutation');
    },
    finalizeScheduledEvent(variables: FinalizeScheduledEventMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FinalizeScheduledEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<FinalizeScheduledEventMutation>(FinalizeScheduledEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'finalizeScheduledEvent', 'mutation');
    },
    getEquipmentScheduledEvents(variables: GetEquipmentScheduledEventsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetEquipmentScheduledEventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEquipmentScheduledEventsQuery>(GetEquipmentScheduledEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getEquipmentScheduledEvents', 'query');
    },
    getProposalBookingScheduledEvents(variables: GetProposalBookingScheduledEventsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProposalBookingScheduledEventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProposalBookingScheduledEventsQuery>(GetProposalBookingScheduledEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProposalBookingScheduledEvents', 'query');
    },
    getScheduledEventEquipments(variables: GetScheduledEventEquipmentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetScheduledEventEquipmentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetScheduledEventEquipmentsQuery>(GetScheduledEventEquipmentsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getScheduledEventEquipments', 'query');
    },
    getScheduledEventWithEquipments(variables: GetScheduledEventWithEquipmentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetScheduledEventWithEquipmentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetScheduledEventWithEquipmentsQuery>(GetScheduledEventWithEquipmentsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getScheduledEventWithEquipments', 'query');
    },
    getScheduledEvents(variables: GetScheduledEventsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetScheduledEventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetScheduledEventsQuery>(GetScheduledEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getScheduledEvents', 'query');
    },
    getScheduledEventsWithEquipments(variables: GetScheduledEventsWithEquipmentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetScheduledEventsWithEquipmentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetScheduledEventsWithEquipmentsQuery>(GetScheduledEventsWithEquipmentsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getScheduledEventsWithEquipments', 'query');
    },
    reopenScheduledEvent(variables: ReopenScheduledEventMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ReopenScheduledEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ReopenScheduledEventMutation>(ReopenScheduledEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'reopenScheduledEvent', 'mutation');
    },
    updateScheduledEvent(variables: UpdateScheduledEventMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateScheduledEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateScheduledEventMutation>(UpdateScheduledEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateScheduledEvent', 'mutation');
    },
    externalTokenLogin(variables: ExternalTokenLoginMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ExternalTokenLoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ExternalTokenLoginMutation>(ExternalTokenLoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'externalTokenLogin', 'mutation');
    },
    getMyRoles(variables?: GetMyRolesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetMyRolesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMyRolesQuery>(GetMyRolesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMyRoles', 'query');
    },
    getUsers(variables?: GetUsersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUsersQuery>(GetUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUsers', 'query');
    },
    logout(variables: LogoutMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LogoutMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LogoutMutation>(LogoutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'logout', 'mutation');
    },
    selectRole(variables: SelectRoleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SelectRoleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SelectRoleMutation>(SelectRoleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'selectRole', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;