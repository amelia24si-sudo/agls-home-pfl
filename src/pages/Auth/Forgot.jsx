import { Link } from "react-router-dom";
import { MdEmail, MdArrowBack } from "react-icons/md";

export default function Forgot() {
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

            <form onSubmit={(e) => e.preventDefault()}>
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
                            className="w-full px-5 py-3 bg-[#20223b] border border-gray-800 rounded-2xl text-white 
                                     placeholder-gray-600 focus:ring-1 focus:ring-primary2 focus:border-primary2 
                                     outline-none transition-all pl-12"
                            placeholder="you@zeusgym.com"
                        />
                        <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary3 text-xl" />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary2 hover:bg-[#e07a3d] text-white font-bold py-3 px-4 
                             rounded-2xl shadow-lg shadow-primary2/20 transition-all duration-300 
                             active:scale-[0.98] mb-6"
                >
                    Send Reset Link
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