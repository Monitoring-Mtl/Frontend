export type BixiStationLocation = {
  name: string;
  arrondissement: string;
  latitude: number | null;
  longitude: number | null;
};

export type BixiTripDurationAverage = {
  averageDuration: number | null;
  tripCount: number;
};

export type BixiYearlyAverageTripDurations = {
  averageDurations: number[];
  tripCounts: number[];
  years: string[];
};

export const defaultBixiStation = {
  name: "",
  arrondissement: "",
  latitude: null,
  longitude: null,
};

export const defaultBixiYearlyAverageTripDurations = {
  averageDurations: [],
  tripCounts: [],
  years: [],
};
