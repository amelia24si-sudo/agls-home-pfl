export const IconButton = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="flex items-center gap-3 text-gray-400 hover:text-white transition-all group">
        <div className="p-2 bg-gray-800 rounded-xl group-hover:bg-[#FF8A48] transition-colors text-white">
            {icon}
        </div>
        <span className="font-bold">{label}</span>
    </button>
);