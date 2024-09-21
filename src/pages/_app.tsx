import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Fragment } from "react";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Component {...pageProps} />
      <Toaster richColors closeButton />
    </Fragment>
  );
}
