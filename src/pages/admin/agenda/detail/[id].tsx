import AgendaDetailScreen from "@/screen/private/features/agenda/features/detail";
import { useParams } from "next/navigation";
import React from "react";

export default function AgendaDetailPage() {
  const params = useParams();

  console.log("params page", params);

  return <AgendaDetailScreen />;
}
