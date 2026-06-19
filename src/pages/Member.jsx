import { useState, useEffect } from "react";
import { 
    MdPersonAdd, 
    MdPeople, 
    MdInfo, 
    MdEdit, 
    MdDelete, 
    MdOutlineContactPhone,
    MdVpnKey,
    MdSearch
} from "react-icons/md";
import { PrimaryButton } from "../components/PrimaryButton";
import { StatCard } from "../components/StatCard";
import { CardContainer } from "../components/CardContainer";
import { Badge } from "../components/Badge";
import { memberAPI } from "../service/memberAPI";

export default function Member() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMember, setSelectedMember] = useState(null); // Detail Modal
    const [editMember, setEditMember] = useState(null); // Edit Modal
    
    // State Baru: Input Query Pencarian
    const [searchQuery, setSearchQuery] = useState("");

    // State untuk menampung data Modal Tambah Member
    const [addMember, setAddMember] = useState(null); 

    // Ambil Data dari API Supabase
    const getMembersData = async () => {
        try {
            setLoading(true);
            const data = await memberAPI.fetchMembers();
            setMembers(data || []);
        } catch (err) {
            console.error("Gagal mengambil data member:", err);
            alert("Gagal memuat data dari database.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMembersData();
    }, []);

    // 1. FILTER PERTAMA: Ambil yang bertipe role "member" saja
    const memberOnlyList = members.filter(m => m.role?.toLowerCase() === "member");

    // 2. FILTER KEDUA: Terapkan Query Search (Berdasarkan Nama atau ID Member)
    const filteredMembers = memberOnlyList.filter((m) => {
        const query = searchQuery.toLowerCase();
        const matchNama = m.nama_lengkap?.toLowerCase().includes(query);
        const matchID = m.id_member?.toLowerCase().includes(query);
        return matchNama || matchID;
    });

    // Fungsi Tambah Member Baru (CREATE)
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            await memberAPI.createMember(addMember);
            alert("Member baru berhasil ditambahkan!");
            setAddMember(null); // Tutup modal tambah
            getMembersData(); // Refresh list tabel
        } catch (err) {
            console.error("Gagal menambah member:", err);
            alert("Gagal menambahkan data ke Supabase.");
        }
    };

    // Fungsi Hapus Member (DELETE)
    const handleDelete = async (id_member, nama) => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus member "${nama}" (${id_member})?`)) {
            try {
                await memberAPI.deleteMember(id_member);
                alert("Member berhasil dihapus!");
                getMembersData();
            } catch (err) {
                console.error("Gagal menghapus member:", err);
                alert("Gagal menghapus data dari Supabase.");
            }
        }
    };

    // Fungsi Simpan Perubahan (UPDATE/PATCH)
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const { id_member, ...updatePayload } = editMember;
            await memberAPI.updateMember(id_member, updatePayload);
            alert("Data member berhasil diperbarui!");
            setEditMember(null);
            getMembersData();
        } catch (err) {
            console.error("Gagal memperbarui data member:", err);
            alert("Gagal menyimpan perubahan ke Supabase.");
        }
    };

    // Fungsi Auto-Generate PIN 6 Digit
    const generateRandomPin = (target, setTargetState) => {
        const randomPin = Math.floor(100000 + Math.random() * 900000).toString();
        setTargetState({ ...target, pin_akses: randomPin });
    };

    // Kalkulasi Statistik Otomatis tetap dari basis data "memberOnlyList" (sebelum diketik search)
    const totalMembers = memberOnlyList.length;
    const activeMembers = memberOnlyList.filter(m => m.status_member === "Aktif").length;
    const totalTransactions = memberOnlyList.reduce((sum, m) => sum + (Number(m.frekuensi_transaksi) || 0), 0);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-white gap-3">
                <span className="animate-spin text-3xl text-primary2">⏳</span>
                <p className="text-gray-400 text-sm">Menghubungkan ke Supabase REST API...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-2 font-dmsans">
            {/* Top Bar Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white tracking-tight">Member Directory</h2>
                <PrimaryButton 
                    icon={<MdPersonAdd />} 
                    onClick={() => setAddMember({
                        id_member: `M-${Math.floor(1000 + Math.random() * 9000)}`,
                        nama_lengkap: "",
                        email_address: "",
                        password: "Password123", 
                        jenis_kelamin: "",
                        tgl_lahir: "",
                        no_hp: "",
                        alamat: "",
                        tgl_gabung: new Date().toISOString().split("T")[0],
                        tgl_berakhir: "",
                        status_member: "Aktif",
                        pin_akses: Math.floor(100000 + Math.random() * 900000).toString(), 
                        catatan_medis: "",
                        nama_kontak_darurat: "",
                        kontak_darurat: "",
                        frekuensi_transaksi: 0,
                        total_nominal_transaksi: 0,
                        role: "member" 
                    })}
                >
                    Add Member
                </PrimaryButton>
            </div>

            {/* Live Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Total Members" amount={totalMembers.toString()} percentage="Live" icon={<MdPeople />} iconBg="bg-[#FF8A48]/20" />
                <StatCard label="Active Status" amount={activeMembers.toString()} percentage="Members" icon={<MdPeople />} iconBg="bg-cyan-500/20" />
                <StatCard label="Total Transactions" amount={totalTransactions.toString()} percentage="Times" icon={<MdPeople />} iconBg="bg-purple-500/20" />
            </div>

            {/* Main Member Records Table Container */}
            <CardContainer className="p-8">
                {/* Header Table + Input Search Field */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                    <h3 className="text-white font-bold text-xl">Member Records</h3>
                    
                    {/* INPUT SEARCH BAR */}
                    <div className="relative w-full sm:w-72">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 text-lg">
                            <MdSearch />
                        </span>
                        <input
                            type="text"
                            placeholder="Search name or ID member..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#151728] text-white placeholder-gray-500 border border-gray-800 focus:border-[#FF8A48] pl-10 pr-4 py-2 rounded-xl text-sm outline-none transition-colors"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead>
                            <tr className="text-gray-500 text-xs uppercase tracking-widest border-b border-gray-800">
                                <th className="pb-4 font-semibold">ID & Name</th>
                                <th className="pb-4 font-semibold">Contact & Email</th>
                                <th className="pb-4 font-semibold">Membership Period</th>
                                <th className="pb-4 font-semibold">Status</th>
                                <th className="pb-4 font-semibold">PIN Access</th>
                                <th className="pb-4 font-semibold text-right">Transactions</th>
                                <th className="pb-4 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            {filteredMembers.map((member) => (
                                <tr key={member.id_member} className="group hover:bg-white/5 transition-colors">
                                    <td className="py-5">
                                        <div className="text-white font-bold text-sm">{member.nama_lengkap}</div>
                                        <div className="text-xs text-primary3">
                                            {member.id_member} • ({member.jenis_kelamin === "L" ? "Laki-laki" : member.jenis_kelamin === "P" ? "Perempuan" : "-"})
                                        </div>
                                    </td>
                                    <td className="text-sm">
                                        <div className="text-gray-300">{member.no_hp || "-"}</div>
                                        <div className="text-xs text-gray-500">{member.email_address || "-"}</div>
                                    </td>
                                    <td className="text-sm">
                                        <div className="text-gray-400 text-xs">Start: {member.tgl_gabung || "-"}</div>
                                        <div className="text-red-400 text-xs">End: {member.tgl_berakhir || "-"}</div>
                                    </td>
                                    <td>
                                        <Badge label={member.status_member || "Tidak Aktif"} type={member.status_member === "Aktif" ? "Active" : "Inactive"} />
                                    </td>
                                    <td className="text-gray-400 font-mono text-sm tracking-widest">
                                        {member.pin_akses || "------"}
                                    </td>
                                    <td className="text-right text-sm">
                                        <div className="text-white font-semibold">{member.frekuensi_transaksi || 0}x</div>
                                        <div className="text-xs text-green-400">
                                            Rp {Number(member.total_nominal_transaksi || 0).toLocaleString("id-ID")}
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => setSelectedMember(member)} className="p-2 text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-500 rounded-xl transition-all" title="View Details">
                                                <MdInfo />
                                            </button>
                                            <button onClick={() => setEditMember(member)} className="p-2 text-yellow-400 hover:text-white bg-yellow-500/10 hover:bg-yellow-500 rounded-xl transition-all" title="Edit Member">
                                                <MdEdit />
                                            </button>
                                            <button onClick={() => handleDelete(member.id_member, member.nama_lengkap)} className="p-2 text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500 rounded-xl transition-all" title="Delete Member">
                                                <MdDelete />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            
                            {/* State Jika Data Hasil Filter Kosong */}
                            {filteredMembers.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="py-10 text-center text-gray-500 text-sm">
                                        Tidak ditemukan member dengan nama atau ID "{searchQuery}".
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContainer>

            {/* MODAL 1: VIEW FULL DETAILS */}
            {selectedMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="w-full max-w-lg bg-[#1a1c33] border border-gray-800 rounded-2xl p-6 text-white shadow-2xl space-y-5">
                        <div className="flex justify-between items-start border-b border-gray-800 pb-3">
                            <div>
                                <h4 className="text-xl font-bold text-white">{selectedMember.nama_lengkap}</h4>
                                <p className="text-xs text-primary3">ID: {selectedMember.id_member} • Lahir: {selectedMember.tgl_lahir || "-"}</p>
                            </div>
                            <button onClick={() => setSelectedMember(null)} className="text-gray-400 hover:text-white font-bold text-lg">✕</button>
                        </div>
                        <div className="space-y-4 text-sm max-h-[60vh] overflow-y-auto">
                            <div>
                                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Alamat Lengkap</span>
                                <p className="text-gray-300 bg-[#20223b] p-3 rounded-xl border border-gray-800/50 mt-1">{selectedMember.alamat || "-"}</p>
                            </div>
                            <div>
                                <span className="text-xs text-red-400 font-bold uppercase tracking-wider">Catatan Medis</span>
                                <p className="text-red-200 bg-red-500/5 p-3 rounded-xl border border-red-500/10 mt-1 font-medium">{selectedMember.catatan_medis || "Tidak ada riwayat medis khusus."}</p>
                            </div>
                            <div className="bg-[#20223b] border border-gray-800 p-4 rounded-xl space-y-2">
                                <span className="text-xs font-bold uppercase text-amber-400 tracking-wider flex items-center gap-1">
                                    <MdOutlineContactPhone /> Kontak Darurat
                                </span>
                                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                                    <div>
                                        <div className="text-gray-500">Nama Kontak</div>
                                        <div className="text-white font-bold text-sm mt-0.5">{selectedMember.nama_kontak_darurat || "-"}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500">No. HP Darurat</div>
                                        <div className="text-white font-bold text-sm mt-0.5">{selectedMember.kontak_darurat || "-"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setSelectedMember(null)} className="w-full bg-gray-800 hover:bg-gray-700 py-2.5 rounded-xl font-bold transition-all text-sm">Tutup Detail</button>
                    </div>
                </div>
            )}

            {/* MODAL 2: ADD NEW MEMBER FORM */}
            {addMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <form onSubmit={handleAddSubmit} className="w-full max-w-2xl bg-[#1a1c33] border border-gray-800 rounded-2xl p-6 text-white shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                            <h4 className="text-xl font-bold">Add New Member Record</h4>
                            <button type="button" onClick={() => setAddMember(null)} className="text-gray-400 hover:text-white">✕</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase">Nama Lengkap</label>
                                <input type="text" value={addMember.nama_lengkap} onChange={(e) => setAddMember({...addMember, nama_lengkap: e.target.value})} className="w-full bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-sm focus:border-primary2 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase">Email Address</label>
                                <input type="email" value={addMember.email_address} onChange={(e) => setAddMember({...addMember, email_address: e.target.value})} className="w-full bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-sm focus:border-primary2 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase">No. Handphone</label>
                                <input type="text" value={addMember.no_hp} onChange={(e) => setAddMember({...addMember, no_hp: e.target.value})} className="w-full bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-sm focus:border-primary2 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase">Jenis Kelamin</label>
                                <select value={addMember.jenis_kelamin} onChange={(e) => setAddMember({...addMember, jenis_kelamin: e.target.value})} className="w-full bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-sm text-white focus:border-primary2 outline-none" required>
                                    <option value="">Pilih</option>
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase">Tanggal Lahir</label>
                                <input type="date" value={addMember.tgl_lahir} onChange={(e) => setAddMember({...addMember, tgl_lahir: e.target.value})} className="w-full bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-sm focus:border-primary2 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase">Tanggal Berakhir Kontrak</label>
                                <input type="date" value={addMember.tgl_berakhir} onChange={(e) => setAddMember({...addMember, tgl_berakhir: e.target.value})} className="w-full bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-sm focus:border-primary2 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase">PIN Akses Pintu</label>
                                <div className="flex gap-2">
                                    <input type="text" maxLength="6" value={addMember.pin_akses} onChange={(e) => setAddMember({...addMember, pin_akses: e.target.value})} className="flex-1 bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-sm font-mono tracking-widest text-center" required />
                                    <button type="button" onClick={() => generateRandomPin(addMember, setAddMember)} className="px-3 bg-primary2/10 hover:bg-primary2 text-primary2 hover:text-white border border-primary2/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1">
                                        <MdVpnKey /> Reset
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase">Catatan Medis</label>
                                <input type="text" value={addMember.catatan_medis} onChange={(e) => setAddMember({...addMember, catatan_medis: e.target.value})} className="w-full bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-sm" placeholder="Opsional (Asma, Alergi)" />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase">Nama Kontak Darurat</label>
                                <input type="text" value={addMember.nama_kontak_darurat} onChange={(e) => setAddMember({...addMember, nama_kontak_darurat: e.target.value})} className="w-full bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-sm" required />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase">No HP Darurat</label>
                                <input type="text" value={addMember.kontak_darurat} onChange={(e) => setAddMember({...addMember, kontak_darurat: e.target.value})} className="w-full bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-sm" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase">Alamat Rumah</label>
                            <textarea rows="2" value={addMember.alamat} onChange={(e) => setAddMember({...addMember, alamat: e.target.value})} className="w-full bg-[#20223b] border border-gray-800 p-3 rounded-xl text-sm resize-none" required />
                        </div>
                        <div className="flex gap-3 pt-4 border-t border-gray-800">
                            <button type="button" onClick={() => setAddMember(null)} className="flex-1 bg-gray-800 py-2.5 rounded-xl text-sm font-bold">Batal</button>
                            <button type="submit" className="flex-1 bg-green-600 hover:bg-green-500 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all">Submit & Simpan</button>
                        </div>
                    </form>
                </div>
            )}

            {/* MODAL 3: EDIT MEMBER FORM */}
            {editMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <form onSubmit={handleUpdateSubmit} className="w-full max-w-2xl bg-[#1a1c33] border border-gray-800 rounded-2xl p-6 text-white shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                            <h4 className="text-xl font-bold">Edit Member Record: <span className="text-primary2">{editMember.id_member}</span></h4>
                            <button type="button" onClick={() => setEditMember(null)} className="text-gray-400 hover:text-white">✕</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase">Nama Lengkap</label>
                                <input type="text" value={editMember.nama_lengkap || ""} onChange={(e) => setEditMember({...editMember, nama_lengkap: e.target.value})} className="w-full bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-sm" required />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase">Email Address</label>
                                <input type="email" value={editMember.email_address || ""} onChange={(e) => setEditMember({...editMember, email_address: e.target.value})} className="w-full bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-sm" required />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase">No. Handphone</label>
                                <input type="text" value={editMember.no_hp || ""} onChange={(e) => setEditMember({...editMember, no_hp: e.target.value})} className="w-full bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase">Status Keanggotaan</label>
                                <select value={editMember.status_member || "Aktif"} onChange={(e) => setEditMember({...editMember, status_member: e.target.value})} className="w-full bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-sm text-white">
                                    <option value="Aktif">Aktif</option>
                                    <option value="Tidak Aktif">Tidak Aktif</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase">PIN Akses Pintu</label>
                                <div className="flex gap-2">
                                    <input type="text" maxLength="6" value={editMember.pin_akses || ""} onChange={(e) => setEditMember({...editMember, pin_akses: e.target.value})} className="flex-1 bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-sm font-mono tracking-widest text-center" />
                                    <button type="button" onClick={() => generateRandomPin(editMember, setEditMember)} className="px-3 bg-primary2/10 hover:bg-primary2 text-primary2 hover:text-white border border-primary2/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1">
                                        <MdVpnKey /> Generate
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1 font-semibold uppercase">Catatan Medis</label>
                                <input type="text" value={editMember.catatan_medis || ""} onChange={(e) => setEditMember({...editMember, catatan_medis: e.target.value})} className="w-full bg-[#20223b] border border-gray-800 px-3 py-2 rounded-xl text-sm" />
                            </div>
                        </div>
                        <div className="flex gap-3 pt-4 border-t border-gray-800">
                            <button type="button" onClick={() => setEditMember(null)} className="flex-1 bg-gray-800 py-2.5 rounded-xl text-sm font-bold">Batal</button>
                            <button type="submit" className="flex-1 bg-primary2 hover:bg-[#e07a3d] py-2.5 rounded-xl text-sm font-bold text-white">Simpan Perubahan</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}