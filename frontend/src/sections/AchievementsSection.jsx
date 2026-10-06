import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Target, Milestone } from 'lucide-react';

const timeline = [
  {
    year: "2026",
    category: "HACKATHON",
    event: "NATIONAL LEVEL INNOVATION HACKATHON",
    result: "1ST PLACE GRAND CHAMPION",
    project: "NETRAAI CROWD SAFETY & SPATIAL PERCEPTION",
    desc: "Engineered sub-120ms privacy-preserving edge crowd density heatmapping and velocity anomaly prediction deployed across live CCTV streams."
  },
  {
    year: "2026",
    category: "ARCHITECTURE",
    event: "AI ENGINEERING SUMMIT 2026",
    result: "BEST TECHNICAL ARCHITECTURE AWARD",
    project: "NEXUS AUTONOMOUS WORKSPACE",
    desc: "Recognized for reactive multi-agent synchronization, automated GitHub PR synthesis, and zero-latency WebSocket state reconciliation."
  },
  {
    year: "2025",
    category: "CYBERSECURITY",
    event: "INTERNATIONAL CYBER DEFENSE CTF",
    result: "TOP 1% GLOBAL DEFENDER CITATION",
    project: "ZERO-KNOWLEDGE RESEARCH",
    desc: "Demonstrated zero-knowledge state proofs and automated defensive mitigation against distributed network probing attacks."
  },
  {
    year: "2025",
    category: "MILESTONE",
    event: "NEXORAA DEVELOPER COLLECTIVE",
    result: "100+ ACTIVE BUILDERS & 10+ REPOS",
    project: "COMMUNITY EXPANSION",
    desc: "Formalized Nexoraa Labs, onboarding engineers across top universities, shipping open-source developer tooling and research papers."
  }
];

const AchievementsSection = () => {
  return (
    <section id="achievements" className="relative py-24 sm:py-32 border-t border-white/10 bg-[#080D1D]">
      <div className="max-w-[1550px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="text-mono text-xs text-nex-cyan tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-nex-cyan" />
              08 / ACHIEVEMENTS &amp; TIMELINE
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-nex-primary leading-none uppercase">
              MILESTONES &amp;<br />RECOGNITION
            </h2>
          </div>
          <div className="text-mono text-xs text-nex-muted max-w-xs">
            COMPETITION VICTORIES, RESEARCH AWARDS &amp; DEPLOYMENT TIMELINE.
          </div>
        </div>

        {/* Minimal Timeline Rows: YEAR / EVENT / RESULT */}
        <div className="divide-y divide-white/10 mt-6">
          {timeline.map((item, idx) => (
            <motion.div
              key={item.event}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start hover:bg-white/[0.01] transition-colors"
            >
              {/* Year & Category */}
              <div className="md:col-span-3 text-mono text-xs space-y-1">
                <div className="font-editorial text-3xl font-bold text-nex-primary">
                  {item.year}
                </div>
                <div className="text-nex-cyan tracking-wider">
                  / {item.category}
                </div>
              </div>

              {/* Event & Result */}
              <div className="md:col-span-9 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-nex-primary tracking-tight">
                    {item.event}
                  </h3>
                  <span className="text-mono text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded self-start sm:self-auto">
                    {item.result}
                  </span>
                </div>

                <div className="text-mono text-xs text-nex-secondary tracking-wider">
                  PROJECT: <span className="text-nex-cyan-light">{item.project}</span>
                </div>

                <p className="text-sm text-nex-secondary/80 leading-relaxed max-w-3xl">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
