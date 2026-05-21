import { MdPayments } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa";

export const InvoiceItem = ({ name, id, date, price }) => (
    <div className="flex items-center justify-between group">
        <div className="flex items-center gap-4">
            <div className="bg-[#151728] p-3 rounded-xl border border-gray-700 text-[#1cc0a0]"><MdPayments size={20} /></div>
            <div>
                <p className="text-white font-bold text-sm">{name}</p>
                <p className="text-gray-500 text-xs font-medium">{id}</p>
            </div>
        </div>
        <div className="text-right flex items-center gap-6">
            <div><p className="text-white text-sm font-bold">{price}</p></div>
            <button className="text-gray-500 hover:text-[#FF8A48] transition"><FaRegFilePdf /></button>
        </div>
    </div>
);