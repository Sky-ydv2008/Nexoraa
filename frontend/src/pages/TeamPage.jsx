import React from 'react';
import TeamSection from '../sections/TeamSection';
import { ArrowUpRight, Code2, Award, Terminal, Cpu, Database, Network } from 'lucide-react';
import { Link } from 'react-router-dom';

const competencies = [
  {
    category: "LANGUAGES",
    items: ["Core Java", "C++", "Python", "JavaScript / ESNext", "SQL", "Bash Scripting"]
  },
  {
    category: "SYSTEMS & BACKEND",
    items: ["Node.js", "Express.js", "REST APIs", "WebSockets", "MongoDB & Mongoose", "Distributed Architectures"]
  },
  {
    category: "AI & PERCEPTION",
    items: ["Computer Vision", "YOLOv8 Edge Models", "Retrieval-Augmented Generation (RAG)", "Vector Embeddings", "FastAPI"]
  },
  {
    category: "CORE DISCIPLINES",
    items: ["Data Structures & Algorithms (DSA)", "Object-Oriented Programming (OOP)", "DBMS", "Operating Systems", "Low-Latency UX"]
  }
];

const TeamPage = () => {
  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-24 bg-[#080D1D] text-nex-primary">
      <div className="max-w-[1550px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="pb-12 border-b border-white/10 space-y-4">
          <div className="text-mono text-xs text-nex-cyan tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-nex-cyan" />
            06 / FOUNDER &amp; LEADERSHIP
          </div>
          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl font-black text-nex-primary uppercase tracking-tight">
            THE BUILDER
          </h1>
          <p className="text-base sm:text-lg text-nex-secondary/90 max-w-2xl font-normal leading-relaxed">
            Leading the engineering architecture, foundational AI systems, and project execution at Nexoraa.
          </p>
        </div>

        {/* Lead Builder Component */}
        <div className="-mt-8">
          <TeamSection />
        </div>

        {/* Competencies Grid */}
        <div className="pt-16 border-t border-white/10 space-y-8">
          <div className="flex items-center justify-between text-mono text-xs">
            <span className="text-nex-cyan tracking-widest">TECHNICAL COMPETENCIES &amp; SPECIALIZATIONS</span>
            <span className="text-nex-muted">ENGINEERING MATRIX</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {competencies.map((c) => (
              <div key={c.category} className="card-glass p-6 rounded-xl border border-white/10 space-y-3">
                <div className="text-mono text-xs text-nex-cyan font-bold pb-2 border-b border-white/10">
                  {c.category}
                </div>
                <ul className="space-y-1.5 text-xs text-mono text-nex-secondary">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-center gap-2">
                      <span className="text-nex-cyan text-[10px]">❯</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="mt-16 pt-16 border-t border-white/10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-editorial text-2xl font-bold text-nex-primary">LOOKING TO COLLABORATE OR JOIN?</h3>
            <p className="text-sm text-nex-muted mt-1">Nexoraa is expanding its network of passionate builders for national hackathons and lab sprints.</p>
          </div>
          <Link
            to="/join"
            className="px-6 py-3.5 bg-nex-cyan hover:bg-nex-cyan-light text-[#080D1D] font-bold text-mono text-xs rounded-lg transition-all flex items-center gap-2"
          >
            <span>APPLY TO JOIN THE COLLECTIVE →</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
