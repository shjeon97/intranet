import { gql, useQuery } from "@apollo/client";
import { Alert, Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Tiptap from "../../component/Tiptap";
import { NoticeStatus } from "../../gql/graphql";
import { useMeQuery } from "../../hook/query/useMeQuery";

export const GET_NOTICE_QUERY = gql`
  query getNotice($input: GetNoticeInput!) {
    getNotice(input: $input) {
      ok
      error
      notice {
        id
        title
        contents
        createdAt
        updatedAt
        status
        lastUpdateUserId
        user {
          id
          name
        }
      }
    }
  }
`;

export default function Notice() {
  const { id } = useParams();
  const { data: meData, loading: meLoading } = useMeQuery();
  const [tiptap, setTiptap] = useState<any>(null);
  const { data: getNoticeData, loading: getNoticeLoading } = useQuery(
    GET_NOTICE_QUERY,
    {
      variables: {
        input: {
          id: Number(id),
        },
      },
    }
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const tiptapEditor = (editor: any) => {
    if (editor) {
      setTiptap(editor);
    }
  };

  useEffect(() => {
    if (!getNoticeLoading && getNoticeData?.getNotice?.ok) {
      tiptap.commands.insertContent(getNoticeData?.getNotice?.notice?.contents);
    }
  }, [
    getNoticeLoading,
    getNoticeData?.getNotice?.ok,
    getNoticeData?.getNotice?.notice?.contents,
    tiptap?.commands,
  ]);

  const onSubmit = async (values: any) => {
    console.log(values);
  };

  return (
    <>
      <div className="mx-auto xl:max-w-screen-xl overflow-auto py-2 px-4 lg:px-8 lg:py-4 h-screen">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-end mb-2">
            {getNoticeData?.getNotice?.notice?.status ===
              NoticeStatus.Anyone && <Button type="submit">수정</Button>}
            {getNoticeData?.getNotice?.notice?.status === NoticeStatus.Writer &&
              meData?.me?.id === getNoticeData?.getNotice?.notice?.user.id &&
              NoticeStatus.Anyone && <Button type="submit">수정</Button>}
          </div>
          <div className=" lg:grid lg:grid-cols-12 justify-between  gap-2 flex flex-wrap">
            <div className="row-span-1 col-start-1 xl:col-end-9 col-end-6">
              <Input
                {...register("title", {
                  required: "제목을 입력해 주세요",
                })}
                label="제목"
                defaultValue={getNoticeData?.getNotice?.notice?.title}
                size="lg"
              />
            </div>
            {errors.title?.message && (
              <Alert
                className="row-start-2  col-start-1 xl:col-end-9 col-end-6 mt-2 p-2"
                color="red"
              >
                {`${errors.title?.message}`}
              </Alert>
            )}
            <div className="row-span-1 col-start-7 col-end-13 lg:col-start-9 xl:col-start-10">
              {getNoticeData?.getNotice?.notice?.status && (
                <Input
                  className=" pointer-events-none"
                  label={"수정가능"}
                  defaultValue={
                    getNoticeData?.getNotice?.notice?.status ===
                    NoticeStatus.Anyone
                      ? "전인원"
                      : "작성자만"
                  }
                />
              )}
            </div>
          </div>
          <div className="h-4" />
        </form>
        <div className=" h-2/3">
          <Tiptap editor={tiptapEditor} />
        </div>
      </div>
    </>
  );
}
