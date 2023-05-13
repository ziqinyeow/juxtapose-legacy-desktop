import React from "react";
import type { AppProps } from "next/app";

import "@fontsource/dm-sans";
import "../styles/globals.css";
import Layout from "@/components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
