const express = require('express');
const router = express.Router();
const notesController = require('./controllers/notes');

router.get('/notes', notesController.listNotes);
router.post('/notes', notesController.addNote);
router.delete('/notes/:id', notesController.deleteNote);

module.exports = router;
