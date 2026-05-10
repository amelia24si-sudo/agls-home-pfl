import { MdPeople, MdTrendingUp } from "react-icons/md";

export default function Attendance() {
    return (
        <div className="space-y-8 p-2">
            {/* Header section dengan Profile Style */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white tracking-tight">Member Attendance</h2>
                <div className="flex items-center space-x-2 bg-[#20223b] px-4 py-2 rounded-xl border border-gray-800">
                    <span className="text-gray-400 text-sm">Monthly</span>
                    <span className="text-[#FF8A48]">▼</span>
                </div>
            </div>

            {/* Quick Stats Rows - Mengikuti gaya Top Cards di Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Today Users" value="2,000" growth="+ 8%" color="bg-cyan-500/20" iconColor="text-cyan-400" />
                <StatCard label="Active Now" value="154" growth="+ 12%" color="bg-[#FF8A48]/20" iconColor="text-[#FF8A48]" />
                <StatCard label="Total Monthly" value="35k" growth="+ 2%" color="bg-purple-500/20" iconColor="text-purple-400" />
            </div>

            {/* Main Content - Tabel Attendance mengikuti gaya "Sale by country" */}
            <div className="bg-[#20223b] rounded-3xl p-8 border border-gray-800 shadow-xl">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-white font-bold text-xl">Daily Check-in List</h3>
                    <button className="text-gray-400 hover:text-white">•••</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead>
                            <tr className="text-gray-500 text-sm uppercase tracking-wider">
                                <th className="pb-4 px-4 font-medium">Member</th>
                                <th className="pb-4 px-4 font-medium">Check-in Time</th>
                                <th className="pb-4 px-4 font-medium">Status</th>
                                <th className="pb-4 px-4 font-medium text-right">Activity</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300">
                            {/* Baris Tabel mengikuti gaya desain List di Image 1 */}
                            <AttendanceRow name="Aiden Max" time="08:45 AM" status="Active" activity="Weight Training" />
                            <AttendanceRow name="Sophia Jane" time="09:12 AM" status="Active" activity="Cardio" />
                            <AttendanceRow name="Marcus Go" time="10:05 AM" status="Done" activity="Yoga Class" />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// Komponen StatCard gaya Dashboard Header
function StatCard({ label, value, growth, color, iconColor }) {
    return (
        <div className="bg-[#20223b] p-6 rounded-3xl border border-gray-800 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className={`${color} p-4 rounded-2xl`}>
                    <MdPeople className={`${iconColor} text-2xl`} />
                </div>
                <div>
                    <p className="text-gray-400 text-sm font-medium">{label}</p>
                    <h4 className="text-white text-2xl font-bold">{value}</h4>
                </div>
            </div>
            <div className="flex items-center text-xs font-bold text-orange-400">
                <MdTrendingUp className="mr-1" />
                {growth}
            </div>
        </div>
    );
}

// Komponen Baris Tabel gaya "Sale by country"
function AttendanceRow({ name, time, status, activity }) {
    return (
        <tr className="group hover:bg-white/5 transition-colors">
            <td className="py-4 px-4 bg-[#1c1e33]/50 rounded-l-2xl border-y border-l border-gray-800/50">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                    <span className="font-semibold text-white">{name}</span>
                </div>
            </td>
            <td className="py-4 px-4 bg-[#1c1e33]/50 border-y border-gray-800/50">{time}</td>
            <td className="py-4 px-4 bg-[#1c1e33]/50 border-y border-gray-800/50">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>
                    {status}
                </span>
            </td>
            <td className="py-4 px-4 bg-[#1c1e33]/50 rounded-r-2xl border-y border-r border-gray-800/50 text-right font-medium">
                {activity}
            </td>
        </tr>
    );
}