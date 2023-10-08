import { Note } from "../types/Note";

export function saveNotes(notes: Note[]): void {
  localStorage.setItem('notes', JSON.stringify(notes))
}

export function getNotes(): Note[] {
  const notes: Note[] = JSON.parse(localStorage.getItem('notes') || '[]')

  const orderedNotes = notes.sort((a, b) => a.fixed > b.fixed ? -1 : 1)

  return orderedNotes
}