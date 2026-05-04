export default function Promo() {
    return (
        <div className="p-4">
            <div className="mb-3">
                <p className="text-gray-600 text-lg">Welcome,</p>
                <h1 className="text-4xl font-extrabold text-[#2B3242]">Amelia Golisa</h1>
            </div>

            <h2 className="text-3xl font-bold text-[#2B3242] mb-6">Promo</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Promo List - Kolom Kiri Besar */}
                <div className="md:col-span-2 bg-[#D9D9D9] h-[550px] rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[#2B3242] font-bold text-xl">Promo List</h3>
                </div>

                {/* Used Promo - Kolom Kanan Kotak-kotak Kecil */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-[#2B3242] font-bold text-xl">Used Promo</h3>
                    <div className="bg-[#D9D9D9] h-24 rounded-2xl shadow-sm"></div>
                    <div className="bg-[#D9D9D9] h-24 rounded-2xl shadow-sm"></div>
                    <div className="bg-[#D9D9D9] h-24 rounded-2xl shadow-sm"></div>
                    <div className="bg-[#D9D9D9] h-24 rounded-2xl shadow-sm"></div>
                </div>
            </div>
        </div>
    );
}