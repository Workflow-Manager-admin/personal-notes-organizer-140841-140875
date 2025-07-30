"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

// PUBLIC_INTERFACE
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// PUBLIC_INTERFACE
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_NOTES_BACKEND_URL || "https://vscode-internal-7542-beta.beta01.cloud.kavia.ai:3001";

// Try to parse token payload for user display
function parseJwt(token: string): User | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const obj = JSON.parse(jsonPayload);
    return obj && obj.sub ? { email: obj.sub } : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken) {
      setToken(savedToken);
      setUser(parseJwt(savedToken));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Login failed.");
      }
      const data = await res.json();
      localStorage.setItem("accessToken", data.access_token);
      setToken(data.access_token);
      setUser(parseJwt(data.access_token));
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || "Login failed.");
      } else {
        setError("Login failed.");
      }
      setUser(null); setToken(null);
      localStorage.removeItem("accessToken");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Registration failed.");
      }
      const data = await res.json();
      localStorage.setItem("accessToken", data.access_token);
      setToken(data.access_token);
      setUser(parseJwt(data.access_token));
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || "Registration failed.");
      } else {
        setError("Registration failed.");
      }
      setUser(null); setToken(null);
      localStorage.removeItem("accessToken");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}
