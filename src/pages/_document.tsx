import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/kwik.png" />
      </Head>
      <body className="bg-gray-900 text-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
