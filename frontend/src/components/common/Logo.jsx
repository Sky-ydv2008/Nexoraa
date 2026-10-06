import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ 
  className = "", 
  variant = "full", // "full" (icon + wordmark) or "icon" (hexagonal N only)
  glow = false,
  size = "md", // "sm", "md", "lg", "hero"
  link = true
}) => {
  // Height configurations
  const heightClasses = {
    sm: "h-7 sm:h-8",         // 28-32px
    md: "h-8 sm:h-9 md:h-10",  // 32-40px (default desktop 32-44, mobile 30-36)
    lg: "h-11 sm:h-12 md:h-14", // 44-56px
    hero: "h-14 sm:h-16 md:h-20"
  };

  const imageSrc = variant === "icon" 
    ? "/assets/nexoraa_icon.png" 
    : "/assets/nexoraa_logo.png";

  const content = (
    <div className={`relative inline-flex items-center group select-none ${className}`}>
      {glow && (
        <div 
          className="absolute -inset-1 rounded-full opacity-40 blur-md bg-gradient-to-r from-nex-cyan to-nex-electric transition-opacity duration-500 group-hover:opacity-75 pointer-events-none" 
        />
      )}
      <img
        src={imageSrc}
        alt="NEXORAA"
        className={`relative z-10 object-contain w-auto ${heightClasses[size] || heightClasses.md} transition-transform duration-300 group-hover:scale-[1.02] filter drop-shadow-[0_2px_12px_rgba(34,211,238,0.15)]`}
        loading="eager"
      />
    </div>
  );

  if (link) {
    return (
      <Link to="/" aria-label="Nexoraa Home" className="focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
