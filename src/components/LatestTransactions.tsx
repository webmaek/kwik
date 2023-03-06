import dayjs from "dayjs";
import { CATEGORIES_OPTIONS } from "~/utils/constants/categories";
import { formatMoney } from "~/utils/formatMoney";
import { Surface } from "./Surface";
import { Title } from "./Title";
import { TransactionIcon } from "./TransactionIcon";
import { api } from "~/utils/api";

export function LatestTransactions() {
  const { data, isLoading } = api.transaction.latest.useQuery();

  return (
    <Surface className="col-span-4 mb-4 lg:col-span-1 lg:mb-0">
      <Title>Latest</Title>

      <div className="mt-6 flex flex-col space-y-6">
        {!data && isLoading
          ? null
          : (data ?? []).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="rounded-md bg-teal-500/20 p-4 shadow-xl">
                    {
                      CATEGORIES_OPTIONS.find(
                        (category) => category.value === transaction.category
                      )?.icon
                    }
                  </div>
                  <div className="ml-3 flex flex-col">
                    <h5 className="text-lg font-semibold capitalize text-gray-200">
                      {transaction.category?.toLocaleLowerCase()}
                    </h5>
                    <span className="text-sm font-light text-gray-400">
                      {dayjs(transaction.date).format("DD/MM/YYYY")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center">
                  <span
                    className={`mr-2 text-sm font-light text-gray-400 ${
                      transaction.type === "EXPENSE"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {formatMoney(transaction.amount)}
                  </span>
                  <TransactionIcon type={transaction.type} />
                </div>
              </div>
            ))}
      </div>
    </Surface>
  );
}
