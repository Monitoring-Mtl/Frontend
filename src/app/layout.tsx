import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../css/globals.css";
import Header from "./layouts/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monitoring MTL",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div>
          <Header />
          <main>{children}</main>
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
