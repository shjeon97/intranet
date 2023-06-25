import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Alert,
  Button,
  Collapse,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Tiptap from "../../component/Tiptap";
import { Page, PageSize } from "../../constants";
import { Notice, NoticeStatus, CreateNoticeMutation } from "../../gql/graphql";
import { Toast } from "../../lib/sweetalert2/toast";

const CREATE_NOTICE_MUTATION = gql`
  mutation createNotice($input: CreateNoticeInput!) {
    createNotice(input: $input) {
      ok
      error
    }
  }
`;

export const SEARCH_NOTICE_QUERY = gql`
  query searchNotice($input: SearchNoticeInput!) {
    searchNotice(input: $input) {
      ok
      error
      totalPage
      notices {
        id
        title
        contents
        status
        createdAt
        lastUpdateUserId
        updatedAt
        user {
          name
        }
      }
    }
  }
`;

export default function Notices() {
  const [createNotice, { loading: createNoticeLoading }] = useMutation(
    CREATE_NOTICE_MUTATION,
    {
      onCompleted: (data: CreateNoticeMutation) => {
        const {
          createNotice: { ok, error },
        } = data;
        if (ok) {
          Toast.fire({
            icon: "success",
            title: `공지사항 등록이 완료되었습니다`,
            position: "top-end",
            timer: 1200,
          });
          setOpen(false);
          searchNoticeRefetch();
          reset();
          tiptap.commands.clearContent(true);
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

  const [tiptap, setTiptap] = useState<any>(null);
  const [tableData, setTableData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [
    loadSearchNoticeQuery,
    {
      data: searchNoticeData,
      loading: searchNoticeLoading,
      refetch: searchNoticeRefetch,
    },
  ] = useLazyQuery(SEARCH_NOTICE_QUERY, {
    onCompleted: (data) => {
      setTableData([]);
      if (data.searchNotice.ok) {
        if (data.searchNotice?.notices) {
          data.searchNotice?.notices.map((notice: Notice) => {
            return setTableData((tableData: any) => {
              return [
                ...tableData,
                {
                  createdAt: format(new Date(notice.createdAt), "yyyy-MM-dd"),
                  title: (
                    <Link
                      className=" hover:underline"
                      to={`/notice/${notice.id}`}
                    >
                      {notice.title}
                    </Link>
                  ),
                  updatedAt: format(new Date(notice.updatedAt), "yyyy-MM-dd"),
                  userName: notice.user.name,
                },
              ];
            });
          });
        }
      }
    },
  });
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: Page - 1,
    pageSize: PageSize,
  });

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("createdAt", {
      header: () => "날짜",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("title", {
      header: () => "제목",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("userName", {
      header: () => "작성자",
      cell: (info) => info.getValue(),
    }),
  ];

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const tiptapEditor = (editor: any) => {
    if (editor) {
      setTiptap(editor);
    }
  };

  useEffect(() => {
    loadSearchNoticeQuery({
      variables: {
        input: {
          sort: "id",
          page: pagination.pageIndex + 1,
          pageSize: pagination.pageSize,
        },
      },
    });
  }, [loadSearchNoticeQuery, pagination]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      pagination,
    },
    pageCount: searchNoticeData?.searchNotice?.totalPage ?? -1,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  const onSubmit = async (values: any) => {
    if (!createNoticeLoading) {
      await createNotice({
        variables: {
          input: {
            status: values.status,
            title: values.title,
            contents: tiptap.getHTML(),
          },
        },
      });
    }
  };

  return (
    <div className="mx-auto xl:max-w-screen-xl overflow-auto py-2 px-4 lg:px-8 lg:py-4">
      <div className=" p-2">
        {!open && <Button onClick={toggleOpen}>공지 등록</Button>}
        <Collapse open={open}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between mb-2">
              <FontAwesomeIcon
                onClick={toggleOpen}
                size="2xl"
                icon={solid("xmark")}
              />
              <Button type="submit">등록</Button>
            </div>
            <div className=" lg:grid lg:grid-cols-12 justify-between  gap-2 flex flex-wrap">
              <div className="row-span-1 col-start-1 xl:col-end-9 col-end-6">
                <Input
                  {...register("title", {
                    required: "제목을 입력해 주세요",
                  })}
                  label="제목"
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
                <div
                  {...register("status", {
                    required: "수정권한을 선택해 주세요",
                  })}
                >
                  <Controller
                    name="status"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Select label="수정가능" onChange={onChange}>
                        <Option value={NoticeStatus.Anyone}>전인원</Option>
                        <Option value={NoticeStatus.Writer}>작성자만</Option>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {errors.status?.message && (
                <Alert
                  className=" row-start-2 col-start-9 xl:col-start-10 col-end-13  mt-2 p-2"
                  color="red"
                >
                  {`${errors.status?.message}`}
                </Alert>
              )}
            </div>
            <div className="h-4" />
          </form>
          <div className="h-96">
            <Tiptap editor={tiptapEditor} />
          </div>
        </Collapse>
      </div>
      <div className="hidden lg:block p-2">
        <div className="-my-2  sm:-mx-6 lg:-mx-8 border-gray-90">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="items-center">
              <div className="flex items-center gap-2 text-lg">
                <Button
                  size="lg"
                  className="border rounded py-1.5 px-3"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<<"}
                </Button>
                <Button
                  size="lg"
                  className="border rounded py-1.5 px-3"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<"}
                </Button>
                <Button
                  size="lg"
                  className="border rounded py-1.5 px-3"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  {">"}
                </Button>
                <Button
                  size="lg"
                  className="border rounded py-1.5 px-3"
                  onClick={() =>
                    table.setPageIndex(
                      searchNoticeData?.searchNotice?.totalPage
                    )
                  }
                  disabled={!table.getCanNextPage()}
                >
                  {">>"}
                </Button>
                <span className="flex items-center gap-1">
                  <div>Page</div>
                  <strong>
                    {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </strong>
                </span>
                <span className="flex items-center gap-1">
                  | Go to page:
                  <input
                    type="number"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      table.setPageIndex(page);
                    }}
                    className="border p-1 rounded w-16"
                  />
                </span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
                {searchNoticeLoading ? "Loading..." : null}
              </div>
            </div>
            <table className="min-w-full text-md  divide-y divide-gray-400">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        className="px-1.5 py-3 text-left font-medium uppercase tracking-wider"
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className=" divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        className="px-1.5 py-4 whitespace-nowrap font-medium text-gray-900"
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
