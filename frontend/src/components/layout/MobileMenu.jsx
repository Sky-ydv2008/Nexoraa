import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Moon, Sun, ArrowUpRight } from 'lucide-react';
import Logo from '../common/Logo';
import { useTheme } from '../../context/ThemeContext';

const navItems = [
  { num: '01', title: 'WORK', path: '/projects' },
  { num: '02', title: 'RESEARCH', path: '/research' },
  { num: '03', title: 'TEAM', path: '/team' },
  { num: '04', title: 'COMMUNITY', path: '/community' },
  { num: '05', title: 'AI', path: '/ai' },
  { num: '06', title: 'CONTACT', path: '/contact' },
];

const MobileMenu = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#080D1D]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 select-none text-nex-primary"
        >
          {/* Header Bar inside overlay */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <Logo size="sm" link={false} />
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="px-3 py-1.5 border border-white/10 rounded text-mono text-xs text-nex-secondary hover:text-white transition-colors flex items-center gap-1.5"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-nex-cyan" /> : <Moon className="w-3.5 h-3.5 text-nex-cyan" />}
                <span>{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
              </button>
              <button
                onClick={onClose}
                className="px-3 py-1.5 border border-white/15 bg-white/5 rounded text-mono text-xs text-nex-primary hover:border-nex-cyan transition-colors flex items-center gap-1"
                aria-label="Close Navigation Menu"
              >
                <X className="w-3.5 h-3.5" />
                <span>CLOSE</span>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="my-auto py-8">
            <ul className="space-y-4 sm:space-y-6">
              {navItems.map((item, idx) => (
                <motion.li
                  key={item.num}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                >
                  <button
                    onClick={() => handleLinkClick(item.path)}
                    className="group w-full flex items-baseline justify-between text-left py-2 border-b border-white/5 hover:border-nex-cyan/40 transition-all duration-200"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="text-mono text-xs sm:text-sm text-nex-cyan/70 font-semibold tracking-wider group-hover:text-nex-cyan transition-colors">
                        {item.num}
                      </span>
                      <span className="font-editorial text-2xl sm:text-4xl tracking-tight text-nex-primary group-hover:text-nex-cyan-light transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-nex-muted group-hover:text-nex-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Footer Metadata */}
          <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-mono text-xs text-nex-muted">
            <div>
              <span>SECURE UPLINK: </span>
              <a href="mailto:contact@nexoraa.tech" className="text-nex-secondary hover:text-nex-cyan transition-colors">
                contact@nexoraa.tech
              </a>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <a href="https://github.com/shivam-upendra" target="_blank" rel="noreferrer" className="hover:text-nex-cyan">GITHUB</a>
              <a href="https://linkedin.com/in/shivam-yadav" target="_blank" rel="noreferrer" className="hover:text-nex-cyan">LINKEDIN</a>
              <Link to="/join" onClick={onClose} className="text-nex-cyan hover:underline">JOIN COLLECTIVE →</Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
