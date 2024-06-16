import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import InputForm from "./Components/InputForm";
import NotesContainer from "./Components/NotesContainer";
import { NoteProvider } from "./Context/NotesContext";
import axios from "axios";

function App() {
    const [search, setSearch] = useState("");

    return (
        <NoteProvider>
            <Navbar />
            <div className="flex flex-col items-center mt-10">
                <InputForm />
            </div>
            <NotesContainer title="Notes" />
            <NotesContainer title="Archived" />
        </NoteProvider>
    );
}

export default App;
