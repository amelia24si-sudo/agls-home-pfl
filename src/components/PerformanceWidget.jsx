import { FaChartLine } from "react-icons/fa";

export const PerformanceWidget = ({ percentage }) => (
    <div className="bg-[#FF8A48] rounded-[2.5rem] p-8 text-white shadow-xl shadow-orange-500/20">
        <FaChartLine size={32} className="mb-4" />
        <h3 className="text-2xl font-black mb-2">Campaign Performance</h3>
        <p className="text-orange-100 text-sm mb-6">Performing {percentage} better than last month.</p>
        <button className="w-full bg-white text-[#FF8A48] font-bold py-4 rounded-2xl">Download Report</button>
    </div>
);