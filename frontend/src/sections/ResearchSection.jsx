import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Cpu, ShieldAlert, Database, Activity, Orbit } from 'lucide-react';
import { Link } from 'react-router-dom';

const capabilities = [
  {
    num: "01",
    domain: "AI & INTELLIGENCE",
    icon: Cpu,
    title: "Autonomous Agents & Neuro-Symbolic Verification",
    overview: "Engineering cognitive agent loops that execute multi-step deterministic workflows without hallucination. Combining transformer embeddings with formal logical deduction graphs.",
    deliverables: [
      "Sub-100ms multi-modal vector retrieval and hybrid reranking",
      "Formal proof verifiers integrated with Lean and Z3 Provers",
      "Context-window memory persistence and session serialization",
      "Autonomous code synthesis with unit-test feedback loops"
    ],
    status: "ACTIVE EXPERIMENTATION // Q4 2026"
  },
  {
    num: "02",
    domain: "CYBERSECURITY",
    icon: ShieldAlert,
    title: "Zero-Knowledge Cryptography & Offensive Research",
    overview: "Building privacy-preserving communication protocols, ephemeral key exchanges, and automated exploit detection systems for national hackathons and distributed environments.",
    deliverables: [
      "Zero-knowledge ephemeral state validation",
      "Automated binary and kernel exploit signature analysis",
      "Mesh packet encryption with elliptic-curve cryptography",
      "CTF defensive countermeasure automation"
    ],
    status: "DEFENSE AUDITED // PRODUCTION"
  },
  {
    num: "03",
    domain: "FULL STACK",
    icon: Database,
    title: "Distributed Low-Latency Platforms & State Synchronization",
    overview: "Crafting scalable cloud architectures, reactive WebSocket event streams, and optimistic client interfaces that maintain consistency across global nodes.",
    deliverables: [
      "High-concurrency Node.js and Express REST microservices",
      "Conflict-free replicated data types (CRDT) synchronization",
      "MongoDB Atlas schemas with hybrid offline caching fallback",
      "Production-ready Docker containers and CI/CD pipelines"
    ],
    status: "CORE ARCHITECTURE // DEPLOYED"
  },
  {
    num: "04",
    domain: "AUTOMATION",
    icon: Activity,
    title: "Edge Computer Vision & Real-Time Spatial Perception",
    overview: "Pioneering privacy-preserving crowd safety models, silhouette optical flow, and velocity gradient analytics running directly on edge hardware.",
    deliverables: [
      "Sub-120ms YOLOv8 edge inference on low-power devices",
      "Crowd density heatmapping without facial biometric storage",
      "Predictive bottleneck and turbulence alert triggers",
      "Multi-channel automated emergency response uplinks"
    ],
    status: "NATIONAL HACKATHON WINNER"
  },
  {
    num: "05",
    domain: "RESEARCH LABS",
    icon: Orbit,
    title: "Local-First Computing & Disconnected Mesh Networks",
    overview: "Investigating resilient computing models where software remains 100% operational in disconnected disaster zones and high-interference environments.",
    deliverables: [
      "Local browser-based SLM execution via WebGPU (Phi-3 / Gemma)",
      "Peer-to-peer gossip replication over Bluetooth and mDNS",
      "Cryptographically signed state envelopes",
      "Distributed ledger reconciliation without centralized servers"
    ],
    status: "FRONTIER LAB // PROTOTYPE"
  }
];

const ResearchSection = () => {
  const [selected, setSelected] = useState(0);
  const activeCap = capabilities[selected];
  const IconComponent = activeCap.icon;

  return (
    <section id="research" className="relative py-24 sm:py-32 border-t border-white/10 bg-[#080D1D]">
      <div className="max-w-[1550px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="text-mono text-xs text-nex-cyan tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-nex-cyan" />
              03 / RESEARCH
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-nex-primary leading-none uppercase">
              RESEARCH &amp;<br />CAPABILITIES
            </h2>
          </div>
          <div className="text-mono text-xs text-nex-muted max-w-xs">
            FRONTIER EXPLORATION ACROSS 5 SPECIALIZED COMPUTATIONAL DOMAINS.
          </div>
        </div>

        {/* Interactive Capability Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-12 items-start">
          {/* LEFT: Selector List */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-mono text-[10px] text-nex-muted tracking-[0.2em] mb-4">
              DOMAIN DIRECTORY
            </div>
            {capabilities.map((item, idx) => {
              const isCurrent = selected === idx;
              return (
                <button
                  key={item.num}
                  onClick={() => setSelected(idx)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg text-left transition-all duration-300 border ${
                    isCurrent
                      ? 'bg-nex-surface border-nex-cyan/40 text-nex-primary shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                      : 'bg-transparent border-white/5 text-nex-secondary/80 hover:border-white/15 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-mono text-xs font-bold ${
                      isCurrent ? 'text-nex-cyan' : 'text-nex-muted'
                    }`}>
                      {item.num}
                    </span>
                    <span className="text-mono text-xs sm:text-sm tracking-wider font-medium">
                      / {item.domain}
                    </span>
                  </div>
                  <span className={`w-2 h-2 rounded-full transition-colors ${
                    isCurrent ? 'bg-nex-cyan shadow-[0_0_8px_#22D3EE]' : 'bg-white/10'
                  }`} />
                </button>
              );
            })}

            <div className="pt-6">
              <Link
                to="/research"
                className="inline-flex items-center gap-2 text-mono text-xs text-nex-cyan hover:text-nex-cyan-light tracking-wider"
              >
                <span>VIEW FULL RESEARCH PAPERS &amp; LAB BENCHMARKS</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Large Capability Card with Smooth Animation */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCap.num}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="card-glass-active p-8 sm:p-10 rounded-xl space-y-6"
              >
                {/* Card Top Metadata */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 text-mono text-xs">
                  <div className="flex items-center gap-2 text-nex-cyan">
                    <IconComponent className="w-4 h-4" />
                    <span>DOMAIN SPECIFICATION // {activeCap.num}</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                    {activeCap.status}
                  </div>
                </div>

                {/* Capability Title */}
                <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-nex-primary tracking-tight leading-tight">
                  {activeCap.title}
                </h3>

                {/* Capability Overview */}
                <p className="text-base text-nex-secondary/90 leading-relaxed font-normal">
                  {activeCap.overview}
                </p>

                {/* Key Research Deliverables */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="text-mono text-[11px] text-nex-muted tracking-wider">
                    CORE DELIVERABLES &amp; SYSTEM CAPABILITIES:
                  </div>
                  <ul className="space-y-2.5">
                    {activeCap.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-nex-secondary">
                        <span className="text-nex-cyan font-mono text-xs mt-0.5">❯</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
