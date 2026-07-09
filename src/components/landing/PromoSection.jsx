import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { FaArrowRight, FaTag, FaUsers, FaRegCalendarAlt, FaCheckCircle, FaTimes } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { promoAPI } from "../../service/promoAPI";

export function PromoSection() {
    const [promos, setPromos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    // --- STATE UNTUK POP-UP MODAL ---
    const [showModal, setShowModal] = useState(false);
    const [claimedPromoTitle, setClaimedPromoTitle] = useState("");
    
    const navigate = useNavigate();

    // 1. Ambil data user dari localStorage
    const storedUser = localStorage.getItem("userLoggedIn");
    const user = storedUser ? JSON.parse(storedUser) : null;
    
    // 2. Validasi status login khusus untuk role "member"
    const isMemberLoggedIn = user && user.role === "member";

    useEffect(() => {
        let active = true;

        const loadPromos = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await promoAPI.fetchPromos();
                if (active) {
                    setPromos((data || []).filter((p) => p.status === "Active"));
                }
            } catch (err) {
                if (active) {
                    setError("Tidak dapat memuat promo saat ini. Silakan coba lagi nanti.");
                    console.error("Gagal mengambil data promo:", err);
                }
            } finally {
                if (active) setLoading(false);
            }
        };

        loadPromos();
        return () => {
            active = false;
        };
    }, []);

    // 3. Fungsi untuk menangani klik tombol Claim Offer
    const handleClaimClick = (promoTitle) => {
        if (isMemberLoggedIn) {
            // Tampilkan custom pop-up modal modal
            setClaimedPromoTitle(promoTitle);
            setShowModal(true);
        } else {
            navigate("/register");
        }
    };

    return (
        <section id="promos" className="bg-[#1c1e33] border-y border-gray-800 relative">
            <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
                <div className="text-center mb-14">
                    <span className="text-primary2 text-xs font-bold uppercase tracking-widest">
                        Membership Offers
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-white mt-3">
                        Active Promos & Pricing
                    </h2>
                    <p className="text-primary3 text-sm mt-4 max-w-2xl mx-auto">
                        Grab the best deals on memberships. Offers are updated in real time.
                    </p>
                </div>

                {loading && (
                    <div className="flex flex-col items-center justify-center py-16 text-primary3">
                        <ImSpinner2 className="animate-spin text-4xl text-primary2 mb-4" />
                        <p className="text-sm">Loading promos...</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="max-w-md mx-auto flex items-center p-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl">
                        <BsFillExclamationDiamondFill className="text-lg me-2 flex-shrink-0" />
                        {error}
                    </div>
                )}

                {!loading && !error && promos.length === 0 && (
                    <div className="text-center py-16 bg-[#20223b]/40 border border-dashed border-gray-800 rounded-3xl max-w-2xl mx-auto">
                        <p className="text-primary3 text-sm">
                            No active promos right now. Check back soon for new offers!
                        </p>
                    </div>
                )}

                {!loading && !error && promos.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {promos.map((promo) => (
                            <div
                                key={promo.id}
                                className="bg-[#20223b] rounded-3xl p-7 border border-gray-800 shadow-xl flex flex-col justify-between transition-all hover:border-primary2 hover:-translate-y-1"
                            >
                                <div>
                                    <div className="w-12 h-12 bg-primary2/10 rounded-2xl flex items-center justify-center mb-5">
                                        <FaTag className="text-primary2 text-lg" />
                                    </div>
                                    <h3 className="text-white font-bold text-xl mb-3">{promo.title}</h3>
                                    <p className="text-primary3 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {promo.desc}
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between text-primary3 text-xs mb-5 pt-4 border-t border-gray-800">
                                        <span className="flex items-center gap-2">
                                            <FaUsers className="text-primary2" /> {promo.participants ?? 0} joined
                                        </span>
                                        {promo.date && (
                                            <span className="flex items-center gap-2">
                                                <FaRegCalendarAlt className="text-primary2" /> {promo.date}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <button
                                        type="button"
                                        onClick={() => handleClaimClick(promo.title)}
                                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white bg-primary2 hover:bg-[#e07a3d] shadow-lg shadow-primary2/20 transition-all active:scale-95 cursor-pointer"
                                    >
                                        Claim Offer <FaArrowRight />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ==================== CUSTOM POP-UP MODAL TAMPILAN ==================== */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop Transparan Gelap */}
                    <div 
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                        onClick={() => setShowModal(false)}
                    />
                    
                    {/* Kotak Modal */}
                    <div className="bg-[#20223b] border border-gray-800 w-full max-w-md rounded-3xl p-6 text-center shadow-2xl relative z-10 transform scale-100 transition-all animate-in fade-in zoom-in-95 duration-200 font-dmsans">
                        
                        {/* Tombol Close Pojok Kanan Atas */}
                        <button 
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-primary3 hover:text-white transition-colors p-1 rounded-xl hover:bg-white/5"
                        >
                            <FaTimes className="text-lg" />
                        </button>

                        {/* Ikon Sukses */}
                        <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-green-500/20">
                            <FaCheckCircle className="text-3xl" />
                        </div>

                        {/* Judul & Deskripsi Sesi Pop-up */}
                        <h3 className="text-white font-black text-2xl mb-2">
                            Claim Successful!
                        </h3>
                        <p className="text-primary3 text-sm leading-relaxed px-2">
                            Congratulations! You have successfully claimed the promo: <br />
                            <span className="text-primary2 font-bold inline-block mt-1">"{claimedPromoTitle}"</span>
                        </p>

                        <div className="mt-6 pt-5 border-t border-gray-800/60">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="w-full py-3 bg-primary2 hover:bg-[#e07a3d] text-white font-bold text-sm rounded-2xl transition-all shadow-lg shadow-primary2/10 active:scale-98"
                            >
                                Awesome, Got It!
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* ===================================================================== */}
        </section>
    );
}

export default PromoSection;