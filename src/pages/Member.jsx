import { MdPeople, MdPersonAdd, MdTrendingUp } from "react-icons/md";

export default function Member() {
    return (
        <div className="space-y-8 p-2 font-dmsans">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white tracking-tight">Member Directory</h2>
                <button className="bg-[#FF8A48] hover:bg-[#e07a3d] text-white font-bold py-3 px-8 rounded-2xl flex items-center gap-2 shadow-lg transition-all active:scale-95">
                    <MdPersonAdd className="text-xl" /> Add Member
                </button>
            </div>

            {/* Top Stats - Mengikuti gaya Dashboard.jpg */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Total Members" value="890" growth="+12%" iconBg="bg-[#FF8A48]/20" iconColor="text-[#FF8A48]" />
                <StatCard label="Active Plans" value="764" growth="+5%" iconBg="bg-cyan-500/20" iconColor="text-cyan-400" />
                <StatCard label="New This Week" value="42" growth="+18%" iconBg="bg-purple-500/20" iconColor="text-purple-400" />
            </div>

            {/* Member Table - Mengikuti gaya data tables.png */}
            <div className="bg-[#20223b] rounded-3xl p-8 border border-gray-800 shadow-xl">
                <h3 className="text-white font-bold text-xl mb-6">Member Records</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500 text-xs uppercase tracking-[0.2em] border-b border-gray-800">
                                <th className="pb-4 font-semibold">User Name</th>
                                <th className="pb-4 font-semibold">ID</th>
                                <th className="pb-4 font-semibold">Status</th>
                                <th className="pb-4 font-semibold">Joining Date</th>
                                <th className="pb-4 font-semibold text-right">Phone</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            <MemberRow name="Roselle Ehrman" email="roselle@gmail.com" id="EL40025" status="Active" date="15 Dec, 2021" phone="(44) 123 12654" />
                            <MemberRow name="Jone Smith" email="jone@gmail.com" id="EL40022" status="Active" date="15 Aug, 2021" phone="(55) 854 13424" />
                            <MemberRow name="Leatrice Kulik" email="kulik@gmail.com" id="EL40021" status="Inactive" date="5 June, 2020" phone="(61) 123 12654" />
                        </tbody>
                    </table>
                </div>
                {/* Pagination gaya data tables.png */}
                <div className="flex justify-between items-center mt-8 text-gray-500 text-sm">
                    <p>Showing 3 of 890 users</p>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-lg border border-gray-800 flex items-center justify-center bg-[#FF8A48] text-white">1</button>
                        <button className="w-8 h-8 rounded-lg border border-gray-800 flex items-center justify-center hover:bg-white/5">2</button>
                        <button className="px-3 h-8 rounded-lg border border-gray-800 flex items-center justify-center hover:bg-white/5 uppercase text-[10px] font-bold tracking-widest">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, growth, iconBg, iconColor }) {
    return (
        <div className="bg-[#20223b] p-6 rounded-[24px] border border-gray-800 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
                <div className={`${iconBg} p-4 rounded-2xl`}>
                    <MdPeople className={`${iconColor} text-2xl`} />
                </div>
                <div>
                    <p className="text-gray-400 text-sm font-medium">{label}</p>
                    <h4 className="text-white text-2xl font-bold">{value}</h4>
                </div>
            </div>
            <div className="flex items-center text-xs font-bold text-[#FF8A48]">
                <MdTrendingUp className="mr-1" /> {growth}
            </div>
        </div>
    );
}

function MemberRow({ name, email, id, status, date, phone }) {
    return (
        <tr className="group hover:bg-white/5 transition-colors">
            <td className="py-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border border-gray-600"></div>
                    <div>
                        <p className="text-white font-bold text-sm leading-tight">{name}</p>
                        <p className="text-gray-500 text-xs">{email}</p>
                    </div>
                </div>
            </td>
            <td className="text-gray-400 text-sm">{id}</td>
            <td>
                <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {status}
                </span>
            </td>
            <td className="text-gray-400 text-sm">{date}</td>
            <td className="text-gray-400 text-sm text-right font-medium">{phone}</td>
        </tr>
    );
}