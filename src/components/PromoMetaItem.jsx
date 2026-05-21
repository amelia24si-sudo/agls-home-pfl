export const PromoMetaItem = ({ icon, label, value, colorClass }) => (
    <div className="flex items-center gap-5">
        <div className={`w-14 h-14 ${colorClass} rounded-2xl flex items-center justify-center`}>{icon}</div>
        <div>
            <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest">{label}</p>
            <p className="text-white font-bold text-xl">{value}</p>
        </div>
    </div>
);