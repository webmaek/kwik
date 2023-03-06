import { IconArrowDownLeft, IconArrowUpRight } from "@tabler/icons-react";
import clsx from "clsx";

type TransactionIconProps = {
  type: string;
};

export function TransactionIcon({ type }: TransactionIconProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-md p-2 shadow-sm",
        type === "INCOME" ? "bg-green-600/20" : "bg-red-600/20"
      )}
    >
      {type === "INCOME" ? (
        <IconArrowUpRight size={18} className="text-green-200" />
      ) : (
        <IconArrowDownLeft size={18} className="text-red-200" />
      )}
    </div>
  );
}
