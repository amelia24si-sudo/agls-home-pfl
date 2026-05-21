import { FaTag } from "react-icons/fa";

export const PromoHero = ({ title, desc, children }) => (
    <CardContainer className="relative overflow-hidden p-10">
        <div className="absolute top-0 right-0 p-10 opacity-5"><FaTag size={120} /></div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">{title}</h1>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl">{desc}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-gray-800">
            {children}
        </div>
    </CardContainer>
);