import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Mail, Github, Linkedin, MessageSquare, Terminal } from 'lucide-react';
import { sendContact } from '../services/api';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in required fields.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await sendContact(formData);
      if (res.success) {
        setSent(true);
      } else {
        setError(res.error || 'Failed to transmit message');
      }
    } catch (err) {
      setError('Connection disrupted. Please retry or contact directly via email.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 border-t border-white/10 bg-[#080D1D]">
      <div className="max-w-[1550px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Contact Information & Uplink Protocols */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-mono text-xs text-nex-cyan tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-nex-cyan" />
              10 / SECURE UPLINK
            </div>

            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-nex-primary leading-[0.95] uppercase">
              LET'S BUILD<br />
              SOMETHING.
            </h2>

            <p className="text-base sm:text-lg text-nex-secondary/90 leading-relaxed max-w-md">
              Whether you are organizing a national hackathon, seeking research collaboration, or looking to deploy our systems, establish a direct uplink with our engineering collective.
            </p>

            {/* Direct Channels */}
            <div className="pt-4 space-y-3 text-mono text-xs">
              <a
                href="mailto:contact@nexoraa.tech"
                className="flex items-center gap-3 p-3.5 rounded-lg border border-white/10 bg-white/[0.02] hover:border-nex-cyan/40 text-nex-secondary hover:text-white transition-all"
              >
                <Mail className="w-4 h-4 text-nex-cyan" />
                <span>contact@nexoraa.tech</span>
              </a>

              <a
                href="https://github.com/shivam-upendra"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-lg border border-white/10 bg-white/[0.02] hover:border-nex-cyan/40 text-nex-secondary hover:text-white transition-all"
              >
                <Github className="w-4 h-4 text-nex-cyan" />
                <span>github.com/shivam-upendra</span>
              </a>

              <a
                href="https://linkedin.com/in/shivam-yadav"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-lg border border-white/10 bg-white/[0.02] hover:border-nex-cyan/40 text-nex-secondary hover:text-white transition-all"
              >
                <Linkedin className="w-4 h-4 text-nex-cyan" />
                <span>linkedin.com/in/shivam-yadav</span>
              </a>

              <a
                href="https://discord.gg/nexoraa"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-lg border border-white/10 bg-white/[0.02] hover:border-nex-cyan/40 text-nex-secondary hover:text-white transition-all"
              >
                <MessageSquare className="w-4 h-4 text-nex-cyan" />
                <span>Nexoraa Builder Discord</span>
              </a>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:col-span-7">
            {sent ? (
              <div className="card-glass-active p-8 sm:p-12 rounded-2xl text-center space-y-4 border border-nex-cyan/40">
                <div className="w-12 h-12 rounded-full bg-nex-cyan/15 border border-nex-cyan flex items-center justify-center mx-auto text-nex-cyan">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-nex-primary tracking-tight uppercase">
                  MESSAGE TRANSMITTED
                </h3>
                <p className="text-sm text-nex-secondary max-w-sm mx-auto">
                  Your message has reached the Nexoraa engineering console. An engineer will respond via email shortly.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="text-mono text-xs text-nex-cyan hover:underline mt-2 inline-block"
                >
                  TRANSMIT ANOTHER DISPATCH
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-glass rounded-2xl p-6 sm:p-10 border border-white/10 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 text-mono text-xs">
                  <span className="text-nex-primary font-semibold">TRANSMIT DISPATCH</span>
                  <span className="text-emerald-400">● PORT 5000 / ACTIVE</span>
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
                      placeholder="Engineer / Collaborator"
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
                      placeholder="your.email@domain.com"
                      className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded-lg p-3 text-sm text-nex-primary focus:outline-none text-mono transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-mono text-xs text-nex-muted mb-1.5">SUBJECT</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Hackathon Partnership / Technical Inquiries"
                    className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded-lg p-3 text-sm text-nex-primary focus:outline-none text-mono transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-mono text-xs text-nex-muted mb-1.5">MESSAGE / TECHNICAL SPECIFICATION *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details on your project, timeline, or collaboration proposal..."
                    className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded-lg p-3 text-sm text-nex-primary focus:outline-none text-mono transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-gradient-to-r from-nex-electric to-nex-cyan hover:from-nex-cyan hover:to-nex-cyan-light text-[#080D1D] font-bold text-mono text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)] disabled:opacity-50"
                >
                  <span>{submitting ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE →'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
