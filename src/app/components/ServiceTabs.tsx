"use client";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SyntheticEvent, useState } from "react";

const redTheme = createTheme({
  palette: {
    primary: {
      main: "#DC2626",
    },
  },
});

export default function ServiceTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={redTheme}>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="STM" />
            <Tab label="Bixi" />
            <Tab label="À propos" />
          </Tabs>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
