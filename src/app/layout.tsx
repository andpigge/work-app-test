import type { Metadata } from "next";
import { ReactNode } from "react";
import { Open_Sans } from "next/font/google";
import '@src/styles/global.scss';
import { Layout } from "@src/components/layout";
import { ChakraProvider } from "@chakra-ui/react";
import { Providers } from "@src/redux/provider";

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
        <Providers>
          <ChakraProvider>
            <Layout>{children}</Layout>
          </ChakraProvider>
        </Providers>
      </body>
    </html>
  );
}
