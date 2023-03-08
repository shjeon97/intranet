import { gql, useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import { format, formatDistanceToNowStrict } from "date-fns";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { isLoggedInVar, isSidebarOpenVar } from "../../apollo";
import { LOCAL_STORAGE_TOKEN, WORK_STATUS_NAMES } from "../../constants";
import { CreateRestMutation, EndWorkMutation } from "../../gql/graphql";
import useCreateWorkMutation from "../../hook/mutation/useCreateWorkMutation";
import useEditRestMutation from "../../hook/mutation/useEditRestMutation";
import useEditWorkMutation from "../../hook/mutation/useEditWorkMutation";
import { useMeQuery } from "../../hook/query/useMeQuery";
import useRealtimeClock from "../../hook/useRealTimeClock";
import { Toast } from "../../lib/sweetalert2/toast";

export const CREATE_REST_MUTATION = gql`
  mutation createRest($input: CreateRestInput!) {
    createRest(input: $input) {
      ok
      error
    }
  }
`;

export const END_WORK_MUTATION = gql`
  mutation endWork($input: EndWorkInput!) {
    endWork(input: $input) {
      ok
      error
    }
  }
`;

export const FIND_WORK_QUERY = gql`
  query findWork($input: FindWorkInput!) {
    findWork(input: $input) {
      ok
      error
      work {
        id
        startTime
        endTime
        date
        workStatus {
          name
          color
        }
        memo
      }
    }
  }
`;

export const FIND_RESTING_QUERY = gql`
  query findResting($input: FindRestingInput!) {
    findResting(input: $input) {
      ok
      error
      rest {
        id
        startTime
        reason
      }
    }
  }
`;

const WorkCard = () => {
  const navigate = useNavigate();
  const time = useRealtimeClock();
  const { createWork, loading: createWorkLoading } = useCreateWorkMutation();
  const { editWork, loading: editWorkLoading } = useEditWorkMutation();
  const { editRest, loading: editRestLoading } = useEditRestMutation();
  const [endWork, { loading: endWorkLoading }] = useMutation(
    END_WORK_MUTATION,
    {
      onCompleted: async (data: EndWorkMutation) => {
        const {
          endWork: { ok, error },
        } = data;

        if (ok) {
          await Toast.fire({
            icon: "success",
            title: `정상적으로 퇴근처리 되었습니다`,
            position: "top-end",
            timer: 1200,
          });
          onClickHandlerLogout();
          workRefetch();
        } else if (error) {
          Toast.fire({
            icon: "error",
            position: "top-end",
            title: error,
            timer: 1200,
          });
        }
      },
    }
  );

  const [createRest, { loading: createRestLoading }] = useMutation(
    CREATE_REST_MUTATION,
    {
      onCompleted: (data: CreateRestMutation) => {
        const {
          createRest: { ok, error },
        } = data;

        if (ok) {
          Toast.fire({
            icon: "success",
            title: `휴게 시작`,
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
    }
  );
  const { data: meData } = useMeQuery();
  const [loadFindWorkQuery, { data: workData, refetch: workRefetch }] =
    useLazyQuery(FIND_WORK_QUERY);
  const [loadFindRestingQuery, { data: restingData, refetch: restingRefetch }] =
    useLazyQuery(FIND_RESTING_QUERY);

  const onClickHandlerLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    isLoggedInVar(false);
    isSidebarOpenVar(false);
    navigate("/login");
  };

  useEffect(() => {
    if (meData?.me?.id) {
      loadFindWorkQuery({
        variables: {
          input: {
            userId: meData?.me?.id,
            date: format(new Date(), "yyyy MM dd"),
          },
        },
      });
    }
  }, [meData?.me?.id, loadFindWorkQuery]);

  useEffect(() => {
    if (workData?.findWork?.work?.id) {
      loadFindRestingQuery({
        variables: {
          input: {
            workId: workData?.findWork?.work?.id,
          },
        },
      });
    }
  }, [workData?.findWork?.work?.id, loadFindRestingQuery]);

  const handleMemo = () => {
    Swal.fire({
      title: "근무노트",
      input: "textarea",
      inputValue: workData?.findWork?.work?.memo
        ? workData?.findWork?.work?.memo
        : "",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "변경",
      showCancelButton: true,
      cancelButtonText: "닫기",
    }).then(async (result) => {
      if (!editWorkLoading && result.isConfirmed) {
        const response = await editWork({
          userId: meData?.me?.id,
          date: workData?.findWork?.work?.date,
          memo: result.value,
        });
        if (response.ok) {
          workRefetch();
          Toast.fire({
            icon: "success",
            title: "근무노트 수정완료",
            timer: 1000,
            position: "top-end",
          });
        }
      }
    });
  };
  const handleStartRest = () => {
    Swal.fire({
      title: "휴게 시작하기",
      inputLabel: "사유 (빈값 가능)",
      input: "text",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "휴게 시작",
      showCancelButton: true,
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (!createRestLoading && result.isConfirmed) {
        await createRest({
          variables: {
            input: {
              workId: workData?.findWork?.work?.id,
              startTime: format(new Date(), "HH:mm:ss"),
              reason: result.value,
            },
          },
        });
        restingRefetch();
      }
    });
  };
  const handleEndRest = () => {
    Swal.fire({
      title: "휴게 종료하기",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "휴게 종료",
      showCancelButton: true,
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (!editRestLoading && result.isConfirmed) {
        const response = await editRest({
          id: restingData?.findResting?.rest?.id,
          endTime: format(new Date(), "HH:mm:ss"),
        });
        if (response.ok) {
          restingRefetch();
          Toast.fire({
            icon: "success",
            title: "휴게종료",
            timer: 1000,
            position: "top-end",
          });
        }
      }
    });
  };

  const handleStartWork = async () => {
    if (!createWorkLoading && meData) {
      if (
        Number(format(new Date(), "HH")) >= 10 &&
        Number(format(new Date(), "mm")) > 0
      ) {
        Swal.fire({
          html: "10시가 지나서 지각으로 처리됩니다 <br/> 지각 사유 입력해 주세요",
          icon: "warning",
          input: "text",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "확인",
          showCancelButton: true,
          cancelButtonText: "취소",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const response = await createWork({
              date: format(new Date(), "yyyy MM dd"),
              startTime: format(new Date(), "HH:mm:ss"),
              workStatusName: WORK_STATUS_NAMES.Late,
              userId: meData.me.id,
              memo: `지각 사유 : ${result.value}`,
            });
            if (response.ok) {
              workRefetch();
            }
          }
        });
      } else if (Number(format(new Date(), "HH")) < 8) {
        Swal.fire({
          html: "현장출근 확인 <br/> 정상출근 클릭시 8시 출근으로 기록 됩니다 ",
          icon: "info",
          confirmButtonColor: "green",
          cancelButtonColor: "#d33",
          denyButtonColor: "#3085d6",
          showCancelButton: true,
          showDenyButton: true,
          confirmButtonText: WORK_STATUS_NAMES.OnSiteWork,
          denyButtonText: WORK_STATUS_NAMES.InSiteWork,
          cancelButtonText: "취소",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const response = await createWork({
              date: format(new Date(), "yyyy MM dd"),
              startTime: format(new Date(), "HH:mm:ss"),
              workStatusName: WORK_STATUS_NAMES.OnSiteWork,
              userId: meData.me.id,
            });
            if (response.ok) {
              workRefetch();
            }
          } else if (result.isDenied) {
            const response = await createWork({
              date: format(new Date(), "yyyy MM dd"),
              startTime: "08:00:00",
              workStatusName: WORK_STATUS_NAMES.InSiteWork,
              userId: meData.me.id,
            });
            if (response.ok) {
              workRefetch();
            }
          }
        });
      } else {
        const response = await createWork({
          date: format(new Date(), "yyyy MM dd"),
          startTime: format(new Date(), "HH:mm:ss"),
          workStatusName: WORK_STATUS_NAMES.InSiteWork,
          userId: meData.me.id,
        });
        if (response.ok) {
          workRefetch();
        }
      }
    }
  };

  const handleEndWork = async () => {
    if (!endWorkLoading) {
      // 최소 근무시간 미달
      if (
        parseInt(
          formatDistanceToNowStrict(
            new Date(
              `${format(new Date(), "yyyy MM dd")} ${
                workData?.findWork?.work?.startTime
              }`
            ),
            { unit: "minute" }
          )
        ) < 540 &&
        workData?.findWork?.work?.workStatus?.name !== WORK_STATUS_NAMES.Late
      ) {
        Toast.fire({
          icon: "error",
          title: "최소 근무시간 미달입니다",
          timer: 1200,
          position: "top-end",
        });
      }
      // 연장근무
      else if (
        parseInt(
          formatDistanceToNowStrict(
            new Date(
              `${format(new Date(), "yyyy MM dd")} ${
                workData?.findWork?.work?.startTime
              }`
            ),
            { unit: "minute" }
          )
        ) > 660
      ) {
        Swal.fire({
          html: "연장근무 <br/> 사유 입력해 주세요",
          icon: "info",
          input: "text",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "확인",
          showCancelButton: true,
          cancelButtonText: "취소",
        }).then(async (result) => {
          if (result.isConfirmed) {
            endWork({
              variables: {
                input: {
                  userId: meData.me.id,
                  date: format(new Date(), "yyyy MM dd"),
                  overtimeReason: `${result.value}`,
                },
              },
            });
          }
        });
      }
      // 지각
      else if (
        workData?.findWork?.work?.workStatus?.name === WORK_STATUS_NAMES.Late &&
        Number(format(new Date(), "HH")) < 19
      ) {
        Toast.fire({
          icon: "error",
          title: "최소 근무시간 미달입니다1",
          timer: 1200,
          position: "top-end",
        });
      }
      // 정상퇴근
      else {
        endWork({
          variables: {
            input: {
              userId: meData.me.id,
              date: format(new Date(), "yyyy MM dd"),
            },
          },
        });
      }
    }
  };

  return (
    <Card>
      <CardHeader
        color="blue"
        floated={false}
        className="grid h-20 lg:h-14 place-items-center"
      >
        <Typography variant="h5" color="white">
          오늘근무
        </Typography>
      </CardHeader>
      <CardBody className="text-left">
        <Typography variant="h5" color="blue-gray">
          {time}
        </Typography>
        {workData?.findWork?.work?.workStatus && (
          <>
            <div className="flex flex-wrap justify-between lg:gap-1 gap-2 w-full pt-2">
              <Chip
                color={workData?.findWork?.work?.workStatus?.color}
                value={workData?.findWork?.work?.workStatus?.name}
              />
              <div className=" cursor-pointer" onClick={() => handleMemo()}>
                <Chip value="근무노트" />
              </div>
              {workData?.findWork?.work?.approvalUserId ? (
                <Chip color="green" value="승인" />
              ) : (
                <Chip color="blue-gray" value="미승인" />
              )}
            </div>
            <div className="flex flex-wrap justify-left lg:justify-between gap-2  w-full pt-2">
              <Chip
                color="blue-gray"
                value={workData?.findWork?.work?.startTime}
              />
              ~
              <Chip
                color="blue-gray"
                value={
                  workData?.findWork?.work?.endTime
                    ? workData?.findWork?.work?.endTime
                    : "근무중..."
                }
              />
            </div>
          </>
        )}
      </CardBody>
      {workData?.findWork?.work?.workStatus &&
      workData?.findWork?.work?.workStatus?.name !==
        WORK_STATUS_NAMES.LeaveWork ? (
        <CardFooter>
          <div className=" grid grid-cols-12 w-full lg:gap-1 gap-3">
            {restingData?.findResting?.ok ? (
              <Button
                onClick={() => handleEndRest()}
                className=" col-span-6 text-center"
              >
                휴게종료
              </Button>
            ) : (
              <Button
                onClick={() => handleStartRest()}
                className=" col-span-6 text-center"
              >
                휴게시작
              </Button>
            )}

            <Button
              color="green"
              onClick={() => handleEndWork()}
              className="col-span-6 text-center w-full"
            >
              퇴근하기
            </Button>
          </div>
        </CardFooter>
      ) : (
        workData?.findWork?.work?.workStatus?.name !==
          WORK_STATUS_NAMES.LeaveWork && (
          <CardFooter>
            <Button
              onClick={() => handleStartWork()}
              size="lg"
              className=" text-center w-full"
            >
              출근하기
            </Button>
          </CardFooter>
        )
      )}
    </Card>
  );
};

export default WorkCard;
