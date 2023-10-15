// import * as createCsvWriter from 'csv-writer'
import { getNotes } from "./noteStorage"

const exportBtn = document.querySelector('#export-notes') as HTMLButtonElement

exportBtn.addEventListener('click', () => exportData())

async function exportData() {
  const notes = getNotes()

  if (notes.length === 0) {
    alert('Não há dados para exportar.')
    return
  }

  const csvContent = `ID,Conteúdo,Fixado?\n${notes.map(note => `${note.id},${note.content},${note.fixed}`).join('\n')}`

  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)

  const downloadLink = document.createElement('a')
  downloadLink.href = url
  downloadLink.download = `notes_${new Date().toISOString()}.csv`
  downloadLink.click()

  URL.revokeObjectURL(url)

  // const csvString = [
  //   ['ID','Conteúdo', 'Fixado?'],
  //   ...notes.map(note => [note.id, note.content, note.fixed])
  // ].map(e => e.join(',')).join('\n')

  // console.log(csvString)

  // const element = document.createElement("a");

  // element.href = "data:text/csv;charset=utf-8," + encodeURI(csvString);

  // element.target = "_blank";

  // element.download = "notes.csv";

  // element.click();
}