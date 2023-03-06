import { type CategoriesStats } from "~/utils/types/transaction.types";

export const getCategoriesChartData = (categories: CategoriesStats) => {
  const data = Object.entries(categories).map(([name, total]) => ({
    name,
    expenses: total.expenses,
    income: total.income,
  }));

  return data;
};
