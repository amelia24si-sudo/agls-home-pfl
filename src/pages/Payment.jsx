import { FaPlus, FaPrint } from "react-icons/fa";

export default function Payment() {
    return (
        <div className="p-4">
            
            {/* Welcome Text */}
            <div className="mb-3">
                <p className="text-gray-600 text-lg">Welcome,</p>
                <h1 className="text-4xl font-extrabold text-[#2B3242]">Amelia Golisa</h1>
            </div>

            {/* Title & Action Buttons */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-[#2B3242]">Payment</h2>
                
                {/* Wrapper untuk tombol-tombol agar berjajar rapi */}
                <div className="flex gap-4">
                    <button className="bg-[#2B3242] hover:bg-[#1a1e28] text-[#FCA311] font-semibold py-2 px-5 rounded-xl flex items-center gap-2 shadow-md transition duration-200 cursor-pointer">
                        <FaPlus className="text-lg" />
                        Add Payment
                    </button>
                    
                    <button className="bg-[#2B3242] hover:bg-[#1a1e28] text-[#FCA311] font-semibold py-2 px-5 rounded-xl flex items-center gap-2 shadow-md transition duration-200 cursor-pointer">
                        <FaPrint className="text-lg" />
                        Print report
                    </button>
                </div>
            </div>

            {/* Grid Payment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#D9D9D9] h-[550px] rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[#2B3242] font-bold text-xl">Member Payment</h3>
                </div>
                <div className="bg-[#D9D9D9] h-[550px] rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[#2B3242] font-bold text-xl">Member Payment</h3>
                </div>
            </div>
        </div>
    );
}