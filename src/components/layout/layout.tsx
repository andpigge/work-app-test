import React, { ReactNode } from "react";
import { Header } from "@src/components/layout/header";
import styles from './layout.module.scss';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header className={styles.header} />
      <main className={styles.main}>{children}</main>
    </>
  );
};
