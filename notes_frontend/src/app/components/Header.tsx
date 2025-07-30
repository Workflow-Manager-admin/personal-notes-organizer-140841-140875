"use client";
import React from "react";
import { useAuth } from "../context/AuthContext";

// PUBLIC_INTERFACE
export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="h-14 w-full flex items-center justify-between px-6 bg-[var(--header-bg)] border-b border-[var(--sidebar-border)]">
      <span className="text-xl font-bold text-primary tracking-tight">Notes</span>
      <div className="flex gap-4 items-center">
        {user && (
          <>
            <span className="text-sm text-foreground">{user.email}</span>
            <button className="rounded px-3 py-1 text-xs font-semibold bg-secondary text-white hover:bg-primary transition-all" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
