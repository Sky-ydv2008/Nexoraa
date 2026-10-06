import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Terminal } from 'lucide-react';
import StackedCards from './StackedCards';

const heroCardsData = [
  {
    number: '01',
    badge: 'AI / ML',
    title: 'ARTIFICIAL INTELLIGENCE',
    description: 'We build intelligent systems, autonomous AI agents, adaptive RAG workflows, and machine learning experiences engineered for real-world reliability.',
    tags: ['MODELS', 'AUTOMATION', 'RAG', 'AGENTS'],
    route: '/research'
  },
  {
    number: '02',
    badge: 'SYSTEMS',
    title: 'FULL STACK SYSTEMS',
    description: 'Scalable web platforms, WebSocket state synchronization protocols, distributed developer tools, and resilient production architectures.',
    tags: ['REACT', 'NODE', 'MONGODB', 'CLOUD'],
    route: '/projects'
  },
  {
    number: '03',
    badge: 'DEFENSE',
    title: 'CYBERSECURITY',
    description: 'Offensive and defensive security research, zero-knowledge encryption, network vulnerability penetration testing, and privacy-first protocols.',
    tags: ['SECURITY', 'RESEARCH', 'NETWORKS', 'PRIVACY'],
    route: '/research'
  },
  {
    number: '04',
    badge: 'TOOLING',
    title: 'DEVELOPER TECHNOLOGY',
    description: 'High-throughput tools and runtimes that transform the way engineers write code, collaborate autonomously, and deploy decentralized systems.',
    tags: ['DEVTOOLS', 'APIs', 'AUTOMATION', 'OPEN SOURCE'],
    route: '/projects'
  },
  {
    number: '05',
    badge: 'R&D',
    title: 'EXPERIMENTAL LABS',
    description: 'Pioneering frontier research, local-first CRDT mesh networks, neuro-symbolic logic engines, and next-generation human-machine interfaces.',
    tags: ['R&D', 'PROTOTYPES', 'EXPERIMENTS', 'FUTURE'],
    route: '/research'
  }
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen pt-28 sm:pt-32 pb-16 flex flex-col justify-between overflow-hidden bg-tech-grid ambient-glow">
      <div className="max-w-[1550px] w-full mx-auto px-5 sm:px-8 md:px-12 my-auto">
        {/* Two-Column Composition: Left ~40%, Right ~60% */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Large Editorial Typography & Category Selector */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            {/* Small Technical Label */}
            <div className="flex items-center gap-3 text-mono text-xs text-nex-cyan tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-nex-cyan animate-pulse" />
              <span>NEXORAA / TECHNOLOGY COLLECTIVE</span>
            </div>

            {/* Giant Editorial Headline */}
            <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold text-nex-primary tracking-tight leading-[0.92] uppercase">
              BUILDING<br />
              WHAT<br />
              COMES NEXT.
            </h1>

            {/* Supporting Statement */}
            <p className="font-editorial text-lg sm:text-xl text-nex-secondary/90 tracking-tight mt-6 uppercase">
              AI, ENGINEERING &amp; EXPERIMENTATION.
            </p>

            {/* Technical Metadata Row */}
            <div className="flex flex-wrap items-center gap-4 text-mono text-[11px] text-nex-muted tracking-wider py-4 my-2 border-y border-white/10">
              <div>BUILD / 2026</div>
              <span className="text-white/20">•</span>
              <div className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                STATUS / ACTIVE
              </div>
              <span className="text-white/20">•</span>
              <div>NODES / 05+</div>
            </div>

            {/* Category Navigation Selector */}
            <div className="mt-4 space-y-2">
              <div className="text-mono text-[10px] text-nex-muted tracking-[0.2em] mb-2">
                INDEX // SELECT DOMAIN
              </div>
              <div className="space-y-1.5 text-mono text-xs">
                {heroCardsData.map((item, idx) => {
                  const isSelected = activeIndex === idx;
                  return (
                    <button
                      key={item.number}
                      onClick={() => setActiveIndex(idx)}
                      className={`group w-full flex items-center justify-between px-3 py-2 rounded text-left transition-all duration-200 border ${
                        isSelected
                          ? 'bg-nex-darkblue/70 border-nex-cyan/40 text-nex-primary shadow-[0_0_12px_rgba(34,211,238,0.12)]'
                          : 'bg-transparent border-transparent text-nex-secondary/70 hover:text-nex-primary hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-[11px] font-semibold transition-colors ${
                          isSelected ? 'text-nex-cyan' : 'text-nex-muted group-hover:text-nex-secondary'
                        }`}>
                          {item.number}
                        </span>
                        <span className="tracking-wider">
                          / {item.title}
                        </span>
                      </div>
                      <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                        isSelected ? 'bg-nex-cyan scale-125' : 'bg-transparent group-hover:bg-white/30'
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Stacked Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex justify-center lg:justify-end items-center"
          >
            <StackedCards
              cards={heroCardsData}
              activeIndex={activeIndex}
              onSelectCard={setActiveIndex}
            />
          </motion.div>

        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="max-w-[1550px] w-full mx-auto px-5 sm:px-8 md:px-12 mt-8 flex justify-between items-center text-mono text-xs text-nex-muted select-none">
        <button
          onClick={scrollToNext}
          className="group inline-flex items-center gap-2 hover:text-nex-cyan transition-colors"
          aria-label="Scroll down to explore"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </button>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-nex-muted/60">
          <span>01 / 05 DOMAINS</span>
          <span>•</span>
          <span>AUTONOMOUS SYSTEMS</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
