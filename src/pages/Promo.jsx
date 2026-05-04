import { FaPlus, FaTrash } from "react-icons/fa";

export default function Promo() {
    return (
        <div className="p-4">
            <div className="mb-3">
                <p className="text-gray-600 text-lg">Welcome,</p>
                <h1 className="text-4xl font-extrabold text-[#2B3242]">Amelia Golisa</h1>
            </div>

            {/* Title & Add Promo Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-[#2B3242]">Promo</h2>
                <button className="bg-[#2B3242] hover:bg-[#1a1e28] text-[#FCA311] font-semibold py-2 px-5 rounded-xl flex items-center gap-2 shadow-md transition duration-200 cursor-pointer">
                    <FaPlus className="text-lg" />
                    Add Promo
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Promo List - Kolom Kiri Besar */}
                <div className="md:col-span-2 bg-[#D9D9D9] h-[550px] rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[#2B3242] font-bold text-xl">Promo List</h3>
                </div>

                {/* Used Promo - Kolom Kanan Kotak-kotak Kecil */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-[#2B3242] font-bold text-xl">Used Promo</h3>
                    
                    {/* List Items */}
                    <div className="bg-[#D9D9D9] h-24 rounded-2xl shadow-sm"></div>
                    <div className="bg-[#D9D9D9] h-24 rounded-2xl shadow-sm"></div>
                    <div className="bg-[#D9D9D9] h-24 rounded-2xl shadow-sm"></div>
                    <div className="bg-[#D9D9D9] h-24 rounded-2xl shadow-sm"></div>
                    
                    {/* Delete Button */}
                    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-5 rounded-xl flex justify-center items-center gap-2 shadow-md transition duration-200 mt-2 cursor-pointer w-full">
                        <FaTrash className="text-md" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}