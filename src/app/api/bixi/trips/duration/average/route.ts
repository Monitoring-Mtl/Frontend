import { bixiApiBaseUrl } from "@/config/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const minStartTime = searchParams.get("minStartTime");
  const maxStartTime = searchParams.get("maxStartTime");
  const startStationName = searchParams.get("startStationName");
  const endStationName = searchParams.get("endStationName");

  let query = new URLSearchParams();
  if (minStartTime) {
    query.append("minStartTime", minStartTime);
  }
  if (maxStartTime) {
    query.append("maxStartTime", maxStartTime);
  }
  if (startStationName) {
    query.append("startStationName", startStationName);
  }
  if (endStationName) {
    query.append("endStationName", endStationName);
  }

  try {
    console.log("Fetching average trip duration");
    const response = await fetch(
      `${bixiApiBaseUrl}/trips/duration/average?${query}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch average trip duration");
    }
    const averageDuration = await response.json();
    return NextResponse.json(averageDuration, { status: 200 });
  } catch (error) {
    console.error("Error fetching average trip duration:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
