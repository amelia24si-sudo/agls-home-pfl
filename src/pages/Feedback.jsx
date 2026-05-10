import { MdOutlineFeedback, MdStar } from "react-icons/md";

export default function Feedback() {
    return (
        <div className="space-y-8 p-2 font-dmsans text-white">
            <h2 className="text-3xl font-bold tracking-tight">Member Feedbacks</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Feedback List - Adaptasi gaya Data Table records */}
                <div className="lg:col-span-2 bg-[#20223b] rounded-3xl p-8 border border-gray-800 shadow-xl min-h-[600px]">
                    <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                        <h3 className="font-bold text-xl">Recent Messages</h3>
                        <div className="flex gap-1">
                            {[1,2,3,4,5].map(i => <MdStar key={i} className="text-[#FF8A48] text-lg" />)}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <FeedbackItem 
                            name="Andriana" 
                            email="andriana@gmail.com" 
                            msg="The yoga class was amazing! The instructor is very professional and patient." 
                            time="Today, 04:30 PM" 
                        />
                        <FeedbackItem 
                            name="Roselle Ehrman" 
                            email="roselle@gmail.com" 
                            msg="Need more cardio equipment in the second floor area. It gets too crowded at 6 PM." 
                            time="Yesterday" 
                        />
                        <FeedbackItem 
                            name="Darron Handler" 
                            email="darron@gmail.com" 
                            msg="Cleanliness in the locker room has improved. Great job team!" 
                            time="2 days ago" 
                        />
                    </div>
                </div>

                {/* Sidebar Summary - Adaptasi gaya Earning/Growth cards */}
                <div className="space-y-6">
                    <div className="bg-[#20223b] p-8 rounded-3xl border border-gray-800 text-center shadow-xl">
                        <h4 className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">Overall Satisfaction</h4>
                        <div className="relative inline-flex items-center justify-center mb-4">
                             {/* Gaya progress circle dari Growth Dashboard */}
                            <div className="text-4xl font-bold text-white">78%</div>
                        </div>
                        <p className="text-[#FF8A48] text-sm font-bold">+12.4% <span className="text-gray-500 font-normal">than last month</span></p>
                    </div>

                    <div className="bg-gradient-to-br from-[#FF8A48] to-[#e07a3d] p-8 rounded-3xl shadow-xl shadow-orange-500/20">
                        <h4 className="text-white font-bold text-lg mb-2">Feedback Summary</h4>
                        <p className="text-white/80 text-sm leading-relaxed">You have 12 unread feedbacks today. Keep responding to maintain member satisfaction.</p>
                        <button className="mt-6 w-full bg-white text-[#FF8A48] font-bold py-3 rounded-2xl hover:bg-white/90 transition">Review All</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeedbackItem({ name, email, msg, time }) {
    return (
        <div className="group bg-[#1c1e33]/50 p-6 rounded-2xl border border-gray-800/50 hover:border-[#FF8A48]/50 transition-all">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 border border-gray-600"></div>
                    <div>
                        <p className="font-bold text-sm">{name}</p>
                        <p className="text-gray-500 text-[10px] font-medium tracking-wider uppercase">{email}</p>
                    </div>
                </div>
                <span className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">{time}</span>
            </div>
            <p className="text-gray-400 text-sm italic leading-relaxed">"{msg}"</p>
            <div className="mt-4 flex gap-4 text-[10px] font-bold uppercase tracking-widest text-[#FF8A48] cursor-pointer">
                <span className="hover:underline">Reply</span>
                <span className="text-gray-700">|</span>
                <span className="text-gray-600 hover:text-red-400">Archive</span>
            </div>
        </div>
    );
}