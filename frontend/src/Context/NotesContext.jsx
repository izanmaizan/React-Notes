import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const NoteContext = createContext({
    noteStore: [],
    addNotes: () => {},
    deleteNotes: () => {},
    archiveNotes: () => {},
    updateNote: () => {},
    searchNotes: () => {},
});

export const NoteProvider = ({ children }) => {
    const [noteStore, setNoteStore] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/notes")
            .then((response) => {
                // console.log("Fetched notes:", response.data);
                const formattedNotes = response.data.map((note) => ({
                    ...note,
                    archived: note.archived === 1,
                    datetime: new Date(note.datetime).toLocaleString(),
                }));
                setNoteStore(formattedNotes);
            })
            .catch((error) =>
                console.error("Error fetching notes:", error)
            );
    }, []);

    const addNotes = useCallback(async (note) => {
        try {
            if (!note.title || !note.note) {
                console.error("Title and note are required");
                return;
            }
            const response = await axios.post(
                "http://localhost:3000/notes",
                note
            );
            setNoteStore((prevStore) => [
                ...prevStore,
                { ...note, id: response.data.id },
            ]);
        } catch (error) {
            console.error("Error adding note:", error);
        }
    }, []);

    const deleteNotes = useCallback(async (id) => {
        try {
            await axios.delete(`http://localhost:3000/notes/${id}`);
            setNoteStore((prevStore) =>
                prevStore.filter((note) => note.id !== id)
            );
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    }, []);

    const archiveNotes = useCallback(async (id) => {
        const note = noteStore.find((note) => note.id === id);
        if (!note) {
            console.error("Note not found");
            return;
        }
        try {
            await axios.put(`http://localhost:3000/notes/${id}`, {
                ...note,
                archived: !note.archived,
            });
            setNoteStore((prevStore) =>
                prevStore.map((n) =>
                    n.id === id ? { ...n, archived: !n.archived } : n
                )
            );
        } catch (error) {
            console.error("Error archiving/restoring note:", error);
        }
    }, [noteStore]);

    const updateNote = useCallback(async (id, updatedNote) => {
        try {
            await axios.put(`http://localhost:3000/notes/${id}`, updatedNote);
            setNoteStore((prevStore) =>
                prevStore.map((note) =>
                    note.id === id ? { ...note, ...updatedNote } : note
                )
            );
        } catch (error) {
            console.error("Error updating note:", error);
        }
    }, []);

    const searchNotes = useCallback((searchTerm) => {
        const filteredNotes = noteStore.filter((note) =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredNotes(filteredNotes);
    }, [noteStore]);

    return (
        <NoteContext.Provider
            value={{
                noteStore: filteredNotes.length > 0 ? filteredNotes : noteStore,
                addNotes,
                deleteNotes,
                archiveNotes,
                updateNote,
                searchNotes,
            }}
        >
            {children}
        </NoteContext.Provider>
    );
};
