import React from "react";
import { Link } from "react-router-dom";
import { FaGhost, FaLock, FaUserSecret, FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#151728] text-center font-dmsans">
      <div className="relative mb-6">
        <h1 className="text-[150px] font-black text-white/5 leading-none select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <FaGhost className="text-primary2 text-8xl animate-bounce" />
        </div>
      </div>
      <div className="max-w-md relative z-10">
        <h2 className="text-4xl font-bold text-white mb-4">Waduh! Halaman Hilang</h2>
        <p className="text-primary3 mb-8 leading-relaxed">
          Maaf, halaman yang kamu cari tidak dapat ditemukan. Mungkin sudah dipindahkan ke locker room lain.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary2 hover:bg-[#e07a3d] text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-primary2/20 transition-all duration-300 transform hover:scale-105"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}

export function BadRequest() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#151728] text-center font-dmsans">
      <div className="mb-6">
        <FaExclamationTriangle className="text-primary2 text-9xl opacity-20" />
      </div>
      <div className="max-w-md">
        <h1 className="text-6xl font-black text-white mb-2">400</h1>
        <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest">Permintaan Bermasalah</h2>
        <p className="text-primary3 mb-8 leading-relaxed">
          Server tidak mengerti apa yang kamu minta. Coba periksa kembali form atau koneksimu.
        </p>
        <Link to="/" className="inline-block border-2 border-primary2 text-primary2 hover:bg-primary2 hover:text-white font-bold py-3 px-8 rounded-2xl transition-all">
          Coba Lagi
        </Link>
      </div>
    </div>
  );
}

export function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#151728] text-center font-dmsans">
      <div className="bg-[#1c1e33] p-12 rounded-[40px] border border-gray-800 shadow-2xl">
        <FaLock className="text-primary2 text-7xl mx-auto mb-6" />
        <h1 className="text-5xl font-black text-white mb-2">401</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Siapa Kamu?</h2>
        <p className="text-primary3 mb-8">Halaman ini eksklusif. Kamu harus masuk terlebih dahulu.</p>
        <Link to="/login" className="block bg-primary2 text-white font-bold py-4 px-8 rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-primary2/20">
          Login Sekarang
        </Link>
      </div>
    </div>
  );
}

export function Forbidden() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#151728] text-center font-dmsans">
      <div className="relative">
        <FaUserSecret className="text-[200px] text-white/5 absolute -top-24 left-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <h1 className="text-9xl font-black text-primary2 mb-4 drop-shadow-2xl">403</h1>
          <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-tighter">Akses Ditolak!</h2>
          <p className="text-primary3 max-w-sm mx-auto mb-10">
            Kamu tidak memiliki izin untuk mengakses area ini. Silakan balik kanan!
          </p>
          <Link to="/" className="inline-flex items-center gap-2 text-white font-bold hover:text-primary2 transition-colors">
            <span>←</span> Balik ke Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}