async function getNotes() {
    const response = await fetch('/api/notes');
    const json = await response.json();
    return json;
}

async function deleteNote(id) {
    await fetch('/api/notes/' + id, { method: 'DELETE' });
}

async function addNote(text) {
    const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: text }),
    });
    const data = await response.json();
    return data.id;
}

async function loadNotes() {
    const notes = await getNotes();
    notes.forEach(function (note, index) {
        createNote(index, note);
    });
}

async function onDeleteNote(el, id) {
    deleteNote(id);
    el.remove();
}

function createNote(id, text) {
    const notesContainer = document.getElementById('notes-container');
    const noteText = document.createElement('span');
    noteText.innerHTML = text;

    const button = document.createElement('button');
    button.addEventListener('click', function () {
        onDeleteNote(noteContainer, id);
    });
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-times', 'exit-icon');
    button.appendChild(icon);

    const noteContainer = document.createElement('div');
    noteContainer.classList.add('note-container');
    noteContainer.appendChild(noteText);
    noteContainer.appendChild(button);

    notesContainer.appendChild(noteContainer);
}

async function onAddNote() {
    const input = document.getElementById('note-input');
    const text = input.value;
    input.value = '';
    const id = await addNote(text);
    createNote(id, text);
}

async function setup() {
    const addNoteButton = document.getElementById('add-note-button');
    addNoteButton.addEventListener('click', onAddNote);
    await loadNotes();
}

async function main() {
    await setup();
}
