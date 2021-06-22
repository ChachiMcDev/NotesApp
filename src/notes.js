import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

const timeStamp = moment().valueOf()


let notes = []

//check for existing notes
const loadNotes = () => {
    const noteJson = localStorage.getItem('notes');
    try {
        return noteJson ? JSON.parse(noteJson) : [];
    } catch (e) {
        console.log('Invalid JSON! Setting Notes to []', e.message)
        return [];

    }
}

const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
}

//exposing notes from module
const getNotes = () => notes

const createdNote = () => {
    const id = uuidv4()

    notes.push({
        title: '',
        body: '',
        id: id,
        createdAt: timeStamp,
        updatedAt: timeStamp
    })
    saveNotes()

    return id
}




const removeNote = (noteid) => {
    const noteIndex = notes.findIndex((note, index) => note.id === noteid)
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
        saveNotes()
    }
}


//sort the notes by 1 of 3 options
const sortNotes = (sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort(function(a, b) {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            } else if (a.updatedAt < b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'recentlyCreated') {
        return notes.sort(function(a, b) {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'alphabet') {
        return notes.sort(function(a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        })
    } else {
        return notes
    }

}


const updateNote = (id, { title, body }) => {
    const note = notes.find((note) => note.id === id)

    if (!note) {
        return
    }

    if (typeof title === 'string') {
        note.title = title
        note.updatedAt = timeStamp
    }

    if (typeof body === 'string') {
        note.body = body
        note.updatedAt = timeStamp
    }


    saveNotes()

    return note
}




notes = loadNotes();

export { getNotes, createdNote, removeNote, sortNotes, updateNote, saveNotes }