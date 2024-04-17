"use client";
import { useEffect } from "react";
import About from "./components/dashboards/About";
import BixiDashboard from "./components/dashboards/BixiDashboard";
import StmDashboard from "./components/dashboards/StmDashboard";

import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  useEffect(() => {
    fetch("/api/bixi/health")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Bixi-Api health check failed");
        }
        return response.json();
      })
      .then((json) => {
        console.log("Bixi-Api health check:", json.message);
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  }, []);

  return (
    <>
      <StmDashboard />
      <BixiDashboard />
      <About />
    </>
  );
}
