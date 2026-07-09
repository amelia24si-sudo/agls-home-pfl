import { useState } from "react";
import { Link as RouterLink } from "react-router-dom"; 
import { Link as ScrollLink } from "react-scroll"; 
import { FaDumbbell, FaBars, FaTimes } from "react-icons/fa";

const navItems = [
    { label: "Home", href: "hero" },
    { label: "Features", href: "features" },
    { label: "Pricing", href: "promos" },
    { label: "Contact", href: "contact" },
];

export default function LandingNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-[#151728]/90 backdrop-blur-md border-b border-gray-800 font-dmsans">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <a href="#hero" className="flex items-center space-x-3 text-2xl font-black tracking-wider">
                    <FaDumbbell className="text-primary2 transform -rotate-45" />
                    <div>
                        <span className="text-white">ZEUS </span>
                        <span className="text-primary2">GYM</span>
                    </div>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <ScrollLink 
                            to={item.href}
                            spy={true}
                            smooth={true}
                            offset={-80}
                            duration={500}
                            key={item.href}
                            className="text-primary3 hover:text-white text-sm font-semibold transition-colors cursor-pointer"
                        >
                            {item.label}
                        </ScrollLink>
                    ))}
                </nav>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <RouterLink
                        to="/login"
                        className="px-5 py-2.5 rounded-2xl text-sm font-bold text-white border border-gray-700 hover:bg-white/5 transition-all"
                    >
                        Login
                    </RouterLink>
                    <RouterLink
                        to="/register"
                        className="px-5 py-2.5 rounded-2xl text-sm font-bold text-white bg-primary2 hover:bg-[#e07a3d] shadow-lg shadow-primary2/20 transition-all active:scale-95"
                    >
                        Mulai Member
                    </RouterLink>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen((v) => !v)}
                    className="md:hidden text-white text-xl p-2"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-800 bg-[#151728] px-6 py-4 space-y-3">
                    {navItems.map((item) => (
                        <ScrollLink
                            key={item.href}
                            to={item.href}
                            spy={true}
                            smooth={true}
                            offset={-80}
                            duration={500}
                            onClick={() => setIsOpen(false)}
                            className="block text-primary3 hover:text-white text-sm font-semibold py-2 transition-colors cursor-pointer"
                        >
                            {item.label}
                        </ScrollLink>
                    ))}
                    <div className="flex flex-col gap-3 pt-2">
                        <RouterLink
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="w-full text-center px-5 py-3 rounded-2xl text-sm font-bold text-white border border-gray-700 hover:bg-white/5 transition-all"
                        >
                            Login
                        </RouterLink>
                        <RouterLink
                            to="/register"
                            onClick={() => setIsOpen(false)}
                            className="w-full text-center px-5 py-3 rounded-2xl text-sm font-bold text-white bg-primary2 hover:bg-[#e07a3d] shadow-lg shadow-primary2/20 transition-all"
                        >
                            Mulai Member
                        </RouterLink>
                    </div>
                </div>
            )}
        </header>
    );
}