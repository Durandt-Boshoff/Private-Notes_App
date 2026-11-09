import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faXmark
} from "@fortawesome/free-solid-svg-icons";

import Sidebar from "../components/sidebar";
import NoteCard from "../components/noteCard";

function FavouriteNotes({ notes, onToggleFavourite, onMoveToTrash, onLogout }) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const favouriteNotes = notes.filter(
        (note) => note.isFavourite && !note.isTrashed
    );

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
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-[#5f5651]">
                        Favourite Notes
                    </h1>

                    <p className="mt-1 text-sm text-[#8a625a]">
                        Your favourite thoughts, all in one place.
                    </p>
                </div>

                <section>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {favouriteNotes.length > 0 ? (
                            favouriteNotes.map((note) => (
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
                                    No Favourite Notes
                                </h2>

                                <p className="mt-2 text-sm text-[#8a625a]">
                                    Favourite a note and it will appear here.
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

export default FavouriteNotes