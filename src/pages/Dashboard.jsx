import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { MdLocalOffer, MdPeople, MdAccountBalanceWallet } from "react-icons/md";
import PromoItem from "../components/PromoItem";
import MemberRow from "../components/MemberRow";
import { StatCard } from "../components/StatCard";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { paymentAPI } from "../service/paymentAPI";
import { memberAPI } from "../service/memberAPI";

export default function Dashboard() {
    // State untuk data mentah dari server
    const [rawTransactions, setRawTransactions] = useState([]);
    const [totalMembersCount, setTotalMembersCount] = useState("0");
    const [displayMembersList, setDisplayMembersList] = useState([]);

    // State untuk nilai filter grafik
    const [filterType, setFilterType] = useState("all"); // "all", "year", "month", "day"
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString()); // 1-12
    const [selectedDay, setSelectedDay] = useState(new Date().getDate().toString());

    // State untuk tampilan UI data olahan grafik
    const [incomeData, setIncomeData] = useState([]);
    const [totalIncomeText, setTotalIncomeText] = useState("Rp 0");
    const [isLoading, setIsLoading] = useState(false);

    const renderCounter = useRef(0);
    renderCounter.current += 1;

    const monthLabels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

    // 1. Ambil data transaksi DAN data member secara paralel saat pertama kali dimuat
    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                const [transactions, members] = await Promise.all([
                    paymentAPI.fetchPayments(),
                    memberAPI.fetchMembers()
                ]);

                if (transactions) {
                    setRawTransactions(transactions);
                }

                if (members && Array.isArray(members)) {
                    // FILTER 1: Hanya hitung total keseluruhan user yang memiliki role 'member'
                    const memberOnlyList = members.filter(m => m.role === "member");
                    setTotalMembersCount(memberOnlyList.length.toString());

                    // FILTER 2: Urutkan berdasarkan tanggal gabung terbaru, lalu ambil 3 teratas
                    const sortedLatestMembers = memberOnlyList
                        .sort((a, b) => new Date(b.tgl_gabung) - new Date(a.tgl_gabung))
                        .slice(0, 3);

                    // Memetakan data sesuai dengan struktur komponen MemberRow Anda
                    const formattedDisplay = sortedLatestMembers.map(m => ({
                        name: m.nama_lengkap,
                        email: m.email_address || "No Email",
                        status: m.status_member || "AKTIF", 
                        avatar: m.jenis_kelamin === "P" 
                            ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80" 
                            : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" 
                    }));
                    
                    setDisplayMembersList(formattedDisplay);
                }
            } catch (error) {
                console.error("Gagal mengambil data untuk dashboard:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    // 2. Olah dan filter data statistik grafik setiap kali state filter berubah
    useEffect(() => {
        if (!rawTransactions || rawTransactions.length === 0) {
            setTotalIncomeText("Rp 0");
            setIncomeData(monthLabels.map(m => ({ month: m, heightPx: 0, displayValue: "0" })));
            return;
        }

        // --- PROSES PENYARINGAN DATA TRANSAKSI ---
        const filteredList = rawTransactions.filter((trx) => {
            const dateRaw = trx.tgl_transaksi;
            if (!dateRaw) return false;

            const trxDate = new Date(dateRaw);
            if (isNaN(trxDate.getTime())) return false;

            const tYear = trxDate.getFullYear().toString();
            const tMonth = (trxDate.getMonth() + 1).toString();
            const tDay = trxDate.getDate().toString();

            if (filterType === "year") {
                return tYear === selectedYear;
            } else if (filterType === "month") {
                return tYear === selectedYear && tMonth === selectedMonth;
            } else if (filterType === "day") {
                return tYear === selectedYear && tMonth === selectedMonth && tDay === selectedDay;
            }
            return true; // "all" -> lolos semua data
        });

        // --- HITUNG TOTAL NOMINAL HASIL FILTER ---
        const totalNominal = filteredList.reduce((acc, curr) => acc + (Number(curr.nominal) || 0), 0);
        setTotalIncomeText(new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(totalNominal));

        // --- AGREGASI DATA BULANAN ---
        const monthlyValues = { Jan: 0, Feb: 0, Mar: 0, Apr: 0, Mei: 0, Jun: 0, Jul: 0, Agu: 0, Sep: 0, Okt: 0, Nov: 0, Des: 0 };

        filteredList.forEach((trx) => {
            const trxDate = new Date(trx.tgl_transaksi);
            const monthIndex = trxDate.getMonth();
            const nilaiUang = Number(trx.nominal) || 0;

            if (monthIndex >= 0 && monthIndex <= 11) {
                const key = monthLabels[monthIndex];
                monthlyValues[key] += nilaiUang;
            }
        });

        const semuaNilaiBulan = Object.values(monthlyValues);
        const nilaiTertinggi = Math.max(...semuaNilaiBulan, 1);
        const TINGGI_MAKSIMAL_GRAFIK_PX = 160;

        // --- PEMETAAN TINGGI PIXEL GRAFIK BAR ---
        const finalChartData = monthLabels.map((namaBulan) => {
            const uangBulanIni = monthlyValues[namaBulan];

            let hitungPx = 0;
            if (uangBulanIni > 0) {
                hitungPx = Math.round((uangBulanIni / nilaiTertinggi) * TINGGI_MAKSIMAL_GRAFIK_PX);
                if (hitungPx < 20) hitungPx = 20;
            }

            let teksTooltip = `Rp ${uangBulanIni.toLocaleString('id-ID')}`;
            if (uangBulanIni >= 1000000) {
                teksTooltip = `${(uangBulanIni / 1000000).toFixed(1)}M`;
            } else if (uangBulanIni >= 1000) {
                teksTooltip = `${(uangBulanIni / 1000).toFixed(0)}K`;
            }

            return {
                month: namaBulan,
                heightPx: hitungPx,
                displayValue: teksTooltip
            };
        });

        setIncomeData(finalChartData);

    }, [rawTransactions, filterType, selectedYear, selectedMonth, selectedDay]);

    return (
        <div className="space-y-8 p-2 font-dmsans text-white">
            <div className="text-xs text-gray-500 text-right">
                Dashboard Render Count: <span className="text-[#FF8A48] font-mono">{renderCounter.current}</span>
            </div>

            {/* --- TOP SUMMARY CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Income Summary" amount={totalIncomeText} growth="Berdasarkan Filter" icon={<MdAccountBalanceWallet className="text-white text-2xl" />} iconBg="bg-[#1cc0a0]" />
                <StatCard label="New Members" amount={totalMembersCount} growth="Total Role Member" icon={<MdPeople className="text-white text-2xl" />} iconBg="bg-[#56ccf2]" />
                <StatCard label="Promo Conversion" amount="64%" growth="+2%" icon={<MdLocalOffer className="text-white text-2xl" />} iconBg="bg-[#FF8A48]" />
            </div>

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    {/* New Members Table */}
                    <div className="bg-[#20223b] rounded-3xl p-7 border border-gray-800 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-xl">New Members</h3>
                            <button className="text-[#FF8A48] text-sm font-bold hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-gray-500 text-xs uppercase tracking-widest border-b border-gray-800">
                                        <th className="pb-4 font-medium">Member</th>
                                        <th className="pb-4 font-medium text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800/50">
                                    {displayMembersList.length > 0 ? (
                                        displayMembersList.map((member, index) => (
                                            <MemberRow key={index} name={member.name} email={member.email} status={member.status} avatar={member.avatar} />
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2" className="py-4 text-center text-sm text-gray-500">Tidak ada data member.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* --- INCOME STATISTICS WITH FILTERS --- */}
                    <div className="bg-[#20223b] rounded-3xl p-7 border border-gray-800 shadow-xl">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                            <h3 className="font-bold text-xl">Income Statistics</h3>
                            
                            {/* Kumpulan Kontrol Dropdown dengan Warna Oranye Teks Utama */}
                            <div className="flex flex-wrap gap-2">
                                {/* 1. Dropdown Jenis Filter */}
                                <NativeSelect
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="border-gray-700 bg-[#151728] text-[#FF8A48] text-xs font-bold rounded-xl"
                                >
                                    <NativeSelectOption value="all" className="bg-[#151728] text-white">Semua Waktu</NativeSelectOption>
                                    <NativeSelectOption value="year" className="bg-[#151728] text-white">Per Tahun</NativeSelectOption>
                                    <NativeSelectOption value="month" className="bg-[#151728] text-white">Per Bulan</NativeSelectOption>
                                </NativeSelect>

                                {/* 2. Dropdown Pilihan Tahun */}
                                {filterType !== "all" && (
                                    <NativeSelect
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        className="border-gray-700 bg-[#151728] text-[#FF8A48] text-xs font-bold rounded-xl"
                                    >
                                        {["2024", "2025", "2026", "2027"].map((y) => (
                                            <NativeSelectOption key={y} value={y} className="bg-[#151728] text-white">{y}</NativeSelectOption>
                                        ))}
                                    </NativeSelect>
                                )}

                                {/* 3. Dropdown Pilihan Bulan */}
                                {(filterType === "month" || filterType === "day") && (
                                    <NativeSelect
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(e.target.value)}
                                        className="border-gray-700 bg-[#151728] text-[#FF8A48] text-xs font-bold rounded-xl"
                                    >
                                        {monthLabels.map((m, idx) => (
                                            <NativeSelectOption key={idx} value={(idx + 1).toString()} className="bg-[#151728] text-white">{m}</NativeSelectOption>
                                        ))}
                                    </NativeSelect>
                                )}

                                {/* 4. Dropdown Pilihan Hari */}
                                {filterType === "day" && (
                                    <NativeSelect
                                        value={selectedDay}
                                        onChange={(e) => setSelectedDay(e.target.value)}
                                        className="border-gray-700 bg-[#151728] text-[#FF8A48] text-xs font-bold rounded-xl"
                                    >
                                        {Array.from({ length: 31 }, (_, i) => (i + 1).toString()).map((d) => (
                                            <NativeSelectOption key={d} value={d} className="bg-[#151728] text-white">Tgl {d}</NativeSelectOption>
                                        ))}
                                    </NativeSelect>
                                )}
                            </div>
                        </div>
                        
                        {/* Area Komponen Grafik Utama */}
                        <div className={`w-full h-64 flex gap-4 transition-opacity duration-200 ${isLoading ? 'opacity-40' : 'opacity-100'}`}>
                            <div className="flex flex-col justify-between text-[10px] text-gray-500 font-bold pb-10 pt-2 select-none">
                                <span>MAX</span><span>75%</span><span>50%</span><span>25%</span><span>0</span>
                            </div>

                            <div className="flex-1 flex flex-col justify-between h-full">
                                <div className="flex-1 flex items-end justify-between gap-3 px-2 pt-2 border-b border-gray-800/60 relative h-[160px]">
                                    <div className="absolute inset-x-0 top-0 border-t border-gray-800/20 pointer-events-none"></div>
                                    <div className="absolute inset-x-0 top-1/4 border-t border-gray-800/20 pointer-events-none"></div>
                                    <div className="absolute inset-x-0 top-2/4 border-t border-gray-800/20 pointer-events-none"></div>
                                    <div className="absolute inset-x-0 top-3/4 border-t border-gray-800/20 pointer-events-none"></div>

                                    {/* RENDERING BAR GRAFIK */}
                                    {incomeData.map((data, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center justify-end h-full relative z-10">
                                            <div
                                                className="w-full bg-[#FF8A48] rounded-t-md transition-all duration-300 group hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] relative cursor-pointer block min-w-[12px]"
                                                style={{ height: `${data.heightPx}px` }}
                                            >
                                                <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#151728] border border-gray-800 text-white text-xs rounded-xl p-2 opacity-0 pointer-events-none shadow-2xl z-30 min-w-[105px] text-center transition-opacity duration-200 group-hover:opacity-100">
                                                    <p className="text-[10px] text-gray-400 font-medium">{data.month}</p>
                                                    <p className="font-mono font-bold text-[#FF8A48] text-[11px]">{data.displayValue}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="flex justify-between px-2 pt-2 select-none">
                                    {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((bulan, i) => (
                                        <span key={i} className="flex-1 text-center text-[10px] text-gray-500 font-bold uppercase">{bulan}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT SECTION: TOP PROMO --- */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <div className="bg-[#20223b] rounded-3xl p-7 border border-gray-800 shadow-xl h-full">
                        <h3 className="font-bold text-xl mb-6">Top Performing Promos</h3>
                        <div className="space-y-6">
                            <PromoItem title="Ramadan Sale" usage="150 Users" trend="+24%" iconBg="bg-green-500/10" iconColor="text-green-400" />
                            <PromoItem title="New Year Deal" usage="98 Users" trend="+12%" iconBg="bg-blue-500/10" iconColor="text-blue-400" />
                            <PromoItem title="Flash Friday" usage="45 Users" trend="-5%" iconBg="bg-red-500/10" iconColor="text-red-400" />
                        </div>
                        <div className="mt-10 p-6 bg-gradient-to-br from-[#FF8A48] to-[#e07a3d] rounded-2xl shadow-lg shadow-orange-500/20">
                            <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">Total Savings Given</p>
                            <h4 className="text-white text-2xl font-black italic">Rp 8.450.000</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}