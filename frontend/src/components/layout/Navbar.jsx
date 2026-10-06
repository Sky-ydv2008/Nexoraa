import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu } from 'lucide-react';
import Logo from '../common/Logo';
import MobileMenu from './MobileMenu';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
  { num: '01', title: 'WORK', path: '/projects' },
  { num: '02', title: 'RESEARCH', path: '/research' },
  { num: '03', title: 'TEAM', path: '/team' },
  { num: '04', title: 'COMMUNITY', path: '/community' },
  { num: '05', title: 'AI', path: '/ai' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none ${
          scrolled
            ? 'bg-[#080D1D]/85 backdrop-blur-md border-b border-white/10 py-3 sm:py-3.5'
            : 'bg-transparent border-b border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-[1550px] mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between">
          {/* LEFT: Nexoraa Logo */}
          <div className="flex items-center gap-3">
            <Logo size="md" glow={false} />
            <span className="hidden xl:inline-block text-mono text-[11px] text-nex-muted tracking-widest pl-3 border-l border-white/10">
              SYS // 2026
            </span>
          </div>

          {/* CENTER / RIGHT: Minimal Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || 
                (link.path === '/projects' && location.pathname.startsWith('/projects/'));
              return (
                <NavLink
                  key={link.num}
                  to={link.path}
                  className={({ isActive: exactActive }) =>
                    `group relative flex items-center gap-2 text-mono text-xs tracking-wider transition-all duration-200 py-1 ${
                      isActive || exactActive
                        ? 'text-nex-primary font-medium'
                        : 'text-nex-secondary/80 hover:text-nex-primary'
                    }`
                  }
                >
                  <span className="text-[10px] text-nex-cyan/70 font-semibold group-hover:text-nex-cyan transition-colors">
                    {link.num}
                  </span>
                  <span>{link.title}</span>
                  {/* Subtle cyan indicator line on active or hover */}
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-[1.5px] bg-nex-cyan transition-all duration-200 ${
                      isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-75 group-hover:scale-x-100'
                    }`}
                  />
                </NavLink>
              );
            })}
          </nav>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mode switch */}
            <button
              onClick={toggleTheme}
              className="px-2.5 sm:px-3 py-1.5 border border-white/10 hover:border-nex-cyan/40 bg-white/[0.02] hover:bg-white/[0.05] rounded text-mono text-[11px] text-nex-secondary hover:text-white transition-all flex items-center gap-1.5"
              aria-label="Toggle Light and Dark Mode"
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-nex-cyan" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-nex-cyan" />
              )}
              <span className="hidden sm:inline tracking-wider">
                {theme === 'dark' ? 'LIGHT' : 'DARK'}
              </span>
            </button>

            {/* Join button */}
            <Link
              to="/join"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-nex-cyan/40 hover:border-nex-cyan bg-nex-cyan/10 hover:bg-nex-cyan/20 text-nex-cyan-light rounded text-mono text-[11px] tracking-wider transition-all"
            >
              <span>JOIN</span>
              <span>→</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 border border-white/15 bg-white/[0.03] hover:border-nex-cyan/50 rounded text-nex-primary transition-all flex items-center gap-1.5 text-mono text-xs"
              aria-label="Toggle Mobile Menu"
            >
              <Menu className="w-4 h-4 text-nex-cyan" />
              <span>MENU</span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default Navbar;
