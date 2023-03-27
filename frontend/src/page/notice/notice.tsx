import { gql, useMutation, useQuery } from "@apollo/client";
import { Alert, Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Tiptap from "../../component/Tiptap";
import { EditNoticeMutation } from "../../gql/graphql";
import { NoticeStatus } from "../../gql/graphql";
import { useMeQuery } from "../../hook/query/useMeQuery";
import { Toast } from "../../lib/sweetalert2/toast";

const EDIT_NOTICE_MUTATION = gql`
  mutation editNotice($input: EditNoticeInput!) {
    editNotice(input: $input) {
      ok
      error
    }
  }
`;

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
  const [editNotice, { loading: editNoticeLoading }] = useMutation(
    EDIT_NOTICE_MUTATION,
    {
      onCompleted: (data: EditNoticeMutation) => {
        const {
          editNotice: { ok, error },
        } = data;

        if (ok) {
          getNoticeRefetch();
          Toast.fire({
            icon: "success",
            title: `공지사항 수정이 완료되었습니다`,
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
    }
  );
  const { data: meData } = useMeQuery();
  const [tiptap, setTiptap] = useState<any>(null);
  const {
    data: getNoticeData,
    loading: getNoticeLoading,
    refetch: getNoticeRefetch,
  } = useQuery(GET_NOTICE_QUERY, {
    variables: {
      input: {
        id: Number(id),
      },
    },
  });
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
    if (
      !editNoticeLoading &&
      !getNoticeLoading &&
      getNoticeData?.getNotice?.ok
    ) {
      tiptap.commands.clearContent(true);
      tiptap.commands.insertContent(getNoticeData?.getNotice?.notice?.contents);
    }
  }, [
    getNoticeLoading,
    getNoticeData?.getNotice?.ok,
    getNoticeData?.getNotice?.notice?.contents,
    tiptap?.commands,
    editNoticeLoading,
  ]);

  const onSubmit = async (values: any) => {
    if (!editNoticeLoading) {
      editNotice({
        variables: {
          input: {
            id: getNoticeData?.getNotice?.notice?.id,
            title: values.title,
            contents: tiptap.getHTML(),
          },
        },
      });
    }
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
              {getNoticeData?.getNotice?.notice && (
                <Input
                  defaultValue={getNoticeData?.getNotice?.notice?.title}
                  {...register("title", {
                    required: "제목을 입력해 주세요",
                  })}
                  label="제목"
                  size="lg"
                />
              )}
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
