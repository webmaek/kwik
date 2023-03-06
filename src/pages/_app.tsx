import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NiceModal from "@ebay/nice-modal-react";
import { ToastContainer } from "react-toastify";
import { Poppins } from "@next/font/google";
import Head from "next/head";
import "@tremor/react/dist/esm/tremor.css";
import "react-toastify/dist/ReactToastify.css";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>Kwik App</title>
      </Head>
      <SessionProvider session={session}>
        <NiceModal.Provider>
          <div className={poppins.className}>
            <Component {...pageProps} />
          </div>
          <ToastContainer />
        </NiceModal.Provider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
