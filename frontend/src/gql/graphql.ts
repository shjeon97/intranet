/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AllMeetingRoomOutput = {
  __typename?: 'AllMeetingRoomOutput';
  error?: Maybe<Scalars['String']>;
  meetingRooms?: Maybe<Array<MeetingRoom>>;
  ok: Scalars['Boolean'];
};

export type CoreOutput = {
  __typename?: 'CoreOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateMeetingRoomInput = {
  name: Scalars['String'];
};

export type CreateNoticeInput = {
  contents: Scalars['String'];
  status: NoticeStatus;
  title: Scalars['String'];
};

export type CreateReservationInput = {
  date?: InputMaybe<Scalars['String']>;
  endTime?: InputMaybe<Scalars['String']>;
  meetingRoomId: Scalars['Float'];
  reason?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  userIds: Array<Scalars['Float']>;
};

export type CreateRestInput = {
  endTime?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['String']>;
  totalMinute?: InputMaybe<Scalars['Float']>;
  workId?: InputMaybe<Scalars['Float']>;
};

export type CreateUserInput = {
  birthday: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  position: Scalars['String'];
  startDate: Scalars['String'];
};

export type CreateWorkInput = {
  approvalUserId?: InputMaybe<Scalars['Float']>;
  date?: InputMaybe<Scalars['String']>;
  endTime?: InputMaybe<Scalars['String']>;
  memo?: InputMaybe<Scalars['String']>;
  overtimeReason?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Float']>;
  workStatusList?: InputMaybe<Array<WorkStatusListInputType>>;
  workStatusName?: InputMaybe<Scalars['String']>;
};

export type EditNoticeInput = {
  contents?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  title?: InputMaybe<Scalars['String']>;
};

export type EditRestInput = {
  endTime?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  reason?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['String']>;
  totalMinute?: InputMaybe<Scalars['Float']>;
  work?: InputMaybe<WorkInputType>;
  workId?: InputMaybe<Scalars['Float']>;
};

export type EditUserInput = {
  birthday?: InputMaybe<Scalars['String']>;
  changePassword?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
  userId: Scalars['Float'];
};

export type EditWorkInput = {
  approvalUserId?: InputMaybe<Scalars['Float']>;
  date?: InputMaybe<Scalars['String']>;
  endTime?: InputMaybe<Scalars['String']>;
  memo?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInputType>;
  userId?: InputMaybe<Scalars['Float']>;
  workStatus?: InputMaybe<WorkStatusInputType>;
  workStatusList?: InputMaybe<Array<WorkStatusListInputType>>;
  workStatusName?: InputMaybe<Scalars['String']>;
};

export type EndRestInput = {
  id?: InputMaybe<Scalars['Float']>;
};

export type EndWorkInput = {
  date?: InputMaybe<Scalars['String']>;
  overtimeReason?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Float']>;
};

export type FindReservationsInput = {
  date: Scalars['String'];
};

export type FindReservationsOutput = {
  __typename?: 'FindReservationsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  reservations?: Maybe<Array<Reservation>>;
};

export type FindRestingInput = {
  workId: Scalars['Float'];
};

export type FindRestingOutput = {
  __typename?: 'FindRestingOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  rest?: Maybe<Rest>;
};

export type FindWorkInput = {
  date: Scalars['String'];
  userId: Scalars['Float'];
};

export type FindWorkOutput = {
  __typename?: 'FindWorkOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  work?: Maybe<Work>;
};

export type GetNoticeInput = {
  id: Scalars['Float'];
};

export type GetNoticeOutput = {
  __typename?: 'GetNoticeOutput';
  error?: Maybe<Scalars['String']>;
  notice?: Maybe<Notice>;
  ok: Scalars['Boolean'];
};

export type GetUserInput = {
  id: Scalars['Float'];
};

