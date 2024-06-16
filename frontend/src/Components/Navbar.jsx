import React, { useContext, useRef } from "react";
import { NoteContext } from "../Context/NotesContext";
import NotesButton from "./NotesButton.jsx";

const Navbar = () => {
    const { searchNotes } = useContext(NoteContext);
    const searchValue = useRef("");

    const handleSearch = () => {
        searchNotes(searchValue.current.value);
    };

    return (
        <div className="w-screen bg-blue-500 h-20 flex justify-between items-center px-5">
            <h1 className="font-bold text-3xl text-white ms-5">Kelvin Notes</h1>
            <div>
                <input
                    ref={searchValue}
                    type="text"
                    className="rounded h-8 px-2"
                    placeholder="Search Here"
                />
                <button
                    className="h-8 bg-white text-black rounded ms-1 px-2 hover:text-gray-700 hover:shadow active:bg-gray-300 mr-3"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default Navbar;
