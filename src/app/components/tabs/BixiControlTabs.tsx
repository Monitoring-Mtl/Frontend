"use client";
import { useLayout } from "@/contexts/LayoutContext";
import { Box } from "@mui/material";
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

export default function BixiControlTabs() {
  const {
    bixiControlTabValue: bixiTabValue,
    setBixiControlTabValue: setBixiTabValue,
  } = useLayout();
  const prefix = "bixi-control-tabs";

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setBixiTabValue(newValue);
  };

  return (
    <div className="w-full" id={prefix} data-testid={prefix}>
      <ThemeProvider theme={redTheme}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          id={`${prefix}-box`}
          data-testid={`${prefix}-box`}
        >
          <Tabs
            value={bixiTabValue}
            onChange={handleChange}
            variant="fullWidth"
            id={`${prefix}-tabs`}
            data-testid={`${prefix}-tabs`}
          >
            <Tab
              label="Trajets"
              id={`${prefix}-tab-trajets`}
              data-testid={`${prefix}-tab-trajets`}
            />
            <Tab
              label="Stations"
              id={`${prefix}-tab-stations`}
              data-testid={`${prefix}-tab-stations`}
            />
          </Tabs>
        </Box>
      </ThemeProvider>
    </div>
  );
}
