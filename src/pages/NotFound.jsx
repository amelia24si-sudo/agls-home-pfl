import React from "react";
import { Link } from "react-router-dom"; // Pastikan menggunakan react-router untuk navigasi

export default function NotFound() {
  return (
    <div className=" flex flex-col items-center justify-center p-0 text-center">
      {/* Container Gambar/Ikon 404 */}
      <div className="relative mb-8">
        {/* Tali Penggantung */}
        <div className="w-1 h-16 bg-gray-800 mx-auto rounded-full"></div>
        
        {/* Papan 404 */}
        <div className="bg-white border-4 border-gray-800 px-12 py-6 rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,0.1)] relative transform -rotate-2">
           {/* Paku/Titik Putih */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full z-10"></div>
          
          <h1 className="text-8xl font-poppins font-bold text-gray-800 tracking-tighter">
            404
          </h1>
        </div>
      </div>

      {/* Teks Deskripsi */}
      <div className="max-w-md">
        <h2 className="text-3xl font-poppins text-gray-800 mb-4">
          Waduh! Halaman Hilang
        </h2>
        <p className="text-latar opacity-90 font-barlow leading-relaxed">
          Maaf, halaman yang kamu cari tidak dapat ditemukan atau telah dipindahkan ke dimensi lain.
        </p>

        {/* Tombol Kembali */}
        <Link
          to="/"
          className="inline-block bg-primary2 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-hijau transition-all duration-300 transform hover:scale-105"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}

export function BadRequest() {
  return (
    <div className="flex flex-col items-center justify-center p-0 text-center">
      <div className="relative mb-8">
        <div className="w-1 h-16 bg-gray-800 mx-auto rounded-full"></div>
        <div className="bg-white border-4 border-gray-800 px-12 py-6 rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,0.1)] relative transform rotate-2">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full z-10"></div>
          <h1 className="text-8xl font-poppins font-bold text-kuning tracking-tighter">
            400
          </h1>
        </div>
      </div>
      <div className="max-w-md">
        <h2 className="text-3xl font-poppins text-gray-800 mb-4">Permintaan Bermasalah</h2>
        <p className="text-teks-samping font-barlow mb-8 leading-relaxed">
          Ups! Server tidak mengerti apa yang kamu minta. Coba periksa kembali data atau koneksimu.
        </p>
        <Link to="/" className="inline-block bg-primary2 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:opacity-90 transition-all transform hover:scale-105">
          Coba Lagi
        </Link>
      </div>
    </div>
  );
}

export function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center p-0 text-center">
      <div className="relative mb-8">
        <div className="w-1 h-16 bg-gray-800 mx-auto rounded-full"></div>
        <div className="bg-white border-4 border-gray-800 px-12 py-6 rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,0.1)] relative transform -rotate-1">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full z-10"></div>
          <h1 className="text-8xl font-poppins font-bold text-biru tracking-tighter">
            401
          </h1>
        </div>
      </div>
      <div className="max-w-md">
        <h2 className="text-3xl font-poppins text-gray-800 mb-4">Siapa Kamu?</h2>
        <p className="text-teks-samping font-barlow mb-8 leading-relaxed">
          Halaman ini terkunci. Kamu harus masuk (login) terlebih dahulu untuk melihat konten ini.
        </p>
        <Link to="/login" className="inline-block bg-primary1 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:opacity-90 transition-all transform hover:scale-105">
          Login Sekarang
        </Link>
      </div>
    </div>
  );
}

export function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center p-0 text-center">
      <div className="relative mb-8">
        <div className="w-1 h-16 bg-gray-800 mx-auto rounded-full"></div>
        <div className="bg-white border-4 border-gray-800 px-12 py-6 rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,0.1)] relative transform rotate-3">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full z-10"></div>
          <h1 className="text-8xl font-poppins font-bold text-merah tracking-tighter">
            403
          </h1>
        </div>
      </div>
      <div className="max-w-md">
        <h2 className="text-3xl font-poppins text-gray-800 mb-4">Akses Ditolak!</h2>
        <p className="text-teks-samping font-barlow mb-8 leading-relaxed">
          Maaf, kamu tidak memiliki izin yang cukup untuk mengacak-ngacak halaman ini.
        </p>
        <Link to="/" className="inline-block bg-red text-white font-bold py-3 px-8 rounded-full shadow-lg hover:opacity-90 transition-all transform hover:scale-105">
          Balik Kanan
        </Link>
      </div>
    </div>
  );
}