import { FaPlus, FaTrash, FaEllipsisV } from "react-icons/fa";

export default function Promo() {
    return (
        <div className="space-y-8 p-2 font-dmsans">
            {/* Header section sesuai gaya All Projects */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Our Promos</h2>
                    <p className="text-gray-400 text-sm mt-1 max-w-xl">
                        Manage your gym marketing campaigns here. Keep your members engaged by providing meaningful discounts and offers.
                    </p>
                </div>
                <button className="bg-[#FF8A48] hover:bg-[#e07a3d] text-white font-bold py-3 px-8 rounded-2xl flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all active:scale-95">
                    <FaPlus className="text-sm" /> Add New
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Grid Promo Aktif - Mengadaptasi layout 'Our projects' */}
                <div className="lg:col-span-2">
                    <h3 className="text-white font-bold text-xl mb-6">Active Campaigns</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PromoCard 
                            title="New Member Deal" 
                            desc="If everything I did failed - which it doesn't, I think that it actually succeeds." 
                            participants="45" 
                            date="01.06.26" 
                        />
                        <PromoCard 
                            title="Referral Bonus" 
                            desc="Special promotion for members who bring their friends to join our gym community." 
                            participants="12" 
                            date="15.06.26" 
                        />
                        <PromoCard 
                            title="Yearly Subscription" 
                            desc="Massive discount for those who commit to a healthy lifestyle for a full year." 
                            participants="89" 
                            date="20.07.26" 
                        />
                        <div className="border-2 border-dashed border-gray-800 rounded-3xl flex items-center justify-center min-h-[250px] group hover:border-[#FF8A48] transition-colors cursor-pointer">
                           <p className="text-gray-600 group-hover:text-[#FF8A48] font-bold">+ Create New Promo</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Promo Expired - Mengadaptasi gaya 'Transactions' */}
                <div className="bg-[#20223b] rounded-3xl p-7 border border-gray-800 shadow-xl h-fit">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-white font-bold text-xl">Expired History</h3>
                        <button className="text-gray-500 hover:text-red-500 transition"><FaTrash /></button>
                    </div>

                    <div className="space-y-6">
                        <ExpiredItem title="Ramadan Kareem" date="08.04.26" users="120" />
                        <ExpiredItem title="New Year Burn" date="01.01.26" users="350" />
                        <ExpiredItem title="Black Friday" date="28.11.25" users="95" />
                        <ExpiredItem title="Summer Fit" date="15.08.25" users="210" />
                    </div>

                    <button className="w-full mt-8 py-3 rounded-2xl border border-gray-700 text-gray-400 font-bold text-sm hover:bg-white/5 transition">
                        View Full Archive
                    </button>
                </div>
            </div>
        </div>
    );
}

// Komponen Card Promo Aktif (Adaptasi dari All projects.png)
function PromoCard({ title, desc, participants, date }) {
    return (
        <div className="bg-[#20223b] rounded-3xl p-6 border border-gray-800 shadow-xl flex flex-col justify-between min-h-[250px]">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-[#FF8A48]/10 rounded-2xl flex items-center justify-center">
                        <div className="w-6 h-6 bg-[#FF8A48] rounded-lg"></div>
                    </div>
                    <button className="text-gray-500 hover:text-white"><FaEllipsisV /></button>
                </div>
                <h4 className="text-white font-bold text-lg mb-2">{title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{desc}</p>
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
    );
}

// Komponen List Expired (Adaptasi dari Transactions di Dashboard.jpg)
function ExpiredItem({ title, date, users }) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#1c1e33] border border-gray-700 rounded-xl flex items-center justify-center text-gray-600 group-hover:text-red-400 transition-colors">
                    <FaTrash size={12} />
                </div>
                <div>
                    <p className="text-white font-bold text-sm leading-none mb-1">{title}</p>
                    <p className="text-gray-500 text-xs font-medium">Expired on {date}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-gray-400 text-sm font-bold">{users}</p>
                <p className="text-[9px] text-gray-600 uppercase font-bold">Used</p>
            </div>
        </div>
    );
}