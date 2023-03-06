import NiceModal from "@ebay/nice-modal-react";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { createColumnHelper } from "@tanstack/react-table";
import clsx from "clsx";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import { CategoryBadge } from "~/components/CategoryBadge";
import { UpdateTransactionModal } from "~/components/modals/UpdateTransactionModal";
import { TransactionBadge } from "~/components/TransactionBadge";

import { type Transaction } from "~/utils/schemas/transaction.schema";
import { api } from "../api";
import { formatMoney } from "../formatMoney";

const columnHelper = createColumnHelper<Transaction>();

export const columns = [
  columnHelper.display({
    id: "selectedTransactions",
    cell: ({ row }) => {
      return (
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
          onChange={row.getToggleSelectedHandler()}
          checked={row.getIsSelected()}
        />
      );
    },
    header: ({ table }) => {
      return (
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      );
    },
  }),
  columnHelper.accessor("title", {
    cell: (info) => (
      <span className="text-lg font-semibold text-gray-300">
        {info.getValue()}
      </span>
    ),
    header: () => "Title",
  }),
  columnHelper.accessor("amount", {
    cell: (info) => {
      const type = info.row.original.type;

      return (
        <span
          className={clsx(
            type === "EXPENSE" ? "text-red-400" : "text-green-400"
          )}
        >
          {formatMoney(info.getValue())}
        </span>
      );
    },
    header: () => "Amount",
  }),
  columnHelper.accessor("date", {
    cell: (info) => (
      <span className="font-light text-gray-400">
        {dayjs(info.getValue()).format("DD/MM/YYYY")}
      </span>
    ),
    header: () => "Date",
  }),
  columnHelper.accessor("category", {
    cell: (info) => <CategoryBadge category={info.getValue()} />,
    header: () => "Category",
  }),
  columnHelper.accessor("type", {
    cell: (info) => <TransactionBadge type={info.getValue()} />,
    header: () => "Type",
  }),
  columnHelper.display({
    id: "actions",
    cell: (props) => {
      const id = props.row.original.id;

      const utils = api.useContext();

      const { mutateAsync: deleteOne } = api.transaction.deleteOne.useMutation({
        onSuccess: () => {
          utils.transaction.stats.invalidate();
          utils.transaction.getAll.invalidate();
          toast("Transaction deleted successfully!", {
            type: "success",
            theme: "dark",
          });
        },
      });

      const handleDelete = async () => {
        await deleteOne({ id });
      };

      const handleEdit = () => {
        NiceModal.show(UpdateTransactionModal, { id });
      };

      return (
        <div className="flex items-center justify-end">
          <button
            onClick={handleEdit}
            className="mr-2 rounded-full bg-blue-600/20 p-2 hover:bg-blue-600/30"
          >
            <IconEdit size={18} className="text-blue-500" />
          </button>
          <button
            onClick={handleDelete}
            className="mr-2 rounded-full bg-red-600/20 p-2 hover:bg-red-600/30"
          >
            <IconTrash size={18} className="text-red-200" />
          </button>
        </div>
      );
    },
  }),
];
