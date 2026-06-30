import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { MdEmail, MdLock, MdLogin } from "react-icons/md";
import { memberAPI } from "../../service/memberAPI";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    const emailInputRef = useRef(null);

    useEffect(() => {
        if (emailInputRef.current) {
            emailInputRef.current.focus();
        }
    }, []);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // 1. Ambil data member dari Supabase
            const members = await memberAPI.fetchMembers();

            // 2. Cocokkan input form dengan struktur tabel Supabase Anda
            // Perhatikan: Menggunakan member.email_address sesuai dengan skema SQL Anda
            const userValid = members.find(
                (member) =>
                    member.email_address?.trim().toLowerCase() === dataForm.email?.trim().toLowerCase() &&
                    member.password?.trim() === dataForm.password?.trim()
            );

            if (userValid) {
                // Simpan data login ke localStorage agar bisa diakses di halaman lain
                localStorage.setItem("userLoggedIn", JSON.stringify(userValid));

                // Opsional: Cek role jika Anda ingin membedakan halaman redirect
                if (userValid.role === "admin" || userValid.role === "super admin") {
                    navigate("/dashboard"); // Arahkan ke dashboard admin
                }
            } else {
                setError("Email atau Password salah!");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Gagal terhubung ke server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-dmsans">
            <h2 className="mb-2 text-2xl font-bold text-center text-white">
                Welcome Back
            </h2>
            <p className="text-center text-primary3 text-sm mb-8">Enter your credentials to access Zeus Gym</p>

            {/* Error Message */}
            {error && (
                <div className="flex items-center p-4 mb-6 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl">
                    <BsFillExclamationDiamondFill className="text-lg me-2 flex-shrink-0" />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-2 text-xs font-bold text-primary3 uppercase tracking-widest">
                        Username / Email
                    </label>
                    <div className="relative">
                        <input
                            ref={emailInputRef}
                            type="text"
                            name="email"
                            onChange={handleChange}
                            className="w-full px-5 py-3 bg-[#20223b] border border-gray-800 rounded-2xl text-white placeholder-gray-600 focus:ring-1 focus:ring-primary2 focus:border-primary2 outline-none transition-all pl-12"
                            placeholder="nama@email.com"
                            required
                        />
                        <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary3 text-xl" />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-xs font-bold text-primary3 uppercase tracking-widest">Password</label>
                        <Link to="/forgot" className="text-xs font-bold text-primary2 hover:underline">Forgot?</Link>
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            name="password"
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
                    className="w-full flex justify-center items-center gap-2 px-4 py-3.5 font-bold text-white transition duration-300 bg-primary2 hover:bg-[#e07a3d] rounded-2xl shadow-lg shadow-primary2/20 disabled:opacity-70"
                >
                    {loading ? <ImSpinner2 className="animate-spin text-xl" /> : <><MdLogin className="text-xl" /> Login</>}
                </button>
            </form>

            <p className="mt-8 text-center text-sm text-primary3">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary2 font-bold hover:underline">Register Now</Link>
            </p>
        </div>
    );
}