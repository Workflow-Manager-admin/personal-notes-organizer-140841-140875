import React from "react";
import { Note } from "../types/notes";

type Props = {
  note: Note;
  active: boolean;
  onClick: () => void;
};

export default function NoteItem({ note, active, onClick }: Props) {
  return (
    <button
      className={`block w-full text-left px-4 py-3 border-b border-[var(--sidebar-border)] transition bg-transparent ${
        active ? "bg-accent/10 text-primary font-semibold" : "hover:bg-accent/10"
      } truncate`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="truncate">{note.title || "Untitled"}</div>
      <div className="text-xs text-secondary truncate">{note.content.slice(0, 32) || <span>&nbsp;</span>}</div>
    </button>
  );
}
