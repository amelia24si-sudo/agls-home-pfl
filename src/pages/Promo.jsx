import { FaEllipsisV, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import promoData from "../assets/promos.json";

export default function Promo() {
    const activePromos = promoData.filter(p => p.status === "Active");
    const expiredPromos = promoData.filter(p => p.status === "Expired");

    return (
        <div className="space-y-8 p-2 font-dmsans  min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Campaign Center</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage and monitor all your gym's active promotions.</p>
                </div>
                <button className="bg-[#FF8A48] hover:bg-[#e07a3d] text-white font-bold py-3 px-8 rounded-2xl flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all active:scale-95">
                    <FaPlus className="text-sm" /> Add New Campaign
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Active Campaigns
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {activePromos.map(item => (
                            <PromoCard key={item.id} {...item} />
                        ))}
                        <div className="border-2 border-dashed border-gray-800 rounded-3xl flex items-center justify-center min-h-[250px] group hover:border-[#FF8A48] transition-all cursor-pointer">
                            <p className="text-gray-600 group-hover:text-[#FF8A48] font-bold">+ New Promo</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#20223b] rounded-[2.5rem] p-7 border border-gray-800 shadow-xl h-fit">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-white font-bold text-xl">History</h3>
                        <button className="text-gray-500 hover:text-red-500 transition"><FaTrash /></button>
                    </div>
                    <div className="space-y-7">
                        {expiredPromos.slice(0, 5).map(item => (
                            <ExpiredItem key={item.id} title={item.title} date={item.date} users={item.participants} />
                        ))}
                    </div>
                    <button className="w-full mt-10 py-4 rounded-2xl border border-gray-700 text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition">
                        View All Archives
                    </button>
                </div>
            </div>
        </div>
    );
}

export function ExpiredItem({ title, date, users }) {
    return (
        <div className="flex items-center justify-between group cursor-default">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#1c1e33] border border-gray-700 rounded-xl flex items-center justify-center text-gray-600 group-hover:text-red-400 transition-colors">
                    <FaTrash size={12} />
                </div>
                <div>
                    <p className="text-white font-bold text-sm leading-none mb-1">{title}</p>
                    <p className="text-gray-500 text-xs font-medium italic">Expired {date}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-gray-400 text-sm font-bold">{users}</p>
                <p className="text-[9px] text-gray-600 uppercase font-bold">Redeemed</p>
            </div>
        </div>
    );
}

// Komponen Card Promo Aktif (Adaptasi dari All projects.png)
export function PromoCard({ id, title, desc, participants, date }) {
    return (
        <Link to={`/promo/${id}`} className="group">
            <div className="bg-[#20223b] rounded-3xl p-6 border border-gray-800 shadow-xl flex flex-col justify-between min-h-[250px] transition-all hover:border-[#FF8A48]">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-[#FF8A48]/10 rounded-2xl flex items-center justify-center">
                            <div className="w-6 h-6 bg-[#FF8A48] rounded-lg shadow-[0_0_10px_rgba(255,138,72,0.5)]"></div>
                        </div>
                        <button className="text-gray-500 hover:text-white"><FaEllipsisV /></button>
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2 group-hover:text-[#FF8A48] transition-colors">{title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">{desc}</p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                    <div>
                        <p className="text-white font-bold text-lg leading-none">{participants}</p>
                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Participants</p>
                    </div>
                    <div className="text-right">
                        <p className="text-white font-bold text-lg leading-none">{date}</p>
                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Due Date</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
