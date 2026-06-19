import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { MdEmail, MdLock, MdPersonAdd } from "react-icons/md";
import { memberAPI } from "../../service/memberAPI"; // Pastikan path folder sudah benar

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // 1. Validasi konfirmasi password
        if (dataForm.password !== dataForm.confirmPassword) {
            setError("Password dan Konfirmasi Password tidak cocok!");
            setLoading(false);
            return;
        }

        // 2. Buat nama_lengkap sementara dari bagian depan email
        const usernameFallback = dataForm.email.split("@")[0];

        // 3. Susun data objek persis dengan struktur skema tabel data_member di Supabase
        const newMemberData = {
            id_member: `M-${Math.floor(1000 + Math.random() * 9000)}`,
            nama_lengkap: usernameFallback,
            email_address: dataForm.email.trim(),
            password: dataForm.password,
            role: "member",
            status_member: "Aktif",
            tgl_gabung: new Date().toISOString().split("T")[0],

            // ========== TAMBAHKAN BARIS INI ==========
            // Menghasilkan 6 digit angka acak (String), misal: "382910"
            pin_akses: Math.floor(100000 + Math.random() * 900000).toString(),
            // =========================================
        };

        try {
            // 4. Jalankan pengiriman data ke REST API Supabase
            await memberAPI.createMember(newMemberData);

            // Jika berhasil masuk, langsung arahkan ke halaman login
            navigate("/login");
        } catch (err) {
            // Debugging: memunculkan objek error asli dari Supabase di tab F12 Console
            console.error("Supabase Insert Error Detail:", err.response?.data);

            // Ambil rincian pesan error teks dari server Supabase
            const dbErrorMessage = err.response?.data?.message || err.response?.data?.details;

            if (dbErrorMessage?.includes("unique") || err.response?.status === 409) {
                setError("Email ini sudah terdaftar! Gunakan email lain.");
            } else {
                setError(dbErrorMessage || "Gagal terhubung ke database Supabase.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-dmsans">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">
                Join the Tribe
            </h2>
            <p className="text-center text-primary3 text-sm mb-4">Start your fitness journey with us</p>

            {/* Kotak Pesan Error */}
            {error && (
                <div className="flex items-center p-4 mb-6 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl">
                    <BsFillExclamationDiamondFill className="text-lg me-2 flex-shrink-0" />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-2 text-xs font-bold text-primary3 uppercase tracking-widest">
                        Email Address
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={dataForm.email}
                            onChange={handleChange}
                            className="w-full px-5 py-3 bg-[#20223b] border border-gray-800 rounded-2xl text-white placeholder-gray-600 focus:ring-1 focus:ring-primary2 focus:border-primary2 outline-none transition-all pl-12"
                            placeholder="you@example.com"
                            required
                        />
                        <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary3 text-xl" />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 text-xs font-bold text-primary3 uppercase tracking-widest">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            value={dataForm.password}
                            onChange={handleChange}
                            className="w-full px-5 py-3 bg-[#20223b] border border-gray-800 rounded-2xl text-white placeholder-gray-600 focus:ring-1 focus:ring-primary2 focus:border-primary2 outline-none transition-all pl-12"
                            placeholder="********"
                            required
                        />
                        <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary3 text-xl" />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 text-xs font-bold text-primary3 uppercase tracking-widest">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            type="password"
                            name="confirmPassword"
                            value={dataForm.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-5 py-3 bg-[#20223b] border border-gray-800 rounded-2xl text-white placeholder-gray-600 focus:ring-1 focus:ring-primary2 focus:border-primary2 outline-none transition-all pl-12"
                            placeholder="********"
                            required
                        />
                        <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary3 text-xl" />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 bg-primary2 hover:bg-[#e07a3d] text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg shadow-primary2/20 transition duration-300 disabled:opacity-70"
                >
                    {loading ? (
                        <ImSpinner2 className="animate-spin text-xl" />
                    ) : (
                        <>
                            <MdPersonAdd className="text-xl" /> Register Account
                        </>
                    )}
                </button>
            </form>

            <p className="mt-4 text-center text-sm text-primary3">
                Already a member?{" "}
                <Link to="/login" className="text-primary2 font-bold hover:underline">Login Here</Link>
            </p>
        </div>
    );
}