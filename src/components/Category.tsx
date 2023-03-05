import { formatMoney } from "~/utils/formatMoney";

type CategoryProps = {
  name: string;
  icon: React.ReactNode;
  amount?: number;
};

export function Category({ name, icon, amount }: CategoryProps) {
  return (
    <div className="flex items-center">
      <div className="rounded-md bg-teal-500/20 p-4 shadow-xl">{icon}</div>

      <div className="ml-4 flex flex-col justify-between">
        <h5 className="text-lg font-semibold text-gray-200">{name}</h5>
        <span className="text-sm font-light text-gray-400">
          {formatMoney(amount ?? 0)}
        </span>
      </div>
    </div>
  );
}
