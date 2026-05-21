import { MdStar } from "react-icons/md";

export function FeedbackItem({ name, date, rating, message, avatar }) {
    return (
        <div className="group p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 border-b border-gray-800 last:border-0">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    {/* Avatar Placeholder */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 border border-gray-600 overflow-hidden">
                        {avatar ? (
                            <img src={avatar} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-400">
                                {name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-white group-hover:text-[#FF8A48] transition-colors">
                            {name}
                        </h4>
                        <p className="text-gray-500 text-[10px] uppercase font-medium">{date}</p>
                    </div>
                </div>

                {/* Star Rating */}
                <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <MdStar 
                            key={i} 
                            className={`text-sm ${i < rating ? "text-[#FF8A48]" : "text-gray-700"}`} 
                        />
                    ))}
                </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed pl-[52px]">
                "{message}"
            </p>
        </div>
    );
}