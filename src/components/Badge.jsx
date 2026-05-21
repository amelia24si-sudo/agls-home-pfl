import React from 'react';

export const Badge = ({ label, type }) => {
    // Tentukan styles dasar dan varian spesifik
    const baseClasses = "px-4 py-2 rounded-md text-[10px] font-black uppercase inline-block border";
    
    // Tentukan pemetaan gaya untuk setiap tipe
    const stylesMap = {
        'Active': 'bg-green-500/10 text-green-500 border-green-500/20',
        'Paid': 'bg-green-500/10 text-green-500 border-green-500/20',
        'Expired': 'bg-red-500/10 text-red-500 border-red-500/20',
        // Tipe baru "Research" sesuai permintaan
        'Research': 'bg-[#FFEDD5] text-[#F97316] border-[#FDBA74]/30' // Warna oranye lembut dan serasi
    };

    // Ambil gaya, gunakan default (Red) jika tipe tidak ditemukan
    const styles = stylesMap[type] || 'bg-red-500/10 text-red-500 border-red-500/20';

    return (
        <div className={`${baseClasses} ${styles}`}>
            {label}
        </div>
    );
};