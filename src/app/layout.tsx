import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SelectBusLineForm from "./layouts/SelectBusLineForm";

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

        <div id="header" className="bg-red-600">
          <picture>
            <img
              src={"/logo-pfe.png"}
              alt={"logo"}
              className="h-full"
            />
          </picture>
        </div>

        <div id="dashboard-and-side-menu" className="grid grid-cols-12">
          <div id="dashboard" className="col-span-10">{children}</div>
          <div className="side-menu col-span-2">
            <div className="side-menu-top h-80 border-b-2"></div>
            <div className="side-menu-bottom">
              <SelectBusLineForm />
            </div>
          </div>
        </div>

        <div id="footer"></div>

      </body>
    </html>
  );
}
