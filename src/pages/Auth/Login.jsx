import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { FaDumbbell } from "react-icons/fa";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        axios.post("https://dummyjson.com/user/login", {
            username: dataForm.email,
            password: dataForm.password,
        })
        .then((response) => {
            if (response.status !== 200) {
                setError(response.data.message);
                return;
            }
            navigate("/");
        })
        .catch((err) => {
            if (err.response) {
                setError(err.response.data.message || "An error occurred");
            } else {
                setError(err.message || "An unknown error occurred");
            }
        })
        .finally(() => {
            setLoading(false);
        });
    };

   return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Input Email */}
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg shadow-inner outline-none focus:ring-2 focus:ring-[#FFA000] transition-all placeholder-gray-400"
          placeholder="Email Address"
          required
        />
      </div>
      
      {/* Input Password */}
      <div className="mb-8">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg shadow-inner outline-none focus:ring-2 focus:ring-[#FFA000] transition-all placeholder-gray-400"
          placeholder="Password"
          required
        />
      </div>

      {/* Tombol Login */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-3 font-bold text-white transition-colors duration-300 bg-[#FFA000] hover:bg-[#e69000] rounded-lg shadow-lg flex items-center justify-center"
      >
        {loading ? <ImSpinner2 className="animate-spin me-2" /> : null}
        Login
      </button>

      {/* Link Lupa Password */}
      <div className="mt-6 text-center">
        <Link to="/forgot" className="text-sm text-gray-400 hover:text-white transition-colors">
          Forgot Password?
        </Link>
      </div>
    </form>
  );
}