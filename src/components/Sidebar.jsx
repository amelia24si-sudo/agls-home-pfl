import { NavLink } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa";
import { MdSpaceDashboard, MdPayment, MdCardMembership, MdOutlineFeedback, MdCalendarToday, MdPeopleAlt } from "react-icons/md";

export default function Sidebar() {
    const navLinkStyles = ({ isActive }) =>
        `flex items-center space-x-4 px-6 py-4 rounded-xl transition-all duration-200 font-semibold text-lg font-dmsans ${
            isActive
                ? "bg-primary2 text-white shadow-lg shadow-primary2/20" 
                : "text-primary3 hover:text-white hover:bg-white/5"
        }`;

    return (
        <div id="sidebar" className="w-[300px] h-screen bg-[#1c1e33] flex flex-col py-10 flex-shrink-0 sticky top-0 border-r border-gray-800 shadow-2xl font-dmsans overflow-hidden">
            
            {/* Logo Section */}
            <div id="sidebar-logo" className="flex flex-col items-center mb-12">
                <div className="flex items-center space-x-3 text-3xl font-black tracking-wider">
                    <FaDumbbell className="text-primary2 transform -rotate-45" />
                    <div>
                        <span className="text-white">ZEUS </span>
                        <span className="text-primary2">GYM</span>
                    </div>
                </div>
                <span className="text-primary3 text-xs tracking-[0.8em] mt-2 uppercase font-light opacity-50">Admin Panel</span>
            </div>

            {/* Menu Section */}
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

            <div className="mt-auto px-10 pb-4">
                <div className="h-[1px] bg-gray-800 w-full mb-4"></div>
                <p className="text-[10px] text-primary3 text-center tracking-widest uppercase opacity-40">System Version 2.0</p>
            </div>
        </div>
    );
}