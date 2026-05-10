import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Header() {
    return (
        <div className="h-20 flex justify-between items-center px-8 bg-[#151728] font-dmsans">
            <h1 className="text-xl font-bold text-white">Dashboard</h1>

            {/* Search Bar */}
            <div className="relative w-96">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-[#20223b] border-none rounded-full py-2 px-6 pl-12 text-sm text-primary3 focus:ring-1 focus:ring-primary2 outline-none transition-all"
                />
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary3" />
            </div>

            {/* Profile */}
            <div className="flex items-center space-x-3 cursor-pointer group">
                <img
                    src="./public/img/4b142319-c89d-46b6-9597-2e341f93f11a.jpg"
                    className="w-10 h-10 rounded-full border-2 border-primary2 transition-transform group-hover:scale-105"
                    alt="Profile"
                />
                <div className="text-sm">
                    <p className="font-bold text-white leading-none">Amelia Golisa</p>
                    <p className="text-[10px] text-primary3">Administrator</p>
                </div>
                <MdKeyboardArrowDown className="text-primary3 group-hover:text-white transition-colors" />
            </div>
        </div>
    );
}