"use client";
import React, { useEffect, useState } from "react";
import { fetchNotes, createNote } from "../lib/api";
import { Note } from "../types/notes";
import NoteItem from "./NoteItem";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";

export default function Sidebar({
  activeId,
  setActiveId,
  refreshId,
}: {
  activeId: number | null;
  setActiveId: (id: number) => void;
  refreshId: number;
}) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchNotes(search)
      .then(res => { if (mounted) setNotes(res.notes); })
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, [refreshId, search]);

  const handleCreate = async () => {
    setCreating(true);
    try {
      const note = await createNote({ title: "Untitled", content: "" });
      setActiveId(note.id);
    } finally {
      setCreating(false);
    }
  };

  return (
    <aside className="h-full flex flex-col bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)] w-72 min-w-[220px]">
      <div className="p-4 flex flex-col gap-2">
        <SearchBar value={search} onChange={setSearch} placeholder="Search notes..." />
        <button
          className="mt-2 py-2 px-3 rounded bg-primary text-white font-semibold hover:bg-blue-700 disabled:opacity-70 flex items-center gap-2"
          onClick={handleCreate}
          disabled={creating}
        >
          + New Note
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <LoadingSpinner />
        ) : notes.length === 0 ? (
          <div className="text-xs text-secondary px-4 py-6 text-center">No notes found</div>
        ) : (
          <ul>
            {notes.map(note => (
              <li key={note.id}>
                <NoteItem
                  note={note}
                  active={activeId === note.id}
                  onClick={() => setActiveId(note.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
