import { showNotes } from "./noteController";
import { getNotes, saveNotes } from "./noteStorage";

export function toggleFixNote(id: number) {
  const notes = getNotes()

  const targetNote = notes.filter(note => note.id === id)[0]
  targetNote.fixed = !targetNote.fixed

  saveNotes(notes)
  showNotes()
}