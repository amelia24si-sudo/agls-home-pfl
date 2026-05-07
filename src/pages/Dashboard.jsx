import { FaUserFriends, FaMoneyBillWave, FaPercentage, FaPrint } from "react-icons/fa";

export default function Dashboard() {
    return (
        <div id="dashboard-container" className="p-4 font-dmsans">
            <div className="mb-3 font-dmsans">
                <p className="text-gray-600 text-lg">Welcome,</p>
                <h1 className="text-4xl font-extrabold text-[#2B3242]">Amelia Golisa</h1>
            </div>

            <div className="flex justify-between items-center mb-6 font-dmsans">
                <h2 className="text-3xl font-bold text-[#2B3242]">Dashboard</h2>
                <button className="bg-[#2B3242] hover:bg-[#FF8E29] text-white font-semibold py-2 px-5 rounded-xl flex items-center gap-2 shadow-md transition duration-200 font-dmsans">
                    <FaPrint className="text-lg" /> Print report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 font-dmsans">
                <div className="bg-[#D9D9D9] h-80 rounded-2xl p-6 relative shadow-sm">
                    <h3 className="text-gray-600 font-bold text-xl font-dmsans">Active Member</h3>
                </div>
                <div className="bg-[#D9D9D9] h-80 rounded-2xl p-6 relative shadow-sm">
                    <h3 className="text-gray-600 font-bold text-xl font-dmsans">Income</h3>
                </div>
            </div>

            <h2 className="text-xl font-bold text-[#2B3242] mb-4 font-dmsans">Top New Promo</h2>
            <div className="flex flex-col md:flex-row gap-6 font-dmsans">
                <div className="bg-[#D9D9D9] h-48 rounded-2xl flex-grow shadow-sm"></div>
                <div className="flex gap-4 font-dmsans">
                    <StatCard icon={<FaUserFriends/>} label="Total Members" value="10" />
                    <StatCard icon={<FaMoneyBillWave/>} label="Payment" value="Rp 780.000" />
                    <StatCard icon={<FaPercentage/>} label="Promo" value="10" />
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value }) {
    return (
        <div className="bg-[#2B3242] w-40 h-48 rounded-2xl flex flex-col justify-center items-center p-4 shadow-md text-[#FF8E29] font-dmsans">
            <div className="text-4xl mb-3">{icon}</div>
            <span className="text-lg font-bold">{value}</span>
            <span className="font-medium mt-1 text-center text-sm font-dmsans">{label}</span>
        </div>
    );
}