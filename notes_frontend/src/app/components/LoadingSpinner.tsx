import React from "react";

// PUBLIC_INTERFACE
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-32">
      <svg
        className="animate-spin text-primary"
        width={32}
        height={32}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle className="opacity-20" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth="4" />
        <path d="M22 12A10 10 0 0 1 12 22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
}
