import { useState, useEffect, useRef } from "react"; // ◄ 1. IMPORT HOOKS
import { FaEllipsisV, FaTrash, FaPlus, FaSearch } from "react-icons/fa"; // ◄ Tambah ikon search
import { Link } from "react-router-dom";
import promoData from "../assets/promos.json";
import { ExpiredItem } from "../components/ExpiredItem";
import { PromoCard } from "../components/PromoCard";

export default function Promos() {
    // 2. USESTATE: Mengelola text pencarian dari user
    const [searchQuery, setSearchQuery] = useState("");
    
    // State untuk menampung data yang sudah difilter
    const [filteredActive, setFilteredActive] = useState([]);
    const [filteredExpired, setFilteredExpired] = useState([]);

    // 3. USEREF: Membuat referensi ke elemen DOM input search
    const searchInputRef = useRef(null);

    // 4. USEEFFECT: Otomatis memicu autofocus ke input search saat halaman terbuka
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    // 5. USEEFFECT: Memfilter data promo secara real-time setiap kali `searchQuery` berubah
    useEffect(() => {
        const query = searchQuery.toLowerCase();

        const active = promoData.filter(
            (p) => p.status === "Active" && p.title.toLowerCase().includes(query)
        );
        const expired = promoData.filter(
            (p) => p.status === "Expired" && p.title.toLowerCase().includes(query)
        );

        setFilteredActive(active);
        setFilteredExpired(expired);
    }, [searchQuery]);

    return (
        <div className="space-y-8 p-2 font-dmsans min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Campaign Center</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage and monitor all your gym's active promotions.</p>
                </div>
                
                {/* --- FITUR BARU: SEARCH BAR DENGAN USESTATE & USEREF --- */}
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">
                    <div className="relative w-full sm:w-64">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                        <input
                            ref={searchInputRef} // ◄ Menyambungkan ref ke DOM elemen
                            type="text"
                            placeholder="Search campaign..."
                            value={searchQuery} // ◄ Controlled component dengan useState
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#20223b] border border-gray-800 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF8A48] transition-colors"
                        />
                    </div>

                    <button className="bg-[#FF8A48] hover:bg-[#e07a3d] text-white font-bold py-3 px-8 rounded-2xl flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all active:scale-95 w-full sm:w-auto justify-center">
                        <FaPlus className="text-sm" /> Add New Campaign
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active Campaigns Section */}
                <div className="lg:col-span-2">
                    <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Active Campaigns
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Merender data hasil filter state */}
                        {filteredActive.length > 0 ? (
                            filteredActive.map(item => (
                                <PromoCard key={item.id} {...item} />
                            ))
                        ) : (
                            <div className="col-span-1 md:col-span-2 text-center py-10 bg-[#20223b]/30 border border-dashed border-gray-800 rounded-3xl">
                                <p className="text-gray-500 text-sm">No active campaign found matching "{searchQuery}"</p>
                            </div>
                        )}
                        <div className="border-2 border-dashed border-gray-800 rounded-3xl flex items-center justify-center min-h-[250px] group hover:border-[#FF8A48] transition-all cursor-pointer">
                            <p className="text-gray-600 group-hover:text-[#FF8A48] font-bold">+ New Promo</p>
                        </div>
                    </div>
                </div>

                {/* History Section */}
                <div className="bg-[#20223b] rounded-[2.5rem] p-7 border border-gray-800 shadow-xl h-fit">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-white font-bold text-xl">History</h3>
                        <button className="text-gray-500 hover:text-red-500 transition"><FaTrash /></button>
                    </div>
                    <div className="space-y-7">
                        {/* Merender data hasil filter state */}
                        {filteredExpired.length > 0 ? (
                            filteredExpired.slice(0, 5).map(item => (
                                <ExpiredItem key={item.id} title={item.title} date={item.date} users={item.participants} />
                            ))
                        ) : (
                            <p className="text-center py-6 text-gray-500 text-sm">No archive data found.</p>
                        )}
                    </div>
                    <button className="w-full mt-10 py-4 rounded-2xl border border-gray-700 text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition">
                        View All Archives
                    </button>
                </div>
            </div>
        </div>
    );
}