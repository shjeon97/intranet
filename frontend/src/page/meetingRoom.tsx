import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Option,
  Select as MaterialSelect,
  Typography,
  Textarea,
  Alert,
} from "@material-tailwind/react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import Selecto from "react-selecto";
import { Toast } from "../lib/sweetalert2/toast";
import {
  CreateMeetingRoomMutation,
  CreateReservationInput,
  CreateReservationMutation,
  User,
} from "../gql/graphql";
import Select from "react-select";
import { useGetUsersQuery } from "../hook/query/useGetUsersQuery";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

export const ALL_MEETING_ROOM_QUERY = gql`
  query allMeetingRoom {
    allMeetingRoom {
      ok
      error
      meetingRooms {
        name
        id
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

const CREATE_MEETING_ROOM_MUTATION = gql`
  mutation createMeetingRoom($input: CreateMeetingRoomInput!) {
    createMeetingRoom(input: $input) {
      ok
      error
    }
  }
`;

interface IFormInput extends CreateReservationInput {}

export const MeetingRoom = () => {
  const { data, refetch } = useQuery(ALL_MEETING_ROOM_QUERY);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [selectStartTime, setSelectStartTime] = useState<string | null>(null);
  const [selectEndTime, setSelectEndTime] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [meetingRoomName, setMeetingRoomName] = useState<string | null>(null);
  const [meetingRoomId, setMeetingRoomId] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const handleOpen = () => setOpen((cur) => !cur);
  const [size, setSize] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "xxl">(
    "md"
  );
  const { data: getUsersData } = useGetUsersQuery();
  const [users, setUsers] = useState<{ value: number; label: string }[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({ mode: "onChange" });

  useEffect(() => {
    if (getUsersData?.getUsers.users) {
      getUsersData?.getUsers.users.map((user: User) => {
        return setUsers((users) => [
          ...users,
          {
            value: user.id,
            label: `${user.teams[0]?.name ? user.teams[0]?.name : ""} ${
              user.name
            }`,
          },
        ]);
      });
    }
  }, [getUsersData?.getUsers.ok, getUsersData?.getUsers.users]);

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
        setOpen(false);
        setSelectedOption(null);
        reset();
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

  const [createMeetingRoom, { loading: createMeetingRoomLoading }] =
    useMutation(CREATE_MEETING_ROOM_MUTATION, {
      onCompleted: (data: CreateMeetingRoomMutation) => {
        const {
          createMeetingRoom: { ok, error },
        } = data;

        if (ok) {
          refetch();
          Toast.fire({
            icon: "success",
            title: `회의실 생성이 완료되었습니다`,
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

  const onSubmit: SubmitHandler<IFormInput> = async ({ reason, title }) => {
    if (createReservationLoading) {
      return;
    }

    if (!selectedOption || !selectedOption[0]?.value) {
      return setSelectedOption([]);
    }

    let userIds: Number[] = [];

    selectedOption.map((option: any) => userIds.push(option.value));

    await createReservation({
      variables: {
        input: {
          date,
          startTime: selectStartTime?.split("~")[0],
          endTime: selectEndTime?.split("~")[1],
          meetingRoomId,
          reason,
          title,
          userIds,
        },
      },
    });
  };
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
        <Button
          onClick={() =>
            Swal.fire({
              title: "회의실 추가",
              showCancelButton: true,
              inputLabel: "회의실 이름",
              input: "text",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "생성",
              inputValidator: (result) => {
                return !result ? "이름을 입력해주세요" : null;
              },
            }).then((result) => {
              if (result.isConfirmed) {
                if (createMeetingRoomLoading) {
                  return;
                }

                createMeetingRoom({
                  variables: {
                    input: {
                      name: result.value,
                    },
                  },
                });
              }
            })
          }
        >
          회의실 추가
        </Button>
      </div>
      <div className="flex flex-wrap">
        {data?.allMeetingRoom?.meetingRooms &&
          data?.allMeetingRoom?.meetingRooms.map(
            (meetingRoom: any, index: number) => {
              return (
                <div key={index} className="flex gap-5 text-lg">
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
                        setMeetingRoomId(
                          Number(el.getAttribute("data-meeting-room-id"))
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
                  <div className="elements selecto-area" id="selecto">
                    <Typography
                      variant="h5"
                      color="white"
                      className="sticky top-0 rounded-xl bg-[#299fff] text-white p-3"
                    >
                      {meetingRoom.name}
                    </Typography>
                    <div className="overflow-auto w-36">
                      {reservationTimeList.map((reservationTime) => (
                        <div
                          data-value={reservationTime}
                          data-meeting-room-name={meetingRoom.name}
                          data-meeting-room-id={meetingRoom.id}
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
        className="bg-transparent shadow-none "
      >
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h3">회의실 예약</Typography>
              <Typography variant="h5">회의실 : {meetingRoomName}</Typography>
              <div>
                <Input
                  {...register("title", {
                    required: "제목을 입력해 주세요",
                  })}
                  label="제목"
                />
                {errors.title?.message && (
                  <Alert
                    className="row-start-2 font-medium col-start-1 xl:col-end-9 col-end-6 mt-2 p-2"
                    color="red"
                  >
                    {`${errors.title?.message}`}
                  </Alert>
                )}
              </div>
              <MaterialSelect
                value={selectStartTime || ""}
                label="시작"
                onChange={(value) => value && setSelectStartTime(value)}
              >
                {reservationTimeList.map((reservationTime) => (
                  <Option key={reservationTime} value={reservationTime}>
                    {reservationTime}
                  </Option>
                ))}
              </MaterialSelect>

              <MaterialSelect
                value={selectEndTime || ""}
                label="종료"
                onChange={(value) => value && setSelectEndTime(value)}
              >
                {reservationTimeList.map((reservationTime) => (
                  <Option key={reservationTime} value={reservationTime}>
                    {reservationTime}
                  </Option>
                ))}
              </MaterialSelect>
              <div>
                <Textarea
                  {...register("reason", {
                    required: "사유를 입력해 주세요",
                  })}
                  label="사유"
                />
                {errors.reason?.message && (
                  <Alert
                    className="row-start-2 font-medium  col-start-1 xl:col-end-9 col-end-6 mt-2 p-2"
                    color="red"
                  >
                    {`${errors.reason?.message}`}
                  </Alert>
                )}
              </div>
              <div>
                <div className=" font-medium text-sm mb-2">참여인원</div>
                <Select
                  onChange={setSelectedOption}
                  options={users}
                  isMulti
                  className="font-bold"
                />
                {selectedOption && !selectedOption[0]?.value && (
                  <Alert
                    className="row-start-2 font-medium  col-start-1 xl:col-end-9 col-end-6 mt-2 p-2"
                    color="red"
                  >
                    참여인원을 입력해주세요.
                  </Alert>
                )}
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <div className="flex gap-3">
                <Button color="red" onClick={handleOpen} fullWidth>
                  취소
                </Button>
                <Button type="submit" fullWidth>
                  예약
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </div>
  );
};
