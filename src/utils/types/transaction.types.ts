import { type Transaction } from "../schemas/transaction.schema";

type Days =
  | "seventhDay"
  | "sixthDay"
  | "fifthDay"
  | "fourthDay"
  | "thirdDay"
  | "secondDay"
  | "firstDay";

export type WeeklyTransactions = {
  [key in Days]: Transaction[];
};

export type CategoriesStats = Record<
  string,
  { total: number; income: number; expenses: number }
>;

export const TRANSACTION_TYPES_OPTIONS = [
  { value: "INCOME", label: "Income" },
  { value: "EXPENSE", label: "Expense" },
];

export type TransactionType = "INCOME" | "EXPENSE";
