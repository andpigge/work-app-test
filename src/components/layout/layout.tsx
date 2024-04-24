import React, { ReactNode } from "react";
import { Header } from "@src/components/layout/header";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};
