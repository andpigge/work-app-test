import type { Metadata } from "next";
import { ReactNode } from "react";
import { Open_Sans } from "next/font/google";
import '@src/styles/index.scss'
import { Layout } from "@src/components/layout";

const openSans = Open_Sans({
  subsets: ["cyrillic"],
  variable: "--font-open-sans",
  weight: ["400", "600", "700", "800"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "work-app-test",
  description: "work-app-test for ISART",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className={openSans.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
