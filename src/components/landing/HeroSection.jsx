import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll"; // 1. Tetap mengimpor react-scroll
import { FaArrowRight, FaDumbbell } from "react-icons/fa";
import heroImg from "../../assets/pexels-koolshooters-9945076.jpg";

export default function HeroSection() {
    return (
        <section id="hero" className="relative overflow-hidden">
            {/* Glow decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary2 opacity-10 blur-[140px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary2 opacity-5 blur-[140px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Copy */}
                <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary2/10 border border-primary2/20 text-primary2 text-xs font-bold uppercase tracking-widest mb-6">
                        <FaDumbbell /> Power & Performance
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                        Build Your <span className="text-primary2">Strongest</span> Self at Zeus Gym
                    </h1>
                    <p className="text-primary3 text-lg mb-10 max-w-xl mx-auto lg:mx-0">
                        State-of-the-art facilities, an energizing atmosphere, and flexible
                        membership plans. Start your fitness journey today and train like a god.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white bg-primary2 hover:bg-[#e07a3d] shadow-lg shadow-primary2/20 transition-all active:scale-95"
                        >
                            Mulai Member <FaArrowRight />
                        </Link>
                        
                        {/* 2. Mengubah tag <a> menjadi <ScrollLink> tanpa menghapus class bawaan */}
                        <ScrollLink
                            to="promos"          
                            smooth={true}        
                            duration={500}       
                            offset={-70}         
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white border border-gray-700 hover:bg-white/5 cursor-pointer transition-all"
                        >
                            View Pricing
                        </ScrollLink>
                    </div>

                    {/* Quick stats */}
                    <div className="flex gap-8 justify-center lg:justify-start mt-14">
                        {[
                            { value: "157", label: "Active Members" },
                            { value: "10+", label: "Equipment Units" },
                            { value: "24/7", label: "Open Access" },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-2xl md:text-3xl font-black text-white">{stat.value}</p>
                                <p className="text-primary3 text-[10px] uppercase font-bold tracking-wider">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Visual */}
                <div className="relative">
                    <div className="absolute inset-0 bg-primary2/10 blur-3xl rounded-[3rem]"></div>
                    <img
                        src={heroImg}
                        alt="Zeus Gym training"
                        className="relative w-full max-w-lg mx-auto rounded-[2.5rem] border border-gray-800 shadow-2xl object-cover"
                    />
                </div>
            </div>
        </section>
    );
}