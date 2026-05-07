import { FaPlus, FaTrash } from "react-icons/fa";

export default function Promo() {
    return (
        <div className="p-4 font-dmsans">
            <div className="mb-3">
                <p className="text-gray-600 text-lg">Welcome,</p>
                <h1 className="text-4xl font-extrabold text-[#2B3242]">Amelia Golisa</h1>
            </div>

            <div className="flex justify-between items-center mb-6 font-dmsans">
                <h2 className="text-3xl font-bold text-[#2B3242]">Promo</h2>
                <button className="bg-[#2B3242] hover:bg-[#FF8E29] text-white font-semibold py-2 px-5 rounded-xl flex items-center gap-2 shadow-md transition duration-200 cursor-pointer font-dmsans">
                    <FaPlus className="text-lg" /> Add Promo
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-dmsans">
                <div className="md:col-span-2 bg-[#D9D9D9] h-[550px] rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[#2B3242] font-bold text-xl font-dmsans">Promo List</h3>
                </div>

                <div className="flex flex-col gap-4 font-dmsans">
                    <h3 className="text-[#2B3242] font-bold text-xl font-dmsans">Used Promo</h3>
                    <div className="bg-[#D9D9D9] h-24 rounded-2xl shadow-sm"></div>
                    <div className="bg-[#D9D9D9] h-24 rounded-2xl shadow-sm"></div>
                    <button className="bg-[#B91C1C] hover:bg-red-700 text-white font-semibold py-3 px-5 rounded-xl flex justify-center items-center gap-2 shadow-md transition duration-200 mt-2 cursor-pointer w-full font-dmsans">
                        <FaTrash className="text-md" /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
}