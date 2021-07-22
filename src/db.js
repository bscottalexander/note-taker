const fs = require('fs');
const path = require('path');

let notes;

const getNotes = async () => {
    return notes;
};

const addNote = async ({ note }) => {
    notes.push(note);
    saveNotesToFile(notes);
    return notes.length - 1;
};

const deleteNote = async ({ id }) => {
    notes.splice(id, 1);
    saveNotesToFile();
    return id;
};

const createDatabase = () => {
    const directory = path.join(__dirname, '..', 'data');
    const file = path.join(directory, 'db.json');

    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }

    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify([]));
    }
};

const loadNotesFromFile = () => {
    try {
        notes = JSON.parse(
            fs
                .readFileSync(path.join(__dirname, '..', 'data', 'db.json'))
                .toString()
        );
    } catch {
        notes = [];
    }
};

const saveNotesToFile = () => {
    fs.writeFileSync(
        path.join(__dirname, '..', 'data', 'db.json'),
        JSON.stringify(notes)
    );
};

const init = () => {
    createDatabase();
    loadNotesFromFile();
};

init();

exports.getNotes = getNotes;
exports.addNote = addNote;
exports.deleteNote = deleteNote;
