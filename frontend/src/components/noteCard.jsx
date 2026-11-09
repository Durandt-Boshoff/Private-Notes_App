import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faRotateLeft } from "@fortawesome/free-solid-svg-icons";

function NoteCard({ title, content, date, color, isFavourite, onToggleFavourite, onMoveToTrash, isTrashed = false, onRestore, onDelete }) {
    return (
        <article
            className="min-h-52 rounded-2xl p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            style={{ backgroundColor: color }}
        >
            <div className="flex items-start justify-between gap-4">
                <h2 className="font-semibold text-[#5f5651]">
                    {title}
                </h2>

                <div className="flex items-center gap-3">
                    {isTrashed ? (
                        <>
                            <button
                                type="button"
                                onClick={onRestore}
                                className="text-[#8a625a] hover:text-green-700 hover:scale-110 transition-all"
                                aria-label="Restore note"
                            >
                                <FontAwesomeIcon icon={faRotateLeft} />
                            </button>

                            <button
                                type="button"
                                onClick={onDelete}
                                className="text-[#8a625a] hover:text-red-700 hover:scale-110 transition-all"
                                aria-label="Permanently delete note"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={onToggleFavourite}
                                className="text-[#8a625a] hover:scale-110 transition-transform"
                                aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
                            >
                                {isFavourite ? "♥" : "♡"}
                            </button>

                            <button
                                type="button"
                                onClick={onMoveToTrash}
                                className="text-[#8a625a] hover:text-red-700 hover:scale-110 transition-all"
                                aria-label="Move note to trash"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </>
                    )}
                </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-[#6f6660]">
                {content}
            </p>

            <p className="mt-6 text-sm text-[#8a625a]">
                {date}
            </p>
        </article>
    );
}

export default NoteCard;