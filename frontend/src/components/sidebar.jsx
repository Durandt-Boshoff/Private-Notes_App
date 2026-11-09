import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faHeart,
    faTrash,
    faUser,
    faSignOutAlt
} from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router-dom";

const navLinkStyles = ({ isActive }) => 
    `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
        isActive
            ? 'bg-[#efe7df] text-[#8a625a] font-medium' 
            : 'text-[#6f6660] hover:bg-[#f1ebe5]'
    }`;

function Sidebar({ isOpen, onClose, onLogout }) {
    return (
        <aside
            className={`fixed inset-y-0 left-0 z-40 w-64 min-h-screen border-r border-[#e9e1d8] bg-[#fbf8f4] flex flex-col transform transition-transform duration-300 md:relative md:translate-x-0 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div className="px-6 pt-6 pb-10">
                <h1 className="text-2xl font-semibold text-[#5f5651]">
                    Private Notes
                </h1>
            </div>

            <div className="px-4 flex-1">
                <nav className="flex flex-col gap-2">
                    <NavLink
                        to="/"
                        end
                        className={navLinkStyles}
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faHome} className="w-5 h-5"/>
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/favourites"
                        end
                        className={navLinkStyles}
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                        <span>Favourite Notes</span>
                    </NavLink>

                    <NavLink
                        to="/trash"
                        end
                        className={navLinkStyles}
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                        <span>Trash</span>
                    </NavLink>
                </nav>
            </div>

            <div className="p-4 border-t border-[#e9e1d8]">
                <nav className="flex flex-col gap-2">
                    <NavLink
                        to="/profile"
                        end
                        className={navLinkStyles}
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                        <span>Profile</span>
                    </NavLink>
                    <button
                        onClick={() => {
                            onLogout();
                            onClose();
                        }}
                        className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-[#a65f5f] hover:bg-[#f6e9e7] transition-colors"
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;