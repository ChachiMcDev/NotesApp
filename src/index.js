import { createdNote, removeNote } from './notes'
import { setFilters } from './filters'
import { renderNotes } from './views'



renderNotes();


document.querySelector('#addnote').addEventListener('click', function (event) {

    const id = createdNote()
    location.assign(`/edit.html#${id}`);
});


document.querySelector('#searchtext').addEventListener('input', function (event) {

    setFilters({
        searchText: event.target.value
    })
    renderNotes()

})

document.querySelector('#filterby').addEventListener('change', function (event) {
    setFilters({
        sortBy: event.target.value
    })
    renderNotes();
})

document.querySelector("#notecontainer").addEventListener('click', function (e) {

    removeNote(e.target.id)
    renderNotes()
});

//checks for storage events from other pages
window.addEventListener('storage', function (event) {
    if (event.key === 'notes') {

        renderNotes();
    }

})


