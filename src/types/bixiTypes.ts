export type StationLocation = {
  name: string;
  arrondissement: string;
  latitude: number | null;
  longitude: number | null;
};

export const defaultBixiStation = {
  name: "",
  arrondissement: "",
  latitude: null,
  longitude: null,
};
