import { StationLocation } from "@/types/bixiTypes";

const defaultBaseUrl: string =
  process.env.BIXI_API_URL ||
  "https://gwcql0tu03.execute-api.ca-central-1.amazonaws.com/prod/";

export async function checkBixiApiHealth(
  baseUrl: string = defaultBaseUrl
): Promise<{ message: string }> {
  try {
    console.log("Checking Bixi-Api health at URL:", baseUrl);
    const response = await fetch(`${baseUrl}/health`);
    if (!response.ok) {
      throw new Error("Bixi-Api health check failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Error performing Bixi-Api health check:", error);
    throw error;
  }
}

export async function fetchArrondissements(
  baseUrl: string = defaultBaseUrl
): Promise<string[]> {
  try {
    console.log("Fetching arrondissements from URL:", baseUrl);
    const response = await fetch(`${baseUrl}/stations/arrondissements`);
    if (!response.ok) {
      throw new Error("Failed to fetch arrondissements");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching arrondissements:", error);
    throw error;
  }
}

export async function fetchStationLocationsByArrondissement(
  arrondissement: string,
  baseUrl: string = defaultBaseUrl
): Promise<StationLocation[]> {
  try {
    console.log(
      "Fetching station locations for arrondissement:",
      arrondissement
    );
    const response = await fetch(
      `${baseUrl}/stations?arrondissement=${encodeURIComponent(arrondissement)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch station locations");
    }
    return await response.json();
  } catch (error) {
    console.error(
      "Error fetching station locations for arrondissement",
      arrondissement,
      ":",
      error
    );
    throw error;
  }
}
