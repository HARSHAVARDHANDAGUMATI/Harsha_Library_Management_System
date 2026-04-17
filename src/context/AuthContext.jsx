import React, { createContext, useContext, useState, useEffect } from "react";
import harshaProfile from "../assets/harsha-profile.png";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("archivist_user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Synchronize Harsha's photo if it's the old one (case-insensitive check)
      if (parsedUser.name && parsedUser.name.toLowerCase() === "harsha") {
        parsedUser.avatar = harshaProfile;
        localStorage.setItem("archivist_user", JSON.stringify(parsedUser));
      }
      setUser(parsedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login logic
    const mockUser = {
      id: "u1",
      name: "Harsha",
      email: email || "harsha@library.org",
      role: "Gold Member",
      isAdmin: true,
      memberSince: "Oct 2021",
      totalLoans: 142,
      activeLimit: "5/10",
      rewardPoints: 2840,
      avatar: harshaProfile
    };
    setUser(mockUser);
    localStorage.setItem("archivist_user", JSON.stringify(mockUser));
    return true;
  };

  const register = (name, email, password) => {
    // Mock registration logic
    const mockUser = {
      id: "u" + Date.now(),
      name,
      email,
      role: "Member",
      memberSince: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      totalLoans: 0,
      activeLimit: "0/5",
      rewardPoints: 0,
      avatar: harshaProfile
    };
    setUser(mockUser);
    localStorage.setItem("archivist_user", JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("archivist_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
