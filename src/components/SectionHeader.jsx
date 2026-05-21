export const SectionHeader = ({ title, actionLabel, onAction }) => (
    <div className="flex justify-between items-center mb-8">
        <h3 className="text-white font-bold text-xl">{title}</h3>
        {actionLabel && (
            <button onClick={onAction} className="text-[#FF8A48] text-sm font-bold border border-[#FF8A48] px-4 py-1 rounded-lg hover:bg-[#FF8A48] hover:text-white transition">
                {actionLabel}
            </button>
        )}
    </div>
);