import * as React from "react";
import { MdTrendingUp, MdLocalOffer, MdPeople, MdAccountBalanceWallet } from "react-icons/md";
import PromoItem from "../components/PromoItem";
import MemberRow from "../components/MemberRow";
import { StatCard } from "../components/StatCard";

// Import komponen Native Select (Sesuaikan path jika ditaruh di file terpisah)
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

// Dataset Pendapatan Bulanan
const chartData = [
    { month: "Jan", income: 40 },
    { month: "Feb", income: 65 },
    { month: "Mar", income: 45 },
    { month: "Apr", income: 90 },
    { month: "Mei", income: 55 },
    { month: "Jun", income: 75 },
    { month: "Jul", income: 40 },
    { month: "Agu", income: 85 },
    { month: "Sep", income: 60 },
    { month: "Okt", income: 70 },
    { month: "Nov", income: 50 },
    { month: "Des", income: 95 },
];

export default function Dashboard() {
    // State untuk memantau filter pendapatan jika nanti dibutuhkan logic backend
    const [incomeFilter, setIncomeFilter] = React.useState("monthly");

    // Data dummy untuk list member baru lengkap dengan URL avatar Unsplash
    const newMembers = [
        {
            name: "Aiden Max",
            email: "aiden@zeus.com",
            status: "Active",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
        },
        {
            name: "Roselle Ehrman",
            email: "roselle@gmail.com",
            status: "Active",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
        },
        {
            name: "Jone Smith",
            email: "jone@gmail.com",
            status: "Pending",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
        }
    ];

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
                    {/* New Members Table */}
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
                                    {newMembers.map((member, index) => (
                                        <MemberRow 
                                            key={index}
                                            name={member.name}
                                            email={member.email}
                                            status={member.status}
                                            avatar={member.avatar}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* --- INCOME STATISTICS --- */}
                    <div className="bg-[#20223b] rounded-3xl p-7 border border-gray-800 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-xl">Income Statistics</h3>
                            
                            {/* IMPLEMENTASI NATIVE SELECT DI SINI */}
                            <NativeSelect
                                value={incomeFilter}
                                onChange={(e) => setIncomeFilter(e.target.value)}
                                className="border-gray-700 bg-[#151728] text-[#FF8A48] text-xs font-bold rounded-xl"
                            >
                                <NativeSelectOption value="weekly" className="bg-[#151728] text-white">Weekly</NativeSelectOption>
                                <NativeSelectOption value="monthly" className="bg-[#151728] text-white">Monthly</NativeSelectOption>
                                <NativeSelectOption value="yearly" className="bg-[#151728] text-white">Yearly</NativeSelectOption>
                            </NativeSelect>
                        </div>
                        
                        {/* Container Utama Layout Sumbu Y + Area Grafik */}
                        <div className="w-full h-56 flex gap-4">
                            {/* Label Sumbu Y Statis (Kiri) */}
                            <div className="flex flex-col justify-between text-[10px] text-gray-500 font-bold pb-8 pt-2 select-none">
                                <span>100M</span>
                                <span>75M</span>
                                <span>50M</span>
                                <span>25M</span>
                                <span>0M</span>
                            </div>

                            {/* Kontainer Batang Grafik & Label Sumbu X */}
                            <div className="flex-1 flex flex-col justify-between h-full">
                                {/* Area Grafik Utama & Garis Grid */}
                                <div className="flex-1 flex items-end justify-between gap-2 px-2 pt-2 border-b border-gray-800/60 relative">
                                    {/* Garis Grid Latar Belakang */}
                                    <div className="absolute inset-x-0 top-0 border-t border-gray-800/20 pointer-events-none"></div>
                                    <div className="absolute inset-x-0 top-1/4 border-t border-gray-800/20 pointer-events-none"></div>
                                    <div className="absolute inset-x-0 top-2/4 border-t border-gray-800/20 pointer-events-none"></div>
                                    <div className="absolute inset-x-0 top-3/4 border-t border-gray-800/20 pointer-events-none"></div>

                                    {/* Looping Batang Grafik */}
                                    {chartData.map((data, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center h-full justify-end relative z-10">
                                            {/* Batang Grafik Komponen */}
                                            <div 
                                                className="w-full bg-[#FF8A48] rounded-t-md transition-all duration-300 group hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] relative cursor-pointer" 
                                                style={{ height: `${data.income}%` }}
                                            >
                                                {/* Tooltip Gaya Pop-up Kustom saat Bar Disorot Mouse */}
                                                <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#151728] border border-gray-800 text-white text-xs rounded-xl p-2 opacity-0 pointer-events-none shadow-2xl z-30 min-w-[75px] text-center transition-opacity duration-200 group-hover:opacity-100">
                                                    <p className="text-[10px] text-gray-400 font-medium">{data.month}</p>
                                                    <p className="font-mono font-bold text-[#FF8A48]">{data.income}M</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Label Sumbu X (Inisial Nama Bulan di Bawah) */}
                                <div className="flex justify-between px-2 pt-2 select-none">
                                    {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((bulan, i) => (
                                        <span key={i} className="flex-1 text-center text-[10px] text-gray-500 font-bold uppercase">
                                            {bulan}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT SECTION: TOP PROMO --- */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    {/* Top Promo Cards */}
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