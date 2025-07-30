"use client";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  isRegister?: boolean;
  onSuccess?: () => void;
};

// PUBLIC_INTERFACE
export default function AuthForm({ isRegister, onSuccess }: Props) {
  const { login, register, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      if (onSuccess) onSuccess();
    } catch {
      // Do nothing, error is handled in context
    }
    setSubmitting(false);
  };

  return (
    <form className="space-y-6 mx-auto max-w-md mt-20 bg-white dark:bg-neutral-900 shadow-lg p-8 rounded-lg border border-gray-200 dark:border-neutral-700" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-2 text-center">{isRegister ? "Register" : "Login"}</h2>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-800 dark:border-neutral-700"
          name="email"
          type="email"
          required
          autoFocus
          autoComplete="username"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading || submitting}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-800 dark:border-neutral-700"
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete={isRegister ? "new-password" : "current-password"}
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading || submitting}
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 rounded bg-primary text-white font-semibold shadow hover:bg-blue-700 disabled:opacity-60"
        disabled={loading || submitting}
      >
        {submitting || loading ? <LoadingSpinner /> : (isRegister ? "Sign Up" : "Login")}
      </button>
    </form>
  );
}
