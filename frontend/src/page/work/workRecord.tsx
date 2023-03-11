import { gql, useLazyQuery } from "@apollo/client";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip } from "@material-tailwind/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Page, PageSize } from "../../constant";
import { Work } from "../../gql/graphql";
import { useMeQuery } from "../../hook/query/useMeQuery";

export const FIND_WORK_RECORD_BY_USER_ID_QUERY = gql`
  query findWorkRecordByUserId($input: FindWorkRecordByUserIdInput!) {
    findWorkRecordByUserId(input: $input) {
      ok
      error
      totalPage
      works {
        date
        user {
          id
          name
          position
          teams {
            level
            name
          }
        }
        id
        startTime
        endTime
        memo
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
    loadFindWorkRecordByUserIdQuery,
    {
      data: findWorkRecordByUserIdData,
      loading: findWorkRecordByUserIdLoading,
    },
  ] = useLazyQuery(FIND_WORK_RECORD_BY_USER_ID_QUERY, {
    onCompleted: (data) => {
      setTableData([]);
      if (data.findWorkRecordByUserId.ok) {
        if (data.findWorkRecordByUserId?.works) {
          data.findWorkRecordByUserId?.works.map((work: Work) => {
            return setTableData((tableData: any) => {
              return [
                ...tableData,
                {
                  date: work.date,
                  name: work.user.name,
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
                    </div>
                  ),
                  totalRestMinute: (
                    <div className="flex gap-1">
                      {data.findWorkRecordByUserId.rests.filter(
                        (rest: any) => rest.workId === work.id
                      ).length > 0 &&
                        data.findWorkRecordByUserId.rests
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
                        data.findWorkRecordByUserId?.works.approvalUserId
                          ? "blue"
                          : "red"
                      }
                      value={
                        data.findWorkRecordByUserId?.works.approvalUserId
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
    pageIndex: Page,
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

  useEffect(() => {
    if (meData?.me?.id) {
      loadFindWorkRecordByUserIdQuery({
        variables: {
          input: {
            userId: meData?.me?.id,
            sort: "date",
          },
        },
      });
    }
  }, [meData?.me?.id, loadFindWorkRecordByUserIdQuery]);

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      pagination,
    },
    pageCount: findWorkRecordByUserIdData?.pageCount ?? -1,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  return (
    <>
      <div className="hidden lg:block p-2">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 border-gray-90">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className=" overflow-hidden border border-gray-400 sm:rounded-lg"></div>
            <table className="min-w-full divide-y divide-gray-400">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        className="px-6 py-3 text-left font-medium uppercase tracking-wider"
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
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        className="px-6 py-4 whitespace-nowrap font-medium text-gray-900"
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
              <tfoot>
                <div className="h-2" />
                <div className="flex items-center gap-2">
                  <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    {"<<"}
                  </button>
                  <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    {"<"}
                  </button>
                  <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    {">"}
                  </button>
                  <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    {">>"}
                  </button>
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
                  {findWorkRecordByUserIdLoading ? "Loading..." : null}
                </div>
                <div>{table.getRowModel().rows.length} Rows</div>
                <pre>{JSON.stringify(pagination, null, 2)}</pre>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkRecord;
