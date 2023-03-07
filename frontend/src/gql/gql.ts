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
    "\n  query findWork($input: FindWorkInput!) {\n    findWork(input: $input) {\n      ok\n      error\n      work {\n        startTime\n        endTime\n        date\n        workStatus {\n          name\n          color\n        }\n        memo\n      }\n    }\n  }\n": types.FindWorkDocument,
    "\n  mutation createWork($input: CreateWorkInput!) {\n    createWork(input: $input) {\n      ok\n      error\n    }\n  }\n": types.CreateWorkDocument,
    "\n  mutation editWork($input: EditWorkInput!) {\n    editWork(input: $input) {\n      ok\n      error\n    }\n  }\n": types.EditWorkDocument,
    "\n  query me {\n    me {\n      id\n      email\n      name\n      phone\n      position\n      birthday\n      startDate\n      status\n      roles {\n        name\n      }\n      teams {\n        name\n      }\n    }\n  }\n": types.MeDocument,
    "\n  mutation createUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      ok\n      error\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      ok\n      error\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation editUser($input: EditUserInput!) {\n    editUser(input: $input) {\n      ok\n      error\n    }\n  }\n": types.EditUserDocument,
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
export function graphql(source: "\n  query findWork($input: FindWorkInput!) {\n    findWork(input: $input) {\n      ok\n      error\n      work {\n        startTime\n        endTime\n        date\n        workStatus {\n          name\n          color\n        }\n        memo\n      }\n    }\n  }\n"): (typeof documents)["\n  query findWork($input: FindWorkInput!) {\n    findWork(input: $input) {\n      ok\n      error\n      work {\n        startTime\n        endTime\n        date\n        workStatus {\n          name\n          color\n        }\n        memo\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createWork($input: CreateWorkInput!) {\n    createWork(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createWork($input: CreateWorkInput!) {\n    createWork(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editWork($input: EditWorkInput!) {\n    editWork(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editWork($input: EditWorkInput!) {\n    editWork(input: $input) {\n      ok\n      error\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation editUser($input: EditUserInput!) {\n    editUser(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editUser($input: EditUserInput!) {\n    editUser(input: $input) {\n      ok\n      error\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;