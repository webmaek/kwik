import { type GetServerSideProps } from "next";
import { requireAuth } from "~/utils/requireAuth";
import { DashboardView } from "~/views/Dashboard.view";

export default function DashboardPage() {
  return <DashboardView />;
}

export const getServerSideProps: GetServerSideProps = (context) =>
  requireAuth(context);
