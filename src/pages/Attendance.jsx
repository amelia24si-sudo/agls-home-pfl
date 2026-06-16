import React, { useState, useEffect, useRef } from "react"; // ◄ IMPORT HOOKS
import { MdPeople, MdTrendingUp, MdSearch } from "react-icons/md"; // Tambah ikon search
import { StatCard } from "../components/StatCard";
import AttendanceRow from "../components/AttendanceRow";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function Attendance() {
    // Array Master Data Absensi
    const initialAttendanceData = [
        { name: "Aiden Max", time: "08:45 AM", status: "Active", activity: "Weight Training", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80" },
        { name: "Sophia Jane", time: "09:12 AM", status: "Active", activity: "Cardio", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80" },
        { name: "Marcus Go", time: "10:05 AM", status: "Done", activity: "Yoga Class", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" }
    ];

    // 1. USESTATE: Menyimpan string pencarian dan hasil filter absensi
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(initialAttendanceData);

    // 2. USEREF: Referensi langsung ke DOM input search untuk auto-focus
    const searchInputRef = useRef(null);

    // 3. USEEFFECT: Auto-focus ke input box saat halaman pertama kali terbuka
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    // 4. USEEFFECT: Memfilter data absensi secara real-time berdasarkan query pencarian
    useEffect(() => {
        const result = initialAttendanceData.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.activity.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(result);
    }, [searchQuery]);

    return (
        <div className="space-y-8 p-2">
            {/* Header section */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white tracking-tight">Member Attendance</h2>
                <div className="flex items-center space-x-2 bg-[#20223b] px-4 py-2 rounded-xl border border-gray-800">
                    <span className="text-gray-400 text-sm">Monthly</span>
                    <span className="text-[#FF8A48]">▼</span>
                </div>
            </div>

            {/* Quick Stats Rows */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Today Users" value="2,000" growth="+ 8%" color="bg-cyan-500/20" iconColor="text-cyan-400" />
                <StatCard label="Active Now" value="154" growth="+ 12%" color="bg-[#FF8A48]/20" iconColor="text-[#FF8A48]" />
                <StatCard label="Total Monthly" value="35k" growth="+ 2%" color="bg-purple-500/20" iconColor="text-purple-400" />
            </div>

            {/* Main Content - Tabel Attendance */}
            <div className="bg-[#20223b] rounded-3xl p-8 border border-gray-800 shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h3 className="text-white font-bold text-xl">Daily Check-in List</h3>
                    </div>
                    
                    {/* IMPLEMENTASI ELEMENT INPUT SEARCH BOX MENGGUNAKAN USEREF & USESTATE */}
                    <div className="relative w-full md:w-64">
                        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            ref={searchInputRef} // ◄ Menyambungkan ref ke DOM elemen
                            type="text"
                            placeholder="Cari member / aktivitas..."
                            value={searchQuery} // ◄ Control input via useState
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#151728] border border-gray-800 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FF8A48] transition-colors"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead>
                            <tr className="text-gray-500 text-sm uppercase tracking-wider">
                                <th className="pb-4 px-4 font-medium">Member</th>
                                <th className="pb-4 px-4 font-medium">Check-in Time</th>
                                <th className="pb-4 px-4 font-medium">Status</th>
                                <th className="pb-4 px-4 font-medium text-right">Activity</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300">
                            {/* Render menggunakan hasil filter (`filteredData`) */}
                            {filteredData.length > 0 ? (
                                filteredData.map((item, index) => (
                                    <AttendanceRow 
                                        key={index}
                                        name={item.name} 
                                        time={item.time} 
                                        status={item.status} 
                                        activity={item.activity} 
                                        avatar={item.avatar}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-8 text-gray-500 text-sm">
                                        Tidak ada member yang cocok dengan "{searchQuery}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Bagian Pagination Shadcn UI */}
                <div className="pt-4 border-t border-gray-800/60">
                    <Pagination>
                        <PaginationContent className="text-gray-400">
                            <PaginationItem>
                                <PaginationPrevious href="#" className="hover:bg-gray-800 hover:text-white text-gray-400" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" className="hover:bg-gray-800 hover:text-white text-gray-400">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive className="bg-[#FF8A48] hover:bg-[#FF8A48]/90 text-white border-none">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" className="hover:bg-gray-800 hover:text-white text-gray-400">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis className="text-gray-500" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" className="hover:bg-gray-800 hover:text-white text-gray-400" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}