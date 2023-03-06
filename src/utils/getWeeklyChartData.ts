import dayjs from "dayjs";

import { type WeeklyTransactions } from "~/utils/types/transaction.types";

export const getWeeklyChartData = (data: WeeklyTransactions | undefined) => {
  return [
    {
      date: dayjs().subtract(6, "day").format("ddd"),
      Income:
        data?.seventhDay?.reduce((acc, transaction) => {
          if (transaction.type === "INCOME") {
            return acc + transaction.amount;
          }
          return acc;
        }, 0) || 0,
      Expense:
        data?.seventhDay?.reduce((acc, transaction) => {
          if (transaction.type === "EXPENSE") {
            return acc + transaction.amount;
          }
          return acc;
        }, 0) || 0,
    },
    {
      date: dayjs().subtract(5, "day").format("ddd"),
      Income:
        data?.sixthDay?.reduce((acc, transaction) => {
          if (transaction.type === "INCOME") {
            return acc + transaction.amount;
          }
          return acc;
        }, 0) || 0,
      Expense:
        data?.sixthDay?.reduce((acc, transaction) => {
          if (transaction.type === "EXPENSE") {
            return acc + transaction.amount;
          }
          return acc;
        }, 0) || 0,
    },
    {
      date: dayjs().subtract(4, "day").format("ddd"),
      Income:
        data?.fifthDay?.reduce((acc, transaction) => {
          if (transaction.type === "INCOME") {
            return acc + transaction.amount;
          }
          return acc;
        }, 0) || 0,
      Expense:
        data?.fifthDay?.reduce((acc, transaction) => {
          if (transaction.type === "EXPENSE") {
            return acc + transaction.amount;
          }
          return acc;
        }, 0) || 0,
    },
    {
      date: dayjs().subtract(3, "day").format("ddd"),
      Income:
        data?.fourthDay?.reduce((acc, transaction) => {
          if (transaction.type === "INCOME") {
            return acc + transaction.amount;
          }
          return acc;
        }, 0) || 0,
      Expense:
        data?.fourthDay?.reduce((acc, transaction) => {
          if (transaction.type === "EXPENSE") {
            return acc + transaction.amount;
          }
          return acc;
        }, 0) || 0,
    },
    {
      date: dayjs().subtract(2, "day").format("ddd"),
      Income:
        data?.thirdDay?.reduce((acc, transaction) => {
          if (transaction.type === "INCOME") {
            return acc + transaction.amount;
          }
          return acc;
        }, 0) || 0,
      Expense:
        data?.thirdDay?.reduce((acc, transaction) => {
          if (transaction.type === "EXPENSE") {
            return acc + transaction.amount;
          }
          return acc;
        }, 0) || 0,
    },
    {
      date: dayjs().subtract(1, "day").format("ddd"),
      Income:
        data?.secondDay?.reduce((acc, transaction) => {
          if (transaction.type === "INCOME") {
            return acc + transaction.amount;
          }
          return acc;
        }, 0) || 0,
      Expense:
        data?.secondDay?.reduce((acc, transaction) => {
          if (transaction.type === "EXPENSE") {
            return acc + transaction.amount;
          }
          return acc;
        }, 0) || 0,
    },
    {
      date: dayjs().format("ddd"),
      Income:
        data?.firstDay?.reduce((acc, transaction) => {
          if (transaction.type === "INCOME") {
            return acc + transaction.amount;
          }
          return acc;
        }, 0) || 0,
      Expense:
        data?.firstDay?.reduce((acc, transaction) => {
          if (transaction.type === "EXPENSE") {
            return acc + transaction.amount;
          }
          return acc;
        }, 0) || 0,
    },
  ];
};
