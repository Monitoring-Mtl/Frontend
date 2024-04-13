"use client";

import BixiDashboard from "./components/dashboards/BixiDashboard";
import StmDashboard from "./components/dashboards/StmDashboard";

export default function Home() {
  return (
    <>
      <StmDashboard />
      <BixiDashboard />
    </>
  );
}
