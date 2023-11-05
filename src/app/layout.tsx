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
    <html lang="en">
      <body className={inter.className}>
        <div className="map-and-side-menu grid grid-cols-12 h-full w-full">
          <div className="header-and-map col-span-9 h-full w-full">
            <div className="header h-12 bg-red-600">
              <picture>
                <img
                  src={"/logo-pfe.png"}
                  alt={"logo"}
                  width={`${(48 * 252) / 155}`}
                  height={48}
                />
              </picture>
            </div>
            <div className="map h-full w-full">{children}</div>
          </div>
          <div className="side-menu col-span-3">
            <div className="side-menu-top h-80 border-b-2"></div>
            <div className="side-menu-bottom">
              <SelectBusLineForm />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
