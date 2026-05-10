import { FaPlus, FaArrowUp, FaArrowDown, FaClock, FaRegFilePdf } from "react-icons/fa";
import { MdAccountBalanceWallet, MdPayments, MdHistory } from "react-icons/md";

export default function Payment() {
    return (
        <div className="space-y-8 p-2 font-dmsans">
            {/* Header section sesuai gaya Page Title */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white tracking-tight">Payment Records</h2>
                <button className="bg-[#FF8A48] hover:bg-[#e07a3d] text-white font-bold py-3 px-8 rounded-2xl flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all active:scale-95">
                    <FaPlus className="text-sm" /> Add Payment
                </button>
            </div>

            {/* Top Stats - Adaptasi dari header Dashboard.jpg */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SummaryCard 
                    label="Total Income" 
                    amount="Rp 12.500.000" 
                    percentage="+55%" 
                    icon={<MdAccountBalanceWallet className="text-white text-xl" />} 
                    iconBg="bg-[#1cc0a0]" 
                />
                <SummaryCard 
                    label="Total Expense" 
                    amount="Rp 4.200.000" 
                    percentage="+12%" 
                    icon={<MdPayments className="text-white text-xl" />} 
                    iconBg="bg-[#eb5757]" 
                />
                <SummaryCard 
                    label="Pending Dues" 
                    amount="Rp 1.100.000" 
                    percentage="+2%" 
                    icon={<FaClock className="text-white text-sm" />} 
                    iconBg="bg-[#f2c94c]" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Transaction Table - Adaptasi dari Invoices di billing.png */}
                <div className="lg:col-span-2 bg-[#20223b] rounded-3xl p-7 border border-gray-800 shadow-xl">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-white font-bold text-xl">Invoices</h3>
                        <button className="text-[#FF8A48] text-sm font-bold border border-[#FF8A48] px-4 py-1 rounded-lg hover:bg-[#FF8A48] hover:text-white transition">View All</button>
                    </div>

                    <div className="space-y-6">
                        <InvoiceRow name="Membership" id="#EL-158265" date="25/04/2026" price="Rp 500.000" status="Paid" />
                        <InvoiceRow name="Gym Supplement" id="#EL-158263" date="20/04/2026" price="Rp 350.000" status="Paid" />
                    </div>
                </div>

                {/* Side Transaction History - Adaptasi dari Transactions di billing.png */}
                <div className="bg-[#20223b] rounded-3xl p-7 border border-gray-800 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white font-bold text-xl">Recent Activity</h3>
                        <span className="text-gray-500 text-xs flex items-center gap-1"><MdHistory /> April 2026</span>
                    </div>
                    
                    <div className="space-y-6">
                        <ActivityItem label="New Member Join" desc="Aiden Max" amount="+$500.00" type="income" />
                        <ActivityItem label="Electricity Bill" desc="PLN Office" amount="-$2,500.00" type="expense" />
                        <ActivityItem label="Water Bill" desc="PDAM" amount="Pending" type="pending" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Komponen Stat Card (Top Row)
function SummaryCard({ label, amount, percentage, icon, iconBg }) {
    return (
        <div className="bg-[#20223b] p-5 rounded-[24px] border border-gray-800 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
                <div className={`${iconBg} p-3 rounded-2xl shadow-lg shadow-black/20`}>
                    {icon}
                </div>
                <div>
                    <p className="text-gray-400 text-sm font-medium">{label}</p>
                    <h4 className="text-white text-xl font-bold leading-tight">{amount}</h4>
                    <p className="text-[#1cc0a0] text-xs font-bold mt-1 tracking-wide">{percentage} <span className="text-gray-500 font-normal">than last month</span></p>
                </div>
            </div>
        </div>
    );
}

// Komponen Row Invoice (Tabel Kiri)
function InvoiceRow({ name, id, date, price }) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
                <div className="bg-[#151728] p-3 rounded-xl border border-gray-700 text-[#1cc0a0]">
                    <MdPayments size={20} />
                </div>
                <div>
                    <p className="text-white font-bold text-sm">{name}</p>
                    <p className="text-gray-500 text-xs font-medium">{id}</p>
                </div>
            </div>
            <div className="text-center hidden md:block">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-tighter">Date</p>
                <p className="text-gray-300 text-sm font-semibold">{date}</p>
            </div>
            <div className="text-right flex items-center gap-6">
                <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-tighter">Price</p>
                    <p className="text-white text-sm font-bold">{price}</p>
                </div>
                <button className="text-gray-500 hover:text-[#FF8A48] transition flex items-center gap-1 font-bold text-xs uppercase">
                    <FaRegFilePdf /> PDF
                </button>
            </div>
        </div>
    );
}

// Komponen Activity Item (List Kanan)
function ActivityItem({ label, desc, amount, type }) {
    const amountColor = type === 'income' ? 'text-[#1cc0a0]' : type === 'expense' ? 'text-[#eb5757]' : 'text-gray-500';
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center font-bold text-sm ${amountColor}`}>
                    {type === 'income' ? '↑' : type === 'expense' ? '↓' : '•'}
                </div>
                <div>
                    <p className="text-white text-sm font-bold leading-none mb-1">{label}</p>
                    <p className="text-gray-500 text-xs font-medium">{desc}</p>
                </div>
            </div>
            <p className={`text-sm font-bold ${amountColor}`}>{amount}</p>
        </div>
    );
}