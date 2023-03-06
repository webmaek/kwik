import { Activities } from "~/components/Activities";
import { Categories } from "~/components/Categories";
import { CategoriesChart } from "~/components/CategoriesChart";
import { LatestTransactions } from "~/components/LatestTransactions";
import { MainLayout } from "~/components/layouts/MainLayout";
import { Profile } from "~/components/Profile";

export function DashboardView() {
  return (
    <MainLayout>
      <div className="mt-8 grid grid-cols-4 gap-x-6">
        <div className="col-span-4 lg:col-span-3">
          <Categories />
          <div className="mt-8 grid grid-cols-4 gap-x-6 lg:grid-cols-3">
            <LatestTransactions />
            <Activities />
          </div>
        </div>
        <div className="col-span-4 mt-4 lg:col-span-1 lg:mt-0">
          <Profile />
          <CategoriesChart />
        </div>
      </div>
    </MainLayout>
  );
}
