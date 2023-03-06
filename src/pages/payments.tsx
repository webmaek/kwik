import { type GetServerSideProps } from "next";
import { requireAuth } from "~/utils/requireAuth";
import { PaymentsView } from "~/views/Payments.view";

export default function PaymentsPage() {
  return <PaymentsView />;
}

export const getServerSideProps: GetServerSideProps = (context) =>
  requireAuth(context);
