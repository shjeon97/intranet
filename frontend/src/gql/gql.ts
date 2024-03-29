/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  mutation createRest($input: CreateRestInput!) {\n    createRest(input: $input) {\n      ok\n      error\n    }\n  }\n": types.CreateRestDocument,
    "\n  mutation startWork($input: StartWorkInput!) {\n    startWork(input: $input) {\n      ok\n      error\n    }\n  }\n": types.StartWorkDocument,
    "\n  mutation endWork($input: EndWorkInput!) {\n    endWork(input: $input) {\n      ok\n      error\n    }\n  }\n": types.EndWorkDocument,
    "\n  mutation startRest($input: StartRestInput!) {\n    startRest(input: $input) {\n      ok\n      error\n    }\n  }\n": types.StartRestDocument,
    "\n  mutation endRest($input: EndRestInput!) {\n    endRest(input: $input) {\n      ok\n      error\n    }\n  }\n": types.EndRestDocument,
    "\n  query findWork($input: FindWorkInput!) {\n    findWork(input: $input) {\n      ok\n      error\n      work {\n        id\n        startTime\n        endTime\n        date\n        workStatus {\n          name\n          color\n        }\n        memo\n      }\n    }\n  }\n": types.FindWorkDocument,
    "\n  query findResting($input: FindRestingInput!) {\n    findResting(input: $input) {\n      ok\n      error\n      rest {\n        id\n        startTime\n        reason\n      }\n    }\n  }\n": types.FindRestingDocument,
    "\n  mutation createWork($input: CreateWorkInput!) {\n    createWork(input: $input) {\n      ok\n      error\n    }\n  }\n": types.CreateWorkDocument,
    "\n  mutation editRest($input: EditRestInput!) {\n    editRest(input: $input) {\n      ok\n      error\n    }\n  }\n": types.EditRestDocument,
    "\n  mutation editWork($input: EditWorkInput!) {\n    editWork(input: $input) {\n      ok\n      error\n    }\n  }\n": types.EditWorkDocument,
    "\n  query getUsers {\n    getUsers {\n      ok\n      error\n      users {\n        id\n        createdAt\n        updatedAt\n        email\n        position\n        name\n        birthday\n        startDate\n        phone\n        status\n        teams {\n          name\n        }\n      }\n    }\n  }\n": types.GetUsersDocument,
    "\n  query me {\n    me {\n      id\n      email\n      name\n      phone\n      position\n      birthday\n      startDate\n      status\n      roles {\n        name\n      }\n      teams {\n        name\n      }\n    }\n  }\n": types.MeDocument,
    "\n  mutation createUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      ok\n      error\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      ok\n      error\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  query allMeetingRoom {\n    allMeetingRoom {\n      ok\n      error\n      meetingRooms {\n        name\n        id\n      }\n    }\n  }\n": types.AllMeetingRoomDocument,
    "\n  mutation createReservation($input: CreateReservationInput!) {\n    createReservation(input: $input) {\n      ok\n      error\n    }\n  }\n": types.CreateReservationDocument,
    "\n  mutation createMeetingRoom($input: CreateMeetingRoomInput!) {\n    createMeetingRoom(input: $input) {\n      ok\n      error\n    }\n  }\n": types.CreateMeetingRoomDocument,
    "\n  mutation editNotice($input: EditNoticeInput!) {\n    editNotice(input: $input) {\n      ok\n      error\n    }\n  }\n": types.EditNoticeDocument,
    "\n  query getNotice($input: GetNoticeInput!) {\n    getNotice(input: $input) {\n      ok\n      error\n      notice {\n        id\n        title\n        contents\n        createdAt\n        updatedAt\n        status\n        lastUpdateUserId\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.GetNoticeDocument,
    "\n  mutation createNotice($input: CreateNoticeInput!) {\n    createNotice(input: $input) {\n      ok\n      error\n    }\n  }\n": types.CreateNoticeDocument,
    "\n  query searchNotice($input: SearchNoticeInput!) {\n    searchNotice(input: $input) {\n      ok\n      error\n      totalPage\n      notices {\n        id\n        title\n        contents\n        status\n        createdAt\n        lastUpdateUserId\n        updatedAt\n        user {\n          name\n        }\n      }\n    }\n  }\n": types.SearchNoticeDocument,
    "\n  mutation editUser($input: EditUserInput!) {\n    editUser(input: $input) {\n      ok\n      error\n    }\n  }\n": types.EditUserDocument,
    "\n  query searchWorkRecord($input: SearchWorkRecordInput!) {\n    searchWorkRecord(input: $input) {\n      ok\n      error\n      totalPage\n      works {\n        date\n        user {\n          id\n          name\n          position\n          email\n          teams {\n            level\n            name\n          }\n        }\n        id\n        startTime\n        endTime\n        memo\n        overtimeReason\n        approvalUserId\n        workStatusList {\n          workStatus {\n            name\n            color\n          }\n        }\n      }\n      rests {\n        id\n        workId\n        startTime\n        endTime\n        reason\n        totalMinute\n      }\n    }\n  }\n": types.SearchWorkRecordDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createRest($input: CreateRestInput!) {\n    createRest(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createRest($input: CreateRestInput!) {\n    createRest(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation startWork($input: StartWorkInput!) {\n    startWork(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation startWork($input: StartWorkInput!) {\n    startWork(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation endWork($input: EndWorkInput!) {\n    endWork(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation endWork($input: EndWorkInput!) {\n    endWork(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation startRest($input: StartRestInput!) {\n    startRest(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation startRest($input: StartRestInput!) {\n    startRest(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation endRest($input: EndRestInput!) {\n    endRest(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation endRest($input: EndRestInput!) {\n    endRest(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findWork($input: FindWorkInput!) {\n    findWork(input: $input) {\n      ok\n      error\n      work {\n        id\n        startTime\n        endTime\n        date\n        workStatus {\n          name\n          color\n        }\n        memo\n      }\n    }\n  }\n"): (typeof documents)["\n  query findWork($input: FindWorkInput!) {\n    findWork(input: $input) {\n      ok\n      error\n      work {\n        id\n        startTime\n        endTime\n        date\n        workStatus {\n          name\n          color\n        }\n        memo\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findResting($input: FindRestingInput!) {\n    findResting(input: $input) {\n      ok\n      error\n      rest {\n        id\n        startTime\n        reason\n      }\n    }\n  }\n"): (typeof documents)["\n  query findResting($input: FindRestingInput!) {\n    findResting(input: $input) {\n      ok\n      error\n      rest {\n        id\n        startTime\n        reason\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createWork($input: CreateWorkInput!) {\n    createWork(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createWork($input: CreateWorkInput!) {\n    createWork(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editRest($input: EditRestInput!) {\n    editRest(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editRest($input: EditRestInput!) {\n    editRest(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editWork($input: EditWorkInput!) {\n    editWork(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editWork($input: EditWorkInput!) {\n    editWork(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getUsers {\n    getUsers {\n      ok\n      error\n      users {\n        id\n        createdAt\n        updatedAt\n        email\n        position\n        name\n        birthday\n        startDate\n        phone\n        status\n        teams {\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getUsers {\n    getUsers {\n      ok\n      error\n      users {\n        id\n        createdAt\n        updatedAt\n        email\n        position\n        name\n        birthday\n        startDate\n        phone\n        status\n        teams {\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query me {\n    me {\n      id\n      email\n      name\n      phone\n      position\n      birthday\n      startDate\n      status\n      roles {\n        name\n      }\n      teams {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      id\n      email\n      name\n      phone\n      position\n      birthday\n      startDate\n      status\n      roles {\n        name\n      }\n      teams {\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      ok\n      error\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      ok\n      error\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allMeetingRoom {\n    allMeetingRoom {\n      ok\n      error\n      meetingRooms {\n        name\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query allMeetingRoom {\n    allMeetingRoom {\n      ok\n      error\n      meetingRooms {\n        name\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createReservation($input: CreateReservationInput!) {\n    createReservation(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createReservation($input: CreateReservationInput!) {\n    createReservation(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createMeetingRoom($input: CreateMeetingRoomInput!) {\n    createMeetingRoom(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createMeetingRoom($input: CreateMeetingRoomInput!) {\n    createMeetingRoom(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editNotice($input: EditNoticeInput!) {\n    editNotice(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editNotice($input: EditNoticeInput!) {\n    editNotice(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getNotice($input: GetNoticeInput!) {\n    getNotice(input: $input) {\n      ok\n      error\n      notice {\n        id\n        title\n        contents\n        createdAt\n        updatedAt\n        status\n        lastUpdateUserId\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getNotice($input: GetNoticeInput!) {\n    getNotice(input: $input) {\n      ok\n      error\n      notice {\n        id\n        title\n        contents\n        createdAt\n        updatedAt\n        status\n        lastUpdateUserId\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createNotice($input: CreateNoticeInput!) {\n    createNotice(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createNotice($input: CreateNoticeInput!) {\n    createNotice(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchNotice($input: SearchNoticeInput!) {\n    searchNotice(input: $input) {\n      ok\n      error\n      totalPage\n      notices {\n        id\n        title\n        contents\n        status\n        createdAt\n        lastUpdateUserId\n        updatedAt\n        user {\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query searchNotice($input: SearchNoticeInput!) {\n    searchNotice(input: $input) {\n      ok\n      error\n      totalPage\n      notices {\n        id\n        title\n        contents\n        status\n        createdAt\n        lastUpdateUserId\n        updatedAt\n        user {\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editUser($input: EditUserInput!) {\n    editUser(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editUser($input: EditUserInput!) {\n    editUser(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchWorkRecord($input: SearchWorkRecordInput!) {\n    searchWorkRecord(input: $input) {\n      ok\n      error\n      totalPage\n      works {\n        date\n        user {\n          id\n          name\n          position\n          email\n          teams {\n            level\n            name\n          }\n        }\n        id\n        startTime\n        endTime\n        memo\n        overtimeReason\n        approvalUserId\n        workStatusList {\n          workStatus {\n            name\n            color\n          }\n        }\n      }\n      rests {\n        id\n        workId\n        startTime\n        endTime\n        reason\n        totalMinute\n      }\n    }\n  }\n"): (typeof documents)["\n  query searchWorkRecord($input: SearchWorkRecordInput!) {\n    searchWorkRecord(input: $input) {\n      ok\n      error\n      totalPage\n      works {\n        date\n        user {\n          id\n          name\n          position\n          email\n          teams {\n            level\n            name\n          }\n        }\n        id\n        startTime\n        endTime\n        memo\n        overtimeReason\n        approvalUserId\n        workStatusList {\n          workStatus {\n            name\n            color\n          }\n        }\n      }\n      rests {\n        id\n        workId\n        startTime\n        endTime\n        reason\n        totalMinute\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;