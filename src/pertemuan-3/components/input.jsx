import React from 'react';

export const CyberInput = ({ label, error, ...props }) => (
  <div className="mb-5 group">
    <label className="block text-cyan-400 text-[10px] font-bold mb-1 uppercase tracking-[0.2em] group-focus-within:text-white transition-colors">
      {label}
    </label>
    <input
      {...props}
      className={`w-full bg-black/40 border-b-2 p-3 text-cyan-100 font-mono focus:outline-none transition-all duration-300 ${
        error 
        ? 'border-red-600 shadow-[0_5px_10px_-5px_rgba(220,38,38,0.5)] text-red-200' 
        : 'border-cyan-900 focus:border-cyan-400 focus:shadow-[0_5px_15px_-5px_rgba(34,211,238,0.4)]'
      }`}
    />
    {error && (
      <div className="mt-2 bg-red-600/10 border-l-2 border-red-600 px-2 py-1 text-red-500 text-[10px] font-bold uppercase italic animate-pulse">
        critical_error: {error}
      </div>
    )}
  </div>
);

export const CyberSelect = ({ label, options, ...props }) => (
  <div className="mb-5">
    <label className="block text-purple-400 text-[10px] font-bold mb-1 uppercase tracking-[0.2em]">
      {label}
    </label>
    <div className="relative">
      <select
        {...props}
        className="w-full bg-black/60 border-2 border-purple-900 focus:border-purple-500 p-2 text-purple-100 font-mono focus:outline-none appearance-none cursor-crosshair transition-all"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-gray-900">{opt.label}</option>
        ))}
      </select>
      <div className="absolute right-3 top-3 pointer-events-none text-purple-500 text-xs">▼</div>
    </div>
  </div>
);