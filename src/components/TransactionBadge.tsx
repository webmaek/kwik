const getBadge = (type: string) => {
  switch (type) {
    case "EXPENSE":
      return (
        <span className="inline-flex items-center rounded-full bg-red-600/20 px-2.5 py-0.5 text-xs font-medium text-red-200">
          Expense
        </span>
      );
    case "INCOME":
      return (
        <span className="inline-flex items-center rounded-full bg-green-600/20 px-2.5 py-0.5 text-xs font-medium text-green-200">
          Income
        </span>
      );
  }
};

export function TransactionBadge({ type }: { type: string }) {
  return <>{getBadge(type)}</>;
}
