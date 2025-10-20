"use client";
import { api } from "@/lib/api";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  refresh: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProver = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  //Refresh token access
  const refresh = async () => {
    try {
      const data = await api("/api/auth/refresh-token", {
        method: "POST",
      });
      Cookies.set("accessToken", data?.data?.accessToken, {
        expires: 2,
        secure: true,
        sameSite: "None",
      });
      setAccessToken(data?.data?.accessToken);
    } catch (error) {
      console.log("Refresh Token failed:", error);
      setAccessToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loading, accessToken, refresh, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within <AuthProvider>");
  return context;
};
