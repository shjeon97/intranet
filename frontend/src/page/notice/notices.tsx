import { gql, useLazyQuery } from "@apollo/client";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Button, Input, MobileNav } from "@material-tailwind/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Tiptap from "../../component/Tiptap";
import { Page, PageSize } from "../../constants";
import { Notice } from "../../gql/graphql";

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
        lastUpdateUserId
      }
    }
  }
`;

export default function Notices() {
  const [tiptap, setTiptap] = useState<any>(null);
  const [tableData, setTableData] = useState<any>([]);
  const [openCreateNotice, setOpenCreateNotice] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [
    loadSearchNoticeQuery,
    { data: searchNoticeData, loading: searchNoticeLoading },
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
                  title: notice.title,
                  updatedAt: notice.updatedAt,
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
    columnHelper.accessor("title", {
      header: () => "제목",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("updatedAt", {
      header: () => "마지막 수정일",
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
    pageCount: searchNoticeData?.searchWorkRecord?.totalPage ?? -1,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  const onSubmit = async () => {
    console.log(tiptap.getHTML());
  };

  return (
    <div className="mx-auto xl:max-w-screen-xl overflow-scroll py-2 px-4 lg:px-8 lg:py-4">
      <div className=" p-2">
        {!openCreateNotice && (
          <Button onClick={() => setOpenCreateNotice(!openCreateNotice)}>
            공지 등록
          </Button>
        )}
        <MobileNav open={openCreateNotice}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between mb-2">
              <FontAwesomeIcon
                onClick={() => setOpenCreateNotice(!openCreateNotice)}
                size="2xl"
                icon={solid("xmark")}
              />
              <Button type="submit">등록</Button>
            </div>
            <Input
              {...register("title", {
                required: "제목을 입력해 주세요",
              })}
              label="제목"
              size="lg"
            />
            {errors.title?.message && (
              <Alert className="mt-2 p-2" color="red">
                {`${errors.title?.message}`}
              </Alert>
            )}
            <div className="h-4" />
            <Tiptap editor={tiptapEditor} />
          </form>
        </MobileNav>
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
                      searchNoticeData?.searchWorkRecord?.totalPage
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
            <table className="xl:text-lg min-w-full text-md  divide-y divide-gray-400">
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
