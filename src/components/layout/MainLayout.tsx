import React from "react";
import Navbar from "./Navbar";

export default function MainLayout(props: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
}
