import { FaDumbbell, FaRunning, FaLock, FaWifi } from "react-icons/fa";

const features = [
    {
        icon: FaDumbbell,
        title: "Gym Floor",
        desc: "A fully equipped strength zone with free weights, racks, and machines for every level.",
    },
    {
        icon: FaRunning,
        title: "Cardio Area",
        desc: "Modern treadmills, bikes, and rowers to power up your endurance and burn calories.",
    },
    {
        icon: FaLock,
        title: "Locker Room",
        desc: "Clean, secure lockers and shower facilities so you can train and refresh with ease.",
    },
    {
        icon: FaWifi,
        title: "Free Wi-Fi",
        desc: "Stay connected throughout the club with fast, complimentary high-speed internet.",
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="max-w-7xl mx-auto px-6 py-20 md:py-24">
            <div className="text-center mb-14">
                <span className="text-primary2 text-xs font-bold uppercase tracking-widest">
                    Our Facilities
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white mt-3">
                    Everything You Need to Train
                </h2>
                <p className="text-primary3 text-sm mt-4 max-w-2xl mx-auto">
                    Premium amenities designed to make every workout effective, comfortable, and motivating.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={feature.title}
                            className="bg-[#20223b] rounded-3xl p-7 border border-gray-800 shadow-xl transition-all hover:border-primary2 hover:-translate-y-1"
                        >
                            <div className="w-14 h-14 bg-primary2/10 rounded-2xl flex items-center justify-center mb-6">
                                <Icon className="text-primary2 text-2xl" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                            <p className="text-primary3 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
