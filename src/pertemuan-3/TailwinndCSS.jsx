import { CyberInput, CyberSelect } from "./components/input";
import React, { useState } from 'react';

export default function TailwindCSS() {
  const [formData, setFormData] = useState({
    alias: '',
    credits: '',
    dnaCode: '',
    district: 'sector-7',
    implant: 'neural-link'
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (name, value) => {
    let errorMsg = '';
    if (name === 'alias') {
      if (!value) errorMsg = "Identity Required";
      else if (/\d/.test(value)) errorMsg = "Numbers restricted";
      else if (value.length < 3) errorMsg = "Alias too short";
    }
    if (name === 'credits') {
      if (!value) errorMsg = "Credits Required";
      else if (isNaN(value)) errorMsg = "Integer only";
      else if (parseInt(value) < 100) errorMsg = "Insufficient funds (Min 100)";
    }
    if (name === 'dnaCode') {
      if (!value) errorMsg = "DNA Required";
      else if (!/^[A-Z]+$/.test(value)) errorMsg = "Must be UPPERCASE";
      else if (value.length !== 5) errorMsg = "Exactly 5 Chars";
    }
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validate(name, value);
    setSubmitted(false);
  };

  const isFormValid = 
    formData.alias && formData.credits && formData.dnaCode && 
    !errors.alias && !errors.credits && !errors.dnaCode;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8 font-mono relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background Effect: Grid & Glow */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px]"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-lg">
        
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] leading-tight">
            CYBER-REGISTRY
          </h1>
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-2"></div>
          <p className="text-[10px] text-cyan-700 mt-2 tracking-[0.5em] uppercase font-bold">Authorized Personnel Only</p>
        </header>

        {/* Form Box */}
        <div className="bg-black/80 backdrop-blur-md border-2 border-cyan-500/30 p-8 relative shadow-[20px_20px_0px_rgba(6,182,212,0.1)]">
          {/* Corner Accents */}
          <div className="absolute -top-[2px] -left-[2px] w-10 h-10 border-t-4 border-l-4 border-cyan-400"></div>
          <div className="absolute -bottom-[2px] -right-[2px] w-10 h-10 border-b-4 border-r-4 border-purple-500"></div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
            <CyberInput 
              label="Subject Alias" 
              name="alias"
              placeholder="e.g. SILVERHAND"
              value={formData.alias}
              onChange={handleChange}
              error={errors.alias}
            />

            <CyberInput 
              label="Neural Credits" 
              name="credits"
              placeholder="000.00"
              value={formData.credits}
              onChange={handleChange}
              error={errors.credits}
            />

            <CyberInput 
              label="DNA Protocol Code" 
              name="dnaCode"
              placeholder="X-XXXX"
              value={formData.dnaCode}
              onChange={handleChange}
              error={errors.dnaCode}
            />

            <div className="grid grid-cols-2 gap-6 pt-2">
              <CyberSelect 
                label="Assigned District" 
                name="district"
                value={formData.district}
                onChange={handleChange}
                options={[
                  { label: 'Sector 7 - Slums', value: 'sector-7' },
                  { label: 'Neon Plaza', value: 'neon-plaza' },
                  { label: 'The Wasteland', value: 'waste' },
                ]}
              />
              <CyberSelect 
                label="Augmentation" 
                name="implant"
                value={formData.implant}
                onChange={handleChange}
                options={[
                  { label: 'Neural Link v2', value: 'neural-link' },
                  { label: 'Thermal Optics', value: 'bionic-eye' },
                  { label: 'Mantis Blades', value: 'mantis' },
                ]}
              />
            </div>

            {/* Submit Button */}
            {isFormValid && (
              <button 
                onClick={() => setSubmitted(true)}
                className="w-full mt-6 bg-cyan-500 hover:bg-white text-black font-black py-4 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.6)] uppercase tracking-[0.3em] clip-path-cyber"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%)' }}
              >
                Execute Registry
              </button>
            )}
          </form>
        </div>

        {/* Success Response */}
        {submitted && (
          <div className="mt-8 bg-cyan-400 text-black p-4 font-bold animate-pulse shadow-[0_0_30px_rgba(34,211,238,0.5)]">
            <div className="flex justify-between items-center border-b-2 border-black mb-2 pb-1">
              <span>SYSTEM MESSAGE</span>
              <span className="text-[10px]">VERIFIED_USER_#{Math.floor(Math.random() * 9000)}</span>
            </div>
            <p className="text-sm">
               ACCESS GRANTED TO {formData.alias.toUpperCase()}. 
               MODIFICATION "{formData.implant.toUpperCase()}" INITIALIZED IN {formData.district.toUpperCase()}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}