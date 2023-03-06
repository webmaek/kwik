import NiceModal from "@ebay/nice-modal-react";
import { type Table } from "@tanstack/react-table";
import { toast } from "react-toastify";
import csvDownload from "json-to-csv-export";
import { api } from "~/utils/api";
import { CreateTransactionModal } from "./modals/CreateTransactionModal";

export function Toolbar<T>({
  table,
  selectedIds = [],
}: {
  table: Table<T>;
  selectedIds: string[];
}) {
  const utils = api.useContext();

  const { mutate: deleteMany } = api.transaction.deleteMany.useMutation({
    onSuccess: () => {
      utils.transaction.stats.invalidate();
      utils.transaction.getAll.invalidate();
      toast("Transactions deleted successfully!", {
        type: "success",
        theme: "dark",
      });
      table.resetRowSelection();
    },
  });

  const { mutate: exportToCSV } = api.transaction.exportToCsv.useMutation({
    onSuccess: (data) => {
      csvDownload({
        data,
        headers: ["date", "title", "amount", "type", "category", "note"],
      });
      table.resetRowSelection();
    },
  });

  return (
    <div className="mb-4 flex flex-col items-start justify-between lg:flex-row lg:items-center">
      <div>
        <button
          type="button"
          className="rounded-md border border-teal-600/60 bg-teal-600/10 py-1.5 px-3 text-gray-200 hover:bg-teal-600/20"
          onClick={() => {
            NiceModal.show(CreateTransactionModal);
          }}
        >
          Create Transaction
        </button>
        <button
          type="button"
          className="ml-3 rounded-md border border-red-600/60 bg-red-600/10 py-1.5 px-3 text-gray-200 hover:bg-red-600/20 disabled:cursor-not-allowed disabled:bg-red-600/5"
          onClick={() => deleteMany({ ids: selectedIds })}
          disabled={selectedIds.length === 0}
        >
          Delete Selected
        </button>
      </div>

      <div>
        <button
          className="mt-2 rounded-md border border-sky-600/60 bg-sky-600/10 py-1.5 px-3 text-gray-200 hover:bg-sky-600/20 disabled:cursor-not-allowed disabled:bg-sky-600/5 lg:mt-0"
          onClick={() => exportToCSV({ ids: selectedIds })}
          disabled={selectedIds.length === 0}
        >
          Export to CSV
        </button>
      </div>
    </div>
  );
}
