import React from "react";
import FormAgendaComponent from "../../_components/form-agenda";
import { useRouter } from "next/router";

export default function FormAgendaScreen() {
  const router = useRouter();

  console.log("params form", router.query);

  return <FormAgendaComponent />;
}
