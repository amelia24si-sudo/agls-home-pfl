export const StatCard = ({ label, amount, percentage, icon, iconBg }) => (
    <div className="bg-[#20223b] p-5 rounded-[24px] border border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className={`${iconBg} p-3 rounded-2xl shadow-lg shadow-black/20 text-white`}>{icon}</div>
            <div>
                <p className="text-gray-400 text-sm font-medium">{label}</p>
                <h4 className="text-white text-xl font-bold">{amount}</h4>
                <p className="text-[#1cc0a0] text-xs font-bold mt-1">{percentage} <span className="text-gray-500 font-normal">than last month</span></p>
            </div>
        </div>
    </div>
);