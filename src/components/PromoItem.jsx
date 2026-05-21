import { MdLocalOffer } from "react-icons/md";

export default function PromoItem({ title, usage, trend, iconBg, iconColor }) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center ${iconColor}`}>
                    <MdLocalOffer size={18} />
                </div>
                <div>
                    <p className="text-white font-bold text-sm leading-none mb-1 group-hover:text-[#FF8A48] transition-colors">{title}</p>
                    <p className="text-gray-500 text-[10px] font-medium uppercase tracking-tighter">{usage}</p>
                </div>
            </div>
            <span className={`text-xs font-bold ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {trend}
            </span>
        </div>
    );
}