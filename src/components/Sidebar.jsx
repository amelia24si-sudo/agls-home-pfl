import { NavLink } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa";
import { MdSpaceDashboard, MdPayment, MdCardMembership, MdOutlineFeedback, MdCalendarToday, MdPeopleAlt } from "react-icons/md";

export default function Sidebar() {
    const navLinkStyles = ({ isActive }) =>
        `flex items-center space-x-4 px-6 py-4 rounded-xl transition-all duration-200 font-semibold text-lg font-dmsans ${
            isActive
                ? "bg-[#FF8E29] text-white shadow-lg" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
        }`;

    return (
        <div id="sidebar" className="w-[300px] h-screen bg-[#1F2430] flex flex-col py-10 flex-shrink-0 sticky top-0 shadow-2xl font-dmsans">
            <div id="sidebar-logo" className="flex flex-col items-center mb-12">
                <div className="flex items-center space-x-3 text-3xl font-black tracking-wider font-dmsans">
                    <FaDumbbell className="text-[#FF8E29] transform -rotate-45" />
                    <div>
                        <span className="text-white">ZEUS </span>
                        <span className="text-[#FF8E29]">GYM</span>
                    </div>
                </div>
                <span className="text-gray-400 text-sm tracking-[0.9em] mt-2 uppercase font-light font-dmsans">Admin Panel</span>
            </div>

            <nav id="sidebar-menu" className="flex flex-col px-4 space-y-2 font-dmsans">
                <NavLink to="/" className={navLinkStyles} end><MdSpaceDashboard className="text-2xl" /><span>Dashboard</span></NavLink>
                <NavLink to="/payment" className={navLinkStyles}><MdPayment className="text-2xl" /><span>Payment</span></NavLink>
                <NavLink to="/promo" className={navLinkStyles}><MdCardMembership className="text-2xl" /><span>Promo</span></NavLink>
                <NavLink to="/feedback" className={navLinkStyles}><MdOutlineFeedback className="text-2xl" /><span>Feedback</span></NavLink>
                <NavLink to="/attendance" className={navLinkStyles}><MdCalendarToday className="text-2xl" /><span>Attendance</span></NavLink>
                <NavLink to="/members" className={navLinkStyles}><MdPeopleAlt className="text-2xl" /><span>Members</span></NavLink>
            </nav>
        </div>
    );
}