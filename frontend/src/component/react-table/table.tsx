import React from "react";
import { useTable } from "react-table";

function Table({ columns, data }: any) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 border-2 border-gray-90">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className=" overflow-hidden border border-gray-400 sm:rounded-lg">
          <table
            className="min-w-full divide-y divide-gray-400"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      className="px-6 py-3 text-left font-medium uppercase tracking-wider"
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              className="bg-white divide-y divide-gray-200"
              {...getTableBodyProps()}
            >
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        className="px-6 py-4 whitespace-nowrap font-medium text-gray-900"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
