import { Link } from "react-router-dom";
import { FaDumbbell, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

export default function LandingFooter() {
    return (
        <footer id="contact" className="bg-[#151728] border-t border-gray-800 font-dmsans">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Brand */}
                <div className="md:col-span-1">
                    <div className="flex items-center space-x-3 text-2xl font-black tracking-wider mb-4">
                        <FaDumbbell className="text-primary2 transform -rotate-45" />
                        <div>
                            <span className="text-white">ZEUS </span>
                            <span className="text-primary2">GYM</span>
                        </div>
                    </div>
                    <p className="text-primary3 text-sm leading-relaxed">
                        Power & Performance. Train like a god in a club built for results.
                    </p>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Contact</h4>
                    <ul className="space-y-4 text-primary3 text-sm">
                        <li className="flex items-start gap-3">
                            <FaMapMarkerAlt className="text-primary2 mt-1 flex-shrink-0" />
                            <span>Jl. Yos Sudarso, Limbungan Baru, Kec. Rumbai, Pekanbaru, Riau</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaPhoneAlt className="text-primary2 flex-shrink-0" />
                            <span>+62 852-6655-8702</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaEnvelope className="text-primary2 flex-shrink-0" />
                            <span>hello@zeusgym.id</span>
                        </li>
                    </ul>
                </div>

                {/* Operating hours */}
                <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Operating Hours</h4>
                    <ul className="space-y-4 text-primary3 text-sm">
                        <li className="flex items-center gap-3">
                            <FaClock className="text-primary2 flex-shrink-0" />
                            <span>Mon - Fri: 05:00 - 22:00</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaClock className="text-primary2 flex-shrink-0" />
                            <span>Sat - Sun: 07:00 - 23:00</span>
                        </li>
                    </ul>
                </div>

                {/* Quick links */}
                <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Get Started</h4>
                    <ul className="space-y-4 text-sm">
                        <li>
                            <a href="#features" className="text-primary3 hover:text-white transition-colors">Facilities</a>
                        </li>
                        <li>
                            <a href="#promos" className="text-primary3 hover:text-white transition-colors">Pricing</a>
                        </li>
                        <li>
                            <Link to="/login" className="text-primary3 hover:text-white transition-colors">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="text-primary2 font-bold hover:underline">Mulai Member</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-800/60">
                <p className="text-center text-[11px] text-primary3 uppercase tracking-[0.2em] opacity-50 py-6">
                    © 2026 Zeus Gym Management. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
