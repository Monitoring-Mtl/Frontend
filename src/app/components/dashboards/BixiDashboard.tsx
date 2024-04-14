"use client";

import { useLayout } from "@/contexts/LayoutContext";
import { Card } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Row from "../../layouts/Row";

export default function BixiDashboard() {
  const bixiAnalysis = true;
  const { serviceTabValue } = useLayout();

  return (
    serviceTabValue === 1 && (
      <div data-testid="bixi-dashboard">
        <Row>
          <Card className="col-span-9 h-100 pt-0"></Card>
          <Card
            id="bus-line-form"
            className="col-span-3 min-h-[676px] flex flex-col justify-between"
          ></Card>
        </Row>

        {bixiAnalysis && (
          <Row>
            <Card className="col-span-4 h-96"></Card>

            <Card className="col-span-4"></Card>

            <Card className="col-span-4"></Card>
          </Row>
        )}

        <ToastContainer
          autoClose={2000}
          pauseOnFocusLoss={false}
          closeOnClick
          newestOnTop={true}
          pauseOnHover={true}
          icon={true}
        />
      </div>
    )
  );
}
