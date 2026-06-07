import { MdStar } from "react-icons/md";
// Import komponen Avatar Shadcn UI yang sudah Anda buat
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; 

export function FeedbackItem({ name, date, rating, message, avatar }) {
    return (
        <div className="group p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 border-b border-gray-800 last:border-0">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    
                    {/* --- IMPLEMENTASI AVATAR SHADCN UI --- */}
                    <Avatar size="lg" className="border border-gray-700 bg-gradient-to-tr from-gray-700 to-gray-600">
                        {avatar ? (
                            <AvatarImage src={avatar} alt={name} />
                        ) : null}
                        <AvatarFallback className="text-xs font-bold text-gray-400 bg-transparent flex items-center justify-center size-full">
                            {name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    {/* ------------------------------------- */}

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