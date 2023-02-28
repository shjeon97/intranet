import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

import useRealtimeClock from "../../hook/useRealTimeClock";

const WorkCard = () => {
  const time = useRealtimeClock();

  return (
    <Card className="w-10/12 mx-auto md:w-96 lg:hidden ">
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
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {time}
        </Typography>
        {/* <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2"
        ></Typography> */}
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Button size="lg" className=" text-center w-full">
          출근하기
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkCard;
