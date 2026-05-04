import { FaBell, FaSearch } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { MdSettings } from "react-icons/md";

export default function Header() {
    return (
        <div id="header-container" className="sticky top-0 z-50 flex justify-between items-center p-2 ">
            
            {/* Search Bar */}
            <div id="search-bar" className="relative w-full max-w-2xl">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400" />
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search"
                    className="border-2 border-blue-100 p-2 pl-12 bg-white w-full rounded-full shadow-sm outline-none focus:border-blue-300 transition-colors"
                />
            </div>

            {/* Icon & Profile Section */}
            <div id="icons-container" className="flex items-center space-x-4 ml-6">
                
                {/* Notification Icon (Blue) */}
                <div className="p-3 bg-blue-100 rounded-xl text-blue-400 cursor-pointer hover:bg-blue-200 transition">
                    <FaBell className="text-xl" />
                </div>
                
                {/* Message Icon (Green) */}
                <div className="p-3 bg-green-200 rounded-xl text-green-500 cursor-pointer hover:bg-green-300 transition">
                    <AiFillMessage className="text-xl" />
                </div>

                {/* Settings Icon (Red) */}
                <div className="p-3 bg-red-200 rounded-xl text-red-500 cursor-pointer hover:bg-red-300 transition">
                    <MdSettings className="text-xl" />
                </div>

                {/* Profile Placeholder */}
                {/* Profile Image */}
                <div className="ml-4 cursor-pointer hover:opacity-80 transition-opacity">
                    <img 
                        src="https://ui-avatars.com/api/?name=Admin+Zeus&background=FFA000&color=fff" 
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#FFA000] shadow-sm"
                    />
                </div>
            </div>
        </div>
    );
}