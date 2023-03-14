import { gql, useLazyQuery } from "@apollo/client";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Chip } from "@material-tailwind/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Page, PageSize } from "../../constants";
import { Work } from "../../gql/graphql";
import { useMeQuery } from "../../hook/query/useMeQuery";

export const SEARCH_WORK_RECORD_QUERY = gql`
  query searchWorkRecord($input: SearchWorkRecordInput!) {
    searchWorkRecord(input: $input) {
      ok
      error
      totalPage
      works {
        date
        user {
          id
          name
          position
          email
          teams {
            level
            name
          }
        }
        id
        startTime
        endTime
        memo
        overtimeReason
        approvalUserId
        workStatusList {
          workStatus {
            name
            color
          }
        }
      }
      rests {
        id
        workId
        startTime
        endTime
        reason
        totalMinute
      }
    }
  }
`;

const WorkRecord = () => {
  const { data: meData } = useMeQuery();
  const [tableData, setTableData] = useState<any>([]);
  const [
    loadSearchWorkRecordQuery,
    { data: searchWorkRecordData, loading: searchWorkRecordLoading },
  ] = useLazyQuery(SEARCH_WORK_RECORD_QUERY, {
    onCompleted: (data) => {
      setTableData([]);
      if (data.searchWorkRecord.ok) {
        if (data.searchWorkRecord?.works) {
          data.searchWorkRecord?.works.map((work: Work) => {
            return setTableData((tableData: any) => {
              return [
                ...tableData,
                {
                  date: work.date,
                  name: work.user.name,
                  email: work.user.email,
                  position: work.user.position,
                  workTime: `${work.startTime} ~ ${
                    work.endTime ? work.endTime : ""
                  }`,
                  team: (
                    <>
                      {work.user.teams?.sort((team: any) => team.level)[0]
                        ?.name && (
                        <Chip
                          value={
                            work.user.teams?.sort((team: any) => team.level)[0]
                              ?.name
                          }
                        />
                      )}
                    </>
                  ),
                  memo: (
                    <div
                      className=" cursor-pointer"
                      onClick={() => handleMemo(work.memo ? work.memo : "")}
                    >
                      <Chip
                        value="근무노트"
                        icon={
                          <FontAwesomeIcon
                            className="ml-1"
                            fontSize={19}
                            icon={solid("note-sticky")}
                          />
                        }
                      />
                    </div>
                  ),
                  workStatusList: (
                    <div className="flex gap-1">
                      {work.workStatusList?.map((e: any, index: any) => {
                        return (
                          <Chip
                            key={index}
                            color={e.workStatus.color}
                            value={e.workStatus.name}
                          />
                        );
                      })}
                      {work.overtimeReason && (
                        <div
                          className=" cursor-pointer"
                          onClick={() =>
                            handleOverTimeReason(
                              work.overtimeReason ? work.overtimeReason : ""
                            )
                          }
                        >
                          <Chip
                            value="연장근무"
                            color="deep-purple"
                            icon={
                              <FontAwesomeIcon
                                className="ml-1"
                                fontSize={19}
                                icon={solid("note-sticky")}
                              />
                            }
                          />
                        </div>
                      )}
                    </div>
                  ),
                  totalRestMinute: (
                    <div className="flex gap-1">
                      {data.searchWorkRecord.rests.filter(
                        (rest: any) => rest.workId === work.id
                      ).length > 0 &&
                        data.searchWorkRecord.rests
                          .filter((rest: any) => rest.workId === work.id)
                          .map((rest: any, index: any) => {
                            if (rest.totalMinute > 0) {
                              return (
                                <Chip
                                  key={`totalMinute-${index}`}
                                  color="blue-gray"
                                  value={`${rest.totalMinute}분`}
                                />
                              );
                            }
                            return null;
                          })}
                    </div>
                  ),
                  approval: (
                    <Chip
                      color={
                        data.searchWorkRecord?.works.approvalUserId
                          ? "blue"
                          : "red"
                      }
                      value={
                        data.searchWorkRecord?.works.approvalUserId
                          ? "승인"
                          : "미승인"
                      }
                    />
                  ),
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
    columnHelper.accessor("date", {
      header: () => "날짜",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: () => "직원",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("position", {
      header: () => "직책",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: () => "이메일",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("workTime", {
      header: () => "근무시간",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("team", {
      header: () => "팀",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("memo", {
      header: () => "근무노트",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("workStatusList", {
      header: () => "상태",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("totalRestMinute", {
      header: () => "휴게",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("approval", {
      header: () => "승인",
      cell: (info) => info.getValue(),
    }),
  ];

  const handleMemo = (memo: string) => {
    Swal.fire({
      title: "근무노트",
      input: "textarea",
      inputValue: memo,
    });
  };

  const handleOverTimeReason = (overtimeReason: string) => {
    Swal.fire({
      title: "연장근무 사유",
      input: "textarea",
      inputValue: overtimeReason,
    });
  };
  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
  useEffect(() => {
    if (meData?.me?.id) {
      loadSearchWorkRecordQuery({
        variables: {
          input: {
            sort: "date",
            page: pagination.pageIndex + 1,
            pageSize: pagination.pageSize,
          },
        },
      });
    }
  }, [meData?.me?.id, loadSearchWorkRecordQuery, pagination]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      pagination,
    },
    pageCount: searchWorkRecordData?.searchWorkRecord?.totalPage ?? -1,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  return (
    <div className="mx-auto xl:max-w-screen-xl overflow-scroll py-2 px-4 lg:px-8 lg:py-4">
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
                      searchWorkRecordData?.searchWorkRecord?.totalPage
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
                {searchWorkRecordLoading ? "Loading..." : null}
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
};

export default WorkRecord;
