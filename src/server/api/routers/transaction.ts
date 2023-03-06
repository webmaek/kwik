import { z } from "zod";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createTransactionSchema } from "~/utils/schemas/transaction.schema";
import { toCent } from "~/utils/toCent";
import { formatMoney } from "~/utils/formatMoney";

dayjs.extend(isBetween);

export const transactionRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const transactions = await ctx.prisma.transaction.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return transactions;
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const transaction = await ctx.prisma.transaction.findUnique({
        where: {
          id: input.id,
        },
      });

      return transaction;
    }),

  create: protectedProcedure
    .input(createTransactionSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const transaction = await ctx.prisma.transaction.create({
        data: {
          ...input,
          amount: toCent(Number(input.amount)),
          date: dayjs(input.date).toDate(),
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return transaction;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        body: createTransactionSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const transaction = await ctx.prisma.transaction.update({
        where: {
          id: input.id,
        },
        data: {
          ...input.body,
          amount: toCent(Number(input.body.amount)),
          date: dayjs(input.body.date).toDate(),
        },
      });

      return transaction;
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const transaction = await ctx.prisma.transaction.delete({
        where: {
          id: input.id,
        },
      });

      return transaction;
    }),

  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const transactions = await ctx.prisma.transaction.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });

      return transactions;
    }),

  exportToCsv: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const transactions = await ctx.prisma.transaction.findMany({
        where: {
          id: {
            in: input.ids,
          },
          user: {
            id: userId,
          },
        },
        orderBy: {
          date: "desc",
        },
      });

      const tranformedTransactions = transactions.map((transaction) => {
        const { date, amount, title, type, category, note } = transaction;

        return {
          date: dayjs(date).format("DD/MM/YYYY"),
          title,
          amount: formatMoney(amount),
          type,
          category,
          note,
        };
      });

      return tranformedTransactions;
    }),

  categories: protectedProcedure
    .input(
      z
        .object({ query: z.object({ period: z.string().optional() }) })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const period = input?.query?.period;

      const transactions = await ctx.prisma.transaction.findMany({
        where: {
          user: {
            id: userId,
          },
        },
      });

      const filteredTransactions = transactions.filter((transaction) => {
        if (period === "week") {
          return dayjs(transaction.date).isBetween(
            dayjs().subtract(7, "day"),
            dayjs()
          );
        } else if (period === "month") {
          return dayjs(transaction.date).isSame(dayjs(), "month");
        } else if (period === "year") {
          return dayjs(transaction.date).isSame(dayjs(), "year");
        } else {
          return true;
        }
      });

      const categories = filteredTransactions.reduce((acc, transaction) => {
        const category = transaction.category;

        if (acc[category]) {
          acc[category]!.total +=
            transaction.type === "INCOME"
              ? transaction.amount ?? 0
              : -transaction.amount ?? 0;

          if (transaction.type === "INCOME") {
            acc[category]!.income += transaction.amount ?? 0;
          } else {
            acc[category]!.expenses += transaction.amount ?? 0;
          }
        } else {
          acc[category] = {
            total:
              transaction.type === "INCOME"
                ? transaction.amount ?? 0
                : -transaction.amount ?? 0,
            income: transaction.type === "INCOME" ? transaction.amount : 0,
            expenses: transaction.type === "EXPENSE" ? transaction.amount : 0,
          };
        }

        return acc;
      }, {} as Record<string, { total: number; income: number; expenses: number }>);

      return categories;
    }),

  latest: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const transactions = await ctx.prisma.transaction.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      take: 4,
      orderBy: {
        date: "desc",
      },
    });

    return transactions;
  }),

  weekly: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const transactions = await ctx.prisma.transaction.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    const lastWeekTransactions = transactions.filter((transaction) =>
      dayjs(transaction.date).isBetween(dayjs().subtract(7, "day"), dayjs())
    );

    const seventhDay = lastWeekTransactions.filter((transaction) =>
      dayjs(transaction.date).isSame(dayjs().subtract(6, "day"), "day")
    );

    const sixthDay = lastWeekTransactions.filter((transaction) =>
      dayjs(transaction.date).isSame(dayjs().subtract(5, "day"), "day")
    );

    const fifthDay = lastWeekTransactions.filter((transaction) =>
      dayjs(transaction.date).isSame(dayjs().subtract(4, "day"), "day")
    );

    const fourthDay = lastWeekTransactions.filter((transaction) =>
      dayjs(transaction.date).isSame(dayjs().subtract(3, "day"), "day")
    );

    const thirdDay = lastWeekTransactions.filter((transaction) =>
      dayjs(transaction.date).isSame(dayjs().subtract(2, "day"), "day")
    );

    const secondDay = lastWeekTransactions.filter((transaction) =>
      dayjs(transaction.date).isSame(dayjs().subtract(1, "day"), "day")
    );

    const firstDay = lastWeekTransactions.filter((transaction) =>
      dayjs(transaction.date).isSame(dayjs(), "day")
    );

    return {
      seventhDay,
      sixthDay,
      fifthDay,
      fourthDay,
      thirdDay,
      secondDay,
      firstDay,
    };
  }),

  stats: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const transactions = await ctx.prisma.transaction.findMany({
      where: {
        user: {
          id: userId,
        },
      },
    });

    const income = transactions
      .filter((transaction) => transaction.type === "INCOME")
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const expense = transactions
      .filter((transaction) => transaction.type === "EXPENSE")
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const total = income - expense;

    const monthIncome = transactions
      .filter(
        (transaction) =>
          transaction.type === "INCOME" &&
          dayjs(transaction.date).isSame(dayjs(), "month")
      )
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const monthExpense = transactions
      .filter(
        (transaction) =>
          transaction.type === "EXPENSE" &&
          dayjs(transaction.date).isSame(dayjs(), "month")
      )
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const monthTotal = monthIncome - monthExpense;

    return {
      income,
      expense,
      total,
      monthIncome,
      monthExpense,
      monthTotal,
    };
  }),
});
