import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./layouts/Footer";

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
        <div id="header" style={{ height: "4rem" }}>
          <picture className="h-full">
            <img
              src={"/logo-pfe.png"}
              alt={"logo"}
              style={{ height: "100%" }}
            />
          </picture>
        </div>
        <div style={{ height: "6rem" }}></div>
        <main>{children}</main>
        <div style={{ height: "6rem" }}></div>
        <Footer />
      </body>
    </html>
  );
}
