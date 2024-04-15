import { fetchArrondissements } from "@/services/BixiApiService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Fetching arrondissements...");
    const arrondissements = await fetchArrondissements();
    return NextResponse.json(arrondissements, { status: 200 });
  } catch (error) {
    console.error("Error :", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
