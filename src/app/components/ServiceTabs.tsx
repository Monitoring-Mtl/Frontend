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

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setServiceTabValue(newValue);
  };

  return (
    <ThemeProvider theme={redTheme}>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={serviceTabValue} onChange={handleChange}>
            <Tab label="STM" />
            <Tab label="Bixi" />
            <Tab label="À propos" />
          </Tabs>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
