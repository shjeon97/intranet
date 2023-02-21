import React, { useEffect } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Toast } from "../lib/sweetalert2/toast";
import { CreateUserInput, CreateUserMutation } from "../gql/graphql";
import { LOCAL_STORAGE_TOKEN } from "../constants";
import { isLoggedInVar, isSidebarOpenVar } from "../apollo";

const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ok
      error
    }
  }
`;

interface IFormInput extends CreateUserInput {
  confirmPassword: string;
}

export const SignUp = () => {
  useEffect(() => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    isLoggedInVar(false);
    isSidebarOpenVar(false);
  }, []);

  const navigate = useNavigate();
  const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: (data: CreateUserMutation) => {
      const {
        createUser: { ok, error },
      } = data;
      if (ok) {
        Toast.fire({
          icon: "success",
          title: `회원가입이 완료되었습니다`,
          position: "top-end",
          timer: 1200,
        });
        navigate("/login");
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
  } = useForm<IFormInput>({ mode: "onChange" });

  const onSubmit: SubmitHandler<IFormInput> = async ({
    email,
    password,
    name,
    phone,
    position,
    confirmPassword,
    birthday,
    startDate,
  }) => {
    if (loading) {
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "비밀번호가 일치하지 않습니다",
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }
    await createUser({
      variables: {
        input: {
          email,
          password,
          name,
          phone,
          position,
          birthday,
          startDate,
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
                회원가입
              </Typography>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardBody className="flex flex-col gap-4">
                <Input
                  type={"email"}
                  {...register("email", { required: "이메일을 입력해 주세요" })}
                  label="Email"
                  size="lg"
                />
                {errors.email?.message && (
                  <Alert className="p-2" color="red">
                    {`${errors.email?.message}`}
                  </Alert>
                )}
                <Input
                  {...register("name", { required: "이름을 입력해 주세요" })}
                  label="이름"
                  size="lg"
                />
                {errors.name?.message && (
                  <Alert className="p-2" color="red">
                    {`${errors.name?.message}`}
                  </Alert>
                )}
                <Input
                  {...register("password", {
                    required: "비밀번호를 입력해 주세요",
                    pattern: new RegExp(
                      `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,16}$`
                    ),
                  })}
                  type={"password"}
                  label="Password"
                  size="lg"
                />
                <label className="flex text-sm px-2 -mt-2">
                  8~16자리 영문 대소문자, 숫자, 특수문자 중 3가지 이상 조합으로
                  만들어주세요.
                  {errors.password?.type === "pattern" && (
                    <IconButton className="flex rounded-full h-7 " color="red">
                      <FontAwesomeIcon icon={solid("xmark")} />
                    </IconButton>
                  )}
                </label>
                <Input
                  {...register("confirmPassword", {
                    required: "비밀번호를 재입력해 주세요",
                  })}
                  type={"password"}
                  label="Confirm Password"
                  size="lg"
                />
                {errors.confirmPassword?.message && (
                  <Alert className="p-2" color="red">
                    {`${errors.confirmPassword?.message}`}
                  </Alert>
                )}
                <Input
                  {...register("position", { required: "직책을 입력해주세요" })}
                  label="직책"
                  size="lg"
                />
                {errors.position?.message && (
                  <Alert className="p-2" color="red">
                    {`${errors.position?.message}`}
                  </Alert>
                )}
                <Input
                  type="date"
                  {...register("startDate", {
                    required: "입사일을 입력해 주세요",
                  })}
                  label="입사일"
                  size="lg"
                />
                {errors.startDate?.message && (
                  <Alert className="p-2" color="red">
                    {`${errors.startDate?.message}`}
                  </Alert>
                )}
                <Input
                  type="date"
                  {...register("birthday", {
                    required: "생년월일을 입력해 주세요",
                  })}
                  label="생년월일"
                  size="lg"
                />
                {errors.birthday?.message && (
                  <Alert className="p-2" color="red">
                    {`${errors.birthday?.message}`}
                  </Alert>
                )}
                <Input
                  {...register("phone", {
                    minLength: {
                      value: 11,
                      message: "전화번호를 입력하시오",
                    },
                    maxLength: {
                      value: 11,
                      message: "전화번호를 입력하시오",
                    },
                    pattern: /^[0-9]+$/,
                  })}
                  label="전화번호"
                  size="lg"
                />
                {errors.phone?.type === "pattern" && (
                  <Alert className="p-2" color="red">
                    숫자만 입력해 주세요
                  </Alert>
                )}
                {errors.phone?.message && (
                  <Alert className="p-2" color="red">
                    {`${errors.phone?.message}`}
                  </Alert>
                )}
              </CardBody>
              <CardFooter className="pt-0">
                <Button type="submit" variant="gradient" fullWidth>
                  Sign up
                </Button>
                <Typography
                  variant="small"
                  className="mt-6 font-bold flex justify-center"
                >
                  이미 계정이 있다면
                  <Link to={"/Login"} className="ml-2 text-blue-600">
                    Login
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
