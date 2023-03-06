import { MainLayout } from "~/components/layouts/MainLayout";
import { Profile } from "~/components/Profile";
import { Table } from "~/components/Table";
import { Title } from "~/components/Title";
import { api } from "~/utils/api";
import { columns } from "~/utils/columns/payments";

export function PaymentsView() {
  const { data } = api.transaction.getAll.useQuery();

  return (
    <MainLayout>
      <div className="mt-8 grid grid-cols-4 gap-x-6">
        <div className="col-span-4 lg:col-span-3">
          <div className="mb-4 sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <Title>Transactions</Title>
            </div>
          </div>

          <Table data={data ?? []} columns={columns} />
        </div>
        <div className="col-span-4 mt-6 lg:col-span-1">
          <Profile />
        </div>
      </div>
    </MainLayout>
  );
}