export type GetUserOutput = {
  __typename?: 'GetUserOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type GetUsersOutput = {
  __typename?: 'GetUsersOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  users?: Maybe<Array<User>>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type MeetingRoom = {
  __typename?: 'MeetingRoom';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type MeetingRoomInputType = {
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMeetingRoom: CoreOutput;
  createNotice: CoreOutput;
  createReservation: CoreOutput;
  createRest: CoreOutput;
  createUser: CoreOutput;
  createWork: CoreOutput;
  editNotice: CoreOutput;
  editRest: CoreOutput;
  editUser: CoreOutput;
  editWork: CoreOutput;
  endRest: CoreOutput;
  endWork: CoreOutput;
  login: LoginOutput;
  startRest: CoreOutput;
  startWork: CoreOutput;
};


export type MutationCreateMeetingRoomArgs = {
  input: CreateMeetingRoomInput;
};


export type MutationCreateNoticeArgs = {
  input: CreateNoticeInput;
};


export type MutationCreateReservationArgs = {
  input: CreateReservationInput;
};


export type MutationCreateRestArgs = {
  input: CreateRestInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateWorkArgs = {
  input: CreateWorkInput;
};


export type MutationEditNoticeArgs = {
  input: EditNoticeInput;
};


export type MutationEditRestArgs = {
  input: EditRestInput;
};


export type MutationEditUserArgs = {
  input: EditUserInput;
};


export type MutationEditWorkArgs = {
  input: EditWorkInput;
};


export type MutationEndRestArgs = {
  input: EndRestInput;
};


export type MutationEndWorkArgs = {
  input: EndWorkInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationStartRestArgs = {
  input: StartRestInput;
};


export type MutationStartWorkArgs = {
  input: StartWorkInput;
};

export type Notice = {
  __typename?: 'Notice';
  contents: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  lastUpdateUserId?: Maybe<Scalars['Float']>;
  status: NoticeStatus;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export enum NoticeStatus {
  Anyone = 'Anyone',
  Writer = 'Writer'
}

export type Query = {
  __typename?: 'Query';
  allMeetingRoom: AllMeetingRoomOutput;
  findReservation: FindReservationsOutput;
  findResting: FindRestingOutput;
  findWork: FindWorkOutput;
  getNotice: GetNoticeOutput;
  getUser: GetUserOutput;
  getUsers: GetUsersOutput;
  me: User;
  searchNotice: SearchNoticeOutput;
  searchWorkRecord: SearchWorkRecordOutput;
};


export type QueryFindReservationArgs = {
  input: FindReservationsInput;
};


export type QueryFindRestingArgs = {
  input: FindRestingInput;
};


export type QueryFindWorkArgs = {
  input: FindWorkInput;
};


export type QueryGetNoticeArgs = {
  input: GetNoticeInput;
};


export type QueryGetUserArgs = {
  input: GetUserInput;
};


export type QuerySearchNoticeArgs = {
  input: SearchNoticeInput;
};


export type QuerySearchWorkRecordArgs = {
  input: SearchWorkRecordInput;
};

export type Reservation = {
  __typename?: 'Reservation';
  createdAt: Scalars['DateTime'];
  date: Scalars['String'];
  endTime?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  meetingRoom: MeetingRoom;
  reason: Scalars['String'];
  startTime?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  users: Array<User>;
};

export type ReservationInputType = {
  date: Scalars['String'];
  endTime?: InputMaybe<Scalars['String']>;
  meetingRoom: MeetingRoomInputType;
  reason: Scalars['String'];
  startTime?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  users: Array<UserInputType>;
};

export type Rest = {
  __typename?: 'Rest';
  createdAt: Scalars['DateTime'];
  endTime?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  reason?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  totalMinute?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
  work: Work;
  workId: Scalars['Float'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Float'];
  name: RoleName;
  users: Array<User>;
};

export type RoleInputType = {
  id: Scalars['Float'];
  name: RoleName;
  users: Array<UserInputType>;
};

export enum RoleName {
  Admin = 'Admin',
  Any = 'Any',
  TeamLeader = 'TeamLeader'
}

export type SearchNoticeInput = {
  page?: Scalars['Float'];
  pageSize?: Scalars['Float'];
  sort?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type SearchNoticeOutput = {
  __typename?: 'SearchNoticeOutput';
  error?: Maybe<Scalars['String']>;
  notices?: Maybe<Array<Notice>>;
  ok: Scalars['Boolean'];
  sort?: Maybe<Scalars['String']>;
  totalPage?: Maybe<Scalars['Float']>;
  totalResult?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type SearchWorkRecordInput = {
  page?: Scalars['Float'];
  pageSize?: Scalars['Float'];
  sort?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type SearchWorkRecordOutput = {
  __typename?: 'SearchWorkRecordOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  rests?: Maybe<Array<Rest>>;
  sort?: Maybe<Scalars['String']>;
  totalPage?: Maybe<Scalars['Float']>;
  totalResult?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  works?: Maybe<Array<Work>>;
};

export type StartRestInput = {
  reason?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['String']>;
  workId?: InputMaybe<Scalars['Float']>;
};

export type StartWorkInput = {
  date?: InputMaybe<Scalars['String']>;
  memo?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Float']>;
  workStatusName?: InputMaybe<Scalars['String']>;
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['Float'];
  level: Scalars['Float'];
  name: Scalars['String'];
  subTeamIds: Array<Scalars['Float']>;
  users: Array<User>;
};

export type TeamInputType = {
  id: Scalars['Float'];
  level: Scalars['Float'];
  name: Scalars['String'];
  subTeamIds: Array<Scalars['Float']>;
  users: Array<UserInputType>;
};

export type User = {
  __typename?: 'User';
  birthday: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  position: Scalars['String'];
  reservations: Array<Reservation>;
  roles: Array<Role>;
  startDate: Scalars['String'];
  status: UserStatus;
  teams: Array<Team>;
  updatedAt: Scalars['DateTime'];
};

export type UserInputType = {
  birthday: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  position: Scalars['String'];
  reservations: Array<ReservationInputType>;
  roles: Array<RoleInputType>;
  startDate: Scalars['String'];
  status: UserStatus;
  teams: Array<TeamInputType>;
};

export enum UserStatus {
  LeaveOfAbsence = 'LeaveOfAbsence',
  MaternityLeave = 'MaternityLeave',
  Resignation = 'Resignation',
  Unapproved = 'Unapproved',
  Work = 'Work'
}

export type Work = {
  __typename?: 'Work';
  approvalUserId?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  date: Scalars['String'];
  endTime?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  memo?: Maybe<Scalars['String']>;
  overtimeReason?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['Float'];
  workStatus: WorkStatus;
  workStatusList?: Maybe<Array<WorkStatusList>>;
  workStatusName: Scalars['String'];
};

export type WorkInputType = {
  approvalUserId?: InputMaybe<Scalars['Float']>;
  date: Scalars['String'];
  endTime?: InputMaybe<Scalars['String']>;
  memo?: InputMaybe<Scalars['String']>;
  overtimeReason?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['String']>;
  user: UserInputType;
  userId: Scalars['Float'];
  workStatus: WorkStatusInputType;
  workStatusList?: InputMaybe<Array<WorkStatusListInputType>>;
  workStatusName: Scalars['String'];
};

export type WorkStatus = {
  __typename?: 'WorkStatus';
  color: Scalars['String'];
  name: Scalars['String'];
};

export type WorkStatusInputType = {
  color: Scalars['String'];
  name: Scalars['String'];
};

export type WorkStatusList = {
  __typename?: 'WorkStatusList';
  workStatus: WorkStatus;
};

export type WorkStatusListInputType = {
  workStatus: WorkStatusInputType;
};

export type CreateRestMutationVariables = Exact<{
  input: CreateRestInput;
}>;


export type CreateRestMutation = { __typename?: 'Mutation', createRest: { __typename?: 'CoreOutput', ok: boolean, error?: string | null } };

export type StartWorkMutationVariables = Exact<{
  input: StartWorkInput;
}>;


export type StartWorkMutation = { __typename?: 'Mutation', startWork: { __typename?: 'CoreOutput', ok: boolean, error?: string | null } };

export type EndWorkMutationVariables = Exact<{
  input: EndWorkInput;
}>;


export type EndWorkMutation = { __typename?: 'Mutation', endWork: { __typename?: 'CoreOutput', ok: boolean, error?: string | null } };

export type StartRestMutationVariables = Exact<{
  input: StartRestInput;
}>;


export type StartRestMutation = { __typename?: 'Mutation', startRest: { __typename?: 'CoreOutput', ok: boolean, error?: string | null } };

export type EndRestMutationVariables = Exact<{
  input: EndRestInput;
}>;


export type EndRestMutation = { __typename?: 'Mutation', endRest: { __typename?: 'CoreOutput', ok: boolean, error?: string | null } };

export type FindWorkQueryVariables = Exact<{
  input: FindWorkInput;
}>;


export type FindWorkQuery = { __typename?: 'Query', findWork: { __typename?: 'FindWorkOutput', ok: boolean, error?: string | null, work?: { __typename?: 'Work', id: number, startTime?: string | null, endTime?: string | null, date: string, memo?: string | null, workStatus: { __typename?: 'WorkStatus', name: string, color: string } } | null } };

export type FindRestingQueryVariables = Exact<{
  input: FindRestingInput;
}>;


export type FindRestingQuery = { __typename?: 'Query', findResting: { __typename?: 'FindRestingOutput', ok: boolean, error?: string | null, rest?: { __typename?: 'Rest', id: number, startTime?: string | null, reason?: string | null } | null } };

export type CreateWorkMutationVariables = Exact<{
  input: CreateWorkInput;
}>;


export type CreateWorkMutation = { __typename?: 'Mutation', createWork: { __typename?: 'CoreOutput', ok: boolean, error?: string | null } };

export type EditRestMutationVariables = Exact<{
  input: EditRestInput;
}>;


export type EditRestMutation = { __typename?: 'Mutation', editRest: { __typename?: 'CoreOutput', ok: boolean, error?: string | null } };

export type EditWorkMutationVariables = Exact<{
  input: EditWorkInput;
}>;


export type EditWorkMutation = { __typename?: 'Mutation', editWork: { __typename?: 'CoreOutput', ok: boolean, error?: string | null } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'GetUsersOutput', ok: boolean, error?: string | null, users?: Array<{ __typename?: 'User', id: number, createdAt: any, updatedAt: any, email: string, position: string, name: string, birthday: string, startDate: string, phone: string, status: UserStatus, teams: Array<{ __typename?: 'Team', name: string }> }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, email: string, name: string, phone: string, position: string, birthday: string, startDate: string, status: UserStatus, roles: Array<{ __typename?: 'Role', name: RoleName }>, teams: Array<{ __typename?: 'Team', name: string }> } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CoreOutput', ok: boolean, error?: string | null } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', ok: boolean, error?: string | null, token?: string | null } };

export type AllMeetingRoomQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMeetingRoomQuery = { __typename?: 'Query', allMeetingRoom: { __typename?: 'AllMeetingRoomOutput', ok: boolean, error?: string | null, meetingRooms?: Array<{ __typename?: 'MeetingRoom', name: string, id: number }> | null } };

export type CreateReservationMutationVariables = Exact<{
  input: CreateReservationInput;
}>;


export type CreateReservationMutation = { __typename?: 'Mutation', createReservation: { __typename?: 'CoreOutput', ok: boolean, error?: string | null } };

export type CreateMeetingRoomMutationVariables = Exact<{
  input: CreateMeetingRoomInput;
}>;


export type CreateMeetingRoomMutation = { __typename?: 'Mutation', createMeetingRoom: { __typename?: 'CoreOutput', ok: boolean, error?: string | null } };

export type EditNoticeMutationVariables = Exact<{
  input: EditNoticeInput;
}>;


export type EditNoticeMutation = { __typename?: 'Mutation', editNotice: { __typename?: 'CoreOutput', ok: boolean, error?: string | null } };

export type GetNoticeQueryVariables = Exact<{
  input: GetNoticeInput;
}>;


export type GetNoticeQuery = { __typename?: 'Query', getNotice: { __typename?: 'GetNoticeOutput', ok: boolean, error?: string | null, notice?: { __typename?: 'Notice', id: number, title: string, contents: string, createdAt: any, updatedAt: any, status: NoticeStatus, lastUpdateUserId?: number | null, user: { __typename?: 'User', id: number, name: string } } | null } };

export type CreateNoticeMutationVariables = Exact<{
  input: CreateNoticeInput;
}>;


export type CreateNoticeMutation = { __typename?: 'Mutation', createNotice: { __typename?: 'CoreOutput', ok: boolean, error?: string | null } };

export type SearchNoticeQueryVariables = Exact<{
  input: SearchNoticeInput;
}>;


export type SearchNoticeQuery = { __typename?: 'Query', searchNotice: { __typename?: 'SearchNoticeOutput', ok: boolean, error?: string | null, totalPage?: number | null, notices?: Array<{ __typename?: 'Notice', id: number, title: string, contents: string, status: NoticeStatus, createdAt: any, lastUpdateUserId?: number | null, updatedAt: any, user: { __typename?: 'User', name: string } }> | null } };

export type EditUserMutationVariables = Exact<{
  input: EditUserInput;
}>;


export type EditUserMutation = { __typename?: 'Mutation', editUser: { __typename?: 'CoreOutput', ok: boolean, error?: string | null } };

export type SearchWorkRecordQueryVariables = Exact<{
  input: SearchWorkRecordInput;
}>;


export type SearchWorkRecordQuery = { __typename?: 'Query', searchWorkRecord: { __typename?: 'SearchWorkRecordOutput', ok: boolean, error?: string | null, totalPage?: number | null, works?: Array<{ __typename?: 'Work', date: string, id: number, startTime?: string | null, endTime?: string | null, memo?: string | null, overtimeReason?: string | null, approvalUserId?: number | null, user: { __typename?: 'User', id: number, name: string, position: string, email: string, teams: Array<{ __typename?: 'Team', level: number, name: string }> }, workStatusList?: Array<{ __typename?: 'WorkStatusList', workStatus: { __typename?: 'WorkStatus', name: string, color: string } }> | null }> | null, rests?: Array<{ __typename?: 'Rest', id: number, workId: number, startTime?: string | null, endTime?: string | null, reason?: string | null, totalMinute?: number | null }> | null } };


export const CreateRestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createRest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateRestMutation, CreateRestMutationVariables>;
export const StartWorkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"startWork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StartWorkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startWork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<StartWorkMutation, StartWorkMutationVariables>;
export const EndWorkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"endWork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EndWorkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endWork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<EndWorkMutation, EndWorkMutationVariables>;
export const StartRestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"startRest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StartRestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startRest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<StartRestMutation, StartRestMutationVariables>;
export const EndRestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"endRest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EndRestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endRest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<EndRestMutation, EndRestMutationVariables>;
export const FindWorkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findWork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FindWorkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findWork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"work"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"workStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"memo"}}]}}]}}]}}]} as unknown as DocumentNode<FindWorkQuery, FindWorkQueryVariables>;
export const FindRestingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findResting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FindRestingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findResting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"rest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}}]}}]}}]} as unknown as DocumentNode<FindRestingQuery, FindRestingQueryVariables>;
export const CreateWorkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createWork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWorkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateWorkMutation, CreateWorkMutationVariables>;
export const EditRestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editRest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditRestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editRest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<EditRestMutation, EditRestMutationVariables>;
export const EditWorkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editWork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditWorkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editWork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<EditWorkMutation, EditWorkMutationVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const AllMeetingRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allMeetingRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allMeetingRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"meetingRooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AllMeetingRoomQuery, AllMeetingRoomQueryVariables>;
export const CreateReservationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createReservation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateReservationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReservation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateReservationMutation, CreateReservationMutationVariables>;
export const CreateMeetingRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createMeetingRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMeetingRoomInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMeetingRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateMeetingRoomMutation, CreateMeetingRoomMutationVariables>;
export const EditNoticeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editNotice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditNoticeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editNotice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<EditNoticeMutation, EditNoticeMutationVariables>;
export const GetNoticeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getNotice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetNoticeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNotice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"notice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdateUserId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetNoticeQuery, GetNoticeQueryVariables>;
export const CreateNoticeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createNotice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateNoticeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNotice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateNoticeMutation, CreateNoticeMutationVariables>;
export const SearchNoticeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchNotice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchNoticeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchNotice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"totalPage"}},{"kind":"Field","name":{"kind":"Name","value":"notices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdateUserId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchNoticeQuery, SearchNoticeQueryVariables>;
export const EditUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<EditUserMutation, EditUserMutationVariables>;
export const SearchWorkRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchWorkRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchWorkRecordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchWorkRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"totalPage"}},{"kind":"Field","name":{"kind":"Name","value":"works"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}},{"kind":"Field","name":{"kind":"Name","value":"overtimeReason"}},{"kind":"Field","name":{"kind":"Name","value":"approvalUserId"}},{"kind":"Field","name":{"kind":"Name","value":"workStatusList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"workId"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"totalMinute"}}]}}]}}]}}]} as unknown as DocumentNode<SearchWorkRecordQuery, SearchWorkRecordQueryVariables>;