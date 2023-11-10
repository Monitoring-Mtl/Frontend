import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "../layouts/Footer";

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
        <div id="header" className="h-16">
          <picture className="h-full">
            <img src={"/logo-pfe.png"} alt={"logo"} className="h-full" />
          </picture>
        </div>
        <div className="h-24"></div>
        <main>{children}</main>
        <div className="h-24"></div>
      </body>
      <Footer />
    </html>
  );
}
