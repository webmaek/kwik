import {
  IconBasket,
  IconBus,
  IconDeviceGamepad,
  IconDotsCircleHorizontal,
  IconPizza,
  IconReceipt,
  IconTools,
  IconUser,
} from "@tabler/icons-react";

const ICON_SIZE = 20;

export type Category =
  | "BILLS"
  | "UTILITY"
  | "FOOD"
  | "TRANSPORTATION"
  | "ENTERTAINMENT"
  | "SHOPPING"
  | "PERSONAL"
  | "OTHERS";

export const CATEGORIES = {
  BILLS: "Bills",
  UTILITY: "Utility",
  FOOD: "Food",
  TRANSPORTATION: "Transportation",
  ENTERTAINMENT: "Entertainment",
  SHOPPING: "Shopping",
  PERSONAL: "Personal",
  OTHERS: "Others",
};

export const CATEGORIES_OPTIONS = [
  { value: "BILLS", label: "Bills", icon: <IconReceipt size={ICON_SIZE} /> },
  { value: "UTILITY", label: "Utility", icon: <IconTools size={ICON_SIZE} /> },
  { value: "FOOD", label: "Food", icon: <IconPizza size={ICON_SIZE} /> },
  {
    value: "TRANSPORTATION",
    label: "Transportation",
    icon: <IconBus size={ICON_SIZE} />,
  },
  {
    value: "ENTERTAINMENT",
    label: "Entertainment",
    icon: <IconDeviceGamepad size={ICON_SIZE} />,
  },
  {
    value: "SHOPPING",
    label: "Shopping",
    icon: <IconBasket size={ICON_SIZE} />,
  },
  { value: "PERSONAL", label: "Personal", icon: <IconUser size={ICON_SIZE} /> },
  {
    value: "OTHERS",
    label: "Others",
    icon: <IconDotsCircleHorizontal size={ICON_SIZE} />,
  },
];
