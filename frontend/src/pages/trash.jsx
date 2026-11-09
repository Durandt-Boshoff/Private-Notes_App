import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

import Sidebar from "../components/sidebar";
import NoteCard from "../components/noteCard";

function Trash({ notes, onRestoreNote, onDeleteNote, onEmptyTrash, onLogout }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const trashedNotes = notes.filter((note) => note.isTrashed);

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
                {/* Mobile Header */}
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

                <div className="p-6">
                    <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-[#5f5651]">
                                Trash
                            </h1>

                            <p className="mt-1 text-sm text-[#8a625a]">
                                Notes you've moved here.
                            </p>
                        </div>

                        {trashedNotes.length > 0 && (
                            <button
                                type="button"
                                onClick={() => {
                                    if (window.confirm("Permanently delete all notes in Trash?")) {
                                        onEmptyTrash();
                                    }
                                }}
                                className="rounded-lg bg-[#a65f5f] px-4 py-2 text-sm text-white hover:bg-[#914f4f] transition-colors"
                            >
                                Empty Trash
                            </button>
                        )}
                    </div>

                    <section>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {trashedNotes.length > 0 ? (
                                trashedNotes.map((note) => (
                                    <NoteCard
                                        key={note.id}
                                        title={note.title}
                                        content={note.content}
                                        date={note.date}
                                        color={note.color}
                                        isTrashed={true}
                                        onRestore={() => onRestoreNote(note.id)}
                                        onDelete={() => onDeleteNote(note.id)}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                                    <h2 className="text-lg font-semibold text-[#5f5651]">
                                        Your Trash is Empty
                                    </h2>

                                    <p className="mt-2 text-sm text-[#8a625a]">
                                        Notes you move to Trash will appear here.
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Trash