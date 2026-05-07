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
                <button className="bg-[#2B3242] hover:bg-[#FF8E29] text-white font-semibold py-2 px-5 rounded-xl flex items-center gap-2 shadow-md transition duration-200 cursor-pointer">
                    <FaPlus className="text-lg" />
                    Add Payment
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Promo List - Kolom Kiri Besar */}
                <div className="md:col-span-2 bg-[#D9D9D9] h-[550px] rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[#2B3242] font-bold text-xl">Payment List</h3>
                </div>
            </div>
        </div>
    );
}