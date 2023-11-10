import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./layouts/Footer";
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
        <Header />
        <div style={{ height: "6rem" }}></div>
        <main>{children}</main>
        <div style={{ height: "6rem" }}></div>
        <Footer />
      </body>
    </html>
  );
}
