"use client";
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface LayoutState {
  serviceTabValue: number;
  setServiceTabValue: React.Dispatch<React.SetStateAction<number>>;
}

//TODO: default serviceTabValue as a config
const LayoutContext = createContext<LayoutState>({
  serviceTabValue: 0,
  setServiceTabValue: () => {},
});

export const LayoutContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [serviceTabValue, setServiceTabValue] = useState(0);

  return (
    <LayoutContext.Provider
      value={{
        serviceTabValue,
        setServiceTabValue,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = (): LayoutState => {
  const context = useContext(LayoutContext);
  if (context === null || context === undefined) {
    throw new Error("use useLayout within a LayoutProvider");
  }
  return context;
};
