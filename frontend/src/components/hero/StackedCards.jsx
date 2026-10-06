import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Cpu, Layers, ShieldCheck, Wrench, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const domainIcons = {
  '01': Cpu,
  '02': Layers,
  '03': ShieldCheck,
  '04': Wrench,
  '05': Sparkles,
};

const StackedCards = ({ cards, activeIndex, onSelectCard }) => {
  return (
    <div className="relative w-full max-w-[580px] h-[480px] sm:h-[520px] md:h-[540px] flex items-center justify-center select-none perspective-[1200px]">
      {cards.map((card, index) => {
        // Calculate offset relative to activeIndex
        // We want the active card at front (offset = 0)
        // Next cards stack behind it with increasing Y, Z, and subtle rotation
        const total = cards.length;
        const diff = (index - activeIndex + total) % total;
        const isActive = diff === 0;

        // Position offsets based on diff
        // diff = 0 is front
        // diff = 1 is 1 step behind
        // diff = 2 is 2 steps behind
        // diff = 3 is 3 steps behind, etc.
        const isVisibleMobile = diff <= 2; // on mobile only show top 3 cards to avoid overflow

        // Physical spring parameters for stack depth
        // Active card: scale 1, rot 0, y 0, zIndex 50, opacity 1
        // diff 1: scale 0.96, rot 2.5deg, y 18px, zIndex 40, opacity 0.85
        // diff 2: scale 0.92, rot -2deg, y 36px, zIndex 30, opacity 0.65
        // diff 3: scale 0.88, rot 3.5deg, y 52px, zIndex 20, opacity 0.45
        // diff 4: scale 0.84, rot -3deg, y 68px, zIndex 10, opacity 0.30
        const rotations = [0, 2.5, -2.2, 3.2, -3.0];
        const yOffsets = [0, 16, 32, 48, 64];
        const xOffsets = [0, 8, -6, 10, -8];
        const scales = [1, 0.96, 0.92, 0.88, 0.84];
        const opacities = [1, 0.88, 0.65, 0.42, 0.25];

        const targetRot = rotations[diff] || 0;
        const targetY = yOffsets[diff] || 60;
        const targetX = xOffsets[diff] || 0;
        const targetScale = scales[diff] || 0.82;
        const targetOpacity = opacities[diff] || 0.2;
        const zIndex = 50 - diff * 10;

        const IconComponent = domainIcons[card.number] || Cpu;

        return (
          <motion.div
            key={card.number}
            onClick={() => onSelectCard(index)}
            animate={{
              x: targetX,
              y: targetY,
              rotate: targetRot,
              scale: targetScale,
              opacity: targetOpacity,
              zIndex: zIndex
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 24,
              mass: 0.8
            }}
            className={`absolute top-6 left-2 right-2 sm:left-6 sm:right-6 md:left-8 md:right-8 h-[420px] sm:h-[440px] rounded-xl cursor-pointer transition-all duration-300 ${
              !isVisibleMobile ? 'hidden sm:block' : 'block'
            } ${
              isActive
                ? 'card-glass-active ring-1 ring-nex-cyan/40 cursor-default'
                : 'card-glass hover:ring-1 hover:ring-white/20'
            }`}
            style={{
              transformOrigin: "center bottom",
              boxShadow: isActive
                ? "0 25px 50px -12px rgba(8, 13, 29, 0.9), 0 0 30px rgba(34, 211, 238, 0.18)"
                : "0 10px 30px -10px rgba(0, 0, 0, 0.6)"
            }}
          >
            {/* Card Content Interior */}
            <div className="h-full flex flex-col justify-between p-6 sm:p-8">
              {/* Card Top: Number, Domain Label, Icon */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 text-mono text-xs">
                  <div className="flex items-center gap-3">
                    <span className={`text-base font-bold ${isActive ? 'text-nex-cyan' : 'text-nex-secondary'}`}>
                      {card.number}
                    </span>
                    <span className="text-[11px] text-nex-muted tracking-widest">
                      DOMAIN
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-nex-cyan' : 'text-nex-muted'}`} />
                    <span className={`text-[10px] px-2 py-0.5 rounded ${
                      isActive ? 'bg-nex-cyan/15 text-nex-cyan border border-nex-cyan/30' : 'bg-white/5 text-nex-muted'
                    }`}>
                      {card.badge}
                    </span>
                  </div>
                </div>

                {/* Card Title */}
                <h3 className={`font-editorial text-2xl sm:text-3xl lg:text-4xl mt-6 tracking-tight leading-tight transition-colors ${
                  isActive ? 'text-nex-primary' : 'text-nex-secondary/90'
                }`}>
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-sm sm:text-[15px] text-nex-secondary/80 mt-4 leading-relaxed line-clamp-3 sm:line-clamp-4">
                  "{card.description}"
                </p>
              </div>

              {/* Card Bottom: Tags, Details & Action */}
              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-mono text-[10px] tracking-wider px-2.5 py-1 rounded transition-colors ${
                        isActive
                          ? 'bg-nex-darkblue/90 text-nex-cyan-light border border-nex-cyan/25'
                          : 'bg-white/5 text-nex-muted border border-white/5'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-mono text-xs">
                  <span className="text-nex-muted text-[11px]">
                    {isActive ? 'ACTIVE SPECIFICATION' : 'SELECT DOMAIN'}
                  </span>
                  <Link
                    to={card.route || "/research"}
                    onClick={(e) => {
                      if (!isActive) {
                        e.preventDefault();
                        onSelectCard(index);
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 transition-colors ${
                      isActive ? 'text-nex-cyan hover:text-nex-cyan-light' : 'text-nex-muted hover:text-white'
                    }`}
                  >
                    <span>EXPLORE DOMAIN</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StackedCards;
