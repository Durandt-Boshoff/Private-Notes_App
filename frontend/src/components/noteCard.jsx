function NoteCard({ title, content, date, color }) {
    return (
        <article
            className="min-h-52 rounded-2xl p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            style={{ backgroundColor: color }}
        >
            <div className="flex items-start justify-between gap-4">
                <h2 className="font-semibold text-[#5f5651]">
                    {title}
                </h2>

                <button
                    type="button"
                    className="text-[#8a625a] hover:scale-110 transition-transform"
                    aria-label="Favourite note"
                >
                    ♡
                </button>
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