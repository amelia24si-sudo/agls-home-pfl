import { MdPeople, MdPersonAdd } from "react-icons/md";

export default function Member() {
    
    // Fungsi untuk menangani aksi klik tombol Add Member
    const handleAddMember = () => {
        // TODO: Masukkan logika aksi Anda di sini
        // Contoh: Membuka modal form tambah member atau navigasi ke halaman form
        console.log("Tombol Add Member ditekan!");
    };

    return (
        <div className="p-4">
            
            {/* Welcome Text */}
            <div className="mb-3">
                <p className="text-gray-600 text-lg">Welcome,</p>
                <h1 className="text-4xl font-extrabold text-[#2B3242]">Amelia Golisa</h1>
            </div>

            {/* Title & Add Member Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-[#2B3242]">Member</h2>
                <button 
                    onClick={handleAddMember} 
                    className="bg-[#2B3242] hover:bg-[#1a1e28] text-[#FCA311] font-semibold py-2 px-5 rounded-xl flex items-center gap-2 shadow-md transition duration-200 cursor-pointer"
                >
                    <MdPersonAdd className="text-xl" />
                    Add member
                </button>
            </div>

            {/* Grid Member */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-[#D9D9D9] h-[400px] rounded-3xl p-8 shadow-sm">
                    <h3 className="text-[#2B3242] font-bold text-xl">Active Member</h3>
                </div>
                <div className="bg-[#D9D9D9] h-[400px] rounded-3xl p-8 shadow-sm">
                    <h3 className="text-[#2B3242] font-bold text-xl">Inactive Member</h3>
                </div>
            </div>

            {/* Bottom Stats Row */}
            <div className="flex justify-end gap-6">
                <StatCard label="This Month" value="10" />
                <StatCard label="This Week" value="10" />
                <StatCard label="This Year" value="10" />
            </div>
        </div>
    );
}

// Sub-komponen StatCard
function StatCard({ label, value }) {
    return (
        <div className="bg-[#2B3242] w-44 h-48 rounded-2xl flex flex-col justify-center items-center p-4 shadow-md">
            <MdPeople className="text-[#FCA311] text-5xl mb-2" />
            <span className="text-[#FCA311] text-2xl font-bold">{value}</span>
            <span className="text-[#FCA311] font-medium mt-1">{label}</span>
        </div>
    );
}