import { useState, useEffect, useRef } from "react"; 
import { FaTrash, FaPlus, FaSearch, FaTimes } from "react-icons/fa"; 
import { ExpiredItem } from "../components/ExpiredItem";
import { PromoCard } from "../components/PromoCard";

// IMPORT DARI SERVICE LUAR
import { promoAPI } from "../service/promoAPI"; 

export default function Promos() {
    // State Utama
    const [promos, setPromos] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredActive, setFilteredActive] = useState([]);
    const [filteredExpired, setFilteredExpired] = useState([]);

    // State untuk Modal Form Tambah Data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        fullDesc: "",
        date: "",
        participants: 0,
        status: "Active"
    });

    const searchInputRef = useRef(null);

    // Fetch data pertama kali dari Supabase
    const loadData = async () => {
        try {
            const data = await promoAPI.fetchPromos();
            setPromos(data);
        } catch (error) {
            console.error("Gagal mengambil data promo:", error);
        }
    };

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
        loadData();
    }, []);

    // Memfilter data promo secara real-time
    useEffect(() => {
        const query = searchQuery.toLowerCase();

        const active = promos.filter(
            (p) => p.status === "Active" && (p.title?.toLowerCase().includes(query) || false)
        );
        const expired = promos.filter(
            (p) => p.status === "Expired" && (p.title?.toLowerCase().includes(query) || false)
        );

        setFilteredActive(active);
        setFilteredExpired(expired);
    }, [searchQuery, promos]);

    // Handler ketika form disubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Pemetaan payload yang aman menyesuaikan skema tabel SQL Supabase Anda
            const payload = {
                title: formData.title,
                desc: formData.desc,
                participants: formData.participants ? Number(formData.participants) : 0, 
                date: formData.date || null, 
                status: formData.status || "Active",
                "fullDesc": formData.fullDesc // Menggunakan string key agar case-sensitive sesuai SQL '"fullDesc"'
            };

            // Eksekusi API POST ke service luar
            await promoAPI.createPromo(payload);
            
            alert("Promo baru berhasil ditambahkan!");
            
            // Reset form dan tutup modal jika sukses
            setFormData({
                title: "",
                desc: "",
                fullDesc: "",
                date: "",
                participants: 0,
                status: "Active"
            });
            setIsModalOpen(false);
            
            // Refresh data biar langsung muncul di UI dashboard utama
            loadData();
        } catch (error) {
            console.error("Error Lengkap Supabase:", error);
            
            // Menangkap detail error spesifik dari database Supabase
            const errorMsg = error.response?.data?.message || error.response?.data?.hint || error.message;
            const errorDetail = error.response?.data?.details || "Tidak ada detail tambahan.";
            
            alert(`Terjadi Kesalahan Saat Menambah Data:\n\nAlasan: ${errorMsg}\n\nDetail: ${errorDetail}`);
        }
    };

    return (
        <div className="space-y-8 p-2 font-dmsans min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Campaign Center</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage and monitor all your gym's active promotions.</p>
                </div>
                
                {/* --- SEARCH BAR & TOMBOL TAMBAH --- */}
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">
                    <div className="relative w-full sm:w-64">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search campaign..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#20223b] border border-gray-800 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF8A48] transition-colors"
                        />
                    </div>

                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#FF8A48] hover:bg-[#e07a3d] text-white font-bold py-3 px-8 rounded-2xl flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all active:scale-95 w-full sm:w-auto justify-center"
                    >
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
                        {filteredActive.length > 0 ? (
                            filteredActive.map(item => (
                                <PromoCard key={item.id} {...item} />
                            ))
                        ) : (
                            <div className="col-span-1 md:col-span-2 text-center py-10 bg-[#20223b]/30 border border-dashed border-gray-800 rounded-3xl">
                                <p className="text-gray-500 text-sm">No active campaign found matching "{searchQuery}"</p>
                            </div>
                        )}
                        
                        {/* Kotak Dotted Tambah Baru */}
                        <div 
                            onClick={() => setIsModalOpen(true)}
                            className="border-2 border-dashed border-gray-800 rounded-3xl flex items-center justify-center min-h-[250px] group hover:border-[#FF8A48] transition-all cursor-pointer"
                        >
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

            {/* --- MODAL DIALOG POP UP (OVERLAY FORM) --- */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-[#20223b] border border-gray-800 rounded-[2.5rem] p-6 md:p-8 w-full max-w-lg space-y-4 text-white relative shadow-2xl">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-white transition"
                        >
                            <FaTimes size={18} />
                        </button>

                        <div>
                            <h3 className="text-2xl font-bold tracking-tight">Create New Campaign</h3>
                            <p className="text-gray-400 text-xs mt-1">Fill fields below to publish a new promotion to Supabase.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Campaign Title</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    placeholder="e.g., Summer Body Pack"
                                    className="w-full bg-[#16172b] border border-gray-800 rounded-xl p-3 text-sm focus:outline-none focus:border-[#FF8A48]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Short Description</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.desc}
                                    onChange={(e) => setFormData({...formData, desc: e.target.value})}
                                    placeholder="Brief summary for dashboard card..."
                                    className="w-full bg-[#16172b] border border-gray-800 rounded-xl p-3 text-sm focus:outline-none focus:border-[#FF8A48]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Terms Description</label>
                                <textarea 
                                    required
                                    rows="3"
                                    value={formData.fullDesc}
                                    onChange={(e) => setFormData({...formData, fullDesc: e.target.value})}
                                    placeholder="Detailed rules, benefits, and contract information..."
                                    className="w-full bg-[#16172b] border border-gray-800 rounded-xl p-3 text-sm focus:outline-none focus:border-[#FF8A48] resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">End Date</label>
                                    <input 
                                        type="date" 
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                                        className="w-full bg-[#16172b] border border-gray-800 rounded-xl p-3 text-sm focus:outline-none focus:border-[#FF8A48] text-gray-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Initial Status</label>
                                    <select 
                                        value={formData.status}
                                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                                        className="w-full bg-[#16172b] border border-gray-800 rounded-xl p-3 text-sm focus:outline-none focus:border-[#FF8A48] text-gray-300"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Expired">Expired</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-1/3 bg-gray-800 hover:bg-gray-700 py-3.5 rounded-xl font-bold text-sm transition"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="w-2/3 bg-[#FF8A48] hover:bg-[#e07a3d] text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-orange-500/10"
                                >
                                    Publish Campaign
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}