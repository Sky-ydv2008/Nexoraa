import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const projectsData = [
  {
    number: "01",
    slug: "nexus",
    name: "NEXUS",
    domain: "AI / INTELLIGENCE & WORKSPACE",
    shortDescription: "AI-Powered Team Collaboration & Autonomous Project Execution Platform engineered for high-velocity engineering collectives.",
    technology: "REACT / NODE / SOCKET.IO / RAG",
    status: "LIVE PROTOTYPE",
    previewImage: "/assets/projects/nexus.png",
    githubUrl: "https://github.com/shivam-upendra/nexus-ai-workspace"
  },
  {
    number: "02",
    slug: "netraai",
    name: "NETRAAI",
    domain: "COMPUTER VISION / CROWD SAFETY",
    shortDescription: "AI-assisted crowd-safety and real-time visual perception framework engineered for high-density public venues and national hackathons.",
    technology: "PYTHON / PYTORCH / OPENCV / FASTAPI",
    status: "HACKATHON WINNER",
    previewImage: "/assets/projects/netraai.png",
    githubUrl: "https://github.com/shivam-upendra/netraai-vision-defense"
  },
  {
    number: "03",
    slug: "mindweave",
    name: "MINDWEAVE",
    domain: "AI / SYMBOLIC & NEURAL REASONING",
    shortDescription: "Hybrid neuro-symbolic cognitive intelligence engine for verifiable algorithmic reasoning and complex logical deduction.",
    technology: "PYTORCH / Z3 PROVER / NEO4J / REACT",
    status: "RESEARCH PREVIEW",
    previewImage: "/assets/projects/mindweave.png",
    githubUrl: "https://github.com/shivam-upendra/mindweave-neurosymbolic"
  },
  {
    number: "04",
    slug: "briefbox",
    name: "BRIEFBOX",
    domain: "KNOWLEDGE / DOCUMENT INTELLIGENCE",
    shortDescription: "High-throughput autonomous document extraction, semantic RAG vectorization, and multi-document intelligence engine.",
    technology: "REACT / NODE / PYTHON / QDRANT",
    status: "PRODUCTION READY",
    previewImage: "/assets/projects/briefbox.png",
    githubUrl: "https://github.com/shivam-upendra/briefbox-document-rag"
  },
  {
    number: "05",
    slug: "xapexx",
    name: "XAPEXX",
    domain: "OFFLINE / DISTRIBUTED MESH SYSTEMS",
    shortDescription: "Resilient peer-to-peer offline synchronization protocol and local-first data runtime for disconnected computing environments.",
    technology: "RUST / WEBASSEMBLY / CRDT / WEBGPU",
    status: "LAB EXPERIMENT",
    previewImage: "/assets/projects/xapexx.png",
    githubUrl: "https://github.com/shivam-upendra/xapexx-mesh-sync"
  }
];

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState(projectsData[0]);

  return (
    <section id="projects" className="relative py-24 sm:py-32 border-t border-white/10 bg-[#080D1D]">
      <div className="max-w-[1550px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="text-mono text-xs text-nex-cyan tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-nex-cyan" />
              04 / WORK
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-nex-primary leading-none uppercase">
              SELECTED<br />PROJECTS
            </h2>
          </div>
          <div className="text-mono text-xs text-nex-muted max-w-xs">
            ORIGINAL PRODUCTION PLATFORMS, COMPETITION PROTOTYPES &amp; RESEARCH REPOSITORIES.
          </div>
        </div>

        {/* Editorial Project List + Interactive Floating Graphic Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 items-start">
          
          {/* LEFT: Editorial Rows */}
          <div className="lg:col-span-8 divide-y divide-white/10">
            {projectsData.map((project) => {
              const isHovered = hoveredProject?.slug === project.slug;

              return (
                <div
                  key={project.slug}
                  onMouseEnter={() => setHoveredProject(project)}
                  className={`group relative py-7 sm:py-9 transition-all duration-300 ${
                    isHovered ? 'pl-3 sm:pl-5' : 'pl-0'
                  }`}
                >
                  {/* Subtle Cyan Accent Indicator Line on Left */}
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-[2px] bg-nex-cyan transition-all duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                    {/* Number & Project Name & Domain */}
                    <div className="flex items-baseline gap-4 sm:gap-8">
                      <span className={`text-mono text-base font-bold transition-colors ${
                        isHovered ? 'text-nex-cyan' : 'text-nex-muted'
                      }`}>
                        {project.number}
                      </span>

                      <div>
                        <Link
                          to={`/projects/${project.slug}`}
                          className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-nex-primary hover:text-nex-cyan-light tracking-tight transition-colors inline-block"
                        >
                          {project.name}
                        </Link>
                        <div className="text-mono text-[11px] text-nex-cyan tracking-wider mt-1">
                          {project.domain}
                        </div>
                      </div>
                    </div>

                    {/* Status & Action */}
                    <div className="flex items-center gap-4 text-mono text-xs self-start sm:self-auto">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-nex-secondary">
                        {project.status}
                      </span>
                      <Link
                        to={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-nex-primary hover:text-nex-cyan transition-colors"
                      >
                        <span className="hidden sm:inline">VIEW SPEC</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Description & Technology Row */}
                  <div className="mt-4 sm:ml-12 sm:pl-4 space-y-2">
                    <p className="text-sm sm:text-base text-nex-secondary/80 max-w-2xl leading-relaxed">
                      {project.shortDescription}
                    </p>
                    <div className="text-mono text-[11px] text-nex-muted tracking-wider">
                      TECH: <span className="text-nex-secondary">{project.technology}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: High-tech Visual Preview Screen */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28">
            <div className="card-glass rounded-xl p-4 border border-white/10 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-mono text-[10px] text-nex-muted">
                <span>SYSTEM PREVIEW // VISUAL TELEMETRY</span>
                <span className="text-nex-cyan flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-nex-cyan animate-pulse" />
                  ACTIVE STREAM
                </span>
              </div>

              <div className="relative mt-3 rounded-lg overflow-hidden border border-white/10 bg-[#060A17] aspect-[16/10] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={hoveredProject.slug}
                    src={hoveredProject.previewImage}
                    alt={hoveredProject.name}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#080D1D] via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-mono text-xs">
                  <span className="text-nex-primary font-bold">{hoveredProject.name}</span>
                  <Link
                    to={`/projects/${hoveredProject.slug}`}
                    className="text-[11px] text-nex-cyan hover:underline flex items-center gap-1"
                  >
                    <span>SPECIFICATION</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-mono text-[11px]">
                <a
                  href={hoveredProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-nex-secondary hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>SOURCE CODE</span>
                </a>
                <Link
                  to={`/projects/${hoveredProject.slug}`}
                  className="text-nex-cyan hover:text-nex-cyan-light transition-colors"
                >
                  EXPLORE ARCHITECTURE →
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* View All Projects Footer Link */}
        <div className="pt-12 text-center sm:text-left">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-mono text-xs text-nex-cyan hover:text-nex-cyan-light tracking-wider border-b border-nex-cyan/30 hover:border-nex-cyan pb-1 transition-all"
          >
            <span>VIEW ALL SYSTEMS &amp; ARCHITECTURAL SPECIFICATIONS</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
