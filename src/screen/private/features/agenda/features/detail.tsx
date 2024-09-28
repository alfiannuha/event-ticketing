import React from "react";
import AgendaDetailComponent from "../_components/detail";
import { useRouter } from "next/router";

export default function AgendaDetailScreen() {
  const router = useRouter();

  return <AgendaDetailComponent eventId={router.query.id as string} />;
}
