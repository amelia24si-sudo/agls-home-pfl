import data from "./data.json";
import {useState} from "react";

const getStatusColor = (status) => {
  switch (status) {
    case 'Stable': case 'Active': case 'In-Stock': case 'Available':
      return 'text-cyan-400 border-cyan-400 bg-cyan-400/10';
    case 'Glitchy': case 'Restricted': case 'Underground': case 'Hidden':
      return 'text-pink-500 border-pink-500 bg-pink-500/10 animate-pulse';
    case 'Maintenance': case 'Limited':
      return 'text-yellow-400 border-yellow-400 bg-yellow-400/10';
    default:
      return 'text-slate-400 border-slate-400 bg-slate-400/10';
  }
};

export default function Frame() {
  /** Deklarasi State Object & View Mode **/
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedCategory: "",
    viewMode: "guest" // Menyimpan status view (guest / admin)
  });

  /** Inisialisasi Handle perubahan nilai input form **/
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  /** Deklarasi Logic Search & Filter **/
  const _searchTerm = dataForm.searchTerm.toLowerCase();
  
  const filteredServices = data.filter((item) => {
    // Cek kecocokan di Nama Layanan, Provider, atau ID
    const matchesSearch = 
      item.service_name.toLowerCase().includes(_searchTerm) ||
      item.provider.toLowerCase().includes(_searchTerm) ||
      item.id.toLowerCase().includes(_searchTerm);

    // Cek kecocokan kategori
    const matchesCategory = dataForm.selectedCategory 
      ? item.category === dataForm.selectedCategory 
      : true;

    return matchesSearch && matchesCategory;
  });

  // Ekstrak semua kategori unik untuk opsi Select Option
  const allCategories = [...new Set(data.map((item) => item.category))];

  return (
    <div className="p-8 min-h-screen bg-slate-950 font-mono text-cyan-50 selection:bg-fuchsia-500 selection:text-white">
      
      {/* Header & Toggle Views */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center border-b border-cyan-900/50 pb-6 gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 tracking-tighter drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
            Netrunner Market
          </h1>
          <p className="text-sm text-cyan-600 uppercase tracking-widest mt-1">
            Data Stream: {filteredServices.length} Nodes Found
          </p>
        </div>

        {/* View Mode Buttons terhubung ke handleChange */}
        <div className="flex bg-slate-900 border border-slate-800 p-1 text-sm rounded-sm shadow-inner">
          <button 
            name="viewMode" 
            value="guest" 
            onClick={handleChange}
            className={`px-6 py-2 uppercase tracking-wider transition-colors ${dataForm.viewMode === 'guest' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Fixer View
          </button>
          <button 
            name="viewMode" 
            value="admin" 
            onClick={handleChange}
            className={`px-6 py-2 uppercase tracking-wider transition-colors ${dataForm.viewMode === 'admin' ? 'bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/50 shadow-[0_0_10px_rgba(236,72,153,0.3)]' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Root Admin
          </button>
        </div>
      </div>

      {/* Kontrol Search & Filter Form */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          name="searchTerm"
          onChange={handleChange}
          placeholder="> Search sys_name, provider, id_..."
          className="flex-grow p-3 bg-slate-900/80 border border-cyan-900 border-l-4 border-l-cyan-500 text-cyan-300 font-mono text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:border-l-fuchsia-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all rounded-sm"
        />

        <select
          name="selectedCategory"
          onChange={handleChange}
          className="md:w-1/3 p-3 bg-slate-900/80 border border-cyan-900 border-l-4 border-l-fuchsia-500 text-cyan-300 font-mono text-sm focus:outline-none focus:border-fuchsia-400 focus:border-l-cyan-500 focus:shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all rounded-sm cursor-pointer"
        >
          <option value="" className="bg-slate-950 text-cyan-500 font-bold uppercase">All Sectors [Global]</option>
          {allCategories.map((cat, index) => (
            <option key={index} value={cat} className="bg-slate-900 text-cyan-300 uppercase">
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto">
        {filteredServices.length === 0 ? (
          <div className="text-center p-20 border border-pink-500/30 bg-pink-500/5 rounded-sm backdrop-blur-sm">
            <h2 className="text-2xl text-pink-500 font-black tracking-widest uppercase mb-2">ERROR 404 // NODE NOT FOUND</h2>
            <p className="text-slate-400 text-sm">No services match your search parameters in the database.</p>
          </div>
        ) : (
          <>
            {/* --- GUEST VIEW (Cards) --- */}
            {dataForm.viewMode === 'guest' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredServices.map((item) => (
                  <div key={item.id} className="flex flex-col relative bg-slate-900/60 border border-cyan-900 p-5 group hover:border-cyan-400 hover:shadow-[0_0_25px_-3px_rgba(6,182,212,0.5)] transition-all duration-300 backdrop-blur-sm rounded-tl-xl rounded-br-xl">
                    {/* Aksen Neon Border */}
                    <div className="absolute top-0 left-0 w-8 h-1 bg-fuchsia-500 group-hover:w-full group-hover:shadow-[0_0_10px_rgba(236,72,153,0.8)] transition-all duration-500 rounded-tl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-1 bg-cyan-400 group-hover:w-full group-hover:shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-500 rounded-br-xl"></div>

                    {/* Gambar Thumbnail */}
                    <div className="h-36 w-full overflow-hidden mb-4 border-b border-cyan-500/30 relative">
                      <img src={item.image_url} alt={item.service_name} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                      <div className="absolute top-2 right-2">
                        <span className={`text-[10px] px-2 py-1 border font-bold uppercase tracking-wider backdrop-blur-md ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>

                    {/* Informasi Utama */}
                    <div className="mb-4 flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-fuchsia-500 tracking-widest font-bold">{item.id}</span>
                        <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 border-l border-slate-700 uppercase">{item.category}</span>
                      </div>
                      <h3 className="text-lg font-black text-cyan-100 uppercase tracking-tight leading-tight mb-2 drop-shadow-[0_0_5px_rgba(6,182,212,0.3)]">
                        {item.service_name}
                      </h3>
                      <p className="text-xs text-cyan-600 font-bold uppercase">Corp: <span className="text-cyan-300">{item.provider}</span></p>
                    </div>

                    {/* Metrik Teknis (Nested Data) */}
                    <div className="bg-slate-950/80 border border-slate-800 p-3 mb-4 text-[10px] text-slate-400 shadow-inner">
                      <h4 className="text-cyan-500 mb-2 border-b border-slate-800 pb-1 font-bold">SYS_METRICS</h4>
                      {Object.entries(item.performance_metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between mb-1">
                          <span className="uppercase text-slate-500">{key.replace('_', ' ')}:</span>
                          <span className="text-slate-200 font-bold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* --- ADMIN VIEW (Table) --- */}
            {dataForm.viewMode === 'admin' && (
              <div className="overflow-x-auto bg-slate-900/60 border border-fuchsia-900/50 shadow-[0_0_20px_-5px_rgba(236,72,153,0.2)] backdrop-blur-sm rounded-sm">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-fuchsia-500/50 bg-slate-950/50 text-fuchsia-400 uppercase tracking-widest text-[11px]">
                      <th className="p-4">Sys_ID</th>
                      <th className="p-4">Designation</th>
                      <th className="p-4">Provider</th>
                      <th className="p-4">Sector</th>
                      <th className="p-4">Clearance</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300 text-sm divide-y divide-slate-800/50">
                    {filteredServices.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/80 transition-colors group">
                        <td className="p-4 text-cyan-500 font-bold text-xs">{item.id}</td>
                        <td className="p-4 font-bold text-cyan-100 group-hover:text-white transition-colors">{item.service_name}</td>
                        <td className="p-4 text-xs">{item.provider}</td>
                        <td className="p-4 text-xs text-slate-500 uppercase">{item.category}</td>
                        <td className="p-4">
                          <span className="bg-slate-950 px-2 py-1 text-[10px] border border-slate-700 uppercase font-bold text-slate-400">
                            {item.technical_requirements.clearance_level}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`text-[10px] px-2 py-1 border font-bold uppercase tracking-wider ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}