import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const LoadingScreen = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(15);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const steps = [
      { step: 1, p: 25, delay: 200 },
      { step: 2, p: 45, delay: 450 },
      { step: 3, p: 70, delay: 700 },
      { step: 4, p: 90, delay: 950 },
      { step: 5, p: 100, delay: 1150 },
    ];

    const timeouts = steps.map(s =>
      setTimeout(() => {
        setStep(s.step);
        setProgress(s.p);
      }, s.delay)
    );

    const finishTimeout = setTimeout(() => {
      setIsDone(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 400);
    }, 1300);

    return () => {
      timeouts.forEach(t => clearTimeout(t));
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#080D1D] select-none"
        >
          {/* Logo with subtle ambient glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8"
          >
            <Logo size="lg" glow={true} link={false} />
          </motion.div>

          {/* Technical Status */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="text-mono text-xs sm:text-sm text-nex-cyan tracking-[0.25em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-nex-cyan animate-ping" />
              NEXORAA / INITIALIZING
            </div>

            {/* Stepper numbers 01 02 03 04 05 */}
            <div className="flex items-center gap-3 text-mono text-[11px] text-nex-muted tracking-widest my-1">
              {['01', '02', '03', '04', '05'].map((num, i) => (
                <span
                  key={num}
                  className={`transition-colors duration-200 ${
                    i + 1 <= step ? 'text-nex-primary font-bold' : 'text-nex-muted/40'
                  }`}
                >
                  {num}
                </span>
              ))}
            </div>

            {/* Thin cyan progress bar */}
            <div className="w-48 sm:w-60 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-nex-electric via-nex-cyan to-nex-cyan-light shadow-[0_0_8px_#22D3EE]"
                initial={{ width: "10%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </div>

            <div className="text-mono text-[10px] text-nex-muted/70 tracking-widest mt-1">
              SYS // 2026 // KERNEL ONLINE
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
