import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  IntStringDateBoolArray: any;
  /** DateTime without timezone in 'yyyy-MM-dd HH:mm:ss' format */
  TzLessDateTime: string;
};

export type AddNextStatusEventsToConnectionInput = {
  proposalWorkflowConnectionId: Scalars['Int'];
  nextStatusEvents: Array<Scalars['String']>;
};

export type AddProposalWorkflowStatusInput = {
  proposalWorkflowId: Scalars['Int'];
  sortOrder: Scalars['Int'];
  droppableGroupId: Scalars['String'];
  parentDroppableGroupId?: Maybe<Scalars['String']>;
  proposalStatusId: Scalars['Int'];
  nextProposalStatusId?: Maybe<Scalars['Int']>;
  prevProposalStatusId?: Maybe<Scalars['Int']>;
};

export type AddSepMembersRole = {
  userIDs: Array<Scalars['Int']>;
  roleID: UserRole;
  SEPID: Scalars['Int'];
};

export type AddUserRoleResponseWrap = {
  __typename?: 'AddUserRoleResponseWrap';
  error: Maybe<Scalars['String']>;
  success: Maybe<Scalars['Boolean']>;
};

export type Answer = {
  __typename?: 'Answer';
  question: Question;
  sortOrder: Scalars['Int'];
  topicId: Scalars['Int'];
  config: FieldConfig;
  dependency: Maybe<FieldDependency>;
  answerId: Maybe<Scalars['Int']>;
  value: Maybe<Scalars['IntStringDateBoolArray']>;
};

