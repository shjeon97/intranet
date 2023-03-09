import { gql, useLazyQuery } from "@apollo/client";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Table from "../../component/react-table/table";
import { useMeQuery } from "../../hook/query/useMeQuery";

export const FIND_WORK_RECORD_BY_USER_ID_QUERY = gql`
  query findWorkRecordByUserId($input: FindWorkRecordByUserIdInput!) {
    findWorkRecordByUserId(input: $input) {
      ok
      error
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
        workStatusList {
          workStatus {
            name
            color
          }
        }
      }
      rests {
        id
        startTime
        endTime
        reason
      }
    }
  }
`;

const WorkRecord = () => {
  const { data: meData } = useMeQuery();
  const [tableData, setTableData] = useState<any>([]);
  const [loadFindRestsByUserIdQuery] = useLazyQuery(
    FIND_WORK_RECORD_BY_USER_ID_QUERY,
    {
      onCompleted: (data) => {
        setTableData([]);
        if (data.findWorkRecordByUserId.ok) {
          if (data.findWorkRecordByUserId?.works) {
            data.findWorkRecordByUserId?.works.map((work: any) => {
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
                              work.user.teams?.sort(
                                (team: any) => team.level
                              )[0]?.name
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
                  },
                ];
              });
            });
          }
        }
      },
    }
  );

  const handleMemo = (memo: string) => {
    Swal.fire({
      title: "근무노트",
      input: "textarea",
      inputValue: memo,
    });
  };

  useEffect(() => {
    if (meData?.me?.id) {
      loadFindRestsByUserIdQuery({
        variables: {
          input: {
            userId: meData?.me?.id,
          },
        },
      });
    }
  }, [meData?.me?.id, loadFindRestsByUserIdQuery]);

  const columns = React.useMemo(
    () => [
      {
        Header: "날짜",
        accessor: "date",
      },
      {
        Header: "직원",
        accessor: "name",
      },
      {
        Header: "직책",
        accessor: "position",
      },
      {
        Header: "근무시간",
        accessor: "workTime",
      },
      {
        Header: "팀",
        accessor: "team",
      },
      {
        Header: "근무노트",
        accessor: "memo",
      },
      {
        Header: "상태",
        accessor: "workStatusList",
      },
    ],
    []
  );

  return (
    <>
      <div className="hidden lg:block overflow-auto m-5">
        <Table columns={columns} data={tableData} />
      </div>
    </>
  );
};

export default WorkRecord;
