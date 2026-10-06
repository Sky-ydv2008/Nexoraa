import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles, Send } from 'lucide-react';
import { submitJoin } from '../services/api';

const roleOptions = [
  "FRONTEND",
  "BACKEND",
  "AI / ML",
  "CYBERSECURITY",
  "ANDROID",
  "UI / UX",
  "DEVOPS",
  "RESEARCH",
  "OTHER"
];

const JoinSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    github: '',
    portfolio: '',
    role: 'FRONTEND',
    skills: '',
    experience: '',
    whyNexoraa: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.skills || !formData.whyNexoraa) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await submitJoin(formData);
      if (res.success) {
        setSubmitted(true);
      } else {
        setError(res.error || 'Submission failed');
      }
    } catch (err) {
      setError('Connection disrupted. Please retry or contact directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="join" className="relative py-24 sm:py-32 border-t border-white/10 bg-[#080D1D]">
      <div className="max-w-[1550px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Editorial Heading & Recruitment Statement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-mono text-xs text-nex-cyan tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-nex-cyan" />
              09 / RECRUITMENT
            </div>

            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-nex-primary leading-[0.95] uppercase">
              JOIN THE<br />
              NEXT BUILD.
            </h2>

            <p className="text-base sm:text-lg text-nex-secondary/90 leading-relaxed max-w-md">
              We are constantly seeking ambitious engineers, hackers, designers, and researchers who thrive in high-autonomy environments.
            </p>

            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] space-y-3 text-xs text-nex-muted">
              <div className="text-mono text-nex-primary font-bold">WHAT WE LOOK FOR:</div>
              <ul className="space-y-1.5 text-nex-secondary/80">
                <li>• Proven builders with active GitHub repositories or live demos</li>
                <li>• Hunger to compete in national &amp; global hackathons</li>
                <li>• Foundational mastery over DSA, distributed systems, or ML</li>
                <li>• Passion for editorial minimalism and tactile craftsmanship</li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Application Form or Success State */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card-glass-active p-8 sm:p-12 rounded-2xl text-center space-y-5 border border-nex-cyan/40"
                >
                  <div className="w-14 h-14 rounded-full bg-nex-cyan/15 border border-nex-cyan flex items-center justify-center mx-auto text-nex-cyan">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-nex-primary tracking-tight uppercase">
                    APPLICATION RECEIVED
                  </h3>
                  <p className="text-base text-nex-secondary/90 max-w-md mx-auto leading-relaxed">
                    "Nexoraa will review your application." Our architectural team will evaluate your code repositories and dispatch an uplink response shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        github: '',
                        portfolio: '',
                        role: 'FRONTEND',
                        skills: '',
                        experience: '',
                        whyNexoraa: ''
                      });
                    }}
                    className="text-mono text-xs text-nex-cyan hover:underline mt-4 inline-block"
                  >
                    SUBMIT ANOTHER CANDIDATE UPLINK
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="card-glass rounded-2xl p-6 sm:p-10 border border-white/10 space-y-5 shadow-2xl"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 text-mono text-xs">
                    <span className="text-nex-primary font-semibold">CANDIDATE UPLINK FORM</span>
                    <span className="text-nex-cyan text-[11px]">* ALL FIELDS ENCRYPTED</span>
                  </div>

                  {error && (
                    <div className="p-3 rounded bg-red-950/40 border border-red-500/30 text-red-300 text-xs text-mono">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-mono text-xs text-nex-muted mb-1.5">NAME *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Shivam Yadav"
                        className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded-lg p-3 text-sm text-nex-primary focus:outline-none text-mono transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-mono text-xs text-nex-muted mb-1.5">EMAIL *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="engineer@domain.com"
                        className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded-lg p-3 text-sm text-nex-primary focus:outline-none text-mono transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-mono text-xs text-nex-muted mb-1.5">GITHUB REPOSITORY *</label>
                      <input
                        type="url"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        placeholder="https://github.com/username"
                        className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded-lg p-3 text-sm text-nex-primary focus:outline-none text-mono transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-mono text-xs text-nex-muted mb-1.5">PORTFOLIO / DEMO URL</label>
                      <input
                        type="url"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        placeholder="https://yourportfolio.tech"
                        className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded-lg p-3 text-sm text-nex-primary focus:outline-none text-mono transition-colors"
                      />
                    </div>
                  </div>

                  {/* Primary Role Selector */}
                  <div>
                    <label className="block text-mono text-xs text-nex-muted mb-1.5">PRIMARY ROLE FOCUS *</label>
                    <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                      {roleOptions.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, role: r }))}
                          className={`p-2.5 rounded-lg border text-mono text-xs tracking-wider transition-all text-center ${
                            formData.role === r
                              ? 'bg-nex-darkblue border-nex-cyan text-nex-cyan-light font-bold shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                              : 'bg-white/[0.02] border-white/10 text-nex-secondary/70 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-mono text-xs text-nex-muted mb-1.5">TECHNICAL SKILLS &amp; LANGUAGES *</label>
                    <input
                      type="text"
                      name="skills"
                      required
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="e.g. Core Java, Python, PyTorch, React, Node, WebSockets, Rust"
                      className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded-lg p-3 text-sm text-nex-primary focus:outline-none text-mono transition-colors"
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-mono text-xs text-nex-muted mb-1.5">EXPERIENCE / RELEVANT WORK</label>
                    <textarea
                      name="experience"
                      rows={2}
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Briefly describe what you've built, hackathons won, or systems deployed..."
                      className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded-lg p-3 text-sm text-nex-primary focus:outline-none text-mono transition-colors resize-none"
                    />
                  </div>

                  {/* Why Nexoraa */}
                  <div>
                    <label className="block text-mono text-xs text-nex-muted mb-1.5">WHY NEXORAA? *</label>
                    <textarea
                      name="whyNexoraa"
                      required
                      rows={3}
                      value={formData.whyNexoraa}
                      onChange={handleChange}
                      placeholder="What draws you to Nexoraa? What breakthrough would you like to engineer with us?"
                      className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded-lg p-3 text-sm text-nex-primary focus:outline-none text-mono transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-gradient-to-r from-nex-electric to-nex-cyan hover:from-nex-cyan hover:to-nex-cyan-light text-[#080D1D] font-bold text-mono text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.3)] disabled:opacity-50"
                  >
                    <span>{submitting ? 'TRANSMITTING APPLICATION...' : 'JOIN NEXORAA →'}</span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default JoinSection;
