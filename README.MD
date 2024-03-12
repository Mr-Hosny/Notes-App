const addBtn = document.querySelector('.addBtn')
const main = document.querySelector('.main')

addBtn.addEventListener('click', () => {
  AddNotes()
})

const savedNote = () => {
  const notes = document.querySelectorAll('.note .content')
  const titles = document.querySelectorAll('.note .title')

  const data = []
  notes.forEach((note, index) => {
    const content = note.value
    const title = titles[index].value
    if (content.trim() !== '') {
      data.push({ title, content })
    }

    const contentData = data.map(item => item.content)
    localStorage.setItem('notes', JSON.stringify(contentData))
    const titleData = data.map(item => item.title)
    localStorage.setItem('titles', JSON.stringify(titleData))
  })
}
  
const AddNotes = (text = '', title = '') => {
  const note = document.createElement('div')
  note.classList.add('note')
  note.innerHTML = `
    <div class='icons'>
      <button class='save'>
        <i class="fa-solid fa-floppy-disk"></i>
      </button>
      <button class='delete'>
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
    <div class='title-div'>
      <textarea class='title' placeholder='write the title ...'
      >${title}</textarea>     
    </div>
    <textarea class='content' placeholder='Note down your thoughts ...'
    >${text}</textarea>
  `

  function handleTrashClick() {
    note.remove()
    savedNote()
  }
  function handlSavedClick() {
    savedNote()
  }

  const saveBtn = note.querySelector('.save')
  const deleteBtn = note.querySelector('.delete')
  // const textarea = document.querySelector('textarea')

  saveBtn.addEventListener('click', handlSavedClick())
  deleteBtn.addEventListener('click', handleTrashClick())
  main.appendChild(note)
  savedNote()
}

const loadNotes = () => {
  const titlesData = JSON.parse(localStorage.getItem('titles')) || []
  const contentData = JSON.parse(localStorage.getItem('notes')) || []

  for (let i = 0; i < Math.max(titlesData.length, contentData.length); i++) {
    AddNotes(contentData[i], titlesData[i])
  }
}
loadNotes()