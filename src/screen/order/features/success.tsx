import React from "react";
import OrderSuccessComponent from "../_components/success";
import { useRouter } from "next/router";

export default function OrderSuccessScreen() {
  const { query } = useRouter();

  return <OrderSuccessComponent id={query.id as string} />;
}
