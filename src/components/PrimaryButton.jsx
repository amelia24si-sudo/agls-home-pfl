export const PrimaryButton = ({ children, onClick, icon, className = "" }) => (
    <button onClick={onClick} className={`bg-[#FF8A48] hover:bg-[#e07a3d] text-white font-bold py-3 px-8 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all active:scale-95 ${className}`}>
        {icon} {children}
    </button>
);