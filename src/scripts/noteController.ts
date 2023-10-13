import autoAnimate from "@formkit/auto-animate"

import { Note } from "../types/Note"

import { copyNote, deleteNote, searchNotes, toggleFixNote, updateNote } from "./noteActions"
import { getNotes, saveNotes } from "./noteStorage"

// Elements
const searchInput = document.querySelector('#search-input') as HTMLInputElement
const notesContainer = document.querySelector('#notes-container') as HTMLElement
const noteInput = document.querySelector('#note-content') as HTMLInputElement
const addNoteBtn = document.querySelector('.add-note') as HTMLButtonElement

export const animate = autoAnimate(notesContainer)
// Functions
export function showNotes() {
  cleanNotes()
  
  getNotes().forEach(note => {
    const noteElement = createNote(note.id, note.content, note.fixed)
    notesContainer.appendChild(noteElement)
  })
}

function addNote() {
  animate.enable()

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
  const element = document.createElement('article')
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
    const { value: textContent } = e.target as HTMLTextAreaElement
    updateNote(id, textContent)
  })

  element.querySelector('.ph-push-pin-simple')?.addEventListener('click', () => {    
    animate.disable()

    toggleFixNote(id)
  })

  element.querySelector('.ph-x')?.addEventListener('click', () => {
    animate.enable()

    deleteNote(id, element, notesContainer)
  })

  element.querySelector('.ph-file-plus')?.addEventListener('click', () => {
    animate.enable()

    copyNote(id, notesContainer)
  })

  return element
}

export function cleanNotes(){
  notesContainer.replaceChildren()
}

// Event
addNoteBtn.addEventListener('click', () => addNote())

searchInput.addEventListener('keyup', (e) => {
  animate.disable()

  const { value: search } = e.target as HTMLInputElement
  searchNotes(search, notesContainer)
})

noteInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addNote()
})

// boot
showNotes()