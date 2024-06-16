import db from '../models/db.js';

const getAllNotes = (callback) => {
    db.query('SELECT * FROM notes', callback);
};

const getNoteById = (id, callback) => {
    db.query('SELECT * FROM notes WHERE id = ?', [id], callback);
};

const addNote = (note, callback) => {
    const { title, datetime = new Date(), note: noteBody } = note;
    db.query('INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)', [title, datetime, noteBody], callback);
};

const updateNote = (id, note, callback) => {
    const { title, note: noteBody } = note;
    db.query('UPDATE notes SET title = ?, note = ? WHERE id = ?', [title, noteBody, id], callback);
};

const deleteNote = (id, callback) => {
    db.query('DELETE FROM notes WHERE id = ?', [id], callback);
};

export { getAllNotes, getNoteById, addNote, updateNote, deleteNote };