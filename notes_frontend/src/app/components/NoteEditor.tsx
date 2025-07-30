"use client";
import React, { useEffect, useState } from "react";
import { fetchNote, updateNote, deleteNote } from "../lib/api";
import { Note } from "../types/notes";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  noteId: number | null;
  onNoteDeleted: () => void;
};

export default function NoteEditor({ noteId, onNoteDeleted }: Props) {
  const [note, setNote] = useState<Note | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load note on noteId change
  useEffect(() => {
    if (!noteId) return;
    setLoading(true);
    fetchNote(noteId)
      .then(n => {
        setNote(n);
        setEditTitle(n.title);
        setEditContent(n.content);
        setError(null);
        setIsDirty(false);
      })
      .catch(() => setError("Could not load note."))
      .finally(() => setLoading(false));
  }, [noteId]);

  // Auto-save on edit (debounced)
  useEffect(() => {
    if (!note || !isDirty) return;
    const timeout = setTimeout(() => {
      setSaving(true);
      updateNote(note.id, { title: editTitle, content: editContent })
        .then(n => { setNote(n); setIsDirty(false); })
        .catch(() => setError("Update failed."))
        .finally(() => setSaving(false));
    }, 600);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [editTitle, editContent]);

  if (!noteId) {
    return (
      <div className="w-full h-full flex items-center justify-center text-secondary/80">
        Select or create a note to begin.
      </div>
    );
  }
  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!note) return null;

  const handleDelete = async () => {
    if (!window.confirm("Delete this note permanently?")) return;
    await deleteNote(note.id);
    onNoteDeleted();
  };

  return (
    <div className="h-full flex flex-col px-8 py-4 space-y-4">
      <input
        className="text-2xl font-bold border-none focus:ring-transparent focus:outline-none bg-transparent mb-2"
        value={editTitle}
        disabled={saving}
        onChange={e => { setEditTitle(e.target.value); setIsDirty(true); }}
        placeholder="Untitled"
        maxLength={100}
        spellCheck
        autoFocus
      />
      <textarea
        className="flex-1 w-full resize-none border-none text-base bg-transparent focus:outline-none focus:ring-0"
        value={editContent}
        disabled={saving}
        onChange={e => { setEditContent(e.target.value); setIsDirty(true); }}
        placeholder="Write your note here..."
        rows={18}
        spellCheck
      />
      <div className="flex items-center gap-6">
        <button
          className="text-xs px-3 py-1 rounded bg-red-600 text-white font-bold hover:bg-red-700"
          onClick={handleDelete}
          disabled={saving}
        >
          Delete
        </button>
        {saving && <span className="text-xs text-primary">Saving...</span>}
        {!saving && isDirty && <span className="text-xs text-secondary">Unsaved</span>}
        {!isDirty && !saving && <span className="text-xs text-green-600">Saved</span>}
        <span className="flex-1"></span>
        {note.updated_at && (
          <span className="text-xs text-secondary/60">Last edit: {new Date(note.updated_at).toLocaleString()}</span>
        )}
      </div>
    </div>
  );
}
