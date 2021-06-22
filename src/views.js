import moment from 'moment'
import { sortNotes, getNotes, removeNote } from './notes'
import { getFilters } from './filters'

//Render application notes
const renderNotes = () => {
    const { searchText, sortBy } = getFilters()
    const notes = sortNotes(sortBy);
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchText.toLowerCase()))

    document.querySelector('#notecontainer').innerHTML = "";

    if (filteredNotes.length > 0) {
        filteredNotes.forEach(element => {
            const createEl = generateNoteDOM(element);
            document.querySelector('#notecontainer').appendChild(createEl);
        });
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'You my friend, YOU GOTZ NO NOTES!'
        emptyMessage.classList.add('empty-message')
        document.querySelector('#notecontainer').appendChild(emptyMessage);
    }
}


//generating the notes DOM
const generateNoteDOM = (element) => {
    const noteEl = document.createElement('a');
    const textEl = document.createElement('p');
    const statusEl = document.createElement('p')
    const removeButton = document.createElement('button')

    removeButton.textContent = 'X'
    removeButton.id = element.id
    removeButton.classList.add('delButton', 'button', 'button--float')
    statusEl.textContent = generateLastEdited(element.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    textEl.classList.add('list-item__title')
    noteEl.classList.add('list-item')
    element.title.length > 0 ? textEl.textContent = element.title : textEl.textContent = 'unNamed Note'


    document.querySelector('#notecontainer').appendChild(removeButton);

    noteEl.appendChild(textEl);
    noteEl.appendChild(statusEl)
    noteEl.href = `/edit.html#${element.id}`

    return noteEl;
}



const initilizeEditPage = (noteId) => {
    const titleElement = document.querySelector('#note-title');
    const bodyElement = document.querySelector('#note-body');
    const dateElement = document.querySelector('#lastedited');

    const notes = getNotes()
    const note = notes.find((note) => note.id === noteId)

    if (!note) {
        location.assign('./index.html')
    }

    titleElement.value = note.title
    bodyElement.value = note.body
    dateElement.textContent = generateLastEdited(note.updatedAt)

}


//generate last edited message
const generateLastEdited = (timeStamp) => `Last Edited: ${moment(timeStamp).fromNow()}`


export { renderNotes, generateNoteDOM, generateLastEdited, initilizeEditPage }