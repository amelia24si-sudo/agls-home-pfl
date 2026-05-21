import { FaCheckCircle } from "react-icons/fa";

export const TermsList = ({ terms }) => (
    <CardContainer className="p-8">
        <h3 className="text-white font-bold text-xl mb-6">Terms & Conditions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {terms.map((t, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                    <FaCheckCircle className="text-green-500" /> {t}
                </div>
            ))}
        </div>
    </CardContainer>
);