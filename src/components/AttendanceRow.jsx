// Komponen Baris Tabel gaya "Sale by country"
export default function AttendanceRow({ name, time, status, activity }) {
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