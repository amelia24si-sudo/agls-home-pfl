import { Outlet } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2B3242] p-4 font-dmsans">
      <div className="bg-[#1F2430] p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
        
        <div className="flex items-center space-x-2 text-5xl font-black tracking-wider mb-2 font-dmsans">
          <FaDumbbell className="text-[#FF8E29] transform -rotate-45" />
          <div>
            <span className="text-white">ZEUS </span>
            <span className="text-[#FF8E29]">GYM</span>
          </div>
        </div>

        <h2 className="text-4xl font-black text-white tracking-wide text-center mb-8 uppercase font-dmsans">
          Welcome Back
        </h2>

        <Outlet />

        <p className="text-center text-xs text-gray-500 mt-8 font-dmsans">
          © {new Date().getFullYear()} ZEUS GYM Admin Panel. All rights reserved.
        </p>
      </div>
    </div>
  );
}