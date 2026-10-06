import React from 'react';
import Hero from '../components/hero/Hero';
import AboutSection from '../sections/AboutSection';
import ResearchSection from '../sections/ResearchSection';
import ProjectsSection from '../sections/ProjectsSection';
import AISection from '../sections/AISection';
import TeamSection from '../sections/TeamSection';
import CommunitySection from '../sections/CommunitySection';
import AchievementsSection from '../sections/AchievementsSection';
import JoinSection from '../sections/JoinSection';
import ContactSection from '../sections/ContactSection';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <AboutSection />
      <ResearchSection />
      <ProjectsSection />
      <AISection />
      <TeamSection />
      <CommunitySection />
      <AchievementsSection />
      <JoinSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
