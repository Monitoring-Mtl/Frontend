"use client";
import { StationLocation } from "@/types/bixiTypes";
import { createContext, useContext, useState, type ReactNode } from "react";

interface DataContextState {
  bixiTripControlBoroughs: string[];
  setBixiTripControlBoroughs: React.Dispatch<React.SetStateAction<string[]>>;
  bixiTripControlStartBoroughSelect: string;
  setBixiTripControlStartBoroughSelect: React.Dispatch<
    React.SetStateAction<string>
  >;
  bixiTripControlEndBoroughSelect: string;
  setBixiTripControlEndBoroughSelect: React.Dispatch<
    React.SetStateAction<string>
  >;
  bixiTripControlStartStationSelect: StationLocation;
  setBixiTripControlStartStationSelect: React.Dispatch<
    React.SetStateAction<StationLocation>
  >;
  bixiTripControlEndStationSelect: StationLocation;
  setBixiTripControlEndStationSelect: React.Dispatch<
    React.SetStateAction<StationLocation>
  >;
}

const defaultBixiStation = {
  name: "",
  arrondissement: "",
  latitude: null,
  longitude: null,
};

const DataContext = createContext<DataContextState>({
  bixiTripControlBoroughs: [],
  setBixiTripControlBoroughs: () => {},
  bixiTripControlStartBoroughSelect: "",
  setBixiTripControlStartBoroughSelect: () => {},
  bixiTripControlEndBoroughSelect: "",
  setBixiTripControlEndBoroughSelect: () => {},
  bixiTripControlStartStationSelect: defaultBixiStation,
  setBixiTripControlStartStationSelect: () => {},
  bixiTripControlEndStationSelect: defaultBixiStation,
  setBixiTripControlEndStationSelect: () => {},
});

export const DataContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [bixiTripControlBoroughs, setBixiTripControlBoroughs] = useState<
    string[]
  >([]);
  const [
    bixiTripControlStartBoroughSelect,
    setBixiTripControlStartBoroughSelect,
  ] = useState("");
  const [bixiTripControlEndBoroughSelect, setBixiTripControlEndBoroughSelect] =
    useState("");
  const [
    bixiTripControlStartStationSelect,
    setBixiTripControlStartStationSelect,
  ] = useState<StationLocation>(defaultBixiStation);
  const [bixiTripControlEndStationSelect, setBixiTripControlEndStationSelect] =
    useState<StationLocation>(defaultBixiStation);

  return (
    <DataContext.Provider
      value={{
        bixiTripControlBoroughs,
        setBixiTripControlBoroughs,
        bixiTripControlStartBoroughSelect,
        setBixiTripControlStartBoroughSelect,
        bixiTripControlEndBoroughSelect,
        setBixiTripControlEndBoroughSelect,
        bixiTripControlStartStationSelect,
        setBixiTripControlStartStationSelect,
        bixiTripControlEndStationSelect,
        setBixiTripControlEndStationSelect,
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
