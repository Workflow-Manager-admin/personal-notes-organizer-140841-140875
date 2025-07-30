"use client";
import React, { useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/");
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--background)]">
      <AuthForm />
      <div className="mt-4 text-center text-gray-700 dark:text-gray-200">
        No account?{" "}
        <a href="/register" className="text-primary font-semibold underline underline-offset-2">
          Register
        </a>
      </div>
    </div>
  );
}
