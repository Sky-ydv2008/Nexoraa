import React from 'react';
import { ArrowUpRight, Cpu, ShieldCheck, Code, Layers, Zap, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const pillars = [
  {
    num: "01",
    title: "FOUNDATIONAL ENGINEERING",
    desc: "We prioritize clean algorithms, strong type safety, and low-latency system design over superficial frameworks. Every line of code is intentional."
  },
  {
    num: "02",
    title: "AI WITH DETERMINISTIC INTEGRITY",
    desc: "We combine generative probabilistic intelligence with symbolic logic graphs and formal theorem verifiers to eradicate hallucinations."
  },
  {
    num: "03",
    title: "TACTILE & EDITORIAL UX",
    desc: "Inspired by minimalist physical editorial design, negative space, and micro-interactions. Software should feel like an instrument, not a template."
  },
  {
    num: "04",
    title: "OPEN COMMUNITY & COMPETITION",
    desc: "We validate our architectures in high-stakes national and international hackathons, open-sourcing our core findings to empower the next generation."
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-24 bg-[#080D1D] text-nex-primary">
      <div className="max-w-[1550px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Header */}
        <div className="pb-12 border-b border-white/10 space-y-4">
          <div className="text-mono text-xs text-nex-cyan tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-nex-cyan" />
            02 / ABOUT NEXORAA
          </div>
          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-nex-primary uppercase tracking-tight leading-none">
            WE BUILD<br />WHAT COMES NEXT.
          </h1>
          <p className="text-lg sm:text-xl text-nex-secondary/90 max-w-3xl leading-relaxed font-normal pt-2">
            Nexoraa is an elite technology collective focused on artificial intelligence, software engineering, cybersecurity, experimentation, and community-driven innovation.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 border-b border-white/10">
          <div className="lg:col-span-4 text-mono text-xs text-nex-cyan space-y-2">
            <div>CORE MISSION &amp; ORIGIN</div>
            <div className="text-nex-muted">ESTABLISHED 2025 // BENGALURU &amp; GLOBAL</div>
          </div>
          <div className="lg:col-span-8 space-y-6 text-base sm:text-lg text-nex-secondary/90 leading-relaxed font-normal">
            <p>
              In a technology landscape inundated by template wrappers and superficial SaaS products, Nexoraa was formed to return software development to its uncompromising architectural roots. We are a collective of developers, machine learning researchers, and system designers united by a single purpose: engineering deep-tech tools that solve critical computational bottlenecks.
            </p>
            <p>
              From edge-based computer vision crowd safety systems deployed in national competitions (NetraAI) to autonomous engineering command centers (NEXUS) and local-first mesh runtimes (XAPEXX), our systems operate at the bleeding edge of performance, security, and human-computer ergonomics.
            </p>
          </div>
        </div>

        {/* 4 Architectural Pillars */}
        <div className="py-16 border-b border-white/10 space-y-10">
          <div className="text-mono text-xs text-nex-cyan tracking-widest">
            OUR ARCHITECTURAL PILLARS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((p) => (
              <div key={p.num} className="card-glass p-8 rounded-xl border border-white/10 space-y-3">
                <div className="text-mono text-xs text-nex-cyan font-bold">{p.num}</div>
                <h3 className="font-editorial text-2xl font-bold text-nex-primary">{p.title}</h3>
                <p className="text-sm text-nex-secondary leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Link */}
        <div className="pt-16 flex flex-wrap items-center gap-6 text-mono text-xs">
          <Link
            to="/projects"
            className="px-6 py-3.5 bg-nex-cyan hover:bg-nex-cyan-light text-[#080D1D] font-bold rounded-lg transition-all flex items-center gap-2"
          >
            <span>EXPLORE OUR SYSTEMS</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            to="/join"
            className="px-6 py-3.5 border border-white/15 hover:border-nex-cyan rounded-lg text-nex-primary transition-all flex items-center gap-2"
          >
            <span>APPLY TO JOIN THE COLLECTIVE →</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
