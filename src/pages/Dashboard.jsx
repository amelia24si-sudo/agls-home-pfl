import { FaUserFriends, FaMoneyBillWave, FaPercentage, FaPrint } from "react-icons/fa";

export default function Dashboard() {
    return (
        <div id="dashboard-container" className="p-4 ">
            
            {/* Welcome Text */}
            <div className="mb-3">
                <p className="text-gray-600 text-lg">Welcome,</p>
                <h1 className="text-4xl font-extrabold text-[#2B3242]">Amelia Golisa</h1>
            </div>

            {/* Dashboard Title & Print Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-[#2B3242]">Dashboard</h2>
                <button 
                    className="bg-[#2B3242] hover:bg-[#1a1e28] text-[#FCA311] font-semibold py-2 px-5 rounded-xl flex items-center gap-2 shadow-md transition duration-200"
                >
                    <FaPrint className="text-lg" />
                    Print report
                </button>
            </div>

            {/* Top Grid: Active Member & Income (Gray Placeholders) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#D9D9D9] h-80 rounded-2xl p-6 relative shadow-sm">
                    <h3 className="text-gray-600 font-bold text-xl">Active Member</h3>
                </div>
                <div className="bg-[#D9D9D9] h-80 rounded-2xl p-6 relative shadow-sm">
                    <h3 className="text-gray-600 font-bold text-xl">Income</h3>
                </div>
            </div>

            {/* Bottom Section Title */}
            <h2 className="text-xl font-bold text-[#2B3242] mb-4">Top New Promo</h2>

            {/* Bottom Grid Layout */}
            <div className="flex flex-col md:flex-row gap-6">
                
                {/* Left Side: Gray Placeholder */}
                <div className="bg-[#D9D9D9] h-48 rounded-2xl flex-grow shadow-sm"></div>

                {/* Right Side: Statistic Cards */}
                <div className="flex gap-4">
                    {/* Card 1: Total Members */}
                    <div className="bg-[#2B3242] w-40 h-48 rounded-2xl flex flex-col justify-center items-center p-4 shadow-md">
                        <FaUserFriends className="text-[#FCA311] text-4xl mb-3" />
                        <span className="text-[#FCA311] text-xl font-semibold">10</span>
                        <span className="text-[#FCA311] font-medium mt-1">Total Members</span>
                    </div>

                    {/* Card 2: Payment */}
                    <div className="bg-[#2B3242] w-48 h-48 rounded-2xl flex flex-col justify-center items-center p-4 shadow-md">
                        <FaMoneyBillWave className="text-[#FCA311] text-4xl mb-3" />
                        <span className="text-[#FCA311] text-lg font-semibold">Rp 780.000.00</span>
                        <span className="text-[#FCA311] font-medium mt-1">Payment</span>
                    </div>

                    {/* Card 3: Promo */}
                    <div className="bg-[#2B3242] w-40 h-48 rounded-2xl flex flex-col justify-center items-center p-4 shadow-md">
                        <FaPercentage className="text-[#FCA311] text-4xl mb-3" />
                        <span className="text-[#FCA311] text-xl font-semibold">10</span>
                        <span className="text-[#FCA311] font-medium mt-1">Promo</span>
                    </div>
                </div>

            </div>
        </div>
    );
}