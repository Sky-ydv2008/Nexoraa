import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Users, Code, Terminal, MessageSquare, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const communityCategories = [
  { num: "01", name: "DEVELOPERS", desc: "Full stack, backend distributed systems, and low-level runtime engineers." },
  { num: "02", name: "AI BUILDERS", desc: "Specialists in LLMs, computer vision, neuro-symbolic reasoning, and RAG pipelines." },
  { num: "03", name: "DESIGNERS", desc: "Creative technologists, motion designers, and editorial design system creators." },
  { num: "04", name: "RESEARCHERS", desc: "Academics and hackers pursuing zero-knowledge cryptography and safety." },
  { num: "05", name: "MAKERS", desc: "Hackathon champions, hardware experimenters, and decentralized tech builders." }
];

const CommunitySection = () => {
  return (
    <section id="community" className="relative py-24 sm:py-32 border-t border-white/10 bg-[#080D1D]">
      <div className="max-w-[1550px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="text-mono text-xs text-nex-cyan tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-nex-cyan" />
              07 / COMMUNITY
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-nex-primary leading-none uppercase">
              BUILD TOGETHER.
            </h2>
          </div>
          <div className="text-mono text-xs text-nex-muted max-w-sm">
            "NEXORAA IS NOT ONLY A TEAM. IT IS A GROWING COMMUNITY OF BUILDERS."
          </div>
        </div>

        {/* Community Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-b border-white/10">
          <div className="space-y-1">
            <div className="font-editorial text-3xl sm:text-4xl font-bold text-nex-primary">100+</div>
            <div className="text-mono text-xs text-nex-cyan">COMMUNITY BUILDERS</div>
          </div>
          <div className="space-y-1">
            <div className="font-editorial text-3xl sm:text-4xl font-bold text-nex-primary">10+</div>
            <div className="text-mono text-nex-cyan">OPEN PROJECTS</div>
          </div>
          <div className="space-y-1">
            <div className="font-editorial text-3xl sm:text-4xl font-bold text-nex-primary">04+</div>
            <div className="text-mono text-nex-cyan">HACKATHON SPRINTS</div>
          </div>
          <div className="space-y-1">
            <div className="font-editorial text-3xl sm:text-4xl font-bold text-nex-primary">24/7</div>
            <div className="text-mono text-nex-cyan">DISCORD UPLINK</div>
          </div>
        </div>

        {/* Community Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-12">
          {communityCategories.map((cat, idx) => (
            <motion.div
              key={cat.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-nex-cyan/40 hover:bg-white/[0.04] transition-all space-y-3"
            >
              <div className="text-mono text-xs text-nex-cyan font-bold">{cat.num}</div>
              <h3 className="font-editorial text-xl font-bold text-nex-primary">{cat.name}</h3>
              <p className="text-xs text-nex-muted leading-relaxed">{cat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Action Link */}
        <div className="pt-12 flex flex-col sm:flex-row items-center gap-6">
          <Link
            to="/join"
            className="px-6 py-3.5 bg-nex-cyan hover:bg-nex-cyan-light text-[#080D1D] font-bold text-mono text-xs rounded-lg transition-all flex items-center gap-2"
          >
            <span>APPLY TO JOIN COLLECTIVE</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a
            href="https://discord.gg/nexoraa"
            target="_blank"
            rel="noreferrer"
            className="text-mono text-xs text-nex-secondary hover:text-white transition-colors flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4 text-nex-cyan" />
            <span>JOIN BUILDER DISCORD ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
