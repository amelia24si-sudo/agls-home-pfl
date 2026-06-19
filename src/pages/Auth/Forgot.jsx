import { useState } from "react";
import { Link } from "react-router-dom";
import { MdEmail, MdArrowBack } from "react-icons/md";
import { BsFillExclamationDiamondFill, BsCheckCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { memberAPI } from "../../service/memberAPI"; // Import memberAPI

export default function Forgot() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            // 1. Ambil semua data member untuk pengecekan
            const members = await memberAPI.fetchMembers();

            // 2. Cari apakah email yang diinput ada di database (kolom email_address)
            const isEmailExist = members.some(
                (member) => member.email_address === email
            );

            if (isEmailExist) {
                // Email ditemukan! 
                setSuccess(true);
                setEmail(""); // Reset form input
            } else {
                // Email tidak ditemukan
                setError("Email Address tidak terdaftar di database kami.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Gagal terhubung ke server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-dmsans">
            {/* Header Text */}
            <h2 className="text-2xl font-bold text-white mb-2 text-center">
                Forgot Your Password?
            </h2>
            
            <p className="text-sm text-primary3 mb-8 text-center leading-relaxed">
                Enter your email address and we'll send you a link to reset your 
                access to the Zeus Gym panel.
            </p>

            {/* Error Message */}
            {error && (
                <div className="flex items-center p-4 mb-6 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl">
                    <BsFillExclamationDiamondFill className="text-lg me-2 flex-shrink-0" />
                    {error}
                </div>
            )}

            {/* Success Message */}
            {success && (
                <div className="flex items-center p-4 mb-6 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-2xl">
                    <BsCheckCircleFill className="text-lg me-2 flex-shrink-0" />
                    Link reset password telah dikirim ke email Anda! (Simulasi)
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label
                        htmlFor="email"
                        className="block text-xs font-bold text-primary3 mb-2 uppercase tracking-widest"
                    >
                        Email Address
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-5 py-3 bg-[#20223b] border border-gray-800 rounded-2xl text-white 
                                     placeholder-gray-600 focus:ring-1 focus:ring-primary2 focus:border-primary2 
                                     outline-none transition-all pl-12"
                            placeholder="you@zeusgym.com"
                            required
                        />
                        <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary3 text-xl" />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center bg-primary2 hover:bg-[#e07a3d] text-white font-bold py-3 px-4 
                             rounded-2xl shadow-lg shadow-primary2/20 transition-all duration-300 
                             active:scale-[0.98] mb-6 disabled:opacity-70"
                >
                    {loading ? <ImSpinner2 className="animate-spin text-xl" /> : "Send Reset Link"}
                </button>

                {/* Back to Login */}
                <Link 
                    to="/login" 
                    className="flex items-center justify-center gap-2 text-primary3 hover:text-white 
                             transition-colors text-sm font-semibold group"
                >
                    <MdArrowBack className="group-hover:-translate-x-1 transition-transform" />
                    Back to Login
                </Link>
            </form>
        </div>
    );
}