export type AnswerInput = {
  questionId: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type AssignInstrumentsToCallInput = {
  instrumentIds: Array<Scalars['Int']>;
  callId: Scalars['Int'];
};

export type AssignQuestionsToTopicResponseWrap = {
  __typename?: 'AssignQuestionsToTopicResponseWrap';
  error: Maybe<Scalars['String']>;
  result: Maybe<Array<Scalars['String']>>;
};

export type AuthJwtPayload = {
  __typename?: 'AuthJwtPayload';
  user: User;
  currentRole: Role;
  roles: Array<Role>;
};

export type BasicUserDetails = {
  __typename?: 'BasicUserDetails';
  id: Scalars['Int'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  organisation: Scalars['String'];
  position: Scalars['String'];
  placeholder: Maybe<Scalars['Boolean']>;
  created: Maybe<Scalars['DateTime']>;
};

export type BasicUserDetailsResponseWrap = {
  __typename?: 'BasicUserDetailsResponseWrap';
  error: Maybe<Scalars['String']>;
  user: Maybe<BasicUserDetails>;
};

export type BooleanConfig = {
  __typename?: 'BooleanConfig';
  small_label: Scalars['String'];
  required: Scalars['Boolean'];
  tooltip: Scalars['String'];
};

export type Call = {
  __typename?: 'Call';
  id: Scalars['Int'];
  shortCode: Scalars['String'];
  startCall: Scalars['DateTime'];
  endCall: Scalars['DateTime'];
  startReview: Scalars['DateTime'];
  endReview: Scalars['DateTime'];
  startSEPReview: Maybe<Scalars['DateTime']>;
  endSEPReview: Maybe<Scalars['DateTime']>;
  startNotify: Scalars['DateTime'];
  endNotify: Scalars['DateTime'];
  startCycle: Scalars['DateTime'];
  endCycle: Scalars['DateTime'];
  cycleComment: Scalars['String'];
  surveyComment: Scalars['String'];
  proposalWorkflowId: Maybe<Scalars['Int']>;
  templateId: Maybe<Scalars['Int']>;
  instruments: Array<InstrumentWithAvailabilityTime>;
  proposalWorkflow: Maybe<ProposalWorkflow>;
};

export type CallResponseWrap = {
  __typename?: 'CallResponseWrap';
  error: Maybe<Scalars['String']>;
  call: Maybe<Call>;
};

export type CallsFilter = {
  templateIds?: Maybe<Array<Scalars['Int']>>;
  isActive?: Maybe<Scalars['Boolean']>;
  isEnded?: Maybe<Scalars['Boolean']>;
  isReviewEnded?: Maybe<Scalars['Boolean']>;
  isSEPReviewEnded?: Maybe<Scalars['Boolean']>;
};

export type CreateCallInput = {
  shortCode: Scalars['String'];
  startCall: Scalars['DateTime'];
  endCall: Scalars['DateTime'];
  startReview: Scalars['DateTime'];
  endReview: Scalars['DateTime'];
  startSEPReview?: Maybe<Scalars['DateTime']>;
  endSEPReview?: Maybe<Scalars['DateTime']>;
  startNotify: Scalars['DateTime'];
  endNotify: Scalars['DateTime'];
  startCycle: Scalars['DateTime'];
  endCycle: Scalars['DateTime'];
  cycleComment: Scalars['String'];
  surveyComment: Scalars['String'];
  proposalWorkflowId?: Maybe<Scalars['Int']>;
  templateId?: Maybe<Scalars['Int']>;
};

export type CreateProposalStatusInput = {
  name: Scalars['String'];
  description: Scalars['String'];
};

export type CreateProposalWorkflowInput = {
  name: Scalars['String'];
  description: Scalars['String'];
};

export type CreateUserByEmailInviteResponseWrap = {
  __typename?: 'CreateUserByEmailInviteResponseWrap';
  error: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
};

export enum DataType {
  BOOLEAN = 'BOOLEAN',
  DATE = 'DATE',
  EMBELLISHMENT = 'EMBELLISHMENT',
  FILE_UPLOAD = 'FILE_UPLOAD',
  SELECTION_FROM_OPTIONS = 'SELECTION_FROM_OPTIONS',
  TEXT_INPUT = 'TEXT_INPUT',
  SAMPLE_DECLARATION = 'SAMPLE_DECLARATION',
  SAMPLE_BASIS = 'SAMPLE_BASIS',
  PROPOSAL_BASIS = 'PROPOSAL_BASIS'
}

export type DateConfig = {
  __typename?: 'DateConfig';
  small_label: Scalars['String'];
  required: Scalars['Boolean'];
  tooltip: Scalars['String'];
};


export type DeleteProposalWorkflowStatusInput = {
  proposalStatusId: Scalars['Int'];
  proposalWorkflowId: Scalars['Int'];
};

export type EmailVerificationResponseWrap = {
  __typename?: 'EmailVerificationResponseWrap';
  error: Maybe<Scalars['String']>;
  success: Maybe<Scalars['Boolean']>;
};

export type EmbellishmentConfig = {
  __typename?: 'EmbellishmentConfig';
  omitFromPdf: Scalars['Boolean'];
  html: Scalars['String'];
  plain: Scalars['String'];
};

export type Entry = {
  __typename?: 'Entry';
  id: Scalars['Int'];
  value: Scalars['String'];
};

export enum EvaluatorOperator {
  EQ = 'eq',
  NEQ = 'neq'
}

export enum Event {
  PROPOSAL_CREATED = 'PROPOSAL_CREATED',
  PROPOSAL_UPDATED = 'PROPOSAL_UPDATED',
  PROPOSAL_SUBMITTED = 'PROPOSAL_SUBMITTED',
  PROPOSAL_FEASIBLE = 'PROPOSAL_FEASIBLE',
  PROPOSAL_SEP_SELECTED = 'PROPOSAL_SEP_SELECTED',
  PROPOSAL_INSTRUMENT_SELECTED = 'PROPOSAL_INSTRUMENT_SELECTED',
  PROPOSAL_FEASIBILITY_REVIEW_SUBMITTED = 'PROPOSAL_FEASIBILITY_REVIEW_SUBMITTED',
  PROPOSAL_SAMPLE_REVIEW_SUBMITTED = 'PROPOSAL_SAMPLE_REVIEW_SUBMITTED',
  PROPOSAL_ALL_SEP_REVIEWERS_SELECTED = 'PROPOSAL_ALL_SEP_REVIEWERS_SELECTED',
  PROPOSAL_SEP_REVIEW_SUBMITTED = 'PROPOSAL_SEP_REVIEW_SUBMITTED',
  PROPOSAL_SEP_MEETING_SUBMITTED = 'PROPOSAL_SEP_MEETING_SUBMITTED',
  PROPOSAL_INSTRUMENT_SUBMITTED = 'PROPOSAL_INSTRUMENT_SUBMITTED',
  PROPOSAL_ACCEPTED = 'PROPOSAL_ACCEPTED',
  PROPOSAL_REJECTED = 'PROPOSAL_REJECTED',
  CALL_ENDED = 'CALL_ENDED',
  CALL_REVIEW_ENDED = 'CALL_REVIEW_ENDED',
  CALL_SEP_REVIEW_ENDED = 'CALL_SEP_REVIEW_ENDED',
  USER_CREATED = 'USER_CREATED',
  USER_UPDATED = 'USER_UPDATED',
  USER_ROLE_UPDATED = 'USER_ROLE_UPDATED',
  USER_DELETED = 'USER_DELETED',
  USER_PASSWORD_RESET_EMAIL = 'USER_PASSWORD_RESET_EMAIL',
  EMAIL_INVITE = 'EMAIL_INVITE',
  SEP_CREATED = 'SEP_CREATED',
  SEP_UPDATED = 'SEP_UPDATED',
  SEP_MEMBERS_ASSIGNED = 'SEP_MEMBERS_ASSIGNED',
  SEP_MEMBER_REMOVED = 'SEP_MEMBER_REMOVED',
  SEP_PROPOSAL_ASSIGNED = 'SEP_PROPOSAL_ASSIGNED',
  SEP_PROPOSAL_REMOVED = 'SEP_PROPOSAL_REMOVED',
  SEP_MEMBER_ASSIGNED_TO_PROPOSAL = 'SEP_MEMBER_ASSIGNED_TO_PROPOSAL',
  SEP_MEMBER_REMOVED_FROM_PROPOSAL = 'SEP_MEMBER_REMOVED_FROM_PROPOSAL',
  PROPOSAL_NOTIFIED = 'PROPOSAL_NOTIFIED'
}

export type EventLog = {
  __typename?: 'EventLog';
  id: Scalars['Int'];
  eventType: Scalars['String'];
  rowData: Scalars['String'];
  eventTStamp: Scalars['DateTime'];
  changedObjectId: Scalars['String'];
  changedBy: User;
};

export type FieldCondition = {
  __typename?: 'FieldCondition';
  condition: EvaluatorOperator;
  params: Scalars['IntStringDateBoolArray'];
};

export type FieldConditionInput = {
  condition: EvaluatorOperator;
  params: Scalars['String'];
};

export type FieldConfig = BooleanConfig | DateConfig | EmbellishmentConfig | FileUploadConfig | SelectionFromOptionsConfig | TextInputConfig | SampleBasisConfig | SubtemplateConfig | ProposalBasisConfig;

export type FieldDependency = {
  __typename?: 'FieldDependency';
  questionId: Scalars['String'];
  dependencyId: Scalars['String'];
  dependencyNaturalKey: Scalars['String'];
  condition: FieldCondition;
};

export type FieldDependencyInput = {
  dependencyId: Scalars['String'];
  condition: FieldConditionInput;
};

export type Fields = {
  __typename?: 'Fields';
  nationalities: Array<Entry>;
  countries: Array<Entry>;
};

export type FileMetadata = {
  __typename?: 'FileMetadata';
  originalFileName: Scalars['String'];
  mimeType: Scalars['String'];
  sizeInBytes: Scalars['Int'];
  createdDate: Scalars['DateTime'];
  fileId: Scalars['String'];
};

export type FileUploadConfig = {
  __typename?: 'FileUploadConfig';
  small_label: Scalars['String'];
  required: Scalars['Boolean'];
  tooltip: Scalars['String'];
  file_type: Array<Scalars['String']>;
  max_files: Scalars['Int'];
};

export type IndexWithGroupId = {
  index: Scalars['Int'];
  droppableId: Scalars['String'];
};

export type Institution = {
  __typename?: 'Institution';
  id: Scalars['Int'];
  name: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type InstitutionResponseWrap = {
  __typename?: 'InstitutionResponseWrap';
  error: Maybe<Scalars['String']>;
  institution: Maybe<Institution>;
};

export type InstitutionsFilter = {
  isVerified?: Maybe<Scalars['Boolean']>;
};

export type Instrument = {
  __typename?: 'Instrument';
  id: Scalars['Int'];
  name: Scalars['String'];
  shortCode: Scalars['String'];
  description: Scalars['String'];
  scientists: Array<BasicUserDetails>;
};

export type InstrumentResponseWrap = {
  __typename?: 'InstrumentResponseWrap';
  error: Maybe<Scalars['String']>;
  instrument: Maybe<Instrument>;
};

export type InstrumentsQueryResult = {
  __typename?: 'InstrumentsQueryResult';
  totalCount: Scalars['Int'];
  instruments: Array<Instrument>;
};

export type InstrumentWithAvailabilityTime = {
  __typename?: 'InstrumentWithAvailabilityTime';
  id: Scalars['Int'];
  name: Scalars['String'];
  shortCode: Scalars['String'];
  description: Scalars['String'];
  scientists: Array<BasicUserDetails>;
  availabilityTime: Maybe<Scalars['Int']>;
  submitted: Maybe<Scalars['Boolean']>;
};


export type MoveProposalWorkflowStatusInput = {
  from: IndexWithGroupId;
  to: IndexWithGroupId;
  proposalWorkflowId: Scalars['Int'];
};

export type NextStatusEvent = {
  __typename?: 'NextStatusEvent';
  nextStatusEventId: Scalars['Int'];
  proposalWorkflowConnectionId: Scalars['Int'];
  nextStatusEvent: Scalars['String'];
};

export type OrcIdInformation = {
  __typename?: 'OrcIDInformation';
  firstname: Maybe<Scalars['String']>;
  lastname: Maybe<Scalars['String']>;
  orcid: Maybe<Scalars['String']>;
  orcidHash: Maybe<Scalars['String']>;
  refreshToken: Maybe<Scalars['String']>;
  token: Maybe<Scalars['String']>;
};

export type Page = {
  __typename?: 'Page';
  id: Scalars['Int'];
  content: Maybe<Scalars['String']>;
};

export enum PageName {
  HOMEPAGE = 'HOMEPAGE',
  HELPPAGE = 'HELPPAGE',
  PRIVACYPAGE = 'PRIVACYPAGE',
  COOKIEPAGE = 'COOKIEPAGE',
  REVIEWPAGE = 'REVIEWPAGE'
}

export type PageResponseWrap = {
  __typename?: 'PageResponseWrap';
  error: Maybe<Scalars['String']>;
  page: Maybe<Page>;
};

export type PrepareDbResponseWrap = {
  __typename?: 'PrepareDBResponseWrap';
  error: Maybe<Scalars['String']>;
  log: Maybe<Scalars['String']>;
};

export type Proposal = {
  __typename?: 'Proposal';
  id: Scalars['Int'];
  title: Scalars['String'];
  abstract: Scalars['String'];
  statusId: Scalars['Int'];
  created: Scalars['DateTime'];
  updated: Scalars['DateTime'];
  shortCode: Scalars['String'];
  rankOrder: Maybe<Scalars['Int']>;
  finalStatus: Maybe<ProposalEndStatus>;
  callId: Scalars['Int'];
  questionaryId: Scalars['Int'];
  commentForUser: Maybe<Scalars['String']>;
  commentForManagement: Maybe<Scalars['String']>;
  notified: Scalars['Boolean'];
  submitted: Scalars['Boolean'];
  users: Array<BasicUserDetails>;
  proposer: BasicUserDetails;
  status: ProposalStatus;
  publicStatus: ProposalPublicStatus;
  reviews: Maybe<Array<Review>>;
  technicalReview: Maybe<TechnicalReview>;
  instrument: Maybe<Instrument>;
  sep: Maybe<Sep>;
  call: Maybe<Call>;
  questionary: Questionary;
};

export type ProposalBasisConfig = {
  __typename?: 'ProposalBasisConfig';
  tooltip: Scalars['String'];
};

export enum ProposalEndStatus {
  UNSET = 'UNSET',
  ACCEPTED = 'ACCEPTED',
  RESERVED = 'RESERVED',
  REJECTED = 'REJECTED'
}

export type ProposalNextStatusEventResponseWrap = {
  __typename?: 'ProposalNextStatusEventResponseWrap';
  error: Maybe<Scalars['String']>;
  nextStatusEvents: Maybe<Array<NextStatusEvent>>;
};

export enum ProposalPublicStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  UNKNOWN = 'unknown',
  RESERVED = 'reserved'
}

export type ProposalResponseWrap = {
  __typename?: 'ProposalResponseWrap';
  error: Maybe<Scalars['String']>;
  proposal: Maybe<Proposal>;
};

export type ProposalsFilter = {
  text?: Maybe<Scalars['String']>;
  templateIds?: Maybe<Array<Scalars['Int']>>;
  questionaryIds?: Maybe<Array<Scalars['Int']>>;
  callId?: Maybe<Scalars['Int']>;
  instrumentId?: Maybe<Scalars['Int']>;
};

export type ProposalsQueryResult = {
  __typename?: 'ProposalsQueryResult';
  totalCount: Scalars['Int'];
  proposals: Array<Proposal>;
};

export type ProposalStatus = {
  __typename?: 'ProposalStatus';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
};

export type ProposalStatusResponseWrap = {
  __typename?: 'ProposalStatusResponseWrap';
  error: Maybe<Scalars['String']>;
  proposalStatus: Maybe<ProposalStatus>;
};

export type ProposalsToInstrumentArgs = {
  id: Scalars['Int'];
  callId: Scalars['Int'];
};

export type ProposalTemplate = {
  __typename?: 'ProposalTemplate';
  templateId: Scalars['Int'];
  categoryId: TemplateCategoryId;
  name: Scalars['String'];
  description: Maybe<Scalars['String']>;
  isArchived: Scalars['Boolean'];
  steps: Array<TemplateStep>;
  complementaryQuestions: Array<Question>;
  proposalCount: Scalars['Int'];
  callCount: Scalars['Int'];
};

export type ProposalTemplatesFilter = {
  isArchived?: Maybe<Scalars['Boolean']>;
};

export type ProposalView = {
  __typename?: 'ProposalView';
  id: Scalars['Int'];
  title: Scalars['String'];
  statusId: Scalars['Int'];
  statusName: Scalars['String'];
  statusDescription: Scalars['String'];
  shortCode: Scalars['String'];
  rankOrder: Maybe<Scalars['Int']>;
  finalStatus: Maybe<ProposalEndStatus>;
  notified: Scalars['Boolean'];
  submitted: Scalars['Boolean'];
  timeAllocation: Maybe<Scalars['Int']>;
  technicalStatus: Maybe<TechnicalReviewStatus>;
  instrumentName: Maybe<Scalars['String']>;
  callShortCode: Maybe<Scalars['String']>;
  sepShortCode: Maybe<Scalars['String']>;
  reviewAverage: Maybe<Scalars['Float']>;
  reviewDeviation: Maybe<Scalars['Float']>;
  instrumentId: Maybe<Scalars['Int']>;
  callId: Scalars['Int'];
};

export type ProposalWorkflow = {
  __typename?: 'ProposalWorkflow';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  proposalWorkflowConnectionGroups: Array<ProposalWorkflowConnectionGroup>;
};

export type ProposalWorkflowConnection = {
  __typename?: 'ProposalWorkflowConnection';
  id: Scalars['Int'];
  sortOrder: Scalars['Int'];
  proposalWorkflowId: Scalars['Int'];
  proposalStatusId: Scalars['Int'];
  proposalStatus: ProposalStatus;
  nextProposalStatusId: Maybe<Scalars['Int']>;
  prevProposalStatusId: Maybe<Scalars['Int']>;
  droppableGroupId: Scalars['String'];
  nextStatusEvents: Array<NextStatusEvent>;
};

export type ProposalWorkflowConnectionGroup = {
  __typename?: 'ProposalWorkflowConnectionGroup';
  groupId: Scalars['String'];
  parentGroupId: Maybe<Scalars['String']>;
  connections: Array<ProposalWorkflowConnection>;
};

export type ProposalWorkflowConnectionResponseWrap = {
  __typename?: 'ProposalWorkflowConnectionResponseWrap';
  error: Maybe<Scalars['String']>;
  proposalWorkflowConnection: Maybe<ProposalWorkflowConnection>;
};

export type ProposalWorkflowResponseWrap = {
  __typename?: 'ProposalWorkflowResponseWrap';
  error: Maybe<Scalars['String']>;
  proposalWorkflow: Maybe<ProposalWorkflow>;
};

export type Question = {
  __typename?: 'Question';
  proposalQuestionId: Scalars['String'];
  categoryId: TemplateCategoryId;
  naturalKey: Scalars['String'];
  dataType: DataType;
  question: Scalars['String'];
  config: FieldConfig;
};

export type Questionary = {
  __typename?: 'Questionary';
  questionaryId: Scalars['Int'];
  templateId: Scalars['Int'];
  created: Scalars['DateTime'];
  steps: Array<QuestionaryStep>;
};

export type QuestionaryResponseWrap = {
  __typename?: 'QuestionaryResponseWrap';
  error: Maybe<Scalars['String']>;
  questionary: Maybe<Questionary>;
};

export type QuestionaryStep = {
  __typename?: 'QuestionaryStep';
  topic: Topic;
  isCompleted: Scalars['Boolean'];
  fields: Array<Answer>;
};

export type QuestionaryStepResponseWrap = {
  __typename?: 'QuestionaryStepResponseWrap';
  error: Maybe<Scalars['String']>;
  questionaryStep: Maybe<QuestionaryStep>;
};

export type QuestionResponseWrap = {
  __typename?: 'QuestionResponseWrap';
  error: Maybe<Scalars['String']>;
  question: Maybe<Question>;
};

export type QuestionTemplateRelation = {
  __typename?: 'QuestionTemplateRelation';
  question: Question;
  sortOrder: Scalars['Int'];
  topicId: Scalars['Int'];
  config: FieldConfig;
  dependency: Maybe<FieldDependency>;
};

export type RemoveAssignedInstrumentFromCallInput = {
  instrumentId: Scalars['Int'];
  callId: Scalars['Int'];
};

export type ResetPasswordEmailResponseWrap = {
  __typename?: 'ResetPasswordEmailResponseWrap';
  error: Maybe<Scalars['String']>;
  success: Maybe<Scalars['Boolean']>;
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['Int'];
  userID: Scalars['Int'];
  comment: Maybe<Scalars['String']>;
  grade: Maybe<Scalars['Int']>;
  status: ReviewStatus;
  sepID: Scalars['Int'];
  reviewer: Maybe<User>;
  proposal: Maybe<Proposal>;
};

export type ReviewResponseWrap = {
  __typename?: 'ReviewResponseWrap';
  error: Maybe<Scalars['String']>;
  review: Maybe<Review>;
};

export enum ReviewStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED'
}

export type Role = {
  __typename?: 'Role';
  id: Scalars['Int'];
  shortCode: Scalars['String'];
  title: Scalars['String'];
};

export type Sample = {
  __typename?: 'Sample';
  id: Scalars['Int'];
  title: Scalars['String'];
  creatorId: Scalars['Int'];
  questionaryId: Scalars['Int'];
  proposalId: Scalars['Int'];
  questionId: Scalars['String'];
  safetyStatus: SampleStatus;
  safetyComment: Scalars['String'];
  created: Scalars['DateTime'];
  questionary: Questionary;
};

export type SampleBasisConfig = {
  __typename?: 'SampleBasisConfig';
  titlePlaceholder: Scalars['String'];
};

export type SampleResponseWrap = {
  __typename?: 'SampleResponseWrap';
  error: Maybe<Scalars['String']>;
  sample: Maybe<Sample>;
};

export type SamplesFilter = {
  title?: Maybe<Scalars['String']>;
  creatorId?: Maybe<Scalars['Int']>;
  questionaryId?: Maybe<Scalars['Int']>;
  sampleIds?: Maybe<Array<Scalars['Int']>>;
  status?: Maybe<SampleStatus>;
  questionId?: Maybe<Scalars['String']>;
  proposalId?: Maybe<Scalars['Int']>;
};

export enum SampleStatus {
  PENDING_EVALUATION = 'PENDING_EVALUATION',
  LOW_RISK = 'LOW_RISK',
  ELEVATED_RISK = 'ELEVATED_RISK',
  HIGH_RISK = 'HIGH_RISK'
}

export type SelectionFromOptionsConfig = {
  __typename?: 'SelectionFromOptionsConfig';
  small_label: Scalars['String'];
  required: Scalars['Boolean'];
  tooltip: Scalars['String'];
  variant: Scalars['String'];
  options: Array<Scalars['String']>;
  isMultipleSelect: Scalars['Boolean'];
};

export type Sep = {
  __typename?: 'SEP';
  id: Scalars['Int'];
  code: Scalars['String'];
  description: Scalars['String'];
  numberRatingsRequired: Scalars['Float'];
  active: Scalars['Boolean'];
};

export type SepAssignment = {
  __typename?: 'SEPAssignment';
  proposalId: Scalars['Int'];
  sepMemberUserId: Maybe<Scalars['Int']>;
  sepId: Scalars['Int'];
  dateAssigned: Scalars['DateTime'];
  reassigned: Scalars['Boolean'];
  dateReassigned: Maybe<Scalars['DateTime']>;
  emailSent: Scalars['Boolean'];
  proposal: Proposal;
  roles: Array<Role>;
  user: Maybe<BasicUserDetails>;
  review: Review;
};

export type SepMember = {
  __typename?: 'SEPMember';
  roleUserId: Scalars['Int'];
  roleId: Scalars['Int'];
  userId: Scalars['Int'];
  sepId: Scalars['Int'];
  roles: Array<Role>;
  user: BasicUserDetails;
};

export type SepProposal = {
  __typename?: 'SEPProposal';
  proposalId: Scalars['Int'];
  sepId: Scalars['Int'];
  dateAssigned: Scalars['DateTime'];
  proposal: Proposal;
  assignments: Maybe<Array<SepAssignment>>;
};

export type SepResponseWrap = {
  __typename?: 'SEPResponseWrap';
  error: Maybe<Scalars['String']>;
  sep: Maybe<Sep>;
};

export type SePsQueryResult = {
  __typename?: 'SEPsQueryResult';
  totalCount: Scalars['Int'];
  seps: Array<Sep>;
};

export type SubtemplateConfig = {
  __typename?: 'SubtemplateConfig';
  maxEntries: Maybe<Scalars['Int']>;
  templateId: Scalars['Int'];
  templateCategory: Scalars['String'];
  addEntryButtonLabel: Scalars['String'];
  small_label: Scalars['String'];
  required: Scalars['Boolean'];
};

export type SuccessResponseWrap = {
  __typename?: 'SuccessResponseWrap';
  error: Maybe<Scalars['String']>;
  isSuccess: Maybe<Scalars['Boolean']>;
};

export type TechnicalReview = {
  __typename?: 'TechnicalReview';
  id: Scalars['Int'];
  proposalID: Scalars['Int'];
  comment: Maybe<Scalars['String']>;
  publicComment: Maybe<Scalars['String']>;
  timeAllocation: Maybe<Scalars['Int']>;
  status: Maybe<TechnicalReviewStatus>;
  proposal: Maybe<Proposal>;
};

export type TechnicalReviewResponseWrap = {
  __typename?: 'TechnicalReviewResponseWrap';
  error: Maybe<Scalars['String']>;
  technicalReview: Maybe<TechnicalReview>;
};

export enum TechnicalReviewStatus {
  FEASIBLE = 'FEASIBLE',
  PARTIALLY_FEASIBLE = 'PARTIALLY_FEASIBLE',
  UNFEASIBLE = 'UNFEASIBLE'
}

export type Template = {
  __typename?: 'Template';
  templateId: Scalars['Int'];
  categoryId: TemplateCategoryId;
  name: Scalars['String'];
  description: Maybe<Scalars['String']>;
  isArchived: Scalars['Boolean'];
  steps: Array<TemplateStep>;
  complementaryQuestions: Array<Question>;
};

export type TemplateCategory = {
  __typename?: 'TemplateCategory';
  categoryId: TemplateCategoryId;
  name: Scalars['String'];
};

export enum TemplateCategoryId {
  PROPOSAL_QUESTIONARY = 'PROPOSAL_QUESTIONARY',
  SAMPLE_DECLARATION = 'SAMPLE_DECLARATION'
}

export type TemplateResponseWrap = {
  __typename?: 'TemplateResponseWrap';
  error: Maybe<Scalars['String']>;
  template: Maybe<Template>;
};

export type TemplatesFilter = {
  isArchived?: Maybe<Scalars['Boolean']>;
  category?: Maybe<TemplateCategoryId>;
};

export type TemplateStep = {
  __typename?: 'TemplateStep';
  topic: Topic;
  fields: Array<QuestionTemplateRelation>;
};

export type TextInputConfig = {
  __typename?: 'TextInputConfig';
  small_label: Scalars['String'];
  required: Scalars['Boolean'];
  tooltip: Scalars['String'];
  min: Maybe<Scalars['Int']>;
  max: Maybe<Scalars['Int']>;
  multiline: Scalars['Boolean'];
  placeholder: Scalars['String'];
  htmlQuestion: Maybe<Scalars['String']>;
  isHtmlQuestion: Scalars['Boolean'];
  isCounterHidden: Scalars['Boolean'];
};

export type TokenResponseWrap = {
  __typename?: 'TokenResponseWrap';
  error: Maybe<Scalars['String']>;
  token: Maybe<Scalars['String']>;
};

export type TokenResult = {
  __typename?: 'TokenResult';
  isValid: Scalars['Boolean'];
  payload: Maybe<AuthJwtPayload>;
};

export type Topic = {
  __typename?: 'Topic';
  id: Scalars['Int'];
  title: Scalars['String'];
  templateId: Scalars['Int'];
  sortOrder: Scalars['Int'];
  isEnabled: Scalars['Boolean'];
};

export type TopicResponseWrap = {
  __typename?: 'TopicResponseWrap';
  error: Maybe<Scalars['String']>;
  topic: Maybe<Topic>;
};

export type UpdateAnswerResponseWrap = {
  __typename?: 'UpdateAnswerResponseWrap';
  error: Maybe<Scalars['String']>;
  questionId: Maybe<Scalars['String']>;
};

export type UpdateCallInput = {
  id: Scalars['Int'];
  shortCode: Scalars['String'];
  startCall: Scalars['DateTime'];
  endCall: Scalars['DateTime'];
  startReview: Scalars['DateTime'];
  endReview: Scalars['DateTime'];
  startSEPReview?: Maybe<Scalars['DateTime']>;
  endSEPReview?: Maybe<Scalars['DateTime']>;
  startNotify: Scalars['DateTime'];
  endNotify: Scalars['DateTime'];
  startCycle: Scalars['DateTime'];
  endCycle: Scalars['DateTime'];
  cycleComment: Scalars['String'];
  surveyComment: Scalars['String'];
  proposalWorkflowId?: Maybe<Scalars['Int']>;
  callEnded?: Maybe<Scalars['Int']>;
  callReviewEnded?: Maybe<Scalars['Int']>;
  callSEPReviewEnded?: Maybe<Scalars['Int']>;
  templateId?: Maybe<Scalars['Int']>;
};

export type UpdateProposalStatusInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
};

export type UpdateProposalWorkflowInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
};

export type UpdateTopicOrderResponseWrap = {
  __typename?: 'UpdateTopicOrderResponseWrap';
  error: Maybe<Scalars['String']>;
  topicOrder: Maybe<Array<Scalars['Int']>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  user_title: Scalars['String'];
  firstname: Scalars['String'];
  middlename: Maybe<Scalars['String']>;
  lastname: Scalars['String'];
  username: Scalars['String'];
  preferredname: Maybe<Scalars['String']>;
  orcid: Scalars['String'];
  refreshToken: Scalars['String'];
  gender: Scalars['String'];
  nationality: Maybe<Scalars['Int']>;
  birthdate: Scalars['String'];
  organisation: Scalars['Int'];
  department: Scalars['String'];
  position: Scalars['String'];
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  telephone: Scalars['String'];
  telephone_alt: Maybe<Scalars['String']>;
  placeholder: Scalars['Boolean'];
  created: Scalars['String'];
  updated: Scalars['String'];
  roles: Array<Role>;
  reviews: Array<Review>;
  proposals: Array<Proposal>;
  seps: Array<Sep>;
  instruments: Array<Instrument>;
};

export type UserQueryResult = {
  __typename?: 'UserQueryResult';
  users: Array<BasicUserDetails>;
  totalCount: Scalars['Int'];
};

