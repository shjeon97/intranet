import { gql, useQuery } from "@apollo/client";

export const ME_QUERY = gql`
  query me {
    me {
      id
      email
      name
      phone
      position
      birthday
      startDate
      status
      roles {
        name
      }
      teams {
        name
      }
    }
  }
`;

export const useMe = () => {
  return useQuery(ME_QUERY);
};
