// InputForm.jsx

import NotesButton from "./NotesButton.jsx";
import { useContext, useRef, useState } from "react";
import { NoteContext } from "../Context/NotesContext.jsx";

const InputForm = () => {
    const { addNotes } = useContext(NoteContext);
    const getBody = useRef();
    const [word, setWord] = useState('');

    const handleAddNotes = () => {
        const noteBody = getBody.current.value;
        if (word.trim() === '' || noteBody.trim() === '') {
            alert('Title and note cannot be empty');
            return;
        }
        addNotes({ title: word, note: noteBody });
        setWord('');
        getBody.current.value = '';
    };

    const handleChange = (e) => {
        setWord(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddNotes();
    };

    return (
        <div className='shadow w-1/3 rounded-2xl py-2 px-5'>
            <h1 className='text-center font-bold text-2xl'>Notes</h1>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
                <div className='flex justify-between m-2'>
                    <label htmlFor="titleInput" className='w-1/5 text-center my-auto font-semibold'>Title</label>
                    <div className='w-4/5 flex flex-row'>
                        <input type="text" name='titleInput' className='w-full border p-2 rounded-2xl' placeholder='Input Title' onChange={handleChange} value={word} />
                        <p className='self-center font-thin text-gray-400 px-2'>{word.length}/50</p>
                    </div>
                </div>
                <div className='flex justify-between m-2'>
                    <label htmlFor="notesInput" className='w-1/5 text-center my-auto font-semibold'>Notes</label>
                    <textarea ref={getBody} name="notesInput" id="notesInput" cols="30" rows="2" placeholder='Input Notes' className='w-4/5 border p-2 rounded-2xl'></textarea>
                </div>
                <NotesButton title='Add Notes' color='bg-blue-500' clickHandler={handleAddNotes} />
            </form>
        </div>
    );
};

export default InputForm;
