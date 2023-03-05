import { DonutChart } from "@tremor/react";
import { useState } from "react";
import { api } from "~/utils/api";
import { formatMoney } from "~/utils/formatMoney";
import { getCategoriesChartData } from "~/utils/getCategoriesChartData";
import { TRANSACTION_TYPES_OPTIONS } from "~/utils/types/transaction.types";
import { Select } from "./Select";
import { Surface } from "./Surface";
import { Title } from "./Title";

const PERIOD_OPTIONS = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

export function CategoriesChart() {
  const [period, setPeriod] = useState("month");
  const [type, setType] = useState("EXPENSE");

  const { data, isLoading } = api.transaction.categories.useQuery({
    query: { period },
  });

  return (
    <Surface className="col-span-1">
      <Title>Categories</Title>
      <div className="flex items-center gap-2">
        <div className="grow">
          <Select
            id="period"
            name="period"
            options={PERIOD_OPTIONS}
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            disabled={!Object.keys(data ?? {}).length}
          />
        </div>
        <div className="grow">
          <Select
            id="type"
            name="type"
            options={TRANSACTION_TYPES_OPTIONS}
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={!Object.keys(data ?? {}).length}
          />
        </div>
      </div>
      {data && !isLoading ? (
        <DonutChart
          data={getCategoriesChartData(data)}
          category={type === "EXPENSE" ? "expenses" : "income"}
          dataKey="name"
          variant="pie"
          colors={[
            "orange",
            "teal",
            "cyan",
            "blue",
            "indigo",
            "purple",
            "pink",
            "rose",
          ]}
          valueFormatter={formatMoney}
          marginTop="mt-6"
        />
      ) : null}
    </Surface>
  );
}
