import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";

// Komponen Card Promo Aktif (Adaptasi dari All projects.png)
export function PromoCard({ id, title, desc, participants, date }) {
    return (
        <Link to={`/promo/${id}`} className="group">
            <div className="bg-[#20223b] rounded-3xl p-6 border border-gray-800 shadow-xl flex flex-col justify-between min-h-[250px] transition-all hover:border-[#FF8A48]">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-[#FF8A48]/10 rounded-2xl flex items-center justify-center">
                            <div className="w-6 h-6 bg-[#FF8A48] rounded-lg shadow-[0_0_10px_rgba(255,138,72,0.5)]"></div>
                        </div>
                        <button className="text-gray-500 hover:text-white"><FaEllipsisV /></button>
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2 group-hover:text-[#FF8A48] transition-colors">{title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">{desc}</p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                    <div>
                        <p className="text-white font-bold text-lg leading-none">{participants}</p>
                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Participants</p>
                    </div>
                    <div className="text-right">
                        <p className="text-white font-bold text-lg leading-none">{date}</p>
                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Due Date</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}