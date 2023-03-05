import { AreaChart } from "@tremor/react";
import { api } from "~/utils/api";
import { formatMoney } from "~/utils/formatMoney";
import { getWeeklyChartData } from "~/utils/getWeeklyChartData";
import { Surface } from "./Surface";
import { Title } from "./Title";

export function Activities() {
  const { data } = api.transaction.weekly.useQuery();

  const chartData = getWeeklyChartData(data);

  return (
    <Surface className="col-span-4 lg:col-span-2">
      <Title>Last Week</Title>
      <AreaChart
        data={chartData ?? []}
        categories={["Income", "Expense"]}
        dataKey="date"
        valueFormatter={formatMoney}
        height="h-72"
      />
    </Surface>
  );
}
