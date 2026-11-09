

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faBars,
    faXmark
} from "@fortawesome/free-solid-svg-icons"
import Sidebar from "../components/sidebar";
import NoteCard from "../components/noteCard";
import CreateNoteCard from "../components/createNoteCard";
import NoteEditor from "../components/noteEditor";


function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    const [notes, setNotes] = useState([
        {
            id: 1,
            title: "Game Idea",
            content: "I want to explore a new story concept involving an eclipse and two opposing gods.",
            date: "Today",
            color: "#f3e0de"
        },
        {
            id: 2,
            title: "Project Ideas",
            content: "Look into some ideas for future projects and experiments with React.",
            date: "Yesterday",
            color: "#e9e2f2"
        },
        {
            id: 3,
            title: "Things to Remember",
            content: "Don't forget to finish the dashboard design before moving on to the backend.",
            date: "Nov 7",
            color: "#e3ebdd"
        },
        {
            id: 4,
            title: "Weekend Plans",
            content: "Work on Private Notes and maybe spend some time working on a game.",
            date: "Nov 6",
            color: "#dfeaf2"
        }
    ]);

    const handleSaveNote = (newNote) => {
        const noteWithDetails = {
            id: Date.now(),
            ...newNote,
            date: new Date().toLocaleDateString()
        };
        
        setNotes((previousNotes) => [
            ...previousNotes,
            noteWithDetails
        ]);
    };

    return (
        <div className="flex min-h-screen bg-[#fbf8f4]">
            <Sidebar 
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <main className="min-w-0 flex-1">
                <header className="flex items-center gap-4 px-6 py-4 md:hidden">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-[#5f5651]"
                        aria-label="Toggle sidebar"
                    >
                        <FontAwesomeIcon
                            icon={isSidebarOpen ? faXmark : faBars}
                            size="lg"
                        />
                    </button>
                    <h1 className="text-lg font-semibold text-[#5f5651]">
                        Private Notes
                    </h1>
                </header>

                <section>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {notes.map((note) => (
                            <NoteCard
                                key={note.id}
                                title={note.title}
                                content={note.content}
                                date={note.date}
                                color={note.color}
                            />
                        ))}
                        <CreateNoteCard
                            onClick={() => setIsEditorOpen(true)}
                        />
                    </div>

                    {isEditorOpen && (
                        <NoteEditor
                            onClose={() => setIsEditorOpen(false)}
                            onSave={handleSaveNote}
                        />
                    )}
                </section>

            </main>
        </div>
    );
}

export default Home