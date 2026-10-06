import React from 'react';
import ResearchSection from '../sections/ResearchSection';
import { Cpu, ShieldCheck, Database, Orbit, Activity, FileText, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const papers = [
  {
    title: "Deterministic Constraint Verification in Large Language Reasoning Chains",
    domain: "NEURO-SYMBOLIC AI",
    date: "OCTOBER 2026",
    abstract: "A methodology for compiling natural language multi-step queries into formal First-Order Logic constraints, resolved against continuous knowledge graphs.",
    author: "Nexoraa AI Research Group"
  },
  {
    title: "Privacy-Preserving Edge Optical Flow for Density Prediction in Dense Public Gatherings",
    domain: "COMPUTER VISION",
    date: "AUGUST 2026",
    abstract: "Extracting motion vectors and turbulence coefficients from low-bitrate CCTV feeds without biometric facial storage, maintaining 98% accuracy on edge GPUs.",
    author: "Shivam Upendra Yadav, Nexoraa AI Lab"
  },
  {
    title: "Local-First Ephemeral Key Agreement across Partitioned Mesh Topologies",
    domain: "CYBERSECURITY",
    date: "JUNE 2026",
    abstract: "A state-based CRDT replication framework with zero-knowledge cryptographic authentication over Bluetooth and mDNS without cloud dependencies.",
    author: "Shivam Upendra Yadav, Nexoraa Security Labs"
  }
];

const ResearchPage = () => {
  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-24 bg-[#080D1D] text-nex-primary">
      <div className="max-w-[1550px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Header */}
        <div className="pb-12 border-b border-white/10 space-y-4">
          <div className="text-mono text-xs text-nex-cyan tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-nex-cyan" />
            03 / RESEARCH LABS &amp; PAPERS
          </div>
          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl font-black text-nex-primary uppercase tracking-tight">
            RESEARCH &amp; CAPABILITIES
          </h1>
          <p className="text-base sm:text-lg text-nex-secondary/90 max-w-2xl font-normal leading-relaxed">
            Theoretical experimentation, benchmark evaluations, and open publications advancing autonomous intelligence and secure distributed systems.
          </p>
        </div>

        {/* Embedded Interactive Capability Component */}
        <div className="-mt-8">
          <ResearchSection />
        </div>

        {/* Research Publications & Preprints */}
        <div className="pt-16 border-t border-white/10 space-y-8">
          <div className="flex items-center justify-between text-mono text-xs">
            <span className="text-nex-cyan tracking-widest">SELECTED PUBLICATIONS &amp; PREPRINTS</span>
            <span className="text-nex-muted">NEXORAA LAB ARCHIVE</span>
          </div>

          <div className="divide-y divide-white/10">
            {papers.map((p, idx) => (
              <div key={idx} className="py-8 group space-y-2 hover:bg-white/[0.01] transition-colors">
                <div className="flex items-center justify-between text-mono text-[11px] text-nex-muted">
                  <span className="text-nex-cyan">{p.domain}</span>
                  <span>{p.date}</span>
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-nex-primary group-hover:text-nex-cyan-light transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-nex-secondary/80 max-w-3xl leading-relaxed">
                  {p.abstract}
                </p>
                <div className="text-mono text-xs text-nex-muted pt-2 flex items-center justify-between">
                  <span>AUTHORS: {p.author}</span>
                  <span className="text-nex-cyan inline-flex items-center gap-1 group-hover:underline">
                    READ PREPRINT <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchPage;
