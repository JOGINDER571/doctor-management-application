import React, { createContext, useContext, useState, useEffect } from "react";
import { assets, type DoctorInterface } from "../assets/assets";
import { DoctorService } from "../services/DoctorService";
import { toast } from "react-toastify";
import { UserService } from "../services/UserService";
interface Address {
  line1: string;
  line2: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: Address;
  gender: "Male" | "Female" | "Other";
  dob: string;
  image: string;
}
interface AppContextType {
  doctors: DoctorInterface[];
  currencySymbol: string;
  setDoctors: React.Dispatch<React.SetStateAction<DoctorInterface[]>>;
  userInfo: User;
  setUserInfo: React.Dispatch<React.SetStateAction<User>>;
  fetchDoctors: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [doctors, setDoctors] = useState<DoctorInterface[]>([]);
  const [userInfo, setUserInfo] = useState<User>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    address: { line1: "", line2: "" },
    gender: "Other",
    dob: "",
    image: assets.profile_pic,
  });
  const currencySymbol = "$";

  const fetchDoctors = async () => {
    try {
      const response = await DoctorService.getDoctors();
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      // showLoader();
      const response = await UserService.getUser(token);
      if (response.data.data) {
        setUserInfo(response.data.data);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      // hideLoader();
    }
  };

  const value = {
    doctors,
    currencySymbol,
    setDoctors,
    userInfo,
    setUserInfo,
    fetchDoctors,
    fetchUser,
  };

  useEffect(() => {
    fetchUser();
    fetchDoctors();
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
