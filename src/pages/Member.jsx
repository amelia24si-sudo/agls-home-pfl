import { MdPeople } from "react-icons/md";

export default function Member() {
    return (
        <div className="p-4">
            <div className="mb-3">
                <p className="text-gray-600 text-lg">Welcome,</p>
                <h1 className="text-4xl font-extrabold text-[#2B3242]">Amelia Golisa</h1>
            </div>

            <h2 className="text-3xl font-bold text-[#2B3242] mb-6">Member</h2>

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

// Sub-komponen StatCard yang sama
function StatCard({ label, value }) {
    return (
        <div className="bg-[#2B3242] w-44 h-48 rounded-2xl flex flex-col justify-center items-center p-4 shadow-md">
            <MdPeople className="text-[#FCA311] text-5xl mb-2" />
            <span className="text-[#FCA311] text-2xl font-bold">{value}</span>
            <span className="text-[#FCA311] font-medium mt-1">{label}</span>
        </div>
    );
}