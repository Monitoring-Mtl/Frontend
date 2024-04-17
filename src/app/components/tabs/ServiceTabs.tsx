"use client";
import { useLayout } from "@/contexts/LayoutContext";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SyntheticEvent } from "react";

const redTheme = createTheme({
  palette: {
    primary: {
      main: "#DC2626",
    },
  },
});

export default function ServiceTabs() {
  const { serviceTabValue, setServiceTabValue } = useLayout();
  const prefix = "service-tabs";

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setServiceTabValue(newValue);
  };

  return (
    <ThemeProvider theme={redTheme}>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={serviceTabValue}
            onChange={handleChange}
            id={`${prefix}-tabs`}
            data-testid={`${prefix}-tabs`}
          >
            <Tab
              label="STM"
              id={`${prefix}-tab-stm`}
              data-testid={`${prefix}-tab-stm`}
            />
            <Tab
              label="Bixi"
              id={`${prefix}-tab-bixi`}
              data-testid={`${prefix}-tab-bixi`}
            />
            <Tab
              label="À propos"
              id={`${prefix}-tab-about`}
              data-testid={`${prefix}-tab-about`}
            />
          </Tabs>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
