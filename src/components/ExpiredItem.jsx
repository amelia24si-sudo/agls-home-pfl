import { FaTrash } from "react-icons/fa";

export function ExpiredItem({ title, date, users }) {
    return (
        <div className="flex items-center justify-between group cursor-default">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#1c1e33] border border-gray-700 rounded-xl flex items-center justify-center text-gray-600 group-hover:text-red-400 transition-colors">
                    <FaTrash size={12} />
                </div>
                <div>
                    <p className="text-white font-bold text-sm leading-none mb-1">{title}</p>
                    <p className="text-gray-500 text-xs font-medium italic">Expired {date}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-gray-400 text-sm font-bold">{users}</p>
                <p className="text-[9px] text-gray-600 uppercase font-bold">Redeemed</p>
            </div>
        </div>
    );
}