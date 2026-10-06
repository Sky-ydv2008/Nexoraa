import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Terminal, ArrowRight, CornerDownLeft } from 'lucide-react';
import { askAI } from '../services/api';
import Logo from '../components/common/Logo';

const suggestedPrompts = [
  "What is Nexoraa?",
  "What projects have you built?",
  "What is NEXUS?",
  "What is NETRAAI?",
  "Who are the team members?",
  "What technologies does Nexoraa use?",
  "What research are you doing?",
  "How can I join?"
];

const AISection = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (textToAsk) => {
    const question = textToAsk || query;
    if (!question.trim()) return;

    setLoading(true);
    try {
      const res = await askAI(question);
      if (res.success && res.data) {
        setResponse({
          question,
          answer: res.data.answer,
          category: res.data.category,
          pageReference: res.data.pageReference,
          confidence: res.data.confidence
        });
      }
    } catch (err) {
      setResponse({
        question,
        answer: "Nexoraa RAG system connection active. Please check your query or explore the navigation links.",
        category: "SYSTEM"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai" className="relative py-24 sm:py-32 border-t border-white/10 bg-[#080D1D]">
      <div className="max-w-[1550px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="text-mono text-xs text-nex-cyan tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-nex-cyan" />
              05 / AI INTELLIGENCE
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-nex-primary leading-none uppercase">
              ASK NEXORAA.
            </h2>
          </div>
          <div className="text-mono text-xs text-nex-muted max-w-sm">
            AN AI INTERFACE THAT UNDERSTANDS THE NEXORAA ECOSYSTEM, RESEARCH &amp; ARCHITECTURAL CODEBASES.
          </div>
        </div>

        {/* Large Interactive Preview Terminal */}
        <div className="mt-12 max-w-4xl mx-auto card-glass-active rounded-2xl p-6 sm:p-10 border border-nex-cyan/30 shadow-[0_20px_60px_-15px_rgba(8,13,29,0.95)]">
          {/* Terminal Top Bar */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10 text-mono text-xs">
            <div className="flex items-center gap-3">
              <Logo size="sm" variant="icon" link={false} glow={true} />
              <span className="text-nex-primary font-semibold">NEXORAA RAG ENGINE // V2026.1</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEM / ONLINE</span>
            </div>
          </div>

          {/* Interactive Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="mt-6 flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ASK NEXORAA..."
                className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded-lg px-4 py-3.5 text-sm sm:text-base text-nex-primary placeholder-nex-muted focus:outline-none text-mono transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-mono text-[10px] text-nex-muted hidden sm:inline">
                ENTER ↵
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3.5 bg-gradient-to-r from-nex-electric to-nex-cyan hover:from-nex-cyan hover:to-nex-cyan-light text-[#080D1D] font-bold text-mono text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)] disabled:opacity-50"
            >
              <span>{loading ? 'QUERYING...' : 'TRANSMIT'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Suggested Queries Chips */}
          <div className="mt-6">
            <div className="text-mono text-[10px] text-nex-muted tracking-wider mb-2">
              FREQUENT INQUIRIES // QUICK TEST:
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => {
                    setQuery(prompt);
                    handleAsk(prompt);
                  }}
                  className="text-mono text-[11px] px-3 py-1.5 rounded-full border border-white/10 hover:border-nex-cyan/40 bg-white/[0.02] hover:bg-white/[0.06] text-nex-secondary hover:text-white transition-all text-left"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic AI Response Box */}
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between text-mono text-[11px] text-nex-muted">
                <span className="text-nex-secondary">QUERY: "{response.question}"</span>
                {response.category && (
                  <span className="px-2 py-0.5 rounded bg-nex-cyan/10 text-nex-cyan border border-nex-cyan/30">
                    CATEGORY // {response.category}
                  </span>
                )}
              </div>
              <div className="p-4 sm:p-5 rounded-lg bg-[#060A17]/80 border border-nex-cyan/20 text-nex-primary text-sm sm:text-base leading-relaxed relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-nex-cyan rounded-l" />
                <p className="pl-2">{response.answer}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AISection;
