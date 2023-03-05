import { gql, useLazyQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import { differenceInHours, format } from "date-fns";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { WORK_STATUS_NAMES } from "../../constants";
import useCreateWorkMutation from "../../hook/mutation/useCreateWorkMutation";
import useEditWorkMutation from "../../hook/mutation/useEditWorkMutation";
import { useMeQuery } from "../../hook/query/useMeQuery";
import useRealtimeClock from "../../hook/useRealTimeClock";
import { Toast } from "../../lib/sweetalert2/toast";

export const FIND_WORK_QUERY = gql`
  query findWork($input: FindWorkInput!) {
    findWork(input: $input) {
      ok
      error
      work {
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

const WorkCard = () => {
  const time = useRealtimeClock();
  const { createWork, loading: createWorkLoading } = useCreateWorkMutation();
  const { editWork, loading: editWorkLoading } = useEditWorkMutation();
  const { data } = useMeQuery();
  const [loadFindWorkQuery, { data: workData, refetch }] =
    useLazyQuery(FIND_WORK_QUERY);

  useEffect(() => {
    if (data?.me?.id) {
      loadFindWorkQuery({
        variables: {
          input: {
            userId: data?.me?.id,
            date: format(new Date(), "yyyy MM dd"),
          },
        },
      });
    }
  }, [data?.me?.id, loadFindWorkQuery]);

  const handleMemo = () => {
    Swal.fire({
      title: "근무노트",
      input: "textarea",
      inputValue: workData?.findWork?.work?.memo,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "변경",
      showCancelButton: true,
      cancelButtonText: "닫기",
    }).then(async (result) => {
      if (!editWorkLoading && result.isConfirmed) {
        const response = await editWork({
          userId: data?.me?.id,
          date: workData?.findWork?.work?.date,
          memo: result.value,
        });
        if (response.ok) {
          refetch();
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

  const handleStartWork = async () => {
    if (!createWorkLoading && data) {
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
              userId: data.me.id,
              memo: `지각 사유 : ${result.value}`,
            });
            if (response.ok) {
              refetch();
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
              userId: data.me.id,
            });
            if (response.ok) {
              refetch();
            }
          } else if (result.isDenied) {
            const response = await createWork({
              date: format(new Date(), "yyyy MM dd"),
              startTime: "08:00:00",
              workStatusName: WORK_STATUS_NAMES.InSiteWork,
              userId: data.me.id,
            });
            if (response.ok) {
              refetch();
            }
          }
        });
      } else {
        const response = await createWork({
          date: format(new Date(), "yyyy MM dd"),
          startTime: format(new Date(), "HH:mm:ss"),
          workStatusName: WORK_STATUS_NAMES.InSiteWork,
          userId: data.me.id,
        });
        if (response.ok) {
          refetch();
        }
      }
    }
  };

  const handleEndWork = async () => {
    if (!editWorkLoading) {
      if (
        differenceInHours(workData?.findWork?.work?.startTime, new Date()) <= 10
      ) {
      }
    }
  };

  return (
    <Card>
      <CardHeader
        color="blue"
        floated={false}
        className="grid h-14 place-items-center"
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
            <div className="flex flex-wrap justify-between gap-2 w-full pt-2">
              <Chip
                color={workData?.findWork?.work?.workStatus?.color}
                value={workData?.findWork?.work?.workStatus?.name}
              />
              <div className=" cursor-pointer" onClick={() => handleMemo()}>
                <Chip value="근무노트" />
              </div>
            </div>
            <div className="flex flex-wrap justify-left gap-2 w-full pt-2">
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
      <CardFooter>
        {workData?.findWork?.work?.workStatus ? (
          <div className="w-full mt-3">
            <Button
              color="green"
              onClick={() => handleEndWork()}
              size="lg"
              className=" text-center w-full"
            >
              퇴근하기
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => handleStartWork()}
            size="lg"
            className=" text-center w-full"
          >
            출근하기
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default WorkCard;
