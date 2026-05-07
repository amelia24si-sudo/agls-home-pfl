import { Link } from "react-router-dom";
import { FaGhost, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center font-dmsans">
      <div className="relative mb-10">
        <FaGhost className="text-9xl text-[#D9D9D9] animate-bounce" />
        <h1 className="text-9xl font-black text-[#2B3242] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-90 font-dmsans">
          404
        </h1>
      </div>
      
      <h2 className="text-4xl font-bold text-[#2B3242] mb-4">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-500 max-w-md mb-8 text-lg">
        Maaf, sepertinya halaman yang Anda cari telah dipindahkan atau tidak pernah ada di server kami.
      </p>

      <Link 
        to="/" 
        className="flex items-center gap-2 bg-[#FF8E29] hover:bg-[#2B3242] text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg group font-dmsans"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
export function BadRequest() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center font-dmsans">
      <div className="animate-pulse">
        <MdSyncProblem className="text-9xl text-red-600 mb-4" />
      </div>
      
      <h2 className="text-4xl font-bold text-[#2B3242] mb-2">Server Sedang Down</h2>
      <p className="text-gray-500 max-w-md mb-8 text-lg">
        Terjadi kesalahan internal pada server kami. Tim teknis sedang memperbaikinya. Coba segarkan halaman dalam beberapa saat.
      </p>

      <button 
        onClick={() => window.location.reload()}
        className="bg-[#FF8E29] hover:bg-[#e67e22] text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all font-dmsans"
      >
        Coba Segarkan Halaman
      </button>
    </div>
  );
}

export default function Unauthorized() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center font-dmsans">
      <div className="bg-[#2B3242]/10 p-8 rounded-full mb-6">
        <FaLock className="text-7xl text-[#2B3242]" />
      </div>
      
      <h2 className="text-4xl font-bold text-[#2B3242] mb-4">Akses Ditolak</h2>
      <p className="text-gray-500 max-w-md mb-8 text-lg">
        Sesi Anda mungkin telah berakhir atau Anda belum masuk. Silakan login kembali untuk mengakses halaman ini.
      </p>

      <Link 
        to="/login" 
        className="bg-[#2B3242] hover:bg-[#FF8E29] text-white font-bold py-3 px-10 rounded-xl transition-all duration-300 shadow-md font-dmsans"
      >
        Login Sekarang
      </Link>
    </div>
  );
}
export default function Forbidden() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center font-dmsans">
      <MdOutlineSecurityUpdateWarning className="text-9xl text-[#FF8E29] mb-4" />
      
      <h2 className="text-4xl font-bold text-[#2B3242] mb-4">Area Terlarang</h2>
      <p className="text-gray-500 max-w-sm mb-8 text-lg">
        Anda tidak memiliki izin akses untuk melihat halaman ini. Silakan hubungi Super Admin jika ini adalah kesalahan.
      </p>

      <Link 
        to="/" 
        className="border-2 border-[#2B3242] text-[#2B3242] hover:bg-[#2B3242] hover:text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 font-dmsans"
      >
        Balik Kanan, Bubar Jalan!
      </Link>
    </div>
  );
}