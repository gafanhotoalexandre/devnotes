import { cleanNotes, createNote, generateNoteId, showNotes } from "./noteController";
import { getNotes, saveNotes } from "./noteStorage";

export function toggleFixNote(id: number) {
  const notes = getNotes()

  const targetNote = notes.filter(note => note.id === id)[0]
  targetNote.fixed = !targetNote.fixed

  saveNotes(notes)
  showNotes()
}

export function deleteNote(id: number, element: HTMLElement, notesContainer: HTMLElement) {
  const notes = getNotes().filter(note => note.id !== id)
  saveNotes(notes)
  notesContainer.removeChild(element)
}

export function copyNote(id: number, notesContainer: HTMLElement) {
  const notes = getNotes();
  const targetNote = notes.filter(note => note.id === id)[0]

  const noteObject = {
    id: generateNoteId(),
    content: targetNote.content,
    fixed: false
  }

  const noteElement = createNote(noteObject.id, noteObject.content, noteObject.fixed)
  notesContainer.appendChild(noteElement)

  notes.push(noteObject)
  saveNotes(notes)
}

// Update note
export function updateNote(id: number, newContent: string) {
  const notes = getNotes()
  const targetNote = notes.filter(note => note.id === id)[0]

  targetNote.content = newContent

  saveNotes(notes)
}

// Search note
export function searchNotes(searchQuery: string, notesContainer:HTMLElement) {
  const notes = getNotes()
  const searchResults = notes.filter(note => note.content.includes(searchQuery))

  if (searchQuery !== '') {
    cleanNotes()

    searchResults.forEach(note => {
      const noteElement = createNote(note.id, note.content)
      notesContainer.appendChild(noteElement)
    })
    return
  }

  cleanNotes()
  showNotes()
}