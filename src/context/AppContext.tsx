import React, { createContext, useContext } from "react";
import { doctors } from "../assets/assets";
import type { DoctorInterface } from "../assets/assets";
interface AppContextType {
  doctors: DoctorInterface[];
  currencySymbol: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const currencySymbol = '$';
  const value = {
    doctors,
    currencySymbol
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
