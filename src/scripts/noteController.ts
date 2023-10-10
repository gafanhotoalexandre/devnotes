import { Note } from "../types/Note"
import { copyNote, deleteNote, toggleFixNote, updateNote } from "./noteActions"

import { getNotes, saveNotes } from "./noteStorage"

// Elements
const notesContainer = document.querySelector('#notes-container') as HTMLElement
const noteInput = document.querySelector('#note-content') as HTMLInputElement
const addNoteBtn = document.querySelector('.add-note') as HTMLButtonElement

// Functions
export function showNotes() {
  cleanNotes()

  getNotes().forEach(note => {
    const noteElement = createNote(note.id, note.content, note.fixed)
    notesContainer.appendChild(noteElement)
  })
}

function addNote() {
  const notes: Note[] = getNotes()

  const noteObject: Note = {
    id: generateNoteId(),
    content: noteInput.value,
    fixed: false
  }

  const noteElement = createNote(noteObject.id, noteObject.content)
  notesContainer.appendChild(noteElement)

  notes.push(noteObject)
  saveNotes(notes)
  
  noteInput.value = ''
}

export function generateNoteId(): number {
  return Math.floor(Math.random() * 5000)
}

export function createNote(id: number, content: string, fixed?: boolean) {
  const element = document.createElement('div')
  element.classList.add('note')

  const textarea = document.createElement('textarea')
  textarea.value = content
  textarea.placeholder = 'Adicione algum texto...'

  element.appendChild(textarea)

  const pinIcon = document.createElement('i')
  pinIcon.classList.add(...['ph', 'ph-push-pin-simple'])

  element.appendChild(pinIcon)

  const deleteIcon = document.createElement('i')
  deleteIcon.classList.add(...['ph', 'ph-file-plus'])
  element.appendChild(deleteIcon)

  const duplicateIcon = document.createElement('i')
  duplicateIcon.classList.add(...['ph', 'ph-x'])
  element.appendChild(duplicateIcon)

  if (fixed) element.classList.add('fixed')

  // Element Events
  element.querySelector('textarea')!.addEventListener('keyup', (e) => {
    // const noteContent = e.target.value
    const target = e.target as HTMLTextAreaElement
    updateNote(id, target.value)
  })

  element.querySelector('.ph-push-pin-simple')?.addEventListener('click', () => {
    toggleFixNote(id)
  })

  element.querySelector('.ph-x')?.addEventListener('click', () => {
    deleteNote(id, element, notesContainer)
  })

  element.querySelector('.ph-file-plus')?.addEventListener('click', () => {
    copyNote(id, notesContainer)
  })

  return element
}

function cleanNotes(){
  notesContainer.replaceChildren()
}

// Event
addNoteBtn.addEventListener('click', () => addNote())

// boot
showNotes()