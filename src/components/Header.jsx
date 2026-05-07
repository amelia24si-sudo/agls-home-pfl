import { FaBell, FaSearch } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { MdSettings } from "react-icons/md";

export default function Header() {
    return (
        <div id="header-container" className="sticky top-0 z-50 flex justify-between items-center p-2 font-dmsans">
            {/* Search Bar */}
            <div id="search-bar" className="relative w-full max-w-2xl">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FF8E29]" />
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search"
                    className="border-2 border-[#2B3242]/10 p-2 pl-12 bg-white w-full rounded-full shadow-sm outline-none focus:border-[#FF8E29] transition-colors font-dmsans"
                />
            </div>

            {/* Icon & Profile Section */}
            <div id="icons-container" className="flex items-center space-x-4 ml-6 font-dmsans">
                <div className="p-3 bg-[#2B3242]/10 rounded-xl text-[#2B3242] cursor-pointer hover:bg-[#FF8E29] hover:text-white transition">
                    <FaBell className="text-xl" />
                </div>
                <div className="p-3 bg-[#2B3242]/10 rounded-xl text-[#2B3242] cursor-pointer hover:bg-[#FF8E29] hover:text-white transition">
                    <AiFillMessage className="text-xl" />
                </div>
                <div className="p-3 bg-[#2B3242]/10 rounded-xl text-[#2B3242] cursor-pointer hover:bg-[#FF8E29] hover:text-white transition">
                    <MdSettings className="text-xl" />
                </div>

                <div className="ml-4 cursor-pointer hover:opacity-80 transition-opacity">
                    <img 
                        src="https://ui-avatars.com/api/?name=Admin+Zeus&background=2B3242&color=FF8E29" 
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#FF8E29] shadow-sm"
                    />
                </div>
            </div>
        </div>
    );
}