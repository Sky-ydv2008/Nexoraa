import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

const Footer = () => {
  const [times, setTimes] = useState({
    mumbai: '--:--:--',
    utc: '--:--:--',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimes({
        mumbai: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }),
        utc: now.toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false })
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative border-t border-white/10 bg-[#080D1D] text-nex-primary overflow-hidden pt-16 sm:pt-20 pb-12 select-none">
      {/* Ambient background glow behind giant wordmark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-radial from-nex-cyan/10 via-nex-electric/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1550px] mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* Top Grid: Brand & Navigation & Clocks */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Logo size="md" glow={true} />
            <p className="font-editorial text-lg sm:text-xl text-nex-secondary/90 tracking-tight max-w-sm mt-3">
              "BUILDING WHAT COMES NEXT."
            </p>
            <p className="text-sm text-nex-muted max-w-sm leading-relaxed">
              AI, engineering and experimentation for the next generation of technology. A serious collective of builders and researchers.
            </p>
            <div className="text-mono text-xs text-nex-cyan flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-nex-cyan animate-pulse" />
              <span>SYSTEM / ONLINE</span>
              <span className="text-white/20">|</span>
              <span className="text-nex-muted">BUILD / 2026.1</span>
            </div>
          </div>

          {/* Active Nodes Clocks */}
          <div className="md:col-span-3 text-mono text-xs space-y-3">
            <div className="text-nex-primary font-semibold tracking-wider pb-1 border-b border-white/10">
              ACTIVE NODES
            </div>
            <div className="flex justify-between items-center text-nex-secondary">
              <span>MUMBAI (IST)</span>
              <span className="text-nex-cyan-light font-mono">{times.mumbai}</span>
            </div>
            <div className="flex justify-between items-center text-nex-secondary">
              <span>UTC PROTOCOL</span>
              <span className="text-nex-cyan-light font-mono">{times.utc}</span>
            </div>
            <div className="flex justify-between items-center text-nex-secondary">
              <span>NODE STATUS</span>
              <span className="text-emerald-400">ACTIVE &amp; SYNCD</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 text-mono text-xs space-y-2.5">
            <div className="text-nex-primary font-semibold tracking-wider pb-1 border-b border-white/10">
              NAVIGATION
            </div>
            <ul className="space-y-2 text-nex-secondary">
              <li><Link to="/projects" className="hover:text-nex-cyan transition-colors">WORK</Link></li>
              <li><Link to="/research" className="hover:text-nex-cyan transition-colors">RESEARCH</Link></li>
              <li><Link to="/team" className="hover:text-nex-cyan transition-colors">TEAM</Link></li>
              <li><Link to="/community" className="hover:text-nex-cyan transition-colors">COMMUNITY</Link></li>
              <li><Link to="/ai" className="hover:text-nex-cyan transition-colors">AI SYSTEM</Link></li>
              <li><Link to="/join" className="hover:text-nex-cyan transition-colors">JOIN COLLECTIVE</Link></li>
              <li><Link to="/contact" className="hover:text-nex-cyan transition-colors">CONTACT</Link></li>
            </ul>
          </div>

          {/* Socials & Admin */}
          <div className="md:col-span-2 text-mono text-xs space-y-2.5">
            <div className="text-nex-primary font-semibold tracking-wider pb-1 border-b border-white/10">
              CONNECT
            </div>
            <ul className="space-y-2 text-nex-secondary">
              <li>
                <a href="https://github.com/shivam-upendra" target="_blank" rel="noreferrer" className="hover:text-nex-cyan transition-colors flex items-center gap-1">
                  <span>GITHUB</span>
                  <span>↗</span>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/shivam-yadav" target="_blank" rel="noreferrer" className="hover:text-nex-cyan transition-colors flex items-center gap-1">
                  <span>LINKEDIN</span>
                  <span>↗</span>
                </a>
              </li>
              <li>
                <a href="https://discord.gg/nexoraa" target="_blank" rel="noreferrer" className="hover:text-nex-cyan transition-colors flex items-center gap-1">
                  <span>DISCORD</span>
                  <span>↗</span>
                </a>
              </li>
              <li className="pt-2">
                <Link to="/admin/login" className="text-nex-muted hover:text-nex-cyan transition-colors flex items-center gap-1 text-[11px]">
                  <span>ADMIN PORTAL</span>
                  <span>🔒</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Giant Illuminated Wordmark Section inspired by Sahiko */}
        <div className="relative py-12 sm:py-16 text-center select-none overflow-hidden">
          <div className="font-editorial text-[16vw] sm:text-[14vw] md:text-[13vw] font-extrabold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/10 to-transparent pointer-events-none transition-all">
            NEXORAA
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-mono text-[11px] text-nex-muted pt-6 border-t border-white/5">
            <div>
              © 2026 NEXORAA TECHNOLOGY COLLECTIVE. ALL RIGHTS RESERVED.
            </div>
            <div className="flex items-center gap-4 text-nex-secondary/70">
              <span>LATENCY: 12ms</span>
              <span>•</span>
              <span>ENGINE: VITE / REACT / NODE</span>
              <span>•</span>
              <span className="text-nex-cyan">SECURE LINK</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
