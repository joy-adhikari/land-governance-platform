"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "ADMIN" | "OFFICIAL" | "RESEARCHER" | "INSTITUTION" | "PUBLIC";

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  organization?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem("landgov_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user", e);
        localStorage.removeItem("landgov_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, role: UserRole) => {

    const mockUser: User = {
      id: "user-" + Math.random().toString(36).substr(2, 9),
      email,
      full_name: role === "ADMIN" ? "System Administrator" : "Verified User",
      role,
      organization: role === "RESEARCHER" ? "IIT Bombay" : "DoLR",
    };
    setUser(mockUser);
    localStorage.setItem("landgov_user", JSON.stringify(mockUser));
    router.push("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("landgov_user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
