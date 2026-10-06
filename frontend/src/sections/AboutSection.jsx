import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { value: "05+", label: "CORE DOMAINS", desc: "AI, Full-Stack, Security, DevTools, Labs" },
  { value: "10+", label: "PROJECTS", desc: "Production platforms & competition winners" },
  { value: "01", label: "FOUNDER & ARCHITECT", desc: "Shivam Upendra Yadav (Full Stack & AI)" },
  { value: "∞", label: "IDEAS", desc: "Continuous experimentation & hackathons" }
];

const AboutSection = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32 border-t border-white/10 bg-[#080D1D]">
      <div className="max-w-[1550px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Asymmetric Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <div className="text-mono text-xs text-nex-cyan tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-nex-cyan" />
              02 / ABOUT NEXORAA
            </div>
            <div className="text-mono text-xs text-nex-muted tracking-wider">
              PHILOSOPHY &amp; ARCHITECTURE
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-nex-primary leading-[1.02] uppercase">
              WE BUILD<br />
              SYSTEMS THAT<br />
              SOLVE REAL<br />
              PROBLEMS.
            </h2>

            <p className="text-lg sm:text-xl text-nex-secondary/90 leading-relaxed font-normal max-w-3xl pt-2">
              Nexoraa is a technology collective focused on artificial intelligence, software engineering, cybersecurity, experimentation, and community-driven innovation.
            </p>

            <p className="text-sm sm:text-base text-nex-muted leading-relaxed max-w-3xl">
              We reject bloated software, generic templates, and superficial AI wrappers. Every project we engineer is built from foundational principles—blending low-latency distributed systems, rigorous cryptographic guarantees, and verified machine learning models into tools that empower developers, hackathons, and high-velocity teams.
            </p>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-mono text-xs text-nex-cyan hover:text-nex-cyan-light tracking-wider border-b border-nex-cyan/30 hover:border-nex-cyan pb-1 transition-all"
              >
                <span>EXPLORE OUR COLLECTIVE ARCHITECTURE</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Minimal Editorial Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-20 sm:mt-24 pt-12 border-t border-white/10">
          {stats.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-2 select-none"
            >
              <div className="font-editorial text-4xl sm:text-5xl md:text-6xl font-extrabold text-nex-primary tracking-tight">
                {item.value}
              </div>
              <div className="text-mono text-xs text-nex-cyan font-semibold tracking-wider">
                {item.label}
              </div>
              <div className="text-xs text-nex-muted leading-relaxed">
                {item.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
