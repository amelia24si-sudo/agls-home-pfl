export const QuickActionMenu = () => (
    <CardContainer className="p-8">
        <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Quick Actions</h4>
        <div className="space-y-3">
            <button className="w-full bg-gray-800 text-white py-4 rounded-2xl font-bold">Pause Campaign</button>
            <button className="w-full border border-red-500/30 text-red-500 py-4 rounded-2xl font-bold">Delete Forever</button>
        </div>
    </CardContainer>
);