export type UserResponseWrap = {
  __typename?: 'UserResponseWrap';
  error: Maybe<Scalars['String']>;
  user: Maybe<User>;
};

export enum UserRole {
  USER = 'USER',
  USER_OFFICER = 'USER_OFFICER',
  REVIEWER = 'REVIEWER',
  SEP_CHAIR = 'SEP_CHAIR',
  SEP_SECRETARY = 'SEP_SECRETARY',
  SEP_REVIEWER = 'SEP_REVIEWER',
  INSTRUMENT_SCIENTIST = 'INSTRUMENT_SCIENTIST',
  SAMPLE_SAFETY_REVIEWER = 'SAMPLE_SAFETY_REVIEWER'
}

export type BulkUpsertLostTimesInput = {
  proposalBookingId: Scalars['ID'];
  lostTimes: Array<SimpleLostTime>;
};

export type BulkUpsertScheduledEventsInput = {
  proposalBookingId: Scalars['ID'];
  scheduledEvents: Array<SimpleScheduledEvent>;
};

export type DbStat = {
  __typename?: 'DbStat';
  total: Scalars['Float'];
  state: Maybe<Scalars['String']>;
};

export type HealthStats = {
  __typename?: 'HealthStats';
  message: Scalars['String'];
  dbStats: Array<DbStat>;
};

export type LostTime = {
  __typename?: 'LostTime';
  id: Scalars['ID'];
  proposalBookingId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  startsAt: Scalars['TzLessDateTime'];
  endsAt: Scalars['TzLessDateTime'];
};

export type LostTimesResponseWrap = {
  __typename?: 'LostTimesResponseWrap';
  error: Maybe<Scalars['String']>;
  lostTime: Maybe<Array<LostTime>>;
};

export type NewScheduledEventInput = {
  bookingType: ScheduledEventBookingType;
  startsAt: Scalars['TzLessDateTime'];
  endsAt: Scalars['TzLessDateTime'];
  description?: Maybe<Scalars['String']>;
  instrumentId: Scalars['ID'];
};

export type ProposalBooking = {
  __typename?: 'ProposalBooking';
  id: Scalars['ID'];
  call: Call;
  proposal: Proposal;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  status: ProposalBookingStatus;
  allocatedTime: Scalars['Int'];
  instrument: Instrument;
};

export enum ProposalBookingFinalizeAction {
  CLOSE = 'CLOSE',
  RESTART = 'RESTART'
}

export type ProposalBookingResponseWrap = {
  __typename?: 'ProposalBookingResponseWrap';
  error: Maybe<Scalars['String']>;
  proposalBooking: Maybe<ProposalBooking>;
};

export enum ProposalBookingStatus {
  DRAFT = 'DRAFT',
  BOOKED = 'BOOKED',
  CLOSED = 'CLOSED'
}

export type ScheduledEvent = {
  __typename?: 'ScheduledEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  bookingType: ScheduledEventBookingType;
  startsAt: Scalars['TzLessDateTime'];
  endsAt: Scalars['TzLessDateTime'];
  scheduledBy: User;
  description: Maybe<Scalars['String']>;
  instrument: Instrument;
};

export enum ScheduledEventBookingType {
  USER_OPERATIONS = 'USER_OPERATIONS',
  MAINTENANCE = 'MAINTENANCE',
  SHUTDOWN = 'SHUTDOWN',
  COMMISSIONING = 'COMMISSIONING'
}

export type ScheduledEventFilter = {
  startsAt?: Maybe<Scalars['TzLessDateTime']>;
  endsAt?: Maybe<Scalars['TzLessDateTime']>;
  instrumentId?: Maybe<Scalars['ID']>;
};

export type ScheduledEventResponseWrap = {
  __typename?: 'ScheduledEventResponseWrap';
  error: Maybe<Scalars['String']>;
  scheduledEvent: Maybe<ScheduledEvent>;
};

export type ScheduledEventsResponseWrap = {
  __typename?: 'ScheduledEventsResponseWrap';
  error: Maybe<Scalars['String']>;
  scheduledEvent: Maybe<Array<ScheduledEvent>>;
};

export type SchedulerConfig = {
  __typename?: 'SchedulerConfig';
  authRedirect: Scalars['String'];
};

export type SimpleLostTime = {
  id: Scalars['ID'];
  startsAt: Scalars['TzLessDateTime'];
  endsAt: Scalars['TzLessDateTime'];
};

export type SimpleScheduledEvent = {
  id: Scalars['ID'];
  startsAt: Scalars['TzLessDateTime'];
  endsAt: Scalars['TzLessDateTime'];
};


