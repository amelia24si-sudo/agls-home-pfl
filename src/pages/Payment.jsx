export default function Payment() {
    return (
        <div className="p-4">
            <div className="mb-3">
                <p className="text-gray-600 text-lg">Welcome,</p>
                <h1 className="text-4xl font-extrabold text-[#2B3242]">Amelia Golisa</h1>
            </div>

            <h2 className="text-3xl font-bold text-[#2B3242] mb-6">Payment</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#D9D9D9] h-[550px] rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[#2B3242] font-bold text-xl">Member Payment</h3>
                </div>
                <div className="bg-[#D9D9D9] h-[550px] rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[#2B3242] font-bold text-xl">Member Payment</h3>
                </div>
            </div>
        </div>
    );
}