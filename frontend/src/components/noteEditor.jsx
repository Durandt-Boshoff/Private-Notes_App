import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faXmark,
    faFloppyDisk
} from "@fortawesome/free-solid-svg-icons";
import ColorPicker from "./reusable-component/colorPicker";

function NoteEditor({ onClose, onSave }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedColor, setSelectedColor] = useState("#f3ebdd");

    const newNote = {
        title,
        content,
        color: selectedColor
    };

    function handleSave() {
        if (!title.trim() || !content.trim()) {
            return;
        }

        onSave(newNote);
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
            <div className="w-full max-w-xl rounded-2xl bg-[#fbf8f4] p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-[#5f5651]">
                        Create a Note
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[#8a625a] hover:text-[#5f5651] transition-colors"
                        aria-label="Close editor"
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                <div className="flex flex-col gap-5 mb-6">
                    <label className="flex flex-col gap-2 text-sm font-medium text-[#5f5651]">
                        Note Title
                        <input
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Give your note a title..."
                            className="w-full rounded-lg border border-[#e9e1d8] bg-white px-4 py-3 text-sm text-[#5f5651] outline-none transition-colors focus:border-[#b58c83]"
                        />
                    </label>

                    <label className="flex flex-col gap-2 text-sm font-medium text-[#5f5651]">
                        Note Content
                        <textarea
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            placeholder="Write your thoughts..."
                            rows={6}
                            className="w-full resize-y rounded-lg border border-[#e9e1d8] bg-white px-4 py-3 text-sm leading-6 text-[#5f5651] outline-none transition-colors focus:border-[#b58c83]"
                        />
                    </label>
                </div>

                <ColorPicker
                    selectedColor={selectedColor}
                    onColorSelect={setSelectedColor}
                />

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg px-4 py-2 text-[#8a625a] hover:bg-[#efe7df] transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        className="flex items-center gap-2 rounded-lg bg-[#b58c83] px-4 py-2 text-white hover:bg-[#a77c73] transition-colors"
                    >
                        <span><FontAwesomeIcon icon={faFloppyDisk} /></span>
                        <span>Save Note</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NoteEditor;