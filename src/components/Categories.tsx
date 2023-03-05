import { Surface } from "./Surface";
import { Title } from "./Title";
import { Category } from "./Category";
import { CATEGORIES, CATEGORIES_OPTIONS } from "~/utils/constants/categories";
import { api } from "~/utils/api";

export function Categories() {
  const { data } = api.transaction.categories.useQuery();

  const featuredCategories = CATEGORIES_OPTIONS.filter((category) => {
    return [
      CATEGORIES.BILLS,
      CATEGORIES.FOOD,
      CATEGORIES.SHOPPING,
      CATEGORIES.PERSONAL,
      CATEGORIES.OTHERS,
    ].includes(category.label);
  });

  return (
    <Surface className="pb-4">
      <Title>
        Categories
        <span className="ml-2 text-sm font-light text-gray-400">(total)</span>
      </Title>

      <div className="mt-6 flex flex-col flex-wrap items-start space-x-0 space-y-4 lg:flex-row lg:items-center lg:space-x-10 lg:space-y-0">
        {featuredCategories.map((category) => {
          const amount = data?.[category.value]?.total ?? 0;

          return (
            <Category
              key={category.label}
              name={category.label}
              icon={category.icon}
              amount={amount}
            />
          );
        })}
      </div>
    </Surface>
  );
}
