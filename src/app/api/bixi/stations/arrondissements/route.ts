import { bixiApiBaseUrl } from "@/config/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log(
      "Fetching arrondissements from URL:",
      `${bixiApiBaseUrl}/stations/arrondissements`
    );
    const response = await fetch(`${bixiApiBaseUrl}/stations/arrondissements`);
    if (!response.ok) {
      throw new Error("Failed to fetch arrondissements");
    }
    const arrondissements = await response.json();
    return NextResponse.json(arrondissements, { status: 200 });
  } catch (error) {
    console.error("Error :", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
