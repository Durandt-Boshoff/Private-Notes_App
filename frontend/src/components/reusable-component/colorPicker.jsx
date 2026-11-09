import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const colors = [
    { name: "Cream", hex: "#f3ebdd" },
    { name: "Rose", hex: "#f3e0de" },
    { name: "Lavender", hex: "#e9e2f2" },
    { name: "Sage", hex: "#e3ebdd" },
    { name: "Blue", hex: "#dfeaf2" },
    { name: "Peach", hex: "#f5e5d5" }
    
]

function ColorPicker({ selectedColor, onColorSelect }) {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-[#5f5651]">
                Choose Color
            </p>

            <div className="flex items-center gap-3">
                {colors.map((color) => (
                    <button
                        key={color.hex}
                        type="button"
                        onClick={() => onColorSelect(color.hex)}
                        aria-label={`Select ${color.name}`}
                        aria-pressed={selectedColor === color.hex}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110 ${
                            selectedColor === color.hex 
                            ? "border-[#5f5651]" 
                            : "border-[#d4c9b7]"
                        }`}
                        style={{ backgroundColor: color.hex }}
                    >
                        {selectedColor === color.hex && (
                            <FontAwesomeIcon 
                                icon={faCheck}
                                className="text-xs text-[#5f5651]"
                            />
                        )}
                    </button>
                ))}
            </div>

            <p className="text-xs text-[#8a625a]">
                Selected: {
                    colors.find(
                        (color) => color.hex === selectedColor
                    )?.name || "Custom"
                }
            </p>
        </div>
    );
}

export default ColorPicker