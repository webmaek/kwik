import { CATEGORIES_OPTIONS } from "~/utils/constants/categories";

const getBadge = (category: string) => {
  switch (category) {
    case "BILLS": {
      const icon = CATEGORIES_OPTIONS.find(
        (option) => option.value === category
      )?.icon;
      return (
        <span className="inline-flex items-center rounded-full bg-orange-600/20 px-2.5 py-0.5 text-xs font-medium text-orange-200">
          {icon} <span className="ml-1">Bills</span>
        </span>
      );
    }
    case "UTILITY": {
      const icon = CATEGORIES_OPTIONS.find(
        (option) => option.value === category
      )?.icon;
      return (
        <span className="inline-flex items-center rounded-full bg-teal-600/20 px-2.5 py-0.5 text-xs font-medium text-teal-200">
          {icon} <span className="ml-1">Utility</span>
        </span>
      );
    }
    case "FOOD": {
      const icon = CATEGORIES_OPTIONS.find(
        (option) => option.value === category
      )?.icon;
      return (
        <span className="inline-flex items-center rounded-full bg-cyan-600/20 px-2.5 py-0.5 text-xs font-medium text-cyan-200">
          {icon} <span className="ml-1">Food</span>
        </span>
      );
    }
    case "TRANSPORTATION": {
      const icon = CATEGORIES_OPTIONS.find(
        (option) => option.value === category
      )?.icon;
      return (
        <span className="inline-flex items-center rounded-full bg-rose-600/20 px-2.5 py-0.5 text-xs font-medium text-rose-200">
          {icon} <span className="ml-1">Transportation</span>
        </span>
      );
    }
    case "ENTERTAINMENT": {
      const icon = CATEGORIES_OPTIONS.find(
        (option) => option.value === category
      )?.icon;
      return (
        <span className="inline-flex items-center rounded-full bg-blue-600/20 px-2.5 py-0.5 text-xs font-medium text-blue-200">
          {icon} <span className="ml-1">Entertainment</span>
        </span>
      );
    }
    case "SHOPPING": {
      const icon = CATEGORIES_OPTIONS.find(
        (option) => option.value === category
      )?.icon;
      return (
        <span className="inline-flex items-center justify-center rounded-full bg-indigo-600/20 px-2.5 py-0.5 text-xs font-medium text-indigo-200">
          {icon} <span className="ml-1">Shopping</span>
        </span>
      );
    }
    case "PERSONAL": {
      const icon = CATEGORIES_OPTIONS.find(
        (option) => option.value === category
      )?.icon;
      return (
        <span className="inline-flex items-center rounded-full bg-purple-600/20 px-2.5 py-0.5 text-xs font-medium text-purple-200">
          {icon} <span className="ml-1">Personal</span>
        </span>
      );
    }
    case "OTHERS": {
      const icon = CATEGORIES_OPTIONS.find(
        (option) => option.value === category
      )?.icon;
      return (
        <span className="inline-flex items-center rounded-full bg-pink-600/20 px-2.5 py-0.5 text-xs font-medium text-pink-200">
          {icon} <span className="ml-1">Others</span>
        </span>
      );
    }
  }
};

export function CategoryBadge({ category }: { category: string }) {
  return <>{getBadge(category)}</>;
}
