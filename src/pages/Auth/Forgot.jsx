import { Link } from "react-router-dom";

export default function Forgot() {
    return (
        <div className="w-full">
            {/* Judul Halaman */}
            <h2 className="text-3xl font-extrabold text-white tracking-wide text-center mb-8">
                Forgot Password
            </h2>

            {/* Form */}
            <form>
                <div className="mb-8">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg shadow-inner outline-none focus:ring-2 focus:ring-[#FFA000] transition-all placeholder-gray-400"
                        placeholder="Email Address"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-3 font-bold text-white transition-colors duration-300 bg-[#FFA000] hover:bg-[#e69000] rounded-lg shadow-lg"
                >
                    Send Reset Link
                </button>
            </form>

            {/* Link Kembali */}
            <div className="mt-6 text-center">
                <Link to="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Back to Login
                </Link>
            </div>
        </div>
    );
}