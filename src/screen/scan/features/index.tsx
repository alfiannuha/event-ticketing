import React from "react";
import ScannerComponent from "../_components/scanner";
import { useRouter } from "next/router";

export default function ScanScreen() {
  const router = useRouter();

  return <ScannerComponent eventId={router.query.id as string} />;
}
