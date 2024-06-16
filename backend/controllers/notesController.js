// notesController.js

import { getAllNotes, getNoteById, addNote, updateNote, deleteNote } from '../models/notesModel.js';

const getAllNotesController = (req, res) => {
    getAllNotes((err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
};

const getNoteByIdController = (req, res) => {
    const { id } = req.params;
    getNoteById(id, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results[0]);
        }
    });
};

const addNoteController = (req, res) => {
    const { title, note } = req.body;
    if (!title || !note) {
        return res.status(400).json({ error: 'Title and note are required' });
    }
    addNote({ title, note }, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({ id: results.insertId, title, note });
        }
    });
};

const updateNoteController = (req, res) => {
    const { id } = req.params;
    const { title, note } = req.body;
    if (!title || !note) {
        return res.status(400).json({ error: 'Title and note are required' });
    }
    updateNote(id, { title, note }, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({ id, title, note });
        }
    });
};

const deleteNoteController = (req, res) => {
    const { id } = req.params;
    deleteNote(id, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(204).end();
        }
    });
};

export { getAllNotesController, getNoteByIdController, addNoteController, updateNoteController, deleteNoteController };
