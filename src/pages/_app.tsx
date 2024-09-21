import MainLayout from "@/components/layout/MainLayout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Fragment } from "react";
import { Toaster } from "sonner";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Fragment>
      <SessionProvider session={session}>
        <MainLayout>
          <Component {...pageProps} />
          <Toaster richColors closeButton />
        </MainLayout>
      </SessionProvider>
    </Fragment>
  );
}
