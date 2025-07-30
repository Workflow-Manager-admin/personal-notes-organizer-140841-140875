import React from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

// PUBLIC_INTERFACE
export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <input
      type="search"
      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white dark:bg-neutral-800 dark:border-neutral-700"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={placeholder || "Search"}
      autoComplete="off"
    />
  );
}