export type Query = {
  __typename?: 'Query';
  calls: Maybe<Array<Call>>;
  proposals: Maybe<ProposalsQueryResult>;
  instrumentScientistProposals: Maybe<ProposalsQueryResult>;
  templates: Maybe<Array<Template>>;
  basicUserDetails: Maybe<BasicUserDetails>;
  blankQuestionarySteps: Maybe<Array<QuestionaryStep>>;
  call: Maybe<Call>;
  checkEmailExist: Maybe<Scalars['Boolean']>;
  eventLogs: Maybe<Array<EventLog>>;
  fileMetadata: Maybe<Array<FileMetadata>>;
  getFields: Maybe<Fields>;
  getOrcIDInformation: Maybe<OrcIdInformation>;
  getPageContent: Maybe<Scalars['String']>;
  institutions: Maybe<Array<Institution>>;
  instrument: Maybe<Instrument>;
  instruments: Maybe<InstrumentsQueryResult>;
  instrumentsBySep: Maybe<Array<InstrumentWithAvailabilityTime>>;
  userInstruments: Maybe<InstrumentsQueryResult>;
  instrumentScientistHasInstrument: Maybe<Scalars['Boolean']>;
  instrumentScientistHasAccess: Maybe<Scalars['Boolean']>;
  isNaturalKeyPresent: Maybe<Scalars['Boolean']>;
  proposal: Maybe<Proposal>;
  proposalStatus: Maybe<ProposalStatus>;
  proposalStatuses: Maybe<Array<ProposalStatus>>;
  proposalsView: Maybe<Array<ProposalView>>;
  proposalTemplates: Maybe<Array<ProposalTemplate>>;
  proposalWorkflow: Maybe<ProposalWorkflow>;
  proposalWorkflows: Maybe<Array<ProposalWorkflow>>;
  proposalEvents: Maybe<Array<Event>>;
  questionary: Maybe<Questionary>;
  review: Maybe<Review>;
  roles: Maybe<Array<Role>>;
  sample: Maybe<Sample>;
  samplesByCallId: Maybe<Array<Sample>>;
  samples: Maybe<Array<Sample>>;
  sep: Maybe<Sep>;
  sepMembers: Maybe<Array<SepMember>>;
  sepProposals: Maybe<Array<SepProposal>>;
  sepProposalsByInstrument: Maybe<Array<SepProposal>>;
  seps: Maybe<SePsQueryResult>;
  version: Scalars['String'];
  factoryVersion: Scalars['String'];
  templateCategories: Maybe<Array<TemplateCategory>>;
  template: Maybe<Template>;
  checkToken: TokenResult;
  user: Maybe<User>;
  me: Maybe<User>;
  users: Maybe<UserQueryResult>;
  scheduledEvents: Array<ScheduledEvent>;
  scheduledEvent: Maybe<ScheduledEvent>;
  proposalBookingScheduledEvents: Array<ScheduledEvent>;
  proposalBookingLostTimes: Array<LostTime>;
  instrumentProposalBookings: Array<ProposalBooking>;
  proposalBooking: Maybe<ProposalBooking>;
  healthCheck: HealthStats;
  schedulerConfig: SchedulerConfig;
  schedulerVersion: Scalars['String'];
};


export type QueryCallsArgs = {
  filter?: Maybe<CallsFilter>;
};


