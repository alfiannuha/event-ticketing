import React from "react";
import EventDetailComponent from "../../_components/detail";
import { useParams } from "next/navigation";

export default function EventDetailScreen() {
  const params = useParams();

  return <EventDetailComponent eventId={(params?.id as string) || ""} />;
}
