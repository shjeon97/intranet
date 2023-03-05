import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { isLoggedInVar, isSidebarOpenVar } from "../../apollo";
import { LOCAL_STORAGE_TOKEN } from "../../constants";

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

export const useMeQuery = () => {
  const navigate = useNavigate();

  return useQuery(ME_QUERY, {
    fetchPolicy: "network-only",
    onError(error) {
      if (error.message !== "Forbidden resource") {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        isLoggedInVar(false);
        isSidebarOpenVar(false);
        navigate("/login");
      }
    },
  });
};
