import { Outlet } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa";

export default function AuthLayout() {
    return (
        // Menggunakan bg-[#151728] agar sama dengan MainLayout
        <div className="min-h-screen flex items-center justify-center bg-[#151728] font-dmsans p-4">
            
            {/* Dekorasi Background (Efek Cahaya Oranye di pojok) */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary2 opacity-5 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary2 opacity-5 blur-[120px] rounded-full"></div>

            <div className="bg-[#1c1e33] p-5 rounded-[32px] border border-gray-800 shadow-2xl w-full max-w-md relative z-10">
                
                {/* Logo Section */}
                <div className="flex flex-col items-center justify-center mb-10">
                    <div className="flex items-center space-x-3 text-4xl font-black tracking-tighter">
                        <FaDumbbell className="text-primary2 transform -rotate-45" />
                        <h1 className="text-white">
                            ZEUS <span className="text-primary2">GYM</span>
                        </h1>
                    </div>
                    <div className="h-1 w-12 bg-primary2 rounded-full mt-2 opacity-50"></div>
                </div>

                {/* Tempat Form Login / Register (Outlet) */}
                <div className="text-white">
                    <Outlet />
                </div>

                {/* Footer Auth */}
                <div className="mt-10 pt-1 border-t border-gray-800/50">
                    <p className="text-center text-[11px] text-primary3 uppercase tracking-[0.2em] opacity-50">
                        © 2026 Zeus Gym Management. 
                        <br/>
                        <span className="mt-1 block">Power & Performance.</span>
                    </p>
                </div>
            </div>
        </div>
    );
}