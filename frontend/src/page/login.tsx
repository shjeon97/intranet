import React, { useEffect } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { Toast } from "../lib/sweetalert2/toast";
import { LOCAL_STORAGE_TOKEN } from "../constants";
import { authTokenVar, isLoggedInVar, isSidebarOpenVar } from "../apollo";
import { LoginInput, LoginMutation } from "../gql/graphql";

const LOGIN_MUTATION = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }
`;

export const Login = () => {
  useEffect(() => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    isLoggedInVar(false);
    isSidebarOpenVar(false);
  }, []);

  const navigate = useNavigate();
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data: LoginMutation) => {
      const {
        login: { ok, error, token },
      } = data;
      if (ok && token) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
        authTokenVar(token);
        isLoggedInVar(true);
        isSidebarOpenVar(window.innerWidth > 960);
        navigate("/");
      } else if (error) {
        Toast.fire({
          icon: "error",
          title: error,
        });
      }
    },
    onError(error) {
      error.graphQLErrors.map((graphQLError) =>
        Toast.fire({
          icon: "error",
          title: graphQLError.message,
        })
      );
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ mode: "onChange" });

  const onSubmit: SubmitHandler<LoginInput> = async ({ email, password }) => {
    if (loading) {
      return;
    }
    await login({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className=" w-10/12 mx-auto md:w-96">
          <Card>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                로그인
              </Typography>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardBody className="flex flex-col gap-4">
                <Input
                  label="Email"
                  size="lg"
                  type={"email"}
                  {...register("email", { required: "이메일을 입력해 주세요" })}
                />
                {errors.email?.message && (
                  <Alert className="p-2" color="red">
                    {`${errors.email?.message}`}
                  </Alert>
                )}
                <Input
                  {...register("password", {
                    required: "비밀번호를 입력해 주세요",
                  })}
                  type={"password"}
                  label="Password"
                  size="lg"
                />
                {errors.password?.message && (
                  <Alert className="p-2" color="red">
                    {`${errors.password?.message}`}
                  </Alert>
                )}
              </CardBody>
              <CardFooter className="pt-0">
                <Button type="submit" variant="gradient" fullWidth>
                  Login
                </Button>
                <Typography
                  variant="small"
                  className="mt-6 font-bold flex justify-center"
                >
                  회원가입 바로가기
                  <Link to={"/sign-up"} className="ml-2 text-blue-600">
                    sign up
                  </Link>
                </Typography>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};
