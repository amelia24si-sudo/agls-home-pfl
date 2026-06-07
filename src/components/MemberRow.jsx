import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MemberRow({ name, email, status, avatar }) {
    return (
        <tr className="group hover:bg-white/5 transition-colors">
            <td className="py-4">
                <div className="flex items-center gap-3">
                    
                    {/* --- IMPLEMENTASI AVATAR SHADCN UI --- */}
                    <Avatar size="sm" className="border border-gray-600 bg-gray-700">
                        {avatar ? (
                            <AvatarImage src={avatar} alt={name} />
                        ) : null}
                        <AvatarFallback className="text-xs font-bold text-gray-400 bg-transparent flex items-center justify-center size-full">
                            {name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    {/* ------------------------------------- */}
                    
                    <div>
                        <p className="text-white font-bold text-sm leading-none mb-1">{name}</p>
                        <p className="text-gray-500 text-[10px]">{email}</p>
                    </div>
                </div>
            </td>
            <td className="text-right">
                <span className={`text-[10px] font-bold uppercase px-4 py-2 rounded ${status === 'Active' ? 'text-green-400 bg-green-400/10' : 'text-yellow-400 bg-yellow-400/10'}`}>
                    {status}
                </span>
            </td>
        </tr>
    );
}