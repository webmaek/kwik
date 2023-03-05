import { type GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { ClientRoutes } from "~/utils/constants/routes";

export default function HomePage() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: ClientRoutes.LOGIN,
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: ClientRoutes.DASHBOARD,
      permanent: false,
    },
  };
};
