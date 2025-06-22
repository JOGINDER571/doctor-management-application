import React, { createContext, useState, useContext} from "react";

// Define types
interface AuthContextType {
  token: boolean;
  login: () => void;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<boolean>(() => {
    return localStorage.getItem("token") === "true";
  });

  const login = () => {
    setToken(true);
    localStorage.setItem("token", "true");
  };

  const logout = () => {
    setToken(false);
    localStorage.setItem("token", "false");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
