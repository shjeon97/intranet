import { gql, useMutation } from "@apollo/client";
import { EditRestInput } from "../../gql/graphql";

const EDIT_REST_MUTATION = gql`
  mutation editRest($input: EditRestInput!) {
    editRest(input: $input) {
      ok
      error
    }
  }
`;

const useEditRestMutation = () => {
  const [editRest, { loading, error }] = useMutation(EDIT_REST_MUTATION);

  const handleEditRest = async (input: EditRestInput) => {
    const response = await editRest({ variables: { input } });
    return response.data?.editRest;
  };

  return {
    editRest: handleEditRest,
    loading,
    error,
  };
};

export default useEditRestMutation;
