import { ClientRoutes } from "~/utils/constants/routes";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import {
  type GetServerSidePropsResult,
  type GetServerSidePropsContext,
} from "next";

type Props = {
  [key: string]: any;
};

export const requireAuth = async (
  context: GetServerSidePropsContext,
  cb?: () => Promise<GetServerSidePropsResult<Props>>
): Promise<GetServerSidePropsResult<Props>> => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: ClientRoutes.LOGIN,
        permanent: false,
      },
    };
  }

  if (cb) {
    return await cb();
  }

  return {
    props: {},
  };
};
