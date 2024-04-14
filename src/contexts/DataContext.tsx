"use client";
import { StationLocation } from "@/types/bixiTypes";
import { createContext, useContext, useState, type ReactNode } from "react";

interface DataContextState {
  arrondissements: string[];
  setArrondissements: React.Dispatch<React.SetStateAction<string[]>>;
  stationLocations: StationLocation[];
  setStationLocations: React.Dispatch<React.SetStateAction<StationLocation[]>>;
}

const DataContext = createContext<DataContextState>({
  arrondissements: [],
  setArrondissements: () => {},
  stationLocations: [],
  setStationLocations: () => {},
});

export const DataContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [arrondissements, setArrondissements] = useState<string[]>([]);
  const [stationLocations, setStationLocations] = useState<StationLocation[]>(
    []
  );

  return (
    <DataContext.Provider
      value={{
        arrondissements,
        setArrondissements,
        stationLocations,
        setStationLocations,
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
