import { bixiApiBaseUrl } from "@/config/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const arrondissement = searchParams.get("arrondissement");
  const name = searchParams.get("name");

  let query = new URLSearchParams();
  if (arrondissement) {
    query.append("arrondissement", arrondissement);
  }
  if (name) {
    query.append("name", name);
  }

  try {
    console.log("Fetching station locations");
    const response = await fetch(`${bixiApiBaseUrl}/stations?${query}`);
    if (!response.ok) {
      throw new Error("Failed to fetch station locations");
    }
    const stationLocations = await response.json();
    return NextResponse.json(stationLocations, { status: 200 });
  } catch (error) {
    console.error("Error fetching station locations:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
