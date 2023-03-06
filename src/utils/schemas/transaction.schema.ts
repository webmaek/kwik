import { z } from "zod";

const transactionCore = {
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),
  amount: z
    .string({ required_error: "Amount is required" })
    .min(1, "Amount is required"),
  type: z.string(),
  category: z.string(),
  date: z
    .string({ required_error: "Date is required" })
    .min(1, "Date is required"),
  note: z.string().max(280, { message: "Note is too long" }).nullable(),
};

export const createTransactionSchema = z.object({
  ...transactionCore,
});

export const transactionSchema = z.object({
  ...transactionCore,
  amount: z.number(),
  id: z.string(),
  date: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
});

export const transactionsStatsSchema = z.object({
  income: z.number(),
  expense: z.number(),
  total: z.number(),
  monthIncome: z.number(),
  monthExpense: z.number(),
  monthTotal: z.number(),
});

export type Transaction = z.infer<typeof transactionSchema>;
export type TransactionsStats = z.infer<typeof transactionsStatsSchema>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
