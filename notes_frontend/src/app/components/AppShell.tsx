"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import NoteEditor from "./NoteEditor";
import ProtectedRoute from "./ProtectedRoute";

export default function AppShell() {
  const [activeNoteId, setActiveNoteId] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(0);

  const handleNoteDeleted = () => {
    setActiveNoteId(null);
    setRefresh(val => val + 1); // refresh sidebar notes
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <div className="flex flex-1 min-h-0 h-[calc(100vh-56px)]">
          <Sidebar activeId={activeNoteId} setActiveId={setActiveNoteId} refreshId={refresh} />
          <main className="flex-1 bg-[var(--editor-bg)] h-full">
            <NoteEditor noteId={activeNoteId} onNoteDeleted={handleNoteDeleted} />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
