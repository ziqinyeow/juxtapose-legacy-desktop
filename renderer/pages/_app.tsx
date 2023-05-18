import React from "react";
import type { AppProps } from "next/app";

import "@fontsource/dm-sans";
import "../styles/globals.css";
import Layout from "@/components/layout";
import { MantineProvider } from "@mantine/core";
import FullScreenDropzone from "@/components/FullScreenDropzone";
import { DataProvider } from "@/context/media";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en-MY.json";
TimeAgo.addDefaultLocale(en);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <DataProvider>
        <FullScreenDropzone />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataProvider>
    </MantineProvider>
  );
}

export default MyApp;
