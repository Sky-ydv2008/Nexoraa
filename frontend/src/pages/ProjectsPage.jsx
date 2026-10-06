import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink, Filter } from 'lucide-react';
import { getProjects } from '../services/api';

const domains = ["ALL", "AI & INTELLIGENCE", "COMPUTER VISION", "SYMBOLIC SYSTEMS", "DOCUMENT RAG", "DISTRIBUTED MESH"];

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects();
        if (res.success && res.data) {
          setProjects(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
    window.scrollTo(0, 0);
  }, []);

  const filtered = selectedDomain === "ALL" 
    ? projects 
    : projects.filter(p => p.domain.toLowerCase().includes(selectedDomain.toLowerCase()) || p.title.toLowerCase().includes(selectedDomain.toLowerCase()));

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-24 bg-[#080D1D] text-nex-primary">
      <div className="max-w-[1550px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Header */}
        <div className="pb-12 border-b border-white/10 space-y-4">
          <div className="text-mono text-xs text-nex-cyan tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-nex-cyan" />
            WORK &amp; ARCHITECTURAL REPOSITORIES
          </div>
          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl font-black text-nex-primary uppercase tracking-tight">
            SELECTED PROJECTS
          </h1>
          <p className="text-base sm:text-lg text-nex-secondary/90 max-w-2xl font-normal leading-relaxed">
            Production platforms, autonomous engineering tooling, computer vision prototypes, and distributed runtimes built by the Nexoraa collective.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="py-8 flex flex-wrap items-center gap-2 border-b border-white/10">
          <div className="text-mono text-xs text-nex-muted mr-3 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-nex-cyan" />
            <span>FILTER:</span>
          </div>
          {domains.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDomain(d)}
              className={`px-3 py-1.5 rounded text-mono text-xs tracking-wider transition-all ${
                selectedDomain === d
                  ? 'bg-nex-darkblue border border-nex-cyan text-nex-cyan-light shadow-[0_0_8px_rgba(34,211,238,0.2)]'
                  : 'bg-white/[0.02] border border-white/10 text-nex-secondary/80 hover:text-white hover:border-white/20'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="divide-y divide-white/10 mt-4">
          {filtered.map((project) => (
            <div
              key={project.slug}
              className="py-10 group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:bg-white/[0.01] transition-all relative pl-0 hover:pl-4"
            >
              {/* Cyan Accent Indicator */}
              <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-nex-cyan opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Number & Domain */}
              <div className="lg:col-span-2 text-mono text-xs space-y-1">
                <span className="text-xl font-bold text-nex-cyan">{project.number}</span>
                <div className="text-nex-muted tracking-wider text-[11px]">{project.domain}</div>
                <div className="pt-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-nex-secondary">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="lg:col-span-6 space-y-3">
                <Link
                  to={`/projects/${project.slug}`}
                  className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-nex-primary hover:text-nex-cyan-light tracking-tight transition-colors inline-block"
                >
                  {project.title}
                </Link>
                <p className="text-sm sm:text-base text-nex-secondary/90 leading-relaxed max-w-xl">
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack?.map((t) => (
                    <span
                      key={t}
                      className="text-mono text-[10px] px-2 py-0.5 rounded bg-[#060A17] border border-white/10 text-nex-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Preview Graphic & Actions */}
              <div className="lg:col-span-4 space-y-3">
                <div className="rounded-lg overflow-hidden border border-white/10 bg-[#060A17] aspect-[16/10]">
                  <img
                    src={project.previewImage || "/assets/projects/nexus.png"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center justify-between text-mono text-xs pt-1">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-nex-secondary hover:text-white transition-colors flex items-center gap-1"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GITHUB</span>
                    </a>
                  )}
                  <Link
                    to={`/projects/${project.slug}`}
                    className="text-nex-cyan hover:text-nex-cyan-light transition-colors flex items-center gap-1 font-bold"
                  >
                    <span>VIEW SPECIFICATION</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
