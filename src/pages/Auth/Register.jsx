import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { MdEmail, MdLock, MdPersonAdd, MdLogin } from "react-icons/md";
export default function Register() {
return (
        <div className="font-dmsans">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">
                Join the Tribe
            </h2>
            <p className="text-center text-primary3 text-sm mb-4">Start your fitness journey with us</p>

            <form className="space-y-5">
                <div>
                    <label className="block mb-2 text-xs font-bold text-primary3 uppercase tracking-widest">
                        Email Address
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            className="w-full px-5 py-3 bg-[#20223b] border border-gray-800 rounded-2xl text-white placeholder-gray-600 focus:ring-1 focus:ring-primary2 focus:border-primary2 outline-none transition-all pl-12"
                            placeholder="you@example.com"
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
                            className="w-full px-5 py-3 bg-[#20223b] border border-gray-800 rounded-2xl text-white placeholder-gray-600 focus:ring-1 focus:ring-primary2 focus:border-primary2 outline-none transition-all pl-12"
                            placeholder="********"
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
                            className="w-full px-5 py-3 bg-[#20223b] border border-gray-800 rounded-2xl text-white placeholder-gray-600 focus:ring-1 focus:ring-primary2 focus:border-primary2 outline-none transition-all pl-12"
                            placeholder="********"
                        />
                        <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary3 text-xl" />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 bg-primary2 hover:bg-[#e07a3d] text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg shadow-primary2/20 transition duration-300"
                >
                    <MdPersonAdd className="text-xl" /> Register Account
                </button>
            </form>

            <p className="mt-2 text-center text-sm text-primary3">
                Already a member?{" "}
                <Link to="/login" className="text-primary2 font-bold hover:underline">Login Here</Link>
            </p>
        </div>
    );
}
