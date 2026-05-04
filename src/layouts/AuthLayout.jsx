import { Outlet } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa"; // Pastikan react-icons sudah diinstal

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2B3242] p-4">
      {/* Wadah kartu utama */}
      <div className="bg-[#1F2430] p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
        
        {/* Logo ZEUS GYM */}
        <div className="flex items-center space-x-2 text-3xl font-black italic tracking-wider mb-2">
          <FaDumbbell className="text-[#FFA000] transform -rotate-45" />
          <div>
            <span className="text-white">ZEUS </span>
            <span className="text-[#FFA000]">GYM</span>
          </div>
        </div>

        {/* Teks Welcome Back */}
        <h2 className="text-3xl font-extrabold text-white tracking-wide text-center mb-8">
          Welcome Back
        </h2>

        {/* Konten form (HANYA input, tombol, dan link) akan dirender di sini */}
        <Outlet />

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          © {new Date().getFullYear()} ZEUS GYM Admin Panel. All rights reserved.
        </p>
      </div>
    </div>
  );
}