import { IconArrowNarrowDown, IconArrowNarrowUp } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { formatMoney } from "~/utils/formatMoney";
import { Avatar } from "./Avatar";
import { Divider } from "./Divider";
import { Surface } from "./Surface";

export function Profile() {
  const { data: session } = useSession();

  const { data } = api.transaction.stats.useQuery();

  return (
    <Surface>
      <div className="flex items-center">
        <div>
          <Avatar url={session?.user.image} />
        </div>

        <div className="ml-4 flex flex-col">
          <h1 className="text-xl font-semibold">{session?.user.name}</h1>
        </div>
      </div>

      <Divider className="mt-8" />

      <div className="mt-12 flex items-center justify-between px-4">
        <div className="flex flex-col text-center">
          <span className="pb-2 text-sm font-light text-gray-400">Income</span>
          <span>{formatMoney(data?.income || 0)}</span>
        </div>
        <div className="flex flex-col text-center">
          <span className="pb-2 text-sm font-light text-gray-400">Expense</span>
          <span>{formatMoney(data?.expense || 0)}</span>
        </div>
        <div className="flex flex-col text-center">
          <span className="pb-2 text-sm font-light text-gray-400">Total</span>
          <span>{formatMoney(data?.total || 0)}</span>
        </div>
      </div>

      <div className="mt-6 rounded-md bg-gray-900 p-4 shadow-md">
        <h3 className="text-2xl font-semibold">
          <span className="mr-2">Total: </span>
          {formatMoney(data?.monthTotal || 0)}
        </h3>

        <div className="mt-4 flex flex-col justify-between space-y-2">
          <div className="flex items-start">
            <div className="rounded-md bg-green-600/20 p-1 shadow-sm">
              <IconArrowNarrowUp size={24} className="text-green-200" />
            </div>

            <div className="ml-2 flex flex-col">
              <h4 className="font-semibold text-gray-200">
                {formatMoney(data?.monthIncome || 0)}
              </h4>
              <span className="mt-1 text-sm font-light text-gray-400">
                Current Month&apos;s income
              </span>
            </div>
          </div>

          <div className="flex items-start">
            <div className="rounded-md bg-red-600/20 p-1 shadow-sm">
              <IconArrowNarrowDown size={24} className="text-red-200" />
            </div>

            <div className="ml-2 flex flex-col">
              <h4 className="font-semibold text-gray-200">
                {formatMoney(data?.monthExpense || 0)}
              </h4>
              <span className="mt-1 text-sm font-light text-gray-400">
                Current Month&apos;s expense
              </span>
            </div>
          </div>
        </div>
      </div>
    </Surface>
  );
}
