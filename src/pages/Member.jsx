import { MdPersonAdd, MdPeople, MdTrendingUp } from "react-icons/md";
import { PrimaryButton } from "../components/PrimaryButton";
import { StatCard } from "../components/StatCard";
import { CardContainer } from "../components/CardContainer";
import { Badge } from "../components/Badge";

export default function Member() {
    return (
        <div className="space-y-8 p-2 font-dmsans">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white tracking-tight">Member Directory</h2>
                <PrimaryButton icon={<MdPersonAdd />}>Add Member</PrimaryButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Total Members" amount="890" percentage="+12%" icon={<MdPeople />} iconBg="bg-[#FF8A48]/20" />
                <StatCard label="Active Plans" amount="764" percentage="+5%" icon={<MdPeople />} iconBg="bg-cyan-500/20" />
                <StatCard label="New This Week" amount="42" percentage="+18%" icon={<MdPeople />} iconBg="bg-purple-500/20" />
            </div>

            <CardContainer className="p-8">
                <h3 className="text-white font-bold text-xl mb-6">Member Records</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500 text-xs uppercase tracking-widest border-b border-gray-800">
                                <th className="pb-4 font-semibold">User Name</th>
                                <th className="pb-4 font-semibold">Status</th>
                                <th className="pb-4 font-semibold text-left">Phone</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            <tr className="group hover:bg-white/5 transition-colors">
                                <td className="py-5 text-white font-bold text-sm">Roselle Ehrman</td>
                                <td><Badge label="Active" type="Active" /></td>
                                <td className="text-gray-400 text-sm text-left">(44) 123 12654</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContainer>
        </div>
    );
}