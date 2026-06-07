import { MdStar } from "react-icons/md";
import { CardContainer } from "../components/CardContainer";
import { PerformanceWidget } from "../components/PerformanceWidget";
import { FeedbackItem } from "../components/FeedbackItem"; 

export default function Feedback() {
    // Data dummy untuk feedback dengan URL foto avatar asli dari Unsplash
    const feedbacks = [
        {
            id: 1,
            name: "Aiden Max",
            date: "2 Hours Ago",
            rating: 5,
            message: "Fasilitas gym sangat lengkap dan instruktur yoga-nya sangat sabar mengajar pemula seperti saya. Sangat direkomendasikan!",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80" // Foto Laki-laki (Aiden)
        },
        {
            id: 2,
            name: "Roselle Ehrman",
            date: "Yesterday",
            rating: 4,
            message: "Tempatnya bersih dan nyaman. Hanya saja musik di area cardio terkadang terlalu keras, tapi secara keseluruhan luar biasa.",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80" // Foto Perempuan (Roselle)
        },
        {
            id: 3,
            name: "Marcus Go",
            date: "2 Days Ago",
            rating: 5,
            message: "Aplikasi booking kelasnya sangat membantu. Tidak perlu antre lagi dan jadwalnya selalu update.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" // Foto Laki-laki (Marcus)
        }
    ];

    return (
        <div className="space-y-8 p-2 font-dmsans text-white">
            <h2 className="text-3xl font-bold tracking-tight">Member Feedbacks</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- LEFT SECTION: RECENT MESSAGES --- */}
                <CardContainer className="lg:col-span-2 min-h-[600px] flex flex-col">
                    <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                        <h3 className="font-bold text-xl">Recent Messages</h3>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(i => (
                                <MdStar key={i} className="text-[#FF8A48] text-lg" />
                            ))}
                        </div>
                    </div>

                    {/* Container Loop List Feedback */}
                    <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                        {feedbacks.map((item) => (
                            <FeedbackItem 
                                key={item.id}
                                name={item.name}
                                date={item.date}
                                rating={item.rating}
                                message={item.message}
                                avatar={item.avatar}
                            />
                        ))}
                    </div>

                    <button className="mt-auto w-full py-4 text-gray-500 hover:text-[#FF8A48] text-sm font-bold transition-colors border-t border-gray-800 uppercase tracking-widest">
                        View All Feedbacks
                    </button>
                </CardContainer>

                {/* --- RIGHT SECTION: STATS --- */}
                <div className="space-y-6">
                    <CardContainer className="text-center py-10">
                        <h4 className="text-gray-500 text-xs font-bold uppercase mb-4 tracking-widest">Satisfaction</h4>
                        <div className="text-5xl font-black text-white mb-2">78%</div>
                        <p className="text-[#1cc0a0] text-sm font-bold bg-[#1cc0a0]/10 inline-block px-3 py-1 rounded-full">
                            +12.4% last month
                        </p>
                    </CardContainer>
                    
                    <PerformanceWidget percentage="12.4%" />
                </div>
            </div>
        </div>
    );
}