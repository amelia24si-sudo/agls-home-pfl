import React from 'react';
import { FaDumbbell } from 'react-icons/fa';

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-[#2B3242]">
            <div className="relative mb-8 flex justify-center items-center">
                <div className="w-24 h-24 border-8 border-white/10 border-t-[#FF8E29] rounded-full animate-spin shadow-2xl"></div>
                <FaDumbbell className="absolute text-[#FF8E29] text-5xl transform -rotate-45" />
            </div>
            
            <h1 className="text-4xl font-extrabold font-montserrat text-white flex items-center gap-2 mb-2">
                ZEUS <span className="text-[#FF8E29]">GYM</span>
            </h1>
            <p className="text-gray-400 text-lg tracking-widest font-light uppercase">
                Powering Up...
            </p>
        </div>
    );
}