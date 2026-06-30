import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTag, FaUsers, FaCalendarAlt, FaCheckCircle, FaChartLine } from "react-icons/fa";
import axios from "axios";

// --- KONFIGURASI API SUPABASE ---
const API_URL = "https://duwukjqwgtpvdfvudrcz.supabase.co/rest/v1/promos";
const API_KEY = "sb_publishable_GnJ3SiBSbMuXix0AF0f3lA_4-buJFMo";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

const promoAPI = {
  async fetchPromos() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },
  async updatePromo(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, {
      headers: { ...headers, Prefer: "return=representation" },
    });
    return response.data;
  },
  async deletePromo(id) {
    const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    return response.data;
  },
};

export default function PromoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // State untuk menyimpan data tunggal promo dan status loading
    const [promo, setPromo] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch data berdasarkan ID saat komponen dimuat
    useEffect(() => {
        const getPromoDetail = async () => {
            try {
                const data = await promoAPI.fetchPromos();
                // Menyamakan tipe data string/integer agar aman saat pencarian ID
                const found = data.find(p => String(p.id) === String(id));
                setPromo(found);
            } catch (error) {
                console.error("Gagal memuat detail promo:", error);
            } finally {
                setLoading(false);
            }
        };
        getPromoDetail();
    }, [id]);

    // Fungsi handler untuk menjeda (Pause) Campaign -> Mengubah status menjadi 'Expired'
    const handlePauseCampaign = async () => {
        if (!promo) return;
        try {
            await promoAPI.updatePromo(promo.id, { status: "Expired" });
            setPromo({ ...promo, status: "Expired" });
            alert("Campaign successfully paused!");
        } catch (error) {
            console.error("Gagal memperbarui status:", error);
        }
    };

    // Fungsi handler untuk menghapus (Delete Forever) Campaign
    const handleDeleteCampaign = async () => {
        if (!promo) return;
        if (window.confirm("Are you sure you want to delete this campaign forever?")) {
            try {
                await promoAPI.deletePromo(promo.id);
                alert("Campaign deleted successfully!");
                navigate('/promos');
            } catch (error) {
                console.error("Gagal menghapus campaign:", error);
            }
        }
    };

    if (loading) return <div className="p-10 text-white font-bold">Loading Campaign Data...</div>;
    if (!promo) return <div className="p-10 text-white font-bold">Campaign Not Found!</div>;

    return (
        <div className="p-4 md:p-8 font-dmsans max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header / Navigation */}
            <div className="flex items-center justify-between mb-10">
                <button onClick={() => navigate('/promos')} className="flex items-center gap-3 text-gray-400 hover:text-white transition-all group">
                    <div className="p-2 bg-gray-800 rounded-xl group-hover:bg-[#FF8A48] transition-colors text-white">
                        <FaArrowLeft size={16} />
                    </div>
                    <span className="font-bold">Back to Dashboard</span>
                </button>
                <div className="flex gap-2">
                    <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase ${promo.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {promo.status}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#20223b] border border-gray-800 rounded-[2.5rem] p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-5">
                            <FaTag size={120} />
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">{promo.title}</h1>
                        <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl">
                            {promo.fullDesc}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-gray-800">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
                                    <FaUsers size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Reach</p>
                                    <p className="text-white font-bold text-xl">{promo.participants} Members</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400">
                                    <FaCalendarAlt size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Ends On</p>
                                    <p className="text-white font-bold text-xl">{promo.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#20223b] border border-gray-800 rounded-[2rem] p-8">
                        <h3 className="text-white font-bold text-xl mb-6">Terms & Conditions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {["Non-transferable", "Cannot be combined", "Active members only", "No cash value"].map((t, i) => (
                                <div key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                                    <FaCheckCircle className="text-green-500" /> {t}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <div className="bg-[#FF8A48] rounded-[2.5rem] p-8 text-white shadow-xl shadow-orange-500/20">
                        <FaChartLine size={32} className="mb-4" />
                        <h3 className="text-2xl font-black mb-2">Campaign Performance</h3>
                        <p className="text-orange-100 text-sm mb-6">This promo is performing 25% better than last month's campaign.</p>
                        <button className="w-full bg-white text-[#FF8A48] font-bold py-4 rounded-2xl hover:bg-orange-50 transition-colors">
                            Download Report
                        </button>
                    </div>

                    <div className="bg-[#1a1c30] border border-gray-800 rounded-[2.5rem] p-8">
                        <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Quick Actions</h4>
                        <div className="space-y-3">
                            <button onClick={handlePauseCampaign} className="w-full bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-2xl font-bold transition-all">Pause Campaign</button>
                            <button onClick={handleDeleteCampaign} className="w-full border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white py-4 rounded-2xl font-bold transition-all">Delete Forever</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}