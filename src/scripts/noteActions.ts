import { showNotes } from "./noteController";
import { getNotes, saveNotes } from "./noteStorage";

export function toggleFixNote(id: number) {
  const notes = getNotes()

  const targetNote = notes.filter(note => note.id === id)[0]
  targetNote.fixed = !targetNote.fixed

  saveNotes(notes)
  showNotes()
}

export function deleteNote(id: number, element: HTMLDivElement, notesContainer: HTMLElement) {
  const notes = getNotes().filter(note => note.id !== id)
  saveNotes(notes)
  notesContainer.removeChild(element)
}