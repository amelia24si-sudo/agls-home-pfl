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
                    <label htmlFor="email" className="block mb-2 text-sm font-montserrat text-gray-300">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email address"
                       className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg shadow-inner outline-none focus:ring-2 focus:ring-[#FF8E29] transition-all placeholder-gray-400 font-dmsans"
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
                       className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg shadow-inner outline-none focus:ring-2 focus:ring-[#FF8E29] transition-all placeholder-gray-400 font-dmsans"
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
                        className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg shadow-inner outline-none focus:ring-2 focus:ring-[#FF8E29] transition-all placeholder-gray-400 font-dmsans"
                        placeholder="Confirm Password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-3 font-bold text-white transition-colors duration-300 bg-[#FF8E29] hover:bg-[#e67e22] rounded-lg shadow-lg flex items-center justify-center font-dmsans"
                >
                    Registers
                </button>
            </form>

            {/* Link Login */}
            <div className="mt-6 text-center">
                <span className="text-sm text-gray-400">Already have an account? </span>
                <Link to="/login" className="text-sm text-[#FF8E29] hover:text-white transition-colors">
                    Login here
                </Link>
            </div>
        </div>
    );
}