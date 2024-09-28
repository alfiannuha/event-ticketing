import { TemplateString } from "next/dist/lib/metadata/types/metadata-types";
import Head from "next/head";
import React from "react";

interface Props {
  title?: string | TemplateString | null | undefined;
  description?: string | null | undefined;
  metadataBase?: URL | null | undefined;
}

export default function HeaderPage(props: Props) {
  const { title, description } = props;

  return (
    <div>
      <Head>
        <title>{String(title) ?? ""}</title>
        <meta name="description" content={String(description) ?? ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
