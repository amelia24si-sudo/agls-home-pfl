import { FaPlus, FaClock } from "react-icons/fa";
import { MdAccountBalanceWallet, MdPayments } from "react-icons/md";
import { PrimaryButton } from "../components/PrimaryButton";
import { StatCard } from "../components/StatCard";
import { InvoiceTable } from "../components/InvoiceTable";
import { InvoiceItem } from "../components/InvoiceItem";
import { ActivityList } from "../components/ActivityList";
import { ActivityRow } from "../components/ActivityRow";


export default function Payment() {
    return (
        <div className="space-y-8 p-2 font-dmsans">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white tracking-tight">Payment Records</h2>
                <PrimaryButton icon={<FaPlus />}>Add Payment</PrimaryButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    label="Total Income" amount="Rp 12.500.000" percentage="+55%" 
                    icon={<MdAccountBalanceWallet size={20} />} iconBg="bg-[#1cc0a0]" 
                />
                <StatCard 
                    label="Total Expense" amount="Rp 4.200.000" percentage="+12%" 
                    icon={<MdPayments size={20} />} iconBg="bg-[#eb5757]" 
                />
                <StatCard 
                    label="Pending Dues" amount="Rp 1.100.000" percentage="+2%" 
                    icon={<FaClock size={16} />} iconBg="bg-[#f2c94c]" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <InvoiceTable>
                    <InvoiceItem name="Membership" id="#EL-158265" date="25/04/2026" price="Rp 500.000" />
                    <InvoiceItem name="Gym Supplement" id="#EL-158263" date="20/04/2026" price="Rp 350.000" />
                </InvoiceTable>

                <ActivityList>
                    <ActivityRow label="New Member Join" desc="Aiden Max" amount="+$500.00" type="income" />
                    <ActivityRow label="Electricity Bill" desc="PLN Office" amount="-$2,500.00" type="expense" />
                    <ActivityRow label="Water Bill" desc="PDAM" amount="Pending" type="pending" />
                </ActivityList>
            </div>
        </div>
    );
}