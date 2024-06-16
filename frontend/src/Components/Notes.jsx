import React, { useContext, useState } from "react";
import NotesButton from "./NotesButton";
import { NoteContext } from "../Context/NotesContext";

const Notes = ({ info }) => {
    const { deleteNotes, archiveNotes, updateNote } = useContext(NoteContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(info.title);
    const [editedNote, setEditedNote] = useState(info.note);

    const handleDelete = () => {
        deleteNotes(info.id);
    };

    const handleArchive = () => {
        archiveNotes(info.id);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        updateNote(info.id, { title: editedTitle, note: editedNote });
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditedTitle(info.title);
        setEditedNote(info.note);
        setIsEditing(false);
    };

    const handleChangeTitle = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleChangeNote = (e) => {
        setEditedNote(e.target.value);
    };

    return (
        <div className="w-96 shadow shadow-black rounded-2xl flex flex-col items-center px-3">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        className="text-2xl font-mono font-semibold my-2 w-full p-2 rounded-lg"
                        value={editedTitle}
                        onChange={handleChangeTitle}
                    />
                    <textarea
                        className="mx-3 w-full py-3 px-6 h-72 font-semibold border rounded-xl"
                        value={editedNote}
                        onChange={handleChangeNote}
                    />
                    <div className="flex flex-row justify-around w-full my-2 px-8">
                        <NotesButton
                            title="Save"
                            color="bg-green-500"
                            clickHandler={handleSaveEdit}
                        />
                        <NotesButton
                            title="Cancel"
                            color="bg-red-500"
                            clickHandler={handleCancelEdit}
                        />
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-mono font-semibold my-2">
                        {info.title}
                    </h1>
                    <div className="mx-3 w-full py-3 px-6 h-72 font-semibold border rounded-xl">
                        <pre className="whitespace-pre-wrap">
                            {info.note || "No note available"}
                        </pre>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">{info.datetime}</p>
                    <div className="flex flex-row justify-around w-full my-2 px-8">
                        <NotesButton
                            title={info.archived ? "Restore" : "Archive"}
                            color={info.archived ? "bg-green-500" : "bg-yellow-500"}
                            clickHandler={handleArchive}
                        />
                        <NotesButton
                            title="Edit"
                            color="bg-blue-500"
                            clickHandler={handleEdit}
                        />
                        <NotesButton
                            title="Delete"
                            color="bg-red-500"
                            clickHandler={handleDelete}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Notes;
