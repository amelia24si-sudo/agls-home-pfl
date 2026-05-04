import { NavLink } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa";
import { 
    MdSpaceDashboard, 
    MdPayment, 
    MdCardMembership, 
    MdOutlineFeedback, 
    MdCalendarToday, 
    MdPeopleAlt 
} from "react-icons/md";

export default function Sidebar() {
    // Fungsi untuk mengubah styling menu berdasarkan status aktif (berada di halaman tersebut)
    const navLinkStyles = ({ isActive }) =>
        `flex items-center space-x-4 px-6 py-4 rounded-xl transition-all duration-200 font-semibold text-lg ${
            isActive
                ? "bg-[#FFA000] text-white shadow-lg" // Oranye menyala saat aktif seperti gambar
                : "text-gray-400 hover:text-white hover:bg-white/5" // Abu-abu saat tidak aktif
        }`;

    return (
        <div id="sidebar" className="w-[300px] h-screen bg-[#2D3342] flex flex-col py-10 flex-shrink-0 sticky top-0 shadow-2xl">
            
            {/* --- Logo Section --- */}
            <div id="sidebar-logo" className="flex flex-col items-center mb-12">
                <div className="flex items-center space-x-3 text-5xl font-impact tracking-wider">
                    {/* Ikon Dumbbell menggantikan logo palu/petir di gambar */}
                    <FaDumbbell className="text-[#FFA000] transform -rotate-45" />
                    <div>
                        <span className="text-white">ZEUS </span>
                        <span className="text-[#FFA000]">GYM</span>
                    </div>
                </div>
                <span className="text-gray-400 text-sm tracking-[0.9em] mt-2 uppercase font-light">
                    Admin Panel
                </span>
            </div>

            {/* --- Menu List --- */}
            {/* Dibungkus dengan px-4 agar tombol oranye memiliki jarak (margin) dari tepi layar, mirip di gambar */}
            <nav id="sidebar-menu" className="flex flex-col px-4 space-y-2">
                
                <NavLink to="/" className={navLinkStyles} end>
                    <MdSpaceDashboard className="text-2xl" />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/payment" className={navLinkStyles}>
                    <MdPayment className="text-2xl" />
                    <span>Payment</span>
                </NavLink>

                <NavLink to="/promo" className={navLinkStyles}>
                    <MdCardMembership className="text-2xl" />
                    <span>Promo</span>
                </NavLink>

                <NavLink to="/feedback" className={navLinkStyles}>
                    <MdOutlineFeedback className="text-2xl" />
                    <span>Feedback</span>
                </NavLink>

                <NavLink to="/attendance" className={navLinkStyles}>
                    <MdCalendarToday className="text-2xl" />
                    <span>Attendance</span>
                </NavLink>

                <NavLink to="/members" className={navLinkStyles}>
                    <MdPeopleAlt className="text-2xl" />
                    <span>Members</span>
                </NavLink>

            </nav>
        </div>
    );
}