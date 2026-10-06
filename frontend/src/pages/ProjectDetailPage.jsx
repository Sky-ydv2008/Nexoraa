import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, Cpu, CheckCircle2, Layers, AlertTriangle } from 'lucide-react';
import { getProjectBySlug, getProjects } from '../services/api';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getProjectBySlug(slug);
        if (res.success && res.data) {
          setProject(res.data);
          // fetch related projects
          const allRes = await getProjects();
          if (allRes.success && allRes.data) {
            setRelated(allRes.data.filter(p => p.slug !== slug).slice(0, 3));
          }
        } else {
          setError('Project specification not found on this node.');
        }
      } catch (err) {
        setError('Error retrieving project specification.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center text-mono text-sm text-nex-cyan">
        <span className="w-2 h-2 rounded-full bg-nex-cyan animate-ping mr-2" />
        LOADING PROJECT SPECIFICATION...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-32 pb-24 max-w-4xl mx-auto px-6 text-center space-y-4">
        <div className="text-mono text-xs text-red-400">ERROR // 404</div>
        <h1 className="font-editorial text-4xl text-nex-primary">SPECIFICATION NOT FOUND</h1>
        <p className="text-nex-secondary text-sm">{error}</p>
        <Link to="/projects" className="inline-flex items-center gap-2 text-mono text-xs text-nex-cyan hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO ALL PROJECTS</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-24 bg-[#080D1D] text-nex-primary">
      <div className="max-w-[1550px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Navigation Breadcrumb */}
        <div className="pb-8 border-b border-white/10 flex items-center justify-between text-mono text-xs text-nex-muted">
          <Link to="/projects" className="inline-flex items-center gap-1.5 hover:text-nex-cyan transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO WORK</span>
          </Link>
          <div className="flex items-center gap-3">
            <span>SPEC // {project.number}</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">{project.status}</span>
          </div>
        </div>

        {/* Hero Section of Project Detail */}
        <div className="py-12 sm:py-16 space-y-6">
          <div className="text-mono text-xs text-nex-cyan tracking-widest">
            {project.domain}
          </div>

          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-nex-primary tracking-tight uppercase leading-none">
            {project.title}
          </h1>

          <p className="text-lg sm:text-2xl text-nex-secondary/90 max-w-4xl leading-relaxed font-normal">
            {project.shortDescription}
          </p>

          {/* Action Links & Tech Chips */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-lg border border-white/15 bg-white/5 hover:border-nex-cyan hover:bg-white/10 text-mono text-xs font-bold transition-all flex items-center gap-2 text-nex-primary"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB REPOSITORY</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-nex-cyan" />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-lg bg-nex-cyan hover:bg-nex-cyan-light text-[#080D1D] text-mono text-xs font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>LIVE DEMO UPLINK</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Visual Telemetry / Screenshot Hero */}
        <div className="my-8 rounded-2xl overflow-hidden border border-white/15 bg-[#060A17] shadow-2xl relative">
          <img
            src={project.previewImage || "/assets/projects/nexus.png"}
            alt={project.title}
            className="w-full h-auto object-cover max-h-[650px]"
          />
          <div className="p-4 sm:p-6 bg-[#080D1D]/90 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-mono text-xs text-nex-muted">
            <div>TELEMETRY: VISUAL ARCHITECTURE &amp; TOPOLOGY SPECIFICATION</div>
            <div className="text-nex-cyan">AUTHENTICATED NEXORAA ARTIFACT</div>
          </div>
        </div>

        {/* Detailed Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-16 border-t border-white/10">
          {/* LEFT: Problem, Solution, Architecture, AI System */}
          <div className="lg:col-span-8 space-y-12">
            {/* Description */}
            <div className="space-y-4">
              <div className="text-mono text-xs text-nex-cyan tracking-widest">
                01 // SYSTEM OVERVIEW
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-nex-primary">
                Executive Synthesis
              </h2>
              <p className="text-base sm:text-lg text-nex-secondary/90 leading-relaxed font-normal">
                {project.fullDescription || project.shortDescription}
              </p>
            </div>

            {/* Problem & Solution Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/10">
              <div className="card-glass p-6 rounded-xl border border-red-500/20 space-y-3">
                <div className="text-mono text-xs text-red-400 font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  THE PROBLEM CONFLICT
                </div>
                <p className="text-sm text-nex-secondary/90 leading-relaxed">
                  {project.problem || "Legacy fragmented architectures force engineering teams to switch contexts constantly, generating latency and systemic errors."}
                </p>
              </div>

              <div className="card-glass p-6 rounded-xl border border-nex-cyan/30 space-y-3">
                <div className="text-mono text-xs text-nex-cyan font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  THE NEXORAA SOLUTION
                </div>
                <p className="text-sm text-nex-secondary/90 leading-relaxed">
                  {project.solution || "Consolidated unified platform powered by autonomous intelligence that guarantees deterministic execution and zero-latency state synchronization."}
                </p>
              </div>
            </div>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="text-mono text-xs text-nex-cyan tracking-widest">
                  02 // CAPABILITIES &amp; FEATURES
                </div>
                <h2 className="font-editorial text-3xl font-bold text-nex-primary">
                  Engineering Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-white/[0.02] border border-white/10 flex items-start gap-3">
                      <span className="text-mono text-xs text-nex-cyan font-bold mt-0.5">0{idx + 1}</span>
                      <span className="text-sm text-nex-secondary">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architecture & AI System */}
            <div className="space-y-6 pt-6 border-t border-white/10">
              <div className="text-mono text-xs text-nex-cyan tracking-widest">
                03 // TECHNICAL BLUEPRINT
              </div>
              <h2 className="font-editorial text-3xl font-bold text-nex-primary">
                System Topology &amp; AI Implementation
              </h2>

              <div className="space-y-4 text-sm text-nex-secondary leading-relaxed">
                <div>
                  <span className="text-mono text-xs text-nex-primary font-bold block mb-1">
                    BACKEND &amp; DISTRIBUTED ARCHITECTURE:
                  </span>
                  <p>{project.architecture || "High-concurrency microservices, WebSocket bidirectional event dispatch, optimistic local-first caching, and fault-tolerant persistent fallback store."}</p>
                </div>

                <div>
                  <span className="text-mono text-xs text-nex-primary font-bold block mb-1">
                    AI INGESTION &amp; RAG SYSTEM:
                  </span>
                  <p>{project.aiDetails || "Custom multi-vector embeddings reranking, structured schema validation, LangChain / DSPy execution pipelines, and deterministic constraint verification."}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Tech Stack & Metadata Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="card-glass-active p-6 rounded-xl border border-white/15 space-y-6 sticky top-28">
              <div className="text-mono text-xs font-bold text-nex-primary border-b border-white/10 pb-3">
                SPECIFICATION MATRIX
              </div>

              {/* Status */}
              <div>
                <span className="text-mono text-[11px] text-nex-muted block mb-1">DEPLOYMENT STATUS</span>
                <span className="text-mono text-xs text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                  {project.status}
                </span>
              </div>

              {/* Domain */}
              <div>
                <span className="text-mono text-[11px] text-nex-muted block mb-1">COMPUTATIONAL DOMAIN</span>
                <span className="text-sm font-semibold text-nex-primary">{project.domain}</span>
              </div>

              {/* Tech Stack Badges */}
              <div>
                <span className="text-mono text-[11px] text-nex-muted block mb-2">TECHNOLOGY STACK</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack?.map((t) => (
                    <span
                      key={t}
                      className="text-mono text-[11px] px-2.5 py-1 rounded bg-[#060A17] border border-white/10 text-nex-cyan-light"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Code Uplinks */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded border border-white/15 hover:border-nex-cyan text-mono text-xs text-nex-primary hover:text-nex-cyan flex items-center justify-center gap-2 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>VIEW ON GITHUB</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded bg-nex-cyan/15 border border-nex-cyan text-mono text-xs text-nex-cyan-light hover:bg-nex-cyan/25 flex items-center justify-center gap-2 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>LAUNCH APPLICATION</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PROJECTS ROW */}
        {related.length > 0 && (
          <div className="pt-16 border-t border-white/10 space-y-8">
            <div className="flex items-center justify-between text-mono text-xs">
              <span className="text-nex-cyan tracking-wider">RELATED SYSTEMS</span>
              <Link to="/projects" className="text-nex-muted hover:text-nex-primary transition-colors">
                VIEW ALL 05 PROJECTS →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/projects/${p.slug}`}
                  className="card-glass p-6 rounded-xl border border-white/10 hover:border-nex-cyan/40 transition-all group block"
                >
                  <div className="flex items-center justify-between text-mono text-xs text-nex-muted mb-3">
                    <span className="text-nex-cyan font-bold">{p.number}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:text-nex-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-nex-primary group-hover:text-nex-cyan-light transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-nex-secondary/80 mt-2 line-clamp-2 leading-relaxed">
                    {p.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
