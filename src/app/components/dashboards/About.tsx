"use client";

import { useLayout } from "@/contexts/LayoutContext";

export default function BixiDashboard() {
  const { serviceTabValue } = useLayout();

  return serviceTabValue === 2 && <div data-testid="about-section"></div>;
}
