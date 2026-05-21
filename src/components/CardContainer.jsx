export const CardContainer = ({ children, className = "" }) => (
    <div className={`bg-[#20223b] border border-gray-800 rounded-[2.5rem] p-8 shadow-xl ${className}`}>
        {children}
    </div>
);