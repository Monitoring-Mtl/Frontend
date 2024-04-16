"use client";
import {
  BixiStationLocation,
  BixiYearlyAverageTripDurations,
  defaultBixiStation,
  defaultBixiYearlyAverageTripDurations,
} from "@/types/bixiTypes";
import { createContext, useContext, useState, type ReactNode } from "react";

interface DataContextState {
  bixiTripControlBoroughs: string[];
  setBixiTripControlBoroughs: React.Dispatch<React.SetStateAction<string[]>>;
  bixiTripControlStartBorough: string;
  setBixiTripControlStartBorough: React.Dispatch<React.SetStateAction<string>>;
  bixiTripControlEndBorough: string;
  setBixiTripControlEndBorough: React.Dispatch<React.SetStateAction<string>>;
  bixiTripControlStartStation: BixiStationLocation;
  setBixiTripControlStartStation: React.Dispatch<
    React.SetStateAction<BixiStationLocation>
  >;
  bixiTripControlEndStation: BixiStationLocation;
  setBixiTripControlEndStation: React.Dispatch<
    React.SetStateAction<BixiStationLocation>
  >;
  bixiTripControlStartDate: string;
  setBixiTripControlStartDate: React.Dispatch<React.SetStateAction<string>>;
  bixiTripControlEndDate: string;
  setBixiTripControlEndDate: React.Dispatch<React.SetStateAction<string>>;
  bixiTripControlStartTime: string;
  setBixiTripControlStartTime: React.Dispatch<React.SetStateAction<string>>;
  bixiTripControlEndTime: string;
  setBixiTripControlEndTime: React.Dispatch<React.SetStateAction<string>>;
  bixiYearlyAverageTripDurations: BixiYearlyAverageTripDurations;
  setBixiYearlyAverageTripDurations: React.Dispatch<
    React.SetStateAction<BixiYearlyAverageTripDurations>
  >;
}

const DataContext = createContext<DataContextState>({
  bixiTripControlBoroughs: [],
  setBixiTripControlBoroughs: () => {},
  bixiTripControlStartBorough: "",
  setBixiTripControlStartBorough: () => {},
  bixiTripControlEndBorough: "",
  setBixiTripControlEndBorough: () => {},
  bixiTripControlStartStation: defaultBixiStation,
  setBixiTripControlStartStation: () => {},
  bixiTripControlEndStation: defaultBixiStation,
  setBixiTripControlEndStation: () => {},
  bixiTripControlStartDate: "",
  setBixiTripControlStartDate: () => {},
  bixiTripControlEndDate: "",
  setBixiTripControlEndDate: () => {},
  bixiTripControlStartTime: "",
  setBixiTripControlStartTime: () => {},
  bixiTripControlEndTime: "",
  setBixiTripControlEndTime: () => {},
  bixiYearlyAverageTripDurations: defaultBixiYearlyAverageTripDurations,
  setBixiYearlyAverageTripDurations: () => {},
});

export const DataContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [bixiTripControlBoroughs, setBixiTripControlBoroughs] = useState<
    string[]
  >([]);
  const [bixiTripControlStartBorough, setBixiTripControlStartBorough] =
    useState("");
  const [bixiTripControlEndBorough, setBixiTripControlEndBorough] =
    useState("");
  const [bixiTripControlStartStation, setBixiTripControlStartStation] =
    useState<BixiStationLocation>(defaultBixiStation);
  const [bixiTripControlEndStation, setBixiTripControlEndStation] =
    useState<BixiStationLocation>(defaultBixiStation);
  const [bixiTripControlStartDate, setBixiTripControlStartDate] =
    useState<string>("");
  const [bixiTripControlEndDate, setBixiTripControlEndDate] =
    useState<string>("");
  const [bixiTripControlStartTime, setBixiTripControlStartTime] =
    useState<string>("");
  const [bixiTripControlEndTime, setBixiTripControlEndTime] =
    useState<string>("");
  const [bixiYearlyAverageTripDurations, setBixiYearlyAverageTripDurations] =
    useState<BixiYearlyAverageTripDurations>(
      defaultBixiYearlyAverageTripDurations
    );

  return (
    <DataContext.Provider
      value={{
        bixiTripControlBoroughs,
        setBixiTripControlBoroughs,
        bixiTripControlStartBorough,
        setBixiTripControlStartBorough,
        bixiTripControlEndBorough,
        setBixiTripControlEndBorough,
        bixiTripControlStartStation,
        setBixiTripControlStartStation,
        bixiTripControlEndStation,
        setBixiTripControlEndStation,
        bixiTripControlStartDate,
        setBixiTripControlStartDate,
        bixiTripControlEndDate,
        setBixiTripControlEndDate,
        bixiTripControlStartTime,
        setBixiTripControlStartTime,
        bixiTripControlEndTime,
        setBixiTripControlEndTime,
        bixiYearlyAverageTripDurations,
        setBixiYearlyAverageTripDurations,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextState => {
  const context = useContext(DataContext);
  if (context === null || context === undefined) {
    throw new Error("use useData within a DataContextProvider");
  }
  return context;
};
