import { useState, useEffect } from "react";
import { FaPlus, FaClock } from "react-icons/fa";
import { MdAccountBalanceWallet, MdPayments, MdInfo, MdEdit } from "react-icons/md";
import { PrimaryButton } from "../components/PrimaryButton";
import { StatCard } from "../components/StatCard";
import { CardContainer } from "../components/CardContainer";
import { paymentAPI } from "../service/paymentAPI";
import { memberAPI } from "../service/memberAPI";

export default function Payment() {
    const [payments, setPayments] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    // States untuk Modals
    const [viewPayment, setViewPayment] = useState(null);
    const [editPayment, setEditPayment] = useState(null);
    const [addPayment, setAddPayment] = useState(null);

    // Ambil data Transaksi dan Member secara paralel
    const getAllData = async () => {
        try {
            setLoading(true);
            const [transaksiData, memberData] = await Promise.all([
                paymentAPI.fetchPayments(),
                memberAPI.fetchMembers()
            ]);
            setPayments(transaksiData || []);
            setMembers(memberData || []);
        } catch (err) {
            console.error("Gagal memuat data payment:", err);
            alert("Gagal sinkronisasi data dengan database.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllData();
    }, []);

    // Helper Pemetaan Otomatis: Jenis Transaksi -> Nominal ENUM Supabase
    const getNominalByJenis = (jenis) => {
        switch (jenis) {
            case "Perpanjangan 1 Bulan": return 300000.00;
            case "Perpanjangan 3 Bulan": return 800000.00;
            case "Perpanjangan 6 Bulan": return 1500000.00;
            case "Perpanjangan 1 Tahun": return 2500000.00;
            default: return "";
        }
    };

    // Handler ketika Jenis Transaksi berubah pada Form Tambah
    const handleAddJenisChange = (jenisValue) => {
        const autoNominal = getNominalByJenis(jenisValue);
        setAddPayment({
            ...addPayment,
            jenis_transaksi: jenisValue,
            nominal: autoNominal
        });
    };

    // Handler ketika Jenis Transaksi berubah pada Form Edit
    const handleEditJenisChange = (jenisValue) => {
        const autoNominal = getNominalByJenis(jenisValue);
        setEditPayment({
            ...editPayment,
            jenis_transaksi: jenisValue,
            nominal: autoNominal
        });
    };

    // Helper untuk mencari nama lengkap member berdasarkan id_member
    const getMemberName = (id_member) => {
        const found = members.find(m => m.id_member === id_member);
        return found ? found.nama_lengkap : "Unknown Member";
    };

    // Handle Submit Tambah Transaksi
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            await paymentAPI.createPayment(addPayment);
            alert("Transaksi baru berhasil dicatat!");
            setAddPayment(null);
            getAllData();
        } catch (err) {
            console.error(err);
            alert("Gagal menambahkan data transaksi. Pastikan data sesuai aturan database.");
        }
    };

    // Handle Submit Edit Transaksi
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const { id_transaksi, ...payload } = editPayment;
            await paymentAPI.updatePayment(id_transaksi, payload);
            alert("Transaksi berhasil diperbarui!");
            setEditPayment(null);
            getAllData();
        } catch (err) {
            console.error(err);
            alert("Gagal memperbarui data transaksi.");
        }
    };

    // Kalkulasi Statistik Dinamis dari data_transaksi
    const totalIncome = payments.reduce((sum, p) => sum + (p.nominal ? Number(p.nominal) : 0), 0);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-white gap-3">
                <span className="animate-spin text-3xl text-[#FF8A48]">⏳</span>
                <p className="text-gray-400 text-sm">Memuat data transaksi finansial...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-2 font-dmsans">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white tracking-tight">Payment Records</h2>
                <PrimaryButton
                    icon={<FaPlus />}
                    onClick={() => setAddPayment({
                        id_transaksi: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
                        id_member: "",
                        tgl_transaksi: new Date().toISOString().split("T")[0],
                        jenis_transaksi: "",
                        nominal: ""
                    })}
                >
                    Add Payment
                </PrimaryButton>
            </div>

            {/* Stat Cards Dinamis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    label="Total Revenue" amount={`Rp ${totalIncome.toLocaleString("id-ID")}`} percentage="Live"
                    icon={<MdAccountBalanceWallet size={20} />} iconBg="bg-[#1cc0a0]/20"
                />
                <StatCard
                    label="Transactions Count" amount={`${payments.length} Trx`} percentage="Total"
                    icon={<MdPayments size={20} />} iconBg="bg-cyan-500/20"
                />
                <StatCard
                    label="Latest Activity" amount={payments[0]?.tgl_transaksi || "-"} percentage="Newest"
                    icon={<FaClock size={16} />} iconBg="bg-[#f2c94c]/20"
                />
            </div>

            {/* Main Table Container */}
            <CardContainer className="p-8">
                <h3 className="text-white font-bold text-xl mb-6 font-dmsans">Invoice History</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead>
                            <tr className="text-gray-500 text-xs uppercase tracking-widest border-b border-gray-800">
                                <th className="pb-4 font-semibold">ID Transaksi</th>
                                <th className="pb-4 font-semibold">Nama Member / ID</th>
                                <th className="pb-4 font-semibold">Tanggal</th>
                                <th className="pb-4 font-semibold">Jenis Pembayaran</th>
                                <th className="pb-4 font-semibold text-right">Nominal</th>
                                <th className="pb-4 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            {payments.map((pay) => (
                                <tr key={pay.id_transaksi} className="group hover:bg-white/5 transition-colors text-sm">
                                    <td className="py-5 font-mono font-bold text-primary2">{pay.id_transaksi}</td>
                                    <td>
                                        <div className="text-white font-semibold">{getMemberName(pay.id_member)}</div>
                                        <div className="text-xs text-gray-500">{pay.id_member}</div>
                                    </td>
                                    <td className="text-gray-300">{pay.tgl_transaksi}</td>
                                    <td>
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-800 text-gray-300">
                                            {pay.jenis_transaksi}
                                        </span>
                                    </td>
                                    <td className="text-right font-bold text-green-400">
                                        Rp {Number(pay.nominal || 0).toLocaleString("id-ID")}
                                    </td>
                                    <td className="text-center">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => setViewPayment(pay)} className="p-2 text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-500 rounded-xl transition-all" title="View Detail">
                                                <MdInfo size={16} />
                                            </button>
                                            <button onClick={() => setEditPayment(pay)} className="p-2 text-yellow-400 hover:text-white bg-yellow-500/10 hover:bg-yellow-500 rounded-xl transition-all" title="Edit Data">
                                                <MdEdit size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {payments.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="py-10 text-center text-gray-500 text-sm">
                                        Belum ada data transaksi tercatat.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContainer>

            {/* MODAL 1: VIEW DETAIL */}
            {viewPayment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-[#1a1c33] border border-gray-800 rounded-2xl p-6 text-white shadow-2xl space-y-4">
                        <h4 className="text-xl font-bold border-b border-gray-800 pb-2 text-primary2">Transaction Invoice Detail</h4>
                        <div className="space-y-2 text-sm">
                            <p className="flex justify-between"><span className="text-gray-400">ID Transaksi:</span> <span className="font-mono">{viewPayment.id_transaksi}</span></p>
                            <p className="flex justify-between"><span className="text-gray-400">Nama Member:</span> <span className="font-bold">{getMemberName(viewPayment.id_member)}</span></p>
                            <p className="flex justify-between"><span className="text-gray-400">ID Member:</span> <span>{viewPayment.id_member}</span></p>
                            <p className="flex justify-between"><span className="text-gray-400">Tanggal:</span> <span>{viewPayment.tgl_transaksi}</span></p>
                            <p className="flex justify-between"><span className="text-gray-400">Jenis Transaksi:</span> <span>{viewPayment.jenis_transaksi}</span></p>
                            <div className="h-[1px] bg-gray-800 my-2"></div>
                            <p className="flex justify-between text-base font-bold"><span className="text-gray-400">Total Nominal:</span> <span className="text-green-400">Rp {Number(viewPayment.nominal).toLocaleString("id-ID")}</span></p>
                        </div>
                        <button onClick={() => setViewPayment(null)} className="w-full bg-gray-800 py-2 rounded-xl font-bold mt-2">Close</button>
                    </div>
                </div>
            )}

            {/* MODAL 2: ADD PAYMENT */}
            {addPayment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <form onSubmit={handleAddSubmit} className="w-full max-w-md bg-[#1a1c33] border border-gray-800 rounded-2xl p-6 text-white shadow-2xl space-y-4">
                        <h4 className="text-xl font-bold border-b border-gray-800 pb-2">Record New Payment</h4>
                        <div className="space-y-3 text-sm">
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">PILIH MEMBER</label>
                                <select
                                    value={addPayment.id_member}
                                    onChange={(e) => setAddPayment({ ...addPayment, id_member: e.target.value })}
                                    className="w-full bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-white outline-none" required
                                >
                                    <option value="">-- Pilih Member --</option>
                                    {members.filter(m => m.role === "member").map(m => (
                                        <option key={m.id_member} value={m.id_member}>{m.nama_lengkap} ({m.id_member})</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">JENIS TRANSAKSI</label>
                                <select
                                    value={addPayment.jenis_transaksi}
                                    onChange={(e) => handleAddJenisChange(e.target.value)}
                                    className="w-full bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-white outline-none"
                                    required
                                >
                                    <option value="">-- Pilih Jenis Transaksi --</option>
                                    <option value="Perpanjangan 1 Bulan">Perpanjangan 1 Bulan</option>
                                    <option value="Perpanjangan 3 Bulan">Perpanjangan 3 Bulan</option>
                                    <option value="Perpanjangan 6 Bulan">Perpanjangan 6 Bulan</option>
                                    <option value="Perpanjangan 1 Tahun">Perpanjangan 1 Tahun</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">NOMINAL (RP) - OTOMATIS</label>
                                <input 
                                    type="text" 
                                    value={addPayment.nominal ? `Rp ${Number(addPayment.nominal).toLocaleString("id-ID")}` : ""} 
                                    className="w-full bg-[#20223b]/50 text-green-400 font-bold border border-gray-800 px-3 py-2 rounded-xl outline-none cursor-not-allowed" 
                                    disabled 
                                    placeholder="Akan terisi otomatis setelah memilih paket"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">TANGGAL TRANSAKSI</label>
                                <input type="date" value={addPayment.tgl_transaksi} onChange={(e) => setAddPayment({ ...addPayment, tgl_transaksi: e.target.value })} className="w-full bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-white outline-none" required />
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button type="button" onClick={() => setAddPayment(null)} className="flex-1 bg-gray-800 py-2 rounded-xl font-bold">Batal</button>
                            <button type="submit" className="flex-1 bg-green-600 hover:bg-green-500 py-2 rounded-xl font-bold">Simpan</button>
                        </div>
                    </form>
                </div>
            )}

            {/* MODAL 3: EDIT PAYMENT */}
            {editPayment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <form onSubmit={handleEditSubmit} className="w-full max-w-md bg-[#1a1c33] border border-gray-800 rounded-2xl p-6 text-white shadow-2xl space-y-4">
                        <h4 className="text-xl font-bold border-b border-gray-800 pb-2">Edit Payment: <span className="text-primary2">{editPayment.id_transaksi}</span></h4>
                        <div className="space-y-3 text-sm">
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">MEMBER (TIDAK DAPAT DIUBAH)</label>
                                <input type="text" value={getMemberName(editPayment.id_member)} className="w-full bg-[#20223b]/50 border border-gray-800 px-3 py-2 rounded-xl text-gray-400 outline-none" disabled />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">JENIS TRANSAKSI</label>
                                <select
                                    value={editPayment.jenis_transaksi || ""}
                                    onChange={(e) => handleEditJenisChange(e.target.value)}
                                    className="w-full bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-white outline-none"
                                    required
                                >
                                    <option value="">-- Pilih Jenis Transaksi --</option>
                                    <option value="Perpanjangan 1 Bulan">Perpanjangan 1 Bulan</option>
                                    <option value="Perpanjangan 3 Bulan">Perpanjangan 3 Bulan</option>
                                    <option value="Perpanjangan 6 Bulan">Perpanjangan 6 Bulan</option>
                                    <option value="Perpanjangan 1 Tahun">Perpanjangan 1 Tahun</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">NOMINAL (RP) - SINKRON</label>
                                <input 
                                    type="text" 
                                    value={editPayment.nominal ? `Rp ${Number(editPayment.nominal).toLocaleString("id-ID")}` : ""} 
                                    className="w-full bg-[#20223b]/50 text-green-400 font-bold border border-gray-800 px-3 py-2 rounded-xl outline-none cursor-not-allowed" 
                                    disabled 
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">TANGGAL TRANSAKSI</label>
                                <input type="date" value={editPayment.tgl_transaksi || ""} onChange={(e) => setEditPayment({ ...editPayment, tgl_transaksi: e.target.value })} className="w-full bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-white outline-none" required />
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button type="button" onClick={() => setEditPayment(null)} className="flex-1 bg-gray-800 py-2 rounded-xl font-bold">Batal</button>
                            <button type="submit" className="flex-1 bg-primary2 hover:bg-[#e07a3d] py-2 rounded-xl font-bold">Simpan</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}