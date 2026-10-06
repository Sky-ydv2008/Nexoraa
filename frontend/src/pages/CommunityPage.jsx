import React from 'react';
import CommunitySection from '../sections/CommunitySection';
import { MessageSquare, Calendar, Trophy, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const events = [
  {
    title: "Nexoraa 48-Hour High Velocity Hackathon Sprint",
    date: "NOVEMBER 15-17, 2026",
    type: "HYBRID // BENGALURU & ONLINE",
    desc: "Open engineering competition focused on autonomous developer agents and edge vision perception models with cash prizes and mentorship."
  },
  {
    title: "Decentralized Systems & Local-First Runtimes Tech Talk",
    date: "OCTOBER 25, 2026",
    type: "VIRTUAL STREAM",
    desc: "Deep dive into building sub-100ms retrieval-augmented generation pipelines and local-first CRDT synchronization."
  }
];

const CommunityPage = () => {
  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-24 bg-[#080D1D] text-nex-primary">
      <div className="max-w-[1550px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="pb-12 border-b border-white/10 space-y-4">
          <div className="text-mono text-xs text-nex-cyan tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-nex-cyan" />
            07 / DEVELOPER COLLECTIVE
          </div>
          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl font-black text-nex-primary uppercase tracking-tight">
            COMMUNITY OF BUILDERS
          </h1>
          <p className="text-base sm:text-lg text-nex-secondary/90 max-w-2xl font-normal leading-relaxed">
            Connecting passionate ethical hackers, AI engineers, and system designers across top universities and open-source networks.
          </p>
        </div>

        <div className="-mt-8">
          <CommunitySection />
        </div>

        {/* Upcoming Community Events */}
        <div className="pt-16 border-t border-white/10 space-y-8">
          <div className="flex items-center justify-between text-mono text-xs">
            <span className="text-nex-cyan tracking-widest">COMMUNITY EVENTS &amp; HACKATHONS</span>
            <span className="text-nex-muted">CALENDAR // 2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((ev, i) => (
              <div key={i} className="card-glass p-8 rounded-xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between text-mono text-xs">
                  <span className="text-nex-cyan flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {ev.date}
                  </span>
                  <span className="text-[10px] text-nex-secondary px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {ev.type}
                  </span>
                </div>
                <h3 className="font-editorial text-2xl font-bold text-nex-primary">
                  {ev.title}
                </h3>
                <p className="text-sm text-nex-secondary/80 leading-relaxed">
                  {ev.desc}
                </p>
                <div className="pt-2">
                  <a
                    href="https://discord.gg/nexoraa"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-mono text-xs text-nex-cyan hover:underline"
                  >
                    <span>REGISTER ON DISCORD UPLINK</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
