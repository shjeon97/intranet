import { gql, useMutation } from "@apollo/client";
import { CreateWorkInput } from "../../gql/graphql";

const CREATE_WORK_MUTATION = gql`
  mutation createWork($input: CreateWorkInput!) {
    createWork(input: $input) {
      ok
      error
    }
  }
`;

const useCreateWorkMutation = () => {
  const [createWork, { loading, error }] = useMutation(CREATE_WORK_MUTATION);

  const handleCreateWork = async (input: CreateWorkInput) => {
    const response = await createWork({ variables: { input } });
    return response.data?.createWork;
  };

  return {
    createWork: handleCreateWork,
    loading,
    error,
  };
};

export default useCreateWorkMutation;