export type QueryProposalsArgs = {
  filter?: Maybe<ProposalsFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryInstrumentScientistProposalsArgs = {
  filter?: Maybe<ProposalsFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryTemplatesArgs = {
  filter?: Maybe<TemplatesFilter>;
};


export type QueryBasicUserDetailsArgs = {
  id: Scalars['Int'];
};


export type QueryBlankQuestionaryStepsArgs = {
  templateId: Scalars['Int'];
};


export type QueryCallArgs = {
  id: Scalars['Int'];
};


export type QueryCheckEmailExistArgs = {
  email: Scalars['String'];
};


export type QueryEventLogsArgs = {
  changedObjectId: Scalars['String'];
  eventType: Scalars['String'];
};


export type QueryFileMetadataArgs = {
  fileIds: Array<Scalars['String']>;
};


export type QueryGetOrcIdInformationArgs = {
  authorizationCode: Scalars['String'];
};


export type QueryGetPageContentArgs = {
  id: PageName;
};


export type QueryInstitutionsArgs = {
  filter?: Maybe<InstitutionsFilter>;
};


export type QueryInstrumentArgs = {
  instrumentId: Scalars['Int'];
};


export type QueryInstrumentsArgs = {
  callIds?: Maybe<Array<Scalars['Int']>>;
};


export type QueryInstrumentsBySepArgs = {
  callId: Scalars['Int'];
  sepId: Scalars['Int'];
};


export type QueryInstrumentScientistHasInstrumentArgs = {
  instrumentId: Scalars['Int'];
};


export type QueryInstrumentScientistHasAccessArgs = {
  proposalId: Scalars['Int'];
  instrumentId: Scalars['Int'];
};


export type QueryIsNaturalKeyPresentArgs = {
  naturalKey: Scalars['String'];
};


export type QueryProposalArgs = {
  id: Scalars['Int'];
};


export type QueryProposalStatusArgs = {
  id: Scalars['Int'];
};


export type QueryProposalsViewArgs = {
  filter?: Maybe<ProposalsFilter>;
};


export type QueryProposalTemplatesArgs = {
  filter?: Maybe<ProposalTemplatesFilter>;
};


export type QueryProposalWorkflowArgs = {
  id: Scalars['Int'];
};


export type QueryQuestionaryArgs = {
  questionaryId: Scalars['Int'];
};


export type QueryReviewArgs = {
  id: Scalars['Int'];
};


export type QuerySampleArgs = {
  sampleId: Scalars['Int'];
};


export type QuerySamplesByCallIdArgs = {
  callId: Scalars['Int'];
};


export type QuerySamplesArgs = {
  filter?: Maybe<SamplesFilter>;
};


export type QuerySepArgs = {
  id: Scalars['Int'];
};


export type QuerySepMembersArgs = {
  sepId: Scalars['Int'];
};


export type QuerySepProposalsArgs = {
  callId: Scalars['Int'];
  sepId: Scalars['Int'];
};


export type QuerySepProposalsByInstrumentArgs = {
  callId: Scalars['Int'];
  instrumentId: Scalars['Int'];
  sepId: Scalars['Int'];
};


export type QuerySepsArgs = {
  active?: Maybe<Scalars['Boolean']>;
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryTemplateArgs = {
  templateId: Scalars['Int'];
};


export type QueryCheckTokenArgs = {
  token: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUsersArgs = {
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  userRole?: Maybe<UserRole>;
  subtractUsers?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type QueryScheduledEventsArgs = {
  filter: ScheduledEventFilter;
};


export type QueryScheduledEventArgs = {
  id: Scalars['ID'];
};


export type QueryProposalBookingScheduledEventsArgs = {
  proposalBookingId: Scalars['ID'];
};


export type QueryProposalBookingLostTimesArgs = {
  proposalBookingId: Scalars['ID'];
};


export type QueryInstrumentProposalBookingsArgs = {
  instrumentId: Scalars['ID'];
};


export type QueryProposalBookingArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createInstitution: InstitutionResponseWrap;
  updateInstitution: InstitutionResponseWrap;
  createCall: CallResponseWrap;
  updateCall: CallResponseWrap;
  assignInstrumentsToCall: CallResponseWrap;
  removeAssignedInstrumentFromCall: CallResponseWrap;
  assignProposalsToInstrument: SuccessResponseWrap;
  removeProposalFromInstrument: SuccessResponseWrap;
  assignScientistsToInstrument: SuccessResponseWrap;
  removeScientistFromInstrument: SuccessResponseWrap;
  createInstrument: InstrumentResponseWrap;
  updateInstrument: InstrumentResponseWrap;
  setInstrumentAvailabilityTime: SuccessResponseWrap;
  submitInstrument: SuccessResponseWrap;
  administrationProposal: ProposalResponseWrap;
  updateProposal: ProposalResponseWrap;
  addNextStatusEventsToConnection: ProposalNextStatusEventResponseWrap;
  addProposalWorkflowStatus: ProposalWorkflowConnectionResponseWrap;
  createProposalStatus: ProposalStatusResponseWrap;
  createProposalWorkflow: ProposalWorkflowResponseWrap;
  deleteProposalWorkflowStatus: SuccessResponseWrap;
  moveProposalWorkflowStatus: ProposalWorkflowConnectionResponseWrap;
  updateProposalStatus: ProposalStatusResponseWrap;
  updateProposalWorkflow: ProposalWorkflowResponseWrap;
  answerTopic: QuestionaryStepResponseWrap;
  createQuestionary: QuestionaryResponseWrap;
  updateAnswer: UpdateAnswerResponseWrap;
  addReview: ReviewResponseWrap;
  addTechnicalReview: TechnicalReviewResponseWrap;
  addUserForReview: ReviewResponseWrap;
  createSample: SampleResponseWrap;
  assignChairOrSecretary: SepResponseWrap;
  assignMembers: SepResponseWrap;
  removeMember: SepResponseWrap;
  assignMemberToSEPProposal: SepResponseWrap;
  removeMemberFromSEPProposal: SepResponseWrap;
  assignProposalToSEP: SuccessResponseWrap;
  removeProposalAssignment: SepResponseWrap;
  createSEP: SepResponseWrap;
  updateSEP: SepResponseWrap;
  createQuestion: QuestionResponseWrap;
  createQuestionTemplateRelation: TemplateResponseWrap;
  createTemplate: TemplateResponseWrap;
  createTopic: TemplateResponseWrap;
  deleteQuestionTemplateRelation: TemplateResponseWrap;
  updateQuestion: QuestionResponseWrap;
  updateQuestionTemplateRelation: TemplateResponseWrap;
  updateTemplate: TemplateResponseWrap;
  updateTopic: TopicResponseWrap;
  addUserRole: AddUserRoleResponseWrap;
  createUserByEmailInvite: CreateUserByEmailInviteResponseWrap;
  createUser: UserResponseWrap;
  updateUser: UserResponseWrap;
  updateUserRoles: UserResponseWrap;
  addClientLog: SuccessResponseWrap;
  applyPatches: PrepareDbResponseWrap;
  assignQuestionsToTopic: AssignQuestionsToTopicResponseWrap;
  cloneSample: SampleResponseWrap;
  cloneTemplate: TemplateResponseWrap;
  createProposal: ProposalResponseWrap;
  deleteInstitution: InstitutionResponseWrap;
  deleteInstrument: InstrumentResponseWrap;
  deleteProposal: ProposalResponseWrap;
  deleteQuestion: QuestionResponseWrap;
  deleteSample: SampleResponseWrap;
  deleteTemplate: TemplateResponseWrap;
  deleteTopic: TemplateResponseWrap;
  deleteUser: UserResponseWrap;
  emailVerification: EmailVerificationResponseWrap;
  getTokenForUser: TokenResponseWrap;
  login: TokenResponseWrap;
  notifyProposal: ProposalResponseWrap;
  prepareDB: PrepareDbResponseWrap;
  removeUserForReview: ReviewResponseWrap;
  resetPasswordEmail: ResetPasswordEmailResponseWrap;
  resetPassword: BasicUserDetailsResponseWrap;
  setPageContent: PageResponseWrap;
  deleteProposalStatus: ProposalStatusResponseWrap;
  deleteProposalWorkflow: ProposalWorkflowResponseWrap;
  submitProposal: ProposalResponseWrap;
  token: TokenResponseWrap;
  selectRole: TokenResponseWrap;
  updatePassword: BasicUserDetailsResponseWrap;
  updateSample: SampleResponseWrap;
  updateTopicOrder: UpdateTopicOrderResponseWrap;
  bulkUpsertLostTimes: LostTimesResponseWrap;
  createScheduledEvent: ScheduledEventResponseWrap;
  bulkUpsertScheduledEvents: ScheduledEventsResponseWrap;
  finalizeProposalBooking: ProposalBookingResponseWrap;
  activateProposalBooking: ProposalBookingResponseWrap;
};


export type MutationCreateInstitutionArgs = {
  name: Scalars['String'];
  verified: Scalars['Boolean'];
};


export type MutationUpdateInstitutionArgs = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateCallArgs = {
  createCallInput: CreateCallInput;
};


export type MutationUpdateCallArgs = {
  updateCallInput: UpdateCallInput;
};


export type MutationAssignInstrumentsToCallArgs = {
  assignInstrumentsToCallInput: AssignInstrumentsToCallInput;
};


export type MutationRemoveAssignedInstrumentFromCallArgs = {
  removeAssignedInstrumentFromCallInput: RemoveAssignedInstrumentFromCallInput;
};


export type MutationAssignProposalsToInstrumentArgs = {
  proposals: Array<ProposalsToInstrumentArgs>;
  instrumentId: Scalars['Int'];
};


export type MutationRemoveProposalFromInstrumentArgs = {
  proposalId: Scalars['Int'];
  instrumentId: Scalars['Int'];
};


export type MutationAssignScientistsToInstrumentArgs = {
  scientistIds: Array<Scalars['Int']>;
  instrumentId: Scalars['Int'];
};


export type MutationRemoveScientistFromInstrumentArgs = {
  scientistId: Scalars['Int'];
  instrumentId: Scalars['Int'];
};


export type MutationCreateInstrumentArgs = {
  name: Scalars['String'];
  shortCode: Scalars['String'];
  description: Scalars['String'];
};


export type MutationUpdateInstrumentArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
  shortCode: Scalars['String'];
  description: Scalars['String'];
};


export type MutationSetInstrumentAvailabilityTimeArgs = {
  instrumentId: Scalars['Int'];
  callId: Scalars['Int'];
  availabilityTime: Scalars['Int'];
};


export type MutationSubmitInstrumentArgs = {
  instrumentId: Scalars['Int'];
  callId: Scalars['Int'];
  sepId: Scalars['Int'];
};


export type MutationAdministrationProposalArgs = {
  id: Scalars['Int'];
  commentForUser?: Maybe<Scalars['String']>;
  commentForManagement?: Maybe<Scalars['String']>;
  finalStatus?: Maybe<ProposalEndStatus>;
  statusId?: Maybe<Scalars['Int']>;
  rankOrder?: Maybe<Scalars['Int']>;
};


export type MutationUpdateProposalArgs = {
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  abstract?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Scalars['Int']>>;
  proposerId?: Maybe<Scalars['Int']>;
};


export type MutationAddNextStatusEventsToConnectionArgs = {
  addNextStatusEventsToConnectionInput: AddNextStatusEventsToConnectionInput;
};


export type MutationAddProposalWorkflowStatusArgs = {
  newProposalWorkflowStatusInput: AddProposalWorkflowStatusInput;
};


export type MutationCreateProposalStatusArgs = {
  newProposalStatusInput: CreateProposalStatusInput;
};


export type MutationCreateProposalWorkflowArgs = {
  newProposalWorkflowInput: CreateProposalWorkflowInput;
};


export type MutationDeleteProposalWorkflowStatusArgs = {
  deleteProposalWorkflowStatusInput: DeleteProposalWorkflowStatusInput;
};


export type MutationMoveProposalWorkflowStatusArgs = {
  moveProposalWorkflowStatusInput: MoveProposalWorkflowStatusInput;
};


export type MutationUpdateProposalStatusArgs = {
  updatedProposalStatusInput: UpdateProposalStatusInput;
};


export type MutationUpdateProposalWorkflowArgs = {
  updatedProposalWorkflowInput: UpdateProposalWorkflowInput;
};


export type MutationAnswerTopicArgs = {
  questionaryId: Scalars['Int'];
  topicId: Scalars['Int'];
  answers: Array<AnswerInput>;
  isPartialSave?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateQuestionaryArgs = {
  templateId: Scalars['Int'];
};


export type MutationUpdateAnswerArgs = {
  questionaryId: Scalars['Int'];
  answer: AnswerInput;
};


export type MutationAddReviewArgs = {
  reviewID: Scalars['Int'];
  comment: Scalars['String'];
  grade: Scalars['Int'];
  status: ReviewStatus;
  sepID: Scalars['Int'];
};


export type MutationAddTechnicalReviewArgs = {
  proposalID: Scalars['Int'];
  comment?: Maybe<Scalars['String']>;
  publicComment?: Maybe<Scalars['String']>;
  timeAllocation?: Maybe<Scalars['Int']>;
  status?: Maybe<TechnicalReviewStatus>;
};


export type MutationAddUserForReviewArgs = {
  userID: Scalars['Int'];
  proposalID: Scalars['Int'];
  sepID: Scalars['Int'];
};


export type MutationCreateSampleArgs = {
  title: Scalars['String'];
  templateId: Scalars['Int'];
  proposalId: Scalars['Int'];
  questionId: Scalars['String'];
};


export type MutationAssignChairOrSecretaryArgs = {
  addSEPMembersRole?: Maybe<AddSepMembersRole>;
};


export type MutationAssignMembersArgs = {
  memberIds: Array<Scalars['Int']>;
  sepId: Scalars['Int'];
};


export type MutationRemoveMemberArgs = {
  memberId: Scalars['Int'];
  sepId: Scalars['Int'];
};


export type MutationAssignMemberToSepProposalArgs = {
  memberId: Scalars['Int'];
  sepId: Scalars['Int'];
  proposalId: Scalars['Int'];
};


export type MutationRemoveMemberFromSepProposalArgs = {
  memberId: Scalars['Int'];
  sepId: Scalars['Int'];
  proposalId: Scalars['Int'];
};


export type MutationAssignProposalToSepArgs = {
  proposalId: Scalars['Int'];
  sepId: Scalars['Int'];
};


export type MutationRemoveProposalAssignmentArgs = {
  proposalId: Scalars['Int'];
  sepId: Scalars['Int'];
};


export type MutationCreateSepArgs = {
  code: Scalars['String'];
  description: Scalars['String'];
  numberRatingsRequired?: Maybe<Scalars['Int']>;
  active: Scalars['Boolean'];
};


export type MutationUpdateSepArgs = {
  id: Scalars['Int'];
  code: Scalars['String'];
  description: Scalars['String'];
  numberRatingsRequired?: Maybe<Scalars['Int']>;
  active: Scalars['Boolean'];
};


export type MutationCreateQuestionArgs = {
  categoryId: TemplateCategoryId;
  dataType: DataType;
};


export type MutationCreateQuestionTemplateRelationArgs = {
  templateId: Scalars['Int'];
  questionId: Scalars['String'];
  sortOrder: Scalars['Int'];
  topicId: Scalars['Int'];
};


export type MutationCreateTemplateArgs = {
  categoryId: TemplateCategoryId;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};


export type MutationCreateTopicArgs = {
  templateId: Scalars['Int'];
  sortOrder: Scalars['Int'];
  title?: Maybe<Scalars['Int']>;
};


export type MutationDeleteQuestionTemplateRelationArgs = {
  questionId: Scalars['String'];
  templateId: Scalars['Int'];
};


export type MutationUpdateQuestionArgs = {
  id: Scalars['String'];
  naturalKey?: Maybe<Scalars['String']>;
  question?: Maybe<Scalars['String']>;
  config?: Maybe<Scalars['String']>;
};


export type MutationUpdateQuestionTemplateRelationArgs = {
  questionId: Scalars['String'];
  templateId: Scalars['Int'];
  topicId?: Maybe<Scalars['Int']>;
  sortOrder?: Maybe<Scalars['Int']>;
  config?: Maybe<Scalars['String']>;
  dependency?: Maybe<FieldDependencyInput>;
};


export type MutationUpdateTemplateArgs = {
  templateId: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  isArchived?: Maybe<Scalars['Boolean']>;
};


export type MutationUpdateTopicArgs = {
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  isEnabled?: Maybe<Scalars['Boolean']>;
};


export type MutationAddUserRoleArgs = {
  userID: Scalars['Int'];
  roleID: Scalars['Int'];
};


export type MutationCreateUserByEmailInviteArgs = {
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  userRole: UserRole;
};


export type MutationCreateUserArgs = {
  user_title?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  middlename?: Maybe<Scalars['String']>;
  lastname: Scalars['String'];
  password: Scalars['String'];
  preferredname?: Maybe<Scalars['String']>;
  orcid: Scalars['String'];
  orcidHash: Scalars['String'];
  refreshToken: Scalars['String'];
  gender: Scalars['String'];
  nationality: Scalars['Int'];
  birthdate: Scalars['String'];
  organisation: Scalars['Int'];
  department: Scalars['String'];
  position: Scalars['String'];
  email: Scalars['String'];
  telephone: Scalars['String'];
  telephone_alt?: Maybe<Scalars['String']>;
  otherOrganisation?: Maybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  user_title?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  middlename?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  preferredname?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  nationality?: Maybe<Scalars['Int']>;
  birthdate?: Maybe<Scalars['String']>;
  organisation?: Maybe<Scalars['Int']>;
  department?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
  telephone_alt?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Scalars['Int']>>;
  orcid?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};


export type MutationUpdateUserRolesArgs = {
  id: Scalars['Int'];
  roles?: Maybe<Array<Scalars['Int']>>;
};


export type MutationAddClientLogArgs = {
  error: Scalars['String'];
};


export type MutationAssignQuestionsToTopicArgs = {
  templateId: Scalars['Int'];
  topicId: Scalars['Int'];
  questionIds?: Maybe<Array<Scalars['String']>>;
};


export type MutationCloneSampleArgs = {
  sampleId: Scalars['Int'];
};


export type MutationCloneTemplateArgs = {
  templateId: Scalars['Int'];
};


export type MutationCreateProposalArgs = {
  callId: Scalars['Int'];
};


export type MutationDeleteInstitutionArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteInstrumentArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProposalArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteQuestionArgs = {
  questionId: Scalars['String'];
};


export type MutationDeleteSampleArgs = {
  sampleId: Scalars['Int'];
};


export type MutationDeleteTemplateArgs = {
  templateId: Scalars['Int'];
};


export type MutationDeleteTopicArgs = {
  topicId: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationEmailVerificationArgs = {
  token: Scalars['String'];
};


export type MutationGetTokenForUserArgs = {
  userId: Scalars['Int'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationNotifyProposalArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveUserForReviewArgs = {
  reviewID: Scalars['Int'];
};


export type MutationResetPasswordEmailArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  token: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSetPageContentArgs = {
  text: Scalars['String'];
  id: PageName;
};


export type MutationDeleteProposalStatusArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProposalWorkflowArgs = {
  id: Scalars['Int'];
};


export type MutationSubmitProposalArgs = {
  id: Scalars['Int'];
};


export type MutationTokenArgs = {
  token: Scalars['String'];
};


export type MutationSelectRoleArgs = {
  token: Scalars['String'];
  selectedRoleId?: Maybe<Scalars['Int']>;
};


export type MutationUpdatePasswordArgs = {
  id: Scalars['Int'];
  password: Scalars['String'];
};


export type MutationUpdateSampleArgs = {
  sampleId: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  safetyComment?: Maybe<Scalars['String']>;
  safetyStatus?: Maybe<SampleStatus>;
};


export type MutationUpdateTopicOrderArgs = {
  topicOrder: Array<Scalars['Int']>;
};


export type MutationBulkUpsertLostTimesArgs = {
  bulkUpsertLostTimes: BulkUpsertLostTimesInput;
};


export type MutationCreateScheduledEventArgs = {
  newScheduledEvent: NewScheduledEventInput;
};


export type MutationBulkUpsertScheduledEventsArgs = {
  bulkUpsertScheduledEvents: BulkUpsertScheduledEventsInput;
};


export type MutationFinalizeProposalBookingArgs = {
  id: Scalars['ID'];
  action: ProposalBookingFinalizeAction;
};


export type MutationActivateProposalBookingArgs = {
  id: Scalars['ID'];
};

export type GetUserInstrumentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserInstrumentsQuery = (
  { __typename?: 'Query' }
  & { userInstruments: Maybe<(
    { __typename?: 'InstrumentsQueryResult' }
    & Pick<InstrumentsQueryResult, 'totalCount'>
    & { instruments: Array<(
      { __typename?: 'Instrument' }
      & Pick<Instrument, 'id' | 'name'>
    )> }
  )> }
);

export type BulkUpsertLostTimesMutationVariables = Exact<{
  input: BulkUpsertLostTimesInput;
}>;


export type BulkUpsertLostTimesMutation = (
  { __typename?: 'Mutation' }
  & { bulkUpsertLostTimes: (
    { __typename?: 'LostTimesResponseWrap' }
    & Pick<LostTimesResponseWrap, 'error'>
    & { lostTime: Maybe<Array<(
      { __typename?: 'LostTime' }
      & Pick<LostTime, 'id' | 'startsAt' | 'endsAt'>
    )>> }
  ) }
);

export type ProposalBookingLostTimesQueryVariables = Exact<{
  proposalBookingId: Scalars['ID'];
}>;


export type ProposalBookingLostTimesQuery = (
  { __typename?: 'Query' }
  & { proposalBookingLostTimes: Array<(
    { __typename?: 'LostTime' }
    & Pick<LostTime, 'id' | 'startsAt' | 'endsAt'>
  )> }
);

export type AddClientLogMutationVariables = Exact<{
  error: Scalars['String'];
}>;


export type AddClientLogMutation = (
  { __typename?: 'Mutation' }
  & { addClientLog: (
    { __typename?: 'SuccessResponseWrap' }
    & Pick<SuccessResponseWrap, 'isSuccess' | 'error'>
  ) }
);

export type GetRefreshedTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type GetRefreshedTokenMutation = (
  { __typename?: 'Mutation' }
  & { token: (
    { __typename?: 'TokenResponseWrap' }
    & Pick<TokenResponseWrap, 'token' | 'error'>
  ) }
);

export type GetSchedulerConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSchedulerConfigQuery = (
  { __typename?: 'Query' }
  & { schedulerConfig: (
    { __typename?: 'SchedulerConfig' }
    & Pick<SchedulerConfig, 'authRedirect'>
  ) }
);

export type ServerHealthCheckQueryVariables = Exact<{ [key: string]: never; }>;


export type ServerHealthCheckQuery = (
  { __typename?: 'Query' }
  & { healthCheck: (
    { __typename?: 'HealthStats' }
    & Pick<HealthStats, 'message'>
    & { dbStats: Array<(
      { __typename?: 'DbStat' }
      & Pick<DbStat, 'total' | 'state'>
    )> }
  ) }
);

export type ActivateProposalBookingMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ActivateProposalBookingMutation = (
  { __typename?: 'Mutation' }
  & { activateProposalBooking: (
    { __typename?: 'ProposalBookingResponseWrap' }
    & Pick<ProposalBookingResponseWrap, 'error'>
  ) }
);

export type FinalizeProposalBookingMutationVariables = Exact<{
  action: ProposalBookingFinalizeAction;
  id: Scalars['ID'];
}>;


export type FinalizeProposalBookingMutation = (
  { __typename?: 'Mutation' }
  & { finalizeProposalBooking: (
    { __typename?: 'ProposalBookingResponseWrap' }
    & Pick<ProposalBookingResponseWrap, 'error'>
  ) }
);

export type InstrumentProposalBookingsQueryVariables = Exact<{
  instrumentId: Scalars['ID'];
}>;


export type InstrumentProposalBookingsQuery = (
  { __typename?: 'Query' }
  & { instrumentProposalBookings: Array<(
    { __typename?: 'ProposalBooking' }
    & Pick<ProposalBooking, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'allocatedTime'>
    & { call: (
      { __typename?: 'Call' }
      & Pick<Call, 'id' | 'shortCode' | 'startCycle' | 'endCycle' | 'cycleComment'>
    ), proposal: (
      { __typename?: 'Proposal' }
      & Pick<Proposal, 'id' | 'title' | 'shortCode'>
    ) }
  )> }
);

export type ProposalBookingQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProposalBookingQuery = (
  { __typename?: 'Query' }
  & { proposalBooking: Maybe<(
    { __typename?: 'ProposalBooking' }
    & Pick<ProposalBooking, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'allocatedTime'>
    & { call: (
      { __typename?: 'Call' }
      & Pick<Call, 'id' | 'shortCode' | 'startCycle' | 'endCycle' | 'cycleComment'>
    ), proposal: (
      { __typename?: 'Proposal' }
      & Pick<Proposal, 'id' | 'title' | 'shortCode'>
    ) }
  )> }
);

export type BulkUpsertScheduledEventsMutationVariables = Exact<{
  input: BulkUpsertScheduledEventsInput;
}>;


export type BulkUpsertScheduledEventsMutation = (
  { __typename?: 'Mutation' }
  & { bulkUpsertScheduledEvents: (
    { __typename?: 'ScheduledEventsResponseWrap' }
    & Pick<ScheduledEventsResponseWrap, 'error'>
    & { scheduledEvent: Maybe<Array<(
      { __typename?: 'ScheduledEvent' }
      & Pick<ScheduledEvent, 'id' | 'startsAt' | 'endsAt'>
    )>> }
  ) }
);

export type CreateScheduledEventMutationVariables = Exact<{
  input: NewScheduledEventInput;
}>;


export type CreateScheduledEventMutation = (
  { __typename?: 'Mutation' }
  & { createScheduledEvent: (
    { __typename?: 'ScheduledEventResponseWrap' }
    & Pick<ScheduledEventResponseWrap, 'error'>
    & { scheduledEvent: Maybe<(
      { __typename?: 'ScheduledEvent' }
      & Pick<ScheduledEvent, 'id' | 'bookingType' | 'startsAt' | 'endsAt' | 'description'>
    )> }
  ) }
);

export type ProposalBookingScheduledEventsQueryVariables = Exact<{
  proposalBookingId: Scalars['ID'];
}>;


export type ProposalBookingScheduledEventsQuery = (
  { __typename?: 'Query' }
  & { proposalBookingScheduledEvents: Array<(
    { __typename?: 'ScheduledEvent' }
    & Pick<ScheduledEvent, 'id' | 'startsAt' | 'endsAt'>
  )> }
);

export type ScheduledEventsQueryVariables = Exact<{
  filter: ScheduledEventFilter;
}>;


export type ScheduledEventsQuery = (
  { __typename?: 'Query' }
  & { scheduledEvents: Array<(
    { __typename?: 'ScheduledEvent' }
    & Pick<ScheduledEvent, 'id' | 'bookingType' | 'startsAt' | 'endsAt' | 'description'>
  )> }
);


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
export const BulkUpsertLostTimesDocument = gql`
    mutation bulkUpsertLostTimes($input: BulkUpsertLostTimesInput!) {
  bulkUpsertLostTimes(bulkUpsertLostTimes: $input) {
    error
    lostTime {
      id
      startsAt
      endsAt
    }
  }
}
    `;
export const ProposalBookingLostTimesDocument = gql`
    query proposalBookingLostTimes($proposalBookingId: ID!) {
  proposalBookingLostTimes(proposalBookingId: $proposalBookingId) {
    id
    startsAt
    endsAt
  }
}
    `;
export const AddClientLogDocument = gql`
    mutation addClientLog($error: String!) {
  addClientLog(error: $error) {
    isSuccess
    error
  }
}
    `;
export const GetRefreshedTokenDocument = gql`
    mutation getRefreshedToken($token: String!) {
  token(token: $token) {
    token
    error
  }
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
    mutation activateProposalBooking($id: ID!) {
  activateProposalBooking(id: $id) {
    error
  }
}
    `;
export const FinalizeProposalBookingDocument = gql`
    mutation finalizeProposalBooking($action: ProposalBookingFinalizeAction!, $id: ID!) {
  finalizeProposalBooking(action: $action, id: $id) {
    error
  }
}
    `;
export const InstrumentProposalBookingsDocument = gql`
    query instrumentProposalBookings($instrumentId: ID!) {
  instrumentProposalBookings(instrumentId: $instrumentId) {
    id
    call {
      id
      shortCode
      startCycle
      endCycle
      cycleComment
    }
    proposal {
      id
      title
      shortCode
    }
    createdAt
    updatedAt
    status
    allocatedTime
  }
}
    `;
export const ProposalBookingDocument = gql`
    query proposalBooking($id: ID!) {
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
      id
      title
      shortCode
    }
    createdAt
    updatedAt
    status
    allocatedTime
  }
}
    `;
export const BulkUpsertScheduledEventsDocument = gql`
    mutation bulkUpsertScheduledEvents($input: BulkUpsertScheduledEventsInput!) {
  bulkUpsertScheduledEvents(bulkUpsertScheduledEvents: $input) {
    error
    scheduledEvent {
      id
      startsAt
      endsAt
    }
  }
}
    `;
export const CreateScheduledEventDocument = gql`
    mutation createScheduledEvent($input: NewScheduledEventInput!) {
  createScheduledEvent(newScheduledEvent: $input) {
    error
    scheduledEvent {
      id
      bookingType
      startsAt
      endsAt
      description
    }
  }
}
    `;
export const ProposalBookingScheduledEventsDocument = gql`
    query proposalBookingScheduledEvents($proposalBookingId: ID!) {
  proposalBookingScheduledEvents(proposalBookingId: $proposalBookingId) {
    id
    startsAt
    endsAt
  }
}
    `;
export const ScheduledEventsDocument = gql`
    query scheduledEvents($filter: ScheduledEventFilter!) {
  scheduledEvents(filter: $filter) {
    id
    bookingType
    startsAt
    endsAt
    description
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getUserInstruments(variables?: GetUserInstrumentsQueryVariables): Promise<GetUserInstrumentsQuery> {
      return withWrapper(() => client.request<GetUserInstrumentsQuery>(print(GetUserInstrumentsDocument), variables));
    },
    bulkUpsertLostTimes(variables: BulkUpsertLostTimesMutationVariables): Promise<BulkUpsertLostTimesMutation> {
      return withWrapper(() => client.request<BulkUpsertLostTimesMutation>(print(BulkUpsertLostTimesDocument), variables));
    },
    proposalBookingLostTimes(variables: ProposalBookingLostTimesQueryVariables): Promise<ProposalBookingLostTimesQuery> {
      return withWrapper(() => client.request<ProposalBookingLostTimesQuery>(print(ProposalBookingLostTimesDocument), variables));
    },
    addClientLog(variables: AddClientLogMutationVariables): Promise<AddClientLogMutation> {
      return withWrapper(() => client.request<AddClientLogMutation>(print(AddClientLogDocument), variables));
    },
    getRefreshedToken(variables: GetRefreshedTokenMutationVariables): Promise<GetRefreshedTokenMutation> {
      return withWrapper(() => client.request<GetRefreshedTokenMutation>(print(GetRefreshedTokenDocument), variables));
    },
    getSchedulerConfig(variables?: GetSchedulerConfigQueryVariables): Promise<GetSchedulerConfigQuery> {
      return withWrapper(() => client.request<GetSchedulerConfigQuery>(print(GetSchedulerConfigDocument), variables));
    },
    serverHealthCheck(variables?: ServerHealthCheckQueryVariables): Promise<ServerHealthCheckQuery> {
      return withWrapper(() => client.request<ServerHealthCheckQuery>(print(ServerHealthCheckDocument), variables));
    },
    activateProposalBooking(variables: ActivateProposalBookingMutationVariables): Promise<ActivateProposalBookingMutation> {
      return withWrapper(() => client.request<ActivateProposalBookingMutation>(print(ActivateProposalBookingDocument), variables));
    },
    finalizeProposalBooking(variables: FinalizeProposalBookingMutationVariables): Promise<FinalizeProposalBookingMutation> {
      return withWrapper(() => client.request<FinalizeProposalBookingMutation>(print(FinalizeProposalBookingDocument), variables));
    },
    instrumentProposalBookings(variables: InstrumentProposalBookingsQueryVariables): Promise<InstrumentProposalBookingsQuery> {
      return withWrapper(() => client.request<InstrumentProposalBookingsQuery>(print(InstrumentProposalBookingsDocument), variables));
    },
    proposalBooking(variables: ProposalBookingQueryVariables): Promise<ProposalBookingQuery> {
      return withWrapper(() => client.request<ProposalBookingQuery>(print(ProposalBookingDocument), variables));
    },
    bulkUpsertScheduledEvents(variables: BulkUpsertScheduledEventsMutationVariables): Promise<BulkUpsertScheduledEventsMutation> {
      return withWrapper(() => client.request<BulkUpsertScheduledEventsMutation>(print(BulkUpsertScheduledEventsDocument), variables));
    },
    createScheduledEvent(variables: CreateScheduledEventMutationVariables): Promise<CreateScheduledEventMutation> {
      return withWrapper(() => client.request<CreateScheduledEventMutation>(print(CreateScheduledEventDocument), variables));
    },
    proposalBookingScheduledEvents(variables: ProposalBookingScheduledEventsQueryVariables): Promise<ProposalBookingScheduledEventsQuery> {
      return withWrapper(() => client.request<ProposalBookingScheduledEventsQuery>(print(ProposalBookingScheduledEventsDocument), variables));
    },
    scheduledEvents(variables: ScheduledEventsQueryVariables): Promise<ScheduledEventsQuery> {
      return withWrapper(() => client.request<ScheduledEventsQuery>(print(ScheduledEventsDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;