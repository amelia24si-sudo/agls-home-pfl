import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Header() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // 1. Ambil data user yang login dari localStorage secara dinamis
    const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn")) || {};
    const fullName = userLoggedIn.full_name || "Admin Zeus";
    const userRole = userLoggedIn.role || "Administrator";

    // 2. Fungsi Logout
    const handleLogout = () => {
        localStorage.removeItem("userLoggedIn");
        window.dispatchEvent(new Event("storage")); // Sinkronisasi state komponen lain
        navigate("/");
    };

    // 3. Menutup dropdown otomatis saat klik di luar area profil
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="h-20 flex justify-between items-center px-8 bg-[#151728] font-dmsans border-b border-gray-800/50 relative z-30">
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

            {/* Profile Dropdown Container */}
            <div className="relative" ref={dropdownRef}>
                {/* Profile Trigger */}
                <div 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-3 cursor-pointer group select-none"
                >
                    <img
                        src="./public/img/4b142319-c89d-46b6-9597-2e341f93f11a.jpg"
                        className="w-10 h-10 rounded-full border-2 border-primary2 transition-transform group-hover:scale-105"
                        alt="Profile"
                    />
                    <div className="text-sm hidden sm:block">
                        <p className="font-bold text-white leading-none">{fullName}</p>
                        <p className="text-[10px] text-primary3 mt-1 capitalize">{userRole}</p>
                    </div>
                    <MdKeyboardArrowDown className={`text-primary3 text-xl transition-transform duration-200 ${dropdownOpen ? "rotate-180 text-white" : "group-hover:text-white"}`} />
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-[#20223b] border border-gray-800 rounded-2xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-3 duration-150">
                        {/* Info Header khusus Mobile */}
                        <div className="px-4 py-2 border-b border-gray-800 sm:hidden">
                            <p className="font-bold text-white text-sm truncate">{fullName}</p>
                            <p className="text-[10px] text-primary3 capitalize">{userRole}</p>
                        </div>
                        
                        {/* Tombol Logout */}
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-400 hover:text-white hover:bg-red-500/10 transition-colors font-semibold text-left cursor-pointer"
                        >
                            <FaSignOutAlt className="text-base" />
                            <span>Logout</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}