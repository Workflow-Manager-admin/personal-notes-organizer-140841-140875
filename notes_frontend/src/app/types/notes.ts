export interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  owner_id: number;
}

export interface NotesList {
  notes: Note[];
}

export interface NoteInput {
  title: string;
  content: string;
}

export interface NoteUpdate {
  title?: string | null;
  content?: string | null;
}
