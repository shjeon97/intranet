import { gql, useQuery } from "@apollo/client";

export const GET_USERS_QUERY = gql`
  query getUsers {
    getUsers {
      ok
      error
      users {
        id
        createdAt
        updatedAt
        email
        position
        name
        birthday
        startDate
        phone
        status
        teams {
          name
        }
      }
    }
  }
`;

export const useGetUsersQuery = () => {
  return useQuery(GET_USERS_QUERY);
};
