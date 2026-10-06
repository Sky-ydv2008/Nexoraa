import React from 'react';
import JoinSection from '../sections/JoinSection';

const JoinPage = () => {
  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-24 bg-[#080D1D] text-nex-primary">
      <div className="max-w-[1550px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="pb-12 border-b border-white/10 space-y-4">
          <div className="text-mono text-xs text-nex-cyan tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-nex-cyan" />
            09 / APPLICATION PORTAL
          </div>
          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl font-black text-nex-primary uppercase tracking-tight">
            JOIN NEXORAA
          </h1>
          <p className="text-base sm:text-lg text-nex-secondary/90 max-w-2xl font-normal leading-relaxed">
            Apply to engineer next-generation artificial intelligence, distributed systems, and offensive security tools alongside our core builders.
          </p>
        </div>

        <div className="-mt-8">
          <JoinSection />
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
