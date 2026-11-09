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


function Home({ notes, onSaveNote, onToggleFavourite, onMoveToTrash, onLogout }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredNotes = notes.filter((note) => {
        const search = searchTerm.toLowerCase();

        return (
            !note.isTrashed &&
            (
                note.title.toLowerCase().includes(search) ||
                note.content.toLowerCase().includes(search)
            )
        );
    });

    return (
        <div className="flex min-h-screen bg-[#fbf8f4]">
            <Sidebar 
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onLogout={onLogout}
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

                <div className="flex flex-col gap-6 mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-[#5f5651]">
                            My Notes
                        </h1>
                        <p className="text-sm text-[#5f5651]">
                            A little space for your thoughts.
                        </p>
                    </div>

                    <div className="mx-auto flex w-full max-w-md items-center gap-3 rounded-xl border border-[#e9e1d8] bg-white px-4 py-3">
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="text-[#8a625a]"
                        />

                        <input
                            type="text"
                            placeholder="Search notes..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            className="w-full bg-transparent text-sm text-[#5f5651] outline-none placeholder:text-[#a49a93]"
                        />
                    </div>
                </div>

                <section>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredNotes.length > 0 ? (
                            filteredNotes.map((note) => (
                                <NoteCard
                                    key={note.id}
                                    title={note.title}
                                    content={note.content}
                                    date={note.date}
                                    color={note.color}
                                    isFavourite={note.isFavourite}
                                    onToggleFavourite={() => onToggleFavourite(note.id)}
                                    onMoveToTrash={() => onMoveToTrash(note.id)}
                                />
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                                <h2 className="text-lg font-semibold text-[#5f5651]">
                                    No Notes found
                                </h2>
                                <p className="mt-2 text-sm text-[#8a625a]">
                                    Try searching for something else.
                                </p>
                            </div>
                        )}
                        <CreateNoteCard
                            onClick={() => setIsEditorOpen(true)}
                        />
                    </div>

                    {isEditorOpen && (
                        <NoteEditor
                            onClose={() => setIsEditorOpen(false)}
                            onSave={onSaveNote}
                        />
                    )}
                </section>

            </main>
        </div>
    );
}

export default Home