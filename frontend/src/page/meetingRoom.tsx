import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import Selecto from "react-selecto";
import { Toast } from "../lib/sweetalert2/toast";
import { CreateReservationMutation } from "../gql/graphql";

export const ALL_MEETING_ROOM_QUERY = gql`
  query allMeetingRoom {
    allMeetingRoom {
      ok
      error
      meetingRooms {
        name
      }
    }
  }
`;

const CREATE_RESERVATION_MUTATION = gql`
  mutation createReservation($input: CreateReservationInput!) {
    createReservation(input: $input) {
      ok
      error
    }
  }
`;

export const MeetingRoom = () => {
  const { data } = useQuery(ALL_MEETING_ROOM_QUERY);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [selectStartTime, setSelectStartTime] = useState<string | null>(null);
  const [selectEndTime, setSelectEndTime] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [meetingRoomName, setMeetingRoomName] = useState<string | null>(null);
  const handleOpen = () => setOpen((cur) => !cur);
  const [size, setSize] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "xxl">(
    "md"
  );

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth <= 960 && setSize("xl")
    );
  }, []);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth > 960 && setSize("md")
    );
  }, []);

  const [createReservation, { loading: createReservationLoading }] =
    useMutation(CREATE_RESERVATION_MUTATION, {
      onCompleted: (data: CreateReservationMutation) => {
        const {
          createReservation: { ok, error },
        } = data;
        if (ok) {
          Toast.fire({
            icon: "success",
            title: `회의실 예약이 완료되었습니다`,
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

  const reservationTimeList = [
    "08:00 ~ 08:30",
    "08:30 ~ 09:00",
    "09:00 ~ 09:30",
    "09:30 ~ 10:00",
    "10:00 ~ 10:30",
    "10:30 ~ 11:00",
    "11:00 ~ 11:30",
    "11:30 ~ 12:00",
    "12:00 ~ 12:30",
    "12:30 ~ 13:00",
    "13:00 ~ 13:30",
    "13:30 ~ 14:00",
    "14:00 ~ 14:30",
    "14:30 ~ 15:00",
    "15:00 ~ 15:30",
    "15:30 ~ 16:00",
    "16:00 ~ 16:30",
    "16:30 ~ 17:00",
    "17:00 ~ 17:30",
    "17:30 ~ 18:00",
    "18:00 ~ 18:30",
    "18:30 ~ 19:00",
    "19:00 ~ 19:30",
    "19:30 ~ 20:00",
    "20:00 ~ 20:30",
    "20:30 ~ 20:00",
  ];

  return (
    <div className="mx-auto xl:max-w-screen-xl overflow-auto py-2 px-4 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between mb-5">
        <div className="flex text-xl mt-2">
          <Input
            type="date"
            label="날짜"
            onChange={(e) => setDate(e.target.value)}
            defaultValue={date}
            size="lg"
          />
        </div>
        <Button>회의실 추가</Button>
      </div>
      <div className="flex flex-wrap">
        {data?.allMeetingRoom?.meetingRooms &&
          data?.allMeetingRoom?.meetingRooms.map(
            (meetingRoom: any, index: number) => {
              return (
                <div key={index} className="flex gap-14 text-lg">
                  <Selecto
                    dragContainer={".elements"}
                    selectableTargets={["#selecto .cube"]}
                    onSelect={(e) => {
                      e.added.forEach((el) => {
                        el.classList.add("bg-blue-300");
                        el.classList.add("text-white");
                      });
                      e.removed.forEach((el) => {
                        el.classList.remove("bg-blue-300");
                        el.classList.remove("text-white");
                      });
                    }}
                    onSelectStart={(e) => {
                      e.added.forEach((el) => {
                        setSelectStartTime(el.getAttribute("data-value"));
                      });
                    }}
                    onSelectEnd={async (e) => {
                      e.afterAdded.forEach((el) => {
                        setSelectEndTime(el.getAttribute("data-value"));
                        setMeetingRoomName(
                          el.getAttribute("data-meeting-room-name")
                        );
                      });
                      setOpen(true);
                    }}
                    hitRate={0}
                    selectByClick={true}
                    selectFromInside={true}
                    continueSelect={false}
                    continueSelectWithoutDeselect={true}
                    ratio={0}
                  ></Selecto>
                  <div className="elements selecto-area h-screen" id="selecto">
                    <Typography
                      variant="h5"
                      color="white"
                      className="sticky top-0 rounded-xl bg-[#299fff] text-white p-3"
                    >
                      {meetingRoom.name}
                    </Typography>
                    <div className="overflow-auto h-3/4 w-40">
                      {reservationTimeList.map((reservationTime) => (
                        <div
                          data-value={reservationTime}
                          data-meeting-room-name={meetingRoom.name}
                          key={reservationTime}
                          className="cube rounded-xl border border-gray-200 p-2 "
                        >
                          {reservationTime}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="empty elements"></div>
                </div>
              );
            }
          )}
      </div>
      <Dialog
        open={open}
        size={size}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card>
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h3">회의실 예약</Typography>
            <Typography variant="h5">{meetingRoomName}</Typography>
            <Input label="제목" />
            <Select
              label="시작"
              value={selectStartTime || ""}
              onChange={(value) => value && setSelectStartTime(value)}
            >
              {reservationTimeList.map((reservationTime) => (
                <Option key={reservationTime} value={reservationTime}>
                  {reservationTime}
                </Option>
              ))}
            </Select>

            <Select
              label="종료"
              value={selectEndTime || ""}
              onChange={(value) => value && setSelectEndTime(value)}
            >
              {reservationTimeList.map((reservationTime) => (
                <Option key={reservationTime} value={reservationTime}>
                  {reservationTime}
                </Option>
              ))}
            </Select>
            <Input label="사유" />
          </CardBody>
          <CardFooter className="pt-0">
            <div className="flex gap-3">
              <Button color="red" onClick={handleOpen} fullWidth>
                취소
              </Button>
              <Button onClick={handleOpen} fullWidth>
                예약
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
};
