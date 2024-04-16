import { bixiApiBaseUrl } from "@/config/config";
import { computeTimeIntervals } from "@/utils/datetime-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const startEpochMillis = parseInt(searchParams.get("startEpochMillis")!);
  const endEpochMillis = parseInt(searchParams.get("endEpochMillis")!);
  const startStationName = searchParams.get("startStationName");
  const endStationName = searchParams.get("endStationName");

  const intervals = computeTimeIntervals(startEpochMillis, endEpochMillis);
  console.log("intervals", intervals);
  const yearlyIntervals = intervals.yearlyIntervals;

  try {
    console.log("Fetching average trip durations for each interval");
    const fetchPromises = yearlyIntervals.map(async (interval) => {
      let query = new URLSearchParams();
      if (interval[0]) {
        query.append("minStartTime", interval[0].toString());
      }
      if (interval[1]) {
        query.append("maxStartTime", interval[1].toString());
      }
      if (startStationName) {
        query.append("startStationName", startStationName);
      }
      if (endStationName) {
        query.append("endStationName", endStationName);
      }

      const response = await fetch(
        `${bixiApiBaseUrl}/trips/duration/average?${query.toString()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch average trip duration");
      }
      const result = await response.json();
      return {
        averageDuration: result.averageDuration
          ? result.averageDuration / 60000
          : null,
        tripCount: result.tripCount,
        year: new Date(interval[0]).getFullYear().toString(),
      };
    });

    const results = await Promise.all(fetchPromises);
    const years = results.map((result) => result.year);
    const yearly = {
      averageDurations: results
        .filter((result) => result.averageDuration !== null)
        .map((result) => result.averageDuration),
      tripCounts: results
        .filter((result) => result.tripCount !== 0)
        .map((result) => result.tripCount),
      years,
    };
    console.log("yearly results", yearly);
    return NextResponse.json(yearly, { status: 200 });
  } catch (error) {
    console.error("Error fetching average trip durations:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
