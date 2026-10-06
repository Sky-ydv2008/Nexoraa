import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Cursor from './components/common/Cursor';
import LoadingScreen from './components/common/LoadingScreen';
import AIChatbot from './components/ai/AIChatbot';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ResearchPage from './pages/ResearchPage';
import TeamPage from './pages/TeamPage';
import CommunityPage from './pages/CommunityPage';
import JoinPage from './pages/JoinPage';
import ContactPage from './pages/ContactPage';
import AIPage from './pages/AIPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// ScrollToTop Helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout Component that hides public Navbar/Footer on Admin routes
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      <Cursor />
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <AIChatbot />}
    </>
  );
};

function App() {
  const [loadingComplete, setLoadingComplete] = useState(() => {
    return sessionStorage.getItem('nexoraa_loaded') === 'true';
  });

  const handleLoadingFinished = () => {
    sessionStorage.setItem('nexoraa_loaded', 'true');
    setLoadingComplete(true);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          {!loadingComplete ? (
            <LoadingScreen onComplete={handleLoadingFinished} />
          ) : (
            <div className="flex flex-col min-h-screen bg-[#080D1D] text-nex-primary">
              <AppLayout>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/research" element={<ResearchPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                  <Route path="/team" element={<TeamPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/join" element={<JoinPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/ai" element={<AIPage />} />

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  <Route path="/admin/projects" element={<AdminDashboardPage />} />
                  <Route path="/admin/team" element={<AdminDashboardPage />} />
                  <Route path="/admin/community" element={<AdminDashboardPage />} />
                  <Route path="/admin/join-requests" element={<AdminDashboardPage />} />
                  <Route path="/admin/research" element={<AdminDashboardPage />} />
                  <Route path="/admin/chatbot" element={<AdminDashboardPage />} />
                  <Route path="/admin/events" element={<AdminDashboardPage />} />
                  <Route path="/admin/achievements" element={<AdminDashboardPage />} />

                  {/* Catch-all fallback to Home */}
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </AppLayout>
            </div>
          )}
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
