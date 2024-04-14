"use client";

import { useLayout } from "@/contexts/LayoutContext";
import { Card } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Row from "../../layouts/Row";
import BixiTripControlForm from "../controls/BixiTripControlForm";
import BixiControlTabs from "../tabs/BixiControlTabs";

export default function BixiDashboard() {
  const prefix = "bixi-dashboard";
  const bixiAnalysis = true;
  const { serviceTabValue } = useLayout();

  return (
    serviceTabValue === 1 && (
      <div id={prefix} data-testid={prefix}>
        <Row>
          <Card
            id={`${prefix}-main-card`}
            className="col-span-9 h-100 pt-0"
            data-testid={`${prefix}-main-card`}
          ></Card>
          <Card
            id={`${prefix}-form-card`}
            className="col-span-3 min-h-[676px] flex flex-col justify-between"
            data-testid={`${prefix}-form-card`}
          >
            <BixiControlTabs />
            <BixiTripControlForm />
          </Card>
        </Row>

        {bixiAnalysis && (
          <Row>
            <Card
              id={`${prefix}-analysis-card-1`}
              className="col-span-4 h-96"
              data-testid={`${prefix}-analysis-card-1`}
            ></Card>
            <Card
              id={`${prefix}-analysis-card-2`}
              className="col-span-4"
              data-testid={`${prefix}-analysis-card-2`}
            ></Card>
            <Card
              id={`${prefix}-analysis-card-3`}
              className="col-span-4"
              data-testid={`${prefix}-analysis-card-3`}
            ></Card>
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
