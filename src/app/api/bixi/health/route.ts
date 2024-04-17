import { bixiApiBaseUrl } from "@/config/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Checking Bixi-Api health at URL:", `${bixiApiBaseUrl}/health`);
    const response = await fetch(`${bixiApiBaseUrl}/health`);
    if (!response.ok) {
      throw new Error("Bixi-Api health check failed");
    }
    const healthStatus = await response.json();
    return NextResponse.json(healthStatus, { status: 200 });
  } catch (error) {
    console.error("Error performing Bixi-Api health check:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
