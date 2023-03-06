import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";

export function Pagination({
  page,
  getPageCount,
  setPageIndex,
  getCanPreviousPage,
  getCanNextPage,
  previousPage,
  nextPage,
}: {
  page: number;
  getPageCount: () => number;
  setPageIndex: (pageIndex: number) => void;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
  previousPage: () => void;
  nextPage: () => void;
}) {
  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          className="cursor-pointer rounded-md border border-teal-600/60 bg-teal-600/50 py-1.5 px-3 text-gray-200 hover:bg-teal-600/20 disabled:cursor-not-allowed disabled:bg-teal-600/5"
          onClick={() => setPageIndex(0)}
          disabled={!getCanPreviousPage()}
        >
          <IconChevronsLeft size={20} />
        </button>
        <button
          className="cursor-pointer rounded-md border border-teal-600/60 bg-teal-600/50 py-1.5  px-3 text-gray-200 hover:bg-teal-600/20 disabled:cursor-not-allowed disabled:bg-teal-600/5"
          onClick={() => previousPage()}
          disabled={!getCanPreviousPage()}
        >
          <IconChevronLeft size={20} />
        </button>
        <button
          className="cursor-pointer rounded-md border border-teal-600/60 bg-teal-600/50 py-1.5 px-3 text-gray-200 hover:bg-teal-600/20 disabled:cursor-not-allowed disabled:bg-teal-600/5"
          onClick={() => nextPage()}
          disabled={!getCanNextPage()}
        >
          <IconChevronRight size={20} />
        </button>
        <button
          className="cursor-pointer rounded-md border border-teal-600/60 bg-teal-600/50 py-1.5 px-3 text-gray-200 hover:bg-teal-600/20 disabled:cursor-not-allowed disabled:bg-teal-600/5"
          onClick={() => setPageIndex(getPageCount() - 1)}
          disabled={!getCanNextPage()}
        >
          <IconChevronsRight size={20} />
        </button>
      </div>
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {page} of {getPageCount()}
        </strong>
      </span>
    </div>
  );
}
