import { MdTrendingUp, MdLocalOffer, MdPeople, MdAccountBalanceWallet } from "react-icons/md";
import PromoItem from "../components/PromoItem";
import MemberRow from "../components/MemberRow";
import { StatCard } from "../components/StatCard";

export default function Dashboard() {
    return (
        <div className="space-y-8 p-2 font-dmsans text-white">
            {/* --- TOP SUMMARY CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    label="Monthly Income" 
                    amount="Rp 45.200.000" 
                    growth="+12.5%" 
                    icon={<MdAccountBalanceWallet className="text-white text-2xl" />} 
                    iconBg="bg-[#1cc0a0]" 
                />
                <StatCard 
                    label="New Members" 
                    amount="124" 
                    growth="+8%" 
                    icon={<MdPeople className="text-white text-2xl" />} 
                    iconBg="bg-[#56ccf2]" 
                />
                <StatCard 
                    label="Promo Conversion" 
                    amount="64%" 
                    growth="+2%" 
                    icon={<MdLocalOffer className="text-white text-2xl" />} 
                    iconBg="bg-[#FF8A48]" 
                />
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* --- LEFT SECTION: NEW MEMBERS & INCOME ANALYSIS --- */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    {/* New Members Table - Gaya data tables.png */}
                    <div className="bg-[#20223b] rounded-3xl p-7 border border-gray-800 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-xl">New Members</h3>
                            <button className="text-[#FF8A48] text-sm font-bold hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-gray-500 text-xs uppercase tracking-widest border-b border-gray-800">
                                        <th className="pb-4 font-medium">Member</th>
                                        <th className="pb-4 font-medium text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800/50">
                                    <MemberRow name="Aiden Max" email="aiden@zeus.com" status="Active" />
                                    <MemberRow name="Roselle Ehrman" email="roselle@gmail.com" status="Active" />
                                    <MemberRow name="Jone Smith" email="jone@gmail.com" status="Pending" />
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Income Overview - Mockup gaya Statistics Chart di Dashboard.jpg */}
                    <div className="bg-[#20223b] rounded-3xl p-7 border border-gray-800 shadow-xl">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-bold text-xl">Income Statistics</h3>
                            <span className="bg-[#151728] px-4 py-1 rounded-lg text-[#FF8A48] text-xs font-bold border border-gray-700 cursor-pointer">Monthly ▾</span>
                        </div>
                        <div className="h-48 flex items-end justify-between px-2 gap-2">
                            {[40, 65, 45, 90, 55, 75, 40, 85, 60, 70, 50, 95].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center group">
                                    <div 
                                        className="w-full bg-[#FF8A48] rounded-t-lg transition-all duration-300 group-hover:bg-white relative" 
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-[#1c1e33] text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            {h}M
                                        </div>
                                    </div>
                                    <span className="text-[9px] text-gray-600 mt-2 font-bold uppercase">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- RIGHT SECTION: TOP PROMO --- */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    {/* Top Promo Cards - Gaya Transactions di Dashboard.jpg */}
                    <div className="bg-[#20223b] rounded-3xl p-7 border border-gray-800 shadow-xl h-full">
                        <h3 className="font-bold text-xl mb-6">Top Performing Promos</h3>
                        <div className="space-y-6">
                            <PromoItem 
                                title="Ramadan Sale" 
                                usage="150 Users" 
                                trend="+24%" 
                                iconBg="bg-green-500/10" 
                                iconColor="text-green-400"
                            />
                            <PromoItem 
                                title="New Year Deal" 
                                usage="98 Users" 
                                trend="+12%" 
                                iconBg="bg-blue-500/10" 
                                iconColor="text-blue-400"
                            />
                            <PromoItem 
                                title="Flash Friday" 
                                usage="45 Users" 
                                trend="-5%" 
                                iconBg="bg-red-500/10" 
                                iconColor="text-red-400"
                            />
                        </div>
                        
                        <div className="mt-10 p-6 bg-gradient-to-br from-[#FF8A48] to-[#e07a3d] rounded-2xl shadow-lg shadow-orange-500/20">
                            <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">Total Savings Given</p>
                            <h4 className="text-white text-2xl font-black italic">Rp 8.450.000</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}