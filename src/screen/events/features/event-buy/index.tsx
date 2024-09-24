import React from "react";
import EventBuyComponent from "../../_components/buy";
import { useParams } from "next/navigation";

export default function EventBuyScreen() {
  const params = useParams();

  return <EventBuyComponent eventId={params?.id as string} />;
}
