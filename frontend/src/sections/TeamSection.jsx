import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTeam } from '../services/api';

const defaultMember = {
  num: "01",
  name: "SHIVAM UPENDRA YADAV",
  role: "FOUNDER / LEAD FULL STACK ARCHITECT",
  bio: "Core software engineer and full stack architect. Skilled in Java, C++, Python, JavaScript, and distributed engineering. Leading Nexoraa's AI research, NetraAI edge vision systems, and autonomous project execution platforms.",
  skills: ["Full Stack Systems", "Core Java", "Python", "DSA & Algorithms", "System Architecture", "AI Automation"],
  github: "https://github.com/shivam-upendra",
  linkedin: "https://linkedin.com/in/shivam-yadav",
  portfolio: "https://shivam.nexoraa.tech"
};

const TeamSection = () => {
  const [hovered, setHovered] = useState(false);
  const [member, setMember] = useState(defaultMember);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await getTeam();
        if (res.success && res.data && res.data.length > 0) {
          const shivam = res.data.find(m => m.name.toLowerCase().includes('shivam')) || res.data[0];
          setMember({
            num: "01",
            name: shivam.name.toUpperCase(),
            role: shivam.role.toUpperCase(),
            bio: shivam.bio,
            skills: shivam.skills || defaultMember.skills,
            github: shivam.githubUrl || defaultMember.github,
            linkedin: shivam.linkedinUrl || defaultMember.linkedin,
            portfolio: shivam.portfolioUrl || defaultMember.portfolio
          });
        }
      } catch (err) {
        // Fallback to defaultMember
      }
    };
    fetchTeam();
  }, []);

  return (
    <section id="team" className="relative py-24 sm:py-32 border-t border-white/10 bg-[#080D1D]">
      <div className="max-w-[1550px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="text-mono text-xs text-nex-cyan tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-nex-cyan" />
              06 / TEAM &amp; LEADERSHIP
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-nex-primary leading-none uppercase">
              THE BUILDER
            </h2>
          </div>
          <div className="text-mono text-xs text-nex-muted max-w-xs">
            FOUNDER, LEAD ARCHITECT &amp; RESEARCHER DRIVING NEXORAA.
          </div>
        </div>

        {/* Editorial Single Builder Row */}
        <div className="divide-y divide-white/10 mt-4">
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`py-10 sm:py-14 transition-all duration-300 relative ${
              hovered ? 'pl-4 sm:pl-6 bg-white/[0.01]' : 'pl-0'
            }`}
          >
            {/* Cyan Accent Indicator */}
            <span
              className={`absolute left-0 top-0 bottom-0 w-[2px] bg-nex-cyan transition-all duration-300 ${
                hovered ? 'opacity-100' : 'opacity-0'
              }`}
            />

            <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-6">
              {/* Left: Number + Name + Role */}
              <div className="flex items-baseline gap-6 sm:gap-10">
                <span className={`text-mono text-2xl font-bold transition-colors ${
                  hovered ? 'text-nex-cyan' : 'text-nex-muted'
                }`}>
                  {member.num}
                </span>
                <div>
                  <h3 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-nex-primary hover:text-nex-cyan-light tracking-tight transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-mono text-xs sm:text-sm text-nex-cyan tracking-widest mt-2 font-semibold">
                    {member.role}
                  </div>
                </div>
              </div>

              {/* Right: Social Uplinks */}
              <div className="flex items-center gap-4 text-mono text-xs self-start lg:self-auto">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 border border-white/10 hover:border-nex-cyan rounded text-nex-secondary hover:text-white transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 border border-white/10 hover:border-nex-cyan rounded text-nex-secondary hover:text-white transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={member.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 border border-white/10 hover:border-nex-cyan rounded text-nex-secondary hover:text-white transition-colors"
                  title="Portfolio"
                >
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Expanded Details */}
            <div className="mt-6 sm:ml-16 sm:pl-4 space-y-4">
              <p className="text-base sm:text-lg text-nex-secondary/90 max-w-4xl leading-relaxed font-normal">
                {member.bio}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-mono text-xs px-3 py-1 rounded bg-[#060A17] border border-white/10 text-nex-cyan-light"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/team"
            className="inline-flex items-center gap-2 text-mono text-xs text-nex-cyan hover:text-nex-cyan-light tracking-wider border-b border-nex-cyan/30 hover:border-nex-cyan pb-1 transition-all"
          >
            <span>VIEW COMPLETE BUILDER PORTFOLIO &amp; PROFILES</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            to="/join"
            className="text-mono text-xs text-nex-muted hover:text-white transition-colors"
          >
            LOOKING TO JOIN THE TEAM? APPLY HERE →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
