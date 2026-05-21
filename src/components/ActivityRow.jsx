export const ActivityRow = ({ label, desc, amount, type }) => {
    const color = type === 'income' ? 'text-[#1cc0a0]' : type === 'expense' ? 'text-[#eb5757]' : 'text-gray-500';
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center font-bold text-sm ${color}`}>
                    {type === 'income' ? '↑' : '↓'}
                </div>
                <div>
                    <p className="text-white text-sm font-bold">{label}</p>
                    <p className="text-gray-500 text-xs">{desc}</p>
                </div>
            </div>
            <p className={`text-sm font-bold ${color}`}>{amount}</p>
        </div>
    );
};