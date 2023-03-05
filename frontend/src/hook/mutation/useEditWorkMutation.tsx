import { gql, useMutation } from "@apollo/client";
import { EditWorkInput } from "../../gql/graphql";

const EDIT_WORK_MUTATION = gql`
  mutation editWork($input: EditWorkInput!) {
    editWork(input: $input) {
      ok
      error
    }
  }
`;

const useEditWorkMutation = () => {
  const [editWork, { loading, error }] = useMutation(EDIT_WORK_MUTATION);

  const handleEditWork = async (input: EditWorkInput) => {
    const response = await editWork({ variables: { input } });
    return response.data?.editWork;
  };

  return {
    editWork: handleEditWork,
    loading,
    error,
  };
};

export default useEditWorkMutation;
