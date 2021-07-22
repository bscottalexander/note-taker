const db = require('../db');

const listNotes = async (_, res) => {
    res.send(await db.getNotes());
};

const addNote = async (req, res) => {
    const id = await db.addNote({ note: req.body.data });
    res.json({
        id,
    });
};

const deleteNote = async (req, res) => {
    const { id } = req.params;
    await db.deleteNote({ id });
    res.send({
        id,
    });
};

exports.listNotes = listNotes;
exports.addNote = addNote;
exports.deleteNote = deleteNote;
