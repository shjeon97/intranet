import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { WORK_STATUS_NAMES } from "../../constants";
import useCreateWorkMutation from "../../hook/useCreateWorkMutation";
import { useMeQuery } from "../../hook/useMeQuery";

import useRealtimeClock from "../../hook/useRealTimeClock";

const WorkCard = () => {
  const time = useRealtimeClock();
  const { createWork, loading } = useCreateWorkMutation();
  const { data } = useMeQuery();

  const handleCreateWork = async () => {
    if (!loading && data) {
      // 지각
      if (
        Number(format(new Date(), "HH")) > 10 &&
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
              date: format(new Date(), "MM dd"),
              startTime: format(new Date(), "HH mm"),
              workStatusName: WORK_STATUS_NAMES.Late,
              userId: data.me.id,
              memo: `지각 사유 : ${result.value}`,
            });
            if (response.ok) {
              console.log(response);
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
              date: format(new Date(), "MM dd"),
              startTime: format(new Date(), "HH mm"),
              workStatusName: WORK_STATUS_NAMES.OnSiteWork,
              userId: data.me.id,
            });
            if (response.ok) {
              console.log(response);
            }
          } else if (result.isDenied) {
            const response = await createWork({
              date: format(new Date(), "MM dd"),
              startTime: "08 00",
              workStatusName: WORK_STATUS_NAMES.InSiteWork,
              userId: data.me.id,
            });
            if (response.ok) {
              console.log(response);
            }
          }
        });
      } else {
        const response = await createWork({
          date: format(new Date(), "MM dd"),
          startTime: format(new Date(), "HH mm"),
          workStatusName: WORK_STATUS_NAMES.InSiteWork,
          userId: data.me.id,
        });
        if (response.ok) {
          console.log(response);
        }
      }
    }
  };

  return (
    <Card>
      <CardHeader
        color="blue"
        floated={false}
        className="grid h-20 place-items-center"
      >
        <Typography variant="h4" color="white">
          오늘근무
        </Typography>
      </CardHeader>
      <CardBody className="text-left">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {time}
        </Typography>
        {/* <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2"
        ></Typography> */}
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Button
          onClick={() => handleCreateWork()}
          size="lg"
          className=" text-center w-full"
        >
          출근하기
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkCard;
