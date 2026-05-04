import React from 'react';
import { FaDumbbell } from 'react-icons/fa'; // Pastikan react-icons terinstall

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-[#2B3242]">
            {/* Area Spinner */}
            <div className="relative mb-8 flex justify-center items-center">
                {/* Spinner luar - Berputar, warna Oranye (#FFA000) */}
                <div className="w-24 h-24 border-8 border-gray-700/50 border-t-[#FFA000] rounded-full animate-spin shadow-2xl"></div>
                
                {/* Ikon Dumbbell di tengah - Diam, warna Oranye (#FFA000) */}
                <FaDumbbell className="absolute text-[#FFA000] text-5xl transform -rotate-45" />
            </div>
            
            {/* Teks Loading */}
            <h1 className="text-4xl font-extrabold font-montserrat text-white flex items-center gap-2 mb-2">
                ZEUS <span className="text-[#FFA000]">GYM</span>
            </h1>
            <p className="text-gray-400 text-lg tracking-widest font-light uppercase">
                Powering Up...
            </p>
        </div>
    );
}