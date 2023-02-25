import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  Input,
  Switch,
  Typography,
} from "@material-tailwind/react";
import { ME_QUERY } from "../../hook/useMe";
import { EditUserInput, EditUserMutation, Role, Team } from "../../gql/graphql";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../../component/loading";
import Swal from "sweetalert2";
import { Toast } from "../../lib/sweetalert2/toast";

const EDIT_USER_MUTATION = gql`
  mutation editUser($input: EditUserInput!) {
    editUser(input: $input) {
      ok
      error
    }
  }
`;

interface IFormInput extends EditUserInput {
  changePassword: string;
  confirmPassword: string;
}

function Me() {
  const { data, loading: meLoading, refetch } = useQuery(ME_QUERY);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "onChange" });

  const [editUser, { loading }] = useMutation(EDIT_USER_MUTATION, {
    onCompleted: (data: EditUserMutation) => {
      const {
        editUser: { ok, error },
      } = data;
      if (ok) {
        refetch();
        Toast.fire({
          icon: "success",
          title: `유저정보 수정이 완료되었습니다`,
          position: "top-end",
          timer: 1200,
        });
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

  const onSubmit = async (formData: IFormInput) => {
    if (loading) {
      return;
    }
    if (isChangePassword) {
      if (formData.changePassword !== formData.confirmPassword) {
        Swal.fire({
          title: "Error!",
          text: "변경할 비밀번호가 일치하지 않습니다",
          icon: "error",
          confirmButtonText: "Okay",
        });
        return;
      }
    }
    const { confirmPassword: temp, ...formDataWithoutConfirmPassword } =
      formData;

    await editUser({
      variables: {
        input: {
          ...formDataWithoutConfirmPassword,
        },
      },
    });
  };

  if (meLoading && !data) {
    return <Loading />;
  } else {
    return (
      <div className="flex flex-col items-center justify-center p-6 mt-10">
        <div className=" w-10/12 mx-auto md:w-96">
          <Card>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                내 정보
              </Typography>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardBody className="flex flex-col gap-4">
                <input
                  type={"number"}
                  className="hidden"
                  {...register("userId", {
                    valueAsNumber: true,
                  })}
                  defaultValue={data?.me.id}
                />
                <Input
                  type={"email"}
                  {...register("email", { required: "이메일을 입력해 주세요" })}
                  label="Email"
                  size="lg"
                  defaultValue={data?.me.email}
                />
                {errors.email?.message && (
                  <Alert className="p-2" color="red">
                    {`${errors.email?.message}`}
                  </Alert>
                )}
                <Input
                  defaultValue={data?.me.name}
                  {...register("name", {
                    required: "이름을 입력해 주세요",
                  })}
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
                  })}
                  type={"password"}
                  label="Password"
                  size="lg"
                />
                <label className="flex text-sm px-2 -mt-2">
                  정보를 변경하려면 현재 비밀번호를 입력하세요
                  {errors.password?.type === "pattern" && (
                    <IconButton className="flex rounded-full h-7 " color="red">
                      <FontAwesomeIcon icon={solid("xmark")} />
                    </IconButton>
                  )}
                </label>
                {errors.password?.message && (
                  <Alert className="p-2" color="red">
                    {`${errors.password?.message}`}
                  </Alert>
                )}
                <Switch
                  onChange={() => setIsChangePassword(!isChangePassword)}
                  label="비밀번호 변경"
                />
                {isChangePassword && (
                  <>
                    <Input
                      {...register("changePassword", {
                        required: "변경할 비밀번호를 입력해 주세요",
                        pattern: new RegExp(
                          `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,16}$`
                        ),
                      })}
                      type={"password"}
                      label="Change Password"
                      size="lg"
                    />
                    <label className="flex text-sm px-2 -mt-2">
                      8~16자리 영문 대소문자, 숫자, 특수문자 중 3가지 이상
                      조합으로 만들어주세요.
                      {errors.changePassword?.type === "pattern" && (
                        <IconButton
                          className="flex rounded-full h-7 "
                          color="red"
                        >
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
                  </>
                )}

                <Input
                  defaultValue={data?.me.position}
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
                  defaultValue={data?.me.startDate}
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
                  defaultValue={data?.me.birthday}
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
                  defaultValue={data?.me.phone}
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
                <div className="grid grid-cols-2">
                  <div className="">
                    <Typography variant="h6">팀</Typography>
                    <div className="flex flex-wrap gap-2">
                      {data?.me?.teams?.map((team: Team, index: number) => (
                        <Chip
                          key={`team-name-${index}`}
                          color="cyan"
                          value={team.name}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <Typography variant="h6">권한</Typography>
                    <div className="flex flex-wrap gap-2">
                      {data?.me?.roles?.map((role: Role, index: number) => (
                        <Chip
                          key={`role-name-${index}`}
                          color="indigo"
                          value={role.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button type="submit" variant="gradient" fullWidth>
                  수정
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    );
  }
}

export default Me;
