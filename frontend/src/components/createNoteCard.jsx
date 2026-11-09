import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function CreateNoteCard({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="min-h-52 rounded-2xl border-2 border-dashed border-[#d4c9b7] flex flex-col items-center justify-center gap-3 text-[#8a625a] hover:bg-[#efe7df] hover:border-[#b58c83] transition-all"
        >
            <div className="w-12 h-12 rounded-full bg-[#efe7df] flex items-center justify-center">
                <FontAwesomeIcon icon={faPlus} />
            </div>

            <span className="font-medium text-sm">
                Create a Note
            </span>
        </button>
    );
}

export default CreateNoteCard;