import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useEffect, useState } from "react";

import { Pagination } from "~/components/Pagination";
import { Toolbar } from "~/components/Toolbar";

type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
};

export function Table<T extends { id: string }>({
  data = [],
  columns = [],
}: TableProps<T>) {
  const [rowSelection, setRowSelection] = useState({});
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    if (table.getSelectedRowModel().rows.length > 0) {
      const selectedIds = table
        .getSelectedRowModel()
        .rows.map((row) => row.original.id);

      setSelectedIds(selectedIds);
    } else {
      setSelectedIds([]);
    }
  }, [table.getSelectedRowModel().rows]);

  return (
    <>
      <Toolbar table={table} selectedIds={selectedIds} />
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-800">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200"
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
                <tbody className="divide-y divide-gray-800 bg-gray-700">
                  {table.getRowModel().rows.map((row) => {
                    return (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td
                              key={cell.id}
                              className={clsx(
                                "whitespace-nowrap px-3 py-4 text-sm text-gray-200"
                              )}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {data && data?.length > 0 && (
                <Pagination
                  page={table.getState().pagination.pageIndex + 1}
                  getCanNextPage={table.getCanNextPage}
                  getCanPreviousPage={table.getCanPreviousPage}
                  nextPage={table.nextPage}
                  previousPage={table.previousPage}
                  getPageCount={table.getPageCount}
                  setPageIndex={table.setPageIndex}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
