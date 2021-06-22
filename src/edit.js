import { removeNote, updateNote} from './notes'
import { generateLastEdited, initilizeEditPage } from './views'

const noteId = location.hash.substring(1);


const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const dateElement = document.querySelector('#lastedited');

initilizeEditPage(noteId);


titleElement.addEventListener('input', (event) => {
    const note = updateNote(noteId, {title: event.target.value})
    dateElement.textContent = generateLastEdited(note.createdAt)
})

bodyElement.addEventListener('input', (event) => {
    const note = updateNote(noteId, {body: event.target.value})
    dateElement.textContent = generateLastEdited(note.createdAt);
   
})


document.querySelector('#remove-note').addEventListener('click', (event) => {
    removeNote(noteId);
    location.assign('/index.html');
});




window.addEventListener('storage', (event) =>{

    if(event.key === 'notes'){
        initilizeEditPage(noteId)
     
    }
})

