import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, CornerDownLeft, Minimize2, Terminal } from 'lucide-react';
import Logo from '../common/Logo';
import { askAI } from '../../services/api';

const initialMessages = [
  {
    sender: 'ai',
    text: "NEXORAA Neural Uplink initialized. I have indexed the entire ecosystem—including NEXUS, NetraAI, MindWeave, BriefBox, XAPEXX, our research initiatives, and team architecture. How can I assist your inquiry?",
    timestamp: "NOW"
  }
];

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');

    // Append user message
    const newMsg = {
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
    setLoading(true);

    try {
      const res = await askAI(userText);
      const aiReply = res.success && res.data ? res.data.answer : "System connection nominal. No indexed match found.";
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: aiReply,
          category: res.data?.category,
          pageReference: res.data?.pageReference,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: "Uplink disrupted. Operating in offline cache mode. Inquire about NEXUS, NetraAI, research tracks or the team.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 px-4 py-2.5 bg-[#0D1428] border border-nex-cyan/40 hover:border-nex-cyan rounded-full shadow-[0_8px_30px_rgba(8,13,29,0.9),0_0_15px_rgba(34,211,238,0.2)] transition-all group"
          aria-label="Open Nexoraa AI Chatbot"
        >
          <Logo size="sm" variant="icon" link={false} glow={true} />
          <span className="text-mono text-xs font-bold text-nex-primary tracking-wider group-hover:text-nex-cyan-light transition-colors">
            NEXORAA AI
          </span>
          <span className="w-2 h-2 rounded-full bg-nex-cyan animate-pulse" />
        </motion.button>
      </div>

      {/* Unique Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[94vw] sm:w-[440px] max-w-[450px] h-[550px] max-h-[80vh] flex flex-col bg-[#0A0F22]/95 backdrop-blur-2xl border border-nex-cyan/30 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_30px_rgba(34,211,238,0.15)] overflow-hidden select-none"
          >
            {/* Unique Nexoraa Terminal Header */}
            <div className="p-4 bg-[#080D1D] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Logo size="sm" variant="icon" link={false} />
                <div>
                  <div className="text-mono text-xs font-bold text-nex-primary tracking-wider flex items-center gap-2">
                    <span>NEXORAA AI</span>
                    <span className="text-[10px] text-nex-cyan bg-nex-cyan/10 px-1.5 py-0.2 rounded border border-nex-cyan/30">
                      RAG V2
                    </span>
                  </div>
                  <div className="text-mono text-[10px] text-emerald-400 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>SYSTEM / ONLINE</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-nex-secondary">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded transition-colors text-nex-muted hover:text-white"
                  aria-label="Close Chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm font-sans">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {/* Sender Label */}
                  <div className="text-mono text-[10px] text-nex-muted mb-1 px-1">
                    {msg.sender === 'user' ? 'YOU' : 'NEXORAA ENGINE'}
                  </div>

                  {/* Message Bubble */}
                  {msg.sender === 'user' ? (
                    <div className="max-w-[85%] p-3.5 rounded-xl bg-[#0D152D] border border-white/15 text-nex-primary text-sm leading-relaxed shadow-sm">
                      {msg.text}
                    </div>
                  ) : (
                    <div className="max-w-[90%] p-3.5 rounded-xl bg-[#080D1D]/90 border border-nex-cyan/20 text-nex-primary text-sm leading-relaxed relative shadow-md">
                      <div className="absolute left-0 top-3 bottom-3 w-1 bg-nex-cyan rounded-r" />
                      <div className="pl-2">{msg.text}</div>
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex flex-col items-start">
                  <div className="text-mono text-[10px] text-nex-muted mb-1 px-1">NEXORAA ENGINE</div>
                  <div className="p-3 rounded-xl bg-[#080D1D]/90 border border-nex-cyan/20 text-nex-cyan text-xs text-mono flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-nex-cyan animate-ping" />
                    <span>SYNTHESIZING KNOWLEDGE RETRIEVAL...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3 bg-[#080D1D] border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ASK NEXORAA..."
                className="flex-1 bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-nex-primary placeholder-nex-muted focus:outline-none text-mono transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 bg-nex-cyan hover:bg-nex-cyan-light text-[#080D1D] rounded-lg transition-all disabled:opacity-40 disabled:hover:bg-nex-cyan"
                aria-label="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
