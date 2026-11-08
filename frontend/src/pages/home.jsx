import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons"
import Sidebar from "../components/sidebar";

function Home() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex h-10 w-40 p-6 items-center rounded-lg border border-gray-200 px-3 sm:w-56">
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-xs text-gray-400"
                />
                <input
                    type="text"
                    placeholder="Search notes"
                    className="w-full text-xs outline-none placeholder:text-gray-400"
                />
            </div>
        </div>
    );
}

export default Home