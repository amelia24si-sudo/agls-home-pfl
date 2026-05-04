import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div className="w-full">
            {/* Judul Halaman */}
            <h2 className="text-3xl font-extrabold text-white tracking-wide text-center mb-8">
                Create Account
            </h2>

            {/* Form */}
            <form>
                <div className="mb-5">
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

                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg shadow-inner outline-none focus:ring-2 focus:ring-[#FFA000] transition-all placeholder-gray-400"
                        placeholder="Password"
                        required
                    />
                </div>

                <div className="mb-8">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-300">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg shadow-inner outline-none focus:ring-2 focus:ring-[#FFA000] transition-all placeholder-gray-400"
                        placeholder="Confirm Password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-3 font-bold text-white transition-colors duration-300 bg-[#FFA000] hover:bg-[#e69000] rounded-lg shadow-lg"
                >
                    Registers
                </button>
            </form>

            {/* Link Login */}
            <div className="mt-6 text-center">
                <span className="text-sm text-gray-400">Already have an account? </span>
                <Link to="/login" className="text-sm text-[#FFA000] hover:text-white transition-colors">
                    Login here
                </Link>
            </div>
        </div>
    );
}