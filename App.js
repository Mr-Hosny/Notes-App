const addBtn = document.querySelector('.addBtn')
const main = document.querySelector('.main')

addBtn.addEventListener('click', () => {
  Addnotes()
})

const saveNotes = () => {
  const titles = document.querySelectorAll('.note .title')
  const notes = document.querySelectorAll('.note .content')

  const data = []
  notes.forEach((note, index) => {
    const content = note.value
    const title = titles[index].value

    if (content.textContent !== '') {
      data.push({ content, title })
    }
    const contentData = data.map(item => item.content)
    localStorage.setItem('notes', JSON.stringify(contentData))
    const titleData = data.map(item => item.title)
    localStorage.setItem('titles', JSON.stringify(titleData))
  })
}

const Addnotes = (text = '', title = '') => {
  const note = document.createElement('div')
  note.classList.add('note')
  note.innerHTML = `
    <div class='icons' >
    <button class='save'>
      <i class="fa-solid fa-floppy-disk"></i>
    </button>
    <button class='delete'>
      <i class="fa-solid fa-trash"></i>
    </button>
  </div >
  <div class='title-div'>
    <textarea class='title' placeholder='write the title ...'
    >${title}</textarea>     
  </div>
  <textarea class='content' placeholder='Note down your thoughts ...'
  >${text}</textarea>
  `;

  function handleTrashClick() {
    note.remove()
    saveNotes()
  }
  function handleSaveClick() {
    saveNotes()
  }

  const delBtn = note.querySelector('.delete')
  const saveBtn = note.querySelector('.save')
  delBtn.addEventListener('click', handleTrashClick)
  saveBtn.addEventListener('click', handleSaveClick)
  main.appendChild(note)
  saveNotes()
}

const loadNotes = () => {
  const contentData = JSON.parse(localStorage.getItem('notes')) || []
  const titlesData = JSON.parse(localStorage.getItem('titles')) || []

  for (let i = 0; i < Math.max(contentData.length, titlesData.length); i++) {
    Addnotes(contentData[i], titlesData[i])
  }
}
loadNotes()