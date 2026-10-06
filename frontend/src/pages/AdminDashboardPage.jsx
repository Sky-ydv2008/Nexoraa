import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  Users,
  UserPlus,
  Bot,
  Mail,
  Settings,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  LogOut,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Activity,
  Layers
} from 'lucide-react';
import Logo from '../components/common/Logo';
import { useAuth } from '../context/AuthContext';
import {
  getSystemStats,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getTeam,
  createTeamMember,
  deleteTeamMember,
  getCommunity,
  updateCommunityStatus,
  getJoinRequests,
  updateJoinRequestStatus,
  getChatbotKnowledge,
  createChatbotKnowledge,
  deleteChatbotKnowledge,
  getContactMessages,
  markContactRead
} from '../services/api';

const AdminDashboardPage = () => {
  const { admin, logout, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [team, setTeam] = useState([]);
  const [community, setCommunity] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const [knowledge, setKnowledge] = useState([]);
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Modal / Form states
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    slug: '',
    domain: 'AI / INTELLIGENCE',
    shortDescription: '',
    fullDescription: '',
    problem: '',
    solution: '',
    features: '',
    architecture: '',
    aiDetails: '',
    techStack: 'React, Node.js, Express, MongoDB',
    status: 'ACTIVE',
    githubUrl: '',
    liveUrl: '',
    previewImage: '/assets/projects/nexus.png',
    featured: true
  });

  const [showTeamModal, setShowTeamModal] = useState(false);
  const [teamForm, setTeamForm] = useState({
    name: '',
    username: '',
    role: '',
    bio: '',
    githubUrl: '',
    linkedinUrl: '',
    portfolioUrl: '',
    skills: 'Full Stack, AI, Node.js'
  });

  const [showKnowledgeModal, setShowKnowledgeModal] = useState(false);
  const [knowledgeForm, setKnowledgeForm] = useState({
    question: '',
    answer: '',
    category: 'GENERAL',
    keywords: 'nexoraa, system',
    priority: 5,
    pageReference: '/'
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const loadAllData = async () => {
    setRefreshing(true);
    try {
      const [sRes, pRes, tRes, cRes, jRes, kRes, mRes] = await Promise.all([
        getSystemStats(),
        getProjects(),
        getTeam(),
        getCommunity(),
        getJoinRequests(),
        getChatbotKnowledge(),
        getContactMessages()
      ]);

      if (sRes.success) setStats(sRes.data);
      if (pRes.success) setProjects(pRes.data);
      if (tRes.success) setTeam(tRes.data);
      if (cRes.success) setCommunity(cRes.data);
      if (jRes.success) setJoinRequests(jRes.data);
      if (kRes.success) setKnowledge(kRes.data);
      if (mRes.success) setMessages(mRes.data);
    } catch (err) {
      console.error('[Admin] Error loading CMS data:', err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  // Project Handlers
  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...projectForm,
        slug: projectForm.slug || projectForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        features: typeof projectForm.features === 'string' ? projectForm.features.split(',').map(s => s.trim()).filter(Boolean) : projectForm.features,
        techStack: typeof projectForm.techStack === 'string' ? projectForm.techStack.split(',').map(s => s.trim()).filter(Boolean) : projectForm.techStack,
      };
      await createProject(payload);
      setShowProjectModal(false);
      loadAllData();
    } catch (err) {
      alert('Error creating project: ' + err.message);
    }
  };

  const handleDeleteProject = async (slugOrId) => {
    if (!window.confirm('Delete project specification?')) return;
    try {
      await deleteProject(slugOrId);
      loadAllData();
    } catch (err) {
      alert('Error removing project: ' + err.message);
    }
  };

  // Team Handlers
  const handleSaveTeamMember = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...teamForm,
        username: teamForm.username || teamForm.name.toLowerCase().replace(/[^a-z0-9]+/g, ''),
        skills: typeof teamForm.skills === 'string' ? teamForm.skills.split(',').map(s => s.trim()).filter(Boolean) : teamForm.skills
      };
      await createTeamMember(payload);
      setShowTeamModal(false);
      loadAllData();
    } catch (err) {
      alert('Error creating team member: ' + err.message);
    }
  };

  const handleDeleteTeamMember = async (id) => {
    if (!window.confirm('Remove team member?')) return;
    try {
      await deleteTeamMember(id);
      loadAllData();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  // Knowledge Handlers
  const handleSaveKnowledge = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...knowledgeForm,
        keywords: typeof knowledgeForm.keywords === 'string' ? knowledgeForm.keywords.split(',').map(s => s.trim()).filter(Boolean) : knowledgeForm.keywords,
        priority: Number(knowledgeForm.priority) || 5
      };
      await createChatbotKnowledge(payload);
      setShowKnowledgeModal(false);
      loadAllData();
    } catch (err) {
      alert('Error adding knowledge entry: ' + err.message);
    }
  };

  const handleDeleteKnowledge = async (id) => {
    if (!window.confirm('Remove this Q&A entry from knowledge base?')) return;
    try {
      await deleteChatbotKnowledge(id);
      loadAllData();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  // Join Requests Handlers
  const handleUpdateJoinStatus = async (id, status) => {
    try {
      await updateJoinRequestStatus(id, status);
      loadAllData();
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  // Community Handlers
  const handleUpdateCommunityStatus = async (id, status) => {
    try {
      await updateCommunityStatus(id, status);
      loadAllData();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  // Messages
  const handleMarkMessageRead = async (id) => {
    try {
      await markContactRead(id);
      loadAllData();
    } catch (err) {
      console.error(err);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#080D1D] flex items-center justify-center text-mono text-xs text-nex-cyan">
        VERIFYING AUTHENTICATION CONSOLE...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080D1D] text-nex-primary flex flex-col">
      {/* Top Admin Navigation Bar */}
      <header className="border-b border-white/10 bg-[#0D1428]/90 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Logo size="sm" />
          <span className="text-mono text-xs text-nex-cyan tracking-widest pl-3 border-l border-white/10 hidden sm:inline">
            ADMIN CMS // ROOT CONSOLE
          </span>
        </div>

        <div className="flex items-center gap-4 text-mono text-xs">
          <button
            onClick={loadAllData}
            disabled={refreshing}
            className="p-2 border border-white/10 hover:border-nex-cyan rounded text-nex-secondary hover:text-white transition-colors flex items-center gap-1.5"
            title="Refresh CMS Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-nex-cyan' : ''}`} />
            <span className="hidden md:inline">SYNC</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-nex-secondary px-3 py-1.5 rounded bg-white/[0.02] border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{admin?.email || 'admin@nexoraa.tech'}</span>
          </div>

          <button
            onClick={logout}
            className="px-3 py-1.5 border border-red-500/30 hover:border-red-500 bg-red-950/20 text-red-300 rounded transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>EXIT</span>
          </button>
        </div>
      </header>

      {/* Main CMS Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 border-r border-white/10 bg-[#060A17] p-4 text-mono text-xs space-y-1">
          <div className="text-[10px] text-nex-muted tracking-[0.2em] px-3 py-2">
            MANAGEMENT MODULES
          </div>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors ${
              activeTab === 'dashboard' ? 'bg-nex-darkblue text-nex-cyan font-bold border border-nex-cyan/30' : 'text-nex-secondary hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" />
              <span>DASHBOARD</span>
            </div>
            <span className="text-[10px] text-emerald-400">●</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors ${
              activeTab === 'projects' ? 'bg-nex-darkblue text-nex-cyan font-bold border border-nex-cyan/30' : 'text-nex-secondary hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FolderGit2 className="w-4 h-4" />
              <span>PROJECTS</span>
            </div>
            <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded">{projects.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors ${
              activeTab === 'team' ? 'bg-nex-darkblue text-nex-cyan font-bold border border-nex-cyan/30' : 'text-nex-secondary hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>TEAM MEMBERS</span>
            </div>
            <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded">{team.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('joinRequests')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors ${
              activeTab === 'joinRequests' ? 'bg-nex-darkblue text-nex-cyan font-bold border border-nex-cyan/30' : 'text-nex-secondary hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <UserPlus className="w-4 h-4" />
              <span>JOIN REQUESTS</span>
            </div>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
              {joinRequests.filter(r => r.status === 'pending').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('knowledge')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors ${
              activeTab === 'knowledge' ? 'bg-nex-darkblue text-nex-cyan font-bold border border-nex-cyan/30' : 'text-nex-secondary hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Bot className="w-4 h-4" />
              <span>CHATBOT KNOWLEDGE</span>
            </div>
            <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded">{knowledge.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('community')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors ${
              activeTab === 'community' ? 'bg-nex-darkblue text-nex-cyan font-bold border border-nex-cyan/30' : 'text-nex-secondary hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4" />
              <span>COMMUNITY</span>
            </div>
            <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded">{community.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors ${
              activeTab === 'messages' ? 'bg-nex-darkblue text-nex-cyan font-bold border border-nex-cyan/30' : 'text-nex-secondary hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4" />
              <span>DISPATCHES</span>
            </div>
            <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded">{messages.length}</span>
          </button>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <h1 className="font-editorial text-3xl sm:text-4xl font-bold uppercase">
                    SYSTEM OVERVIEW
                  </h1>
                  <p className="text-xs text-nex-muted text-mono mt-1">
                    TELEMETRY &amp; OPERATIONAL HEALTH // BUILD 2026.1-PROD
                  </p>
                </div>
                <Link
                  to="/"
                  target="_blank"
                  className="px-3.5 py-1.5 border border-white/15 hover:border-nex-cyan text-mono text-xs rounded text-nex-primary flex items-center gap-1.5 transition-colors"
                >
                  <span>LIVE FRONTEND</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card-glass p-6 rounded-xl border border-white/10 space-y-1">
                  <div className="text-mono text-xs text-nex-muted">TOTAL PROJECTS</div>
                  <div className="font-editorial text-4xl font-bold text-nex-primary">{projects.length}</div>
                  <div className="text-mono text-[10px] text-nex-cyan">5 PUBLISHED SPECIFICATIONS</div>
                </div>

                <div className="card-glass p-6 rounded-xl border border-white/10 space-y-1">
                  <div className="text-mono text-xs text-nex-muted">PENDING APPLICATIONS</div>
                  <div className="font-editorial text-4xl font-bold text-amber-400">
                    {joinRequests.filter(r => r.status === 'pending').length}
                  </div>
                  <div className="text-mono text-[10px] text-nex-muted">
                    {joinRequests.length} TOTAL INBOUND
                  </div>
                </div>

                <div className="card-glass p-6 rounded-xl border border-white/10 space-y-1">
                  <div className="text-mono text-xs text-nex-muted">CHATBOT KNOWLEDGE</div>
                  <div className="font-editorial text-4xl font-bold text-nex-cyan">{knowledge.length}</div>
                  <div className="text-mono text-[10px] text-nex-muted">INDEXED RAG ENTRIES</div>
                </div>

                <div className="card-glass p-6 rounded-xl border border-white/10 space-y-1">
                  <div className="text-mono text-xs text-nex-muted">STORAGE ENGINE</div>
                  <div className="font-editorial text-2xl font-bold text-emerald-400 pt-1">
                    {stats?.database || "ACTIVE"}
                  </div>
                  <div className="text-mono text-[10px] text-nex-muted">ZERO-DOWNTIME PERSISTENCE</div>
                </div>
              </div>

              {/* Recent Join Requests Quick View */}
              <div className="card-glass p-6 rounded-xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 text-mono text-xs">
                  <span className="font-bold text-nex-primary">RECENT CANDIDATE SUBMISSIONS</span>
                  <button onClick={() => setActiveTab('joinRequests')} className="text-nex-cyan hover:underline">
                    VIEW ALL →
                  </button>
                </div>
                {joinRequests.length === 0 ? (
                  <div className="text-sm text-nex-muted py-4">No candidate requests received yet.</div>
                ) : (
                  <div className="divide-y divide-white/10">
                    {joinRequests.slice(0, 3).map((r) => (
                      <div key={r.id} className="py-3 flex items-center justify-between text-xs text-mono">
                        <div>
                          <span className="font-bold text-nex-primary mr-3">{r.name}</span>
                          <span className="text-nex-cyan bg-nex-cyan/10 px-2 py-0.5 rounded text-[10px] mr-2">
                            {r.role}
                          </span>
                          <span className="text-nex-muted">{r.email}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          r.status === 'pending' ? 'bg-amber-950/60 text-amber-300' : 'bg-emerald-950/60 text-emerald-300'
                        }`}>
                          {r.status.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <h1 className="font-editorial text-3xl font-bold uppercase">PROJECTS CMS</h1>
                  <p className="text-xs text-nex-muted text-mono mt-1">
                    CREATE, EDIT &amp; DEPLOY ARCHITECTURAL SPECIFICATIONS
                  </p>
                </div>
                <button
                  onClick={() => setShowProjectModal(true)}
                  className="px-4 py-2 bg-nex-cyan hover:bg-nex-cyan-light text-[#080D1D] font-bold text-mono text-xs rounded transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>NEW PROJECT</span>
                </button>
              </div>

              {/* Projects List */}
              <div className="space-y-4">
                {projects.map((p) => (
                  <div key={p.slug} className="card-glass p-6 rounded-xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 text-mono text-xs">
                        <span className="text-nex-cyan font-bold">{p.number}</span>
                        <span className="text-nex-muted">{p.domain}</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded">
                          {p.status}
                        </span>
                      </div>
                      <h3 className="font-editorial text-2xl font-bold text-nex-primary">
                        {p.title}
                      </h3>
                      <p className="text-xs text-nex-secondary max-w-2xl line-clamp-2">
                        {p.shortDescription}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-mono text-xs self-end md:self-center">
                      <Link
                        to={`/projects/${p.slug}`}
                        target="_blank"
                        className="p-2 border border-white/10 hover:border-nex-cyan rounded text-nex-secondary hover:text-white"
                        title="View Live Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteProject(p.slug)}
                        className="p-2 border border-red-500/30 hover:border-red-500 bg-red-950/20 text-red-300 rounded"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TEAM MANAGEMENT */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <h1 className="font-editorial text-3xl font-bold uppercase">TEAM CMS</h1>
                  <p className="text-xs text-nex-muted text-mono mt-1">
                    MANAGE CORE ARCHITECTS &amp; ROLES
                  </p>
                </div>
                <button
                  onClick={() => setShowTeamModal(true)}
                  className="px-4 py-2 bg-nex-cyan hover:bg-nex-cyan-light text-[#080D1D] font-bold text-mono text-xs rounded transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD MEMBER</span>
                </button>
              </div>

              <div className="space-y-4">
                {team.map((m) => (
                  <div key={m.id || m.username} className="card-glass p-6 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <h3 className="font-editorial text-xl font-bold text-nex-primary">{m.name}</h3>
                      <div className="text-mono text-xs text-nex-cyan mt-0.5">{m.role}</div>
                      <p className="text-xs text-nex-muted mt-2 max-w-xl">{m.bio}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteTeamMember(m.id)}
                      className="p-2 border border-red-500/30 hover:border-red-500 text-red-300 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: JOIN REQUESTS */}
          {activeTab === 'joinRequests' && (
            <div className="space-y-6">
              <div className="pb-6 border-b border-white/10">
                <h1 className="font-editorial text-3xl font-bold uppercase">JOIN REQUESTS</h1>
                <p className="text-xs text-nex-muted text-mono mt-1">
                  CANDIDATE APPLICATIONS &amp; RECRUITMENT PIPELINE
                </p>
              </div>

              <div className="space-y-4">
                {joinRequests.map((r) => (
                  <div key={r.id} className="card-glass p-6 rounded-xl border border-white/10 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div>
                        <span className="font-editorial text-xl font-bold text-nex-primary mr-3">{r.name}</span>
                        <span className="text-mono text-xs text-nex-cyan bg-nex-cyan/15 px-2 py-0.5 rounded border border-nex-cyan/30">
                          {r.role}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateJoinStatus(r.id, 'accepted')}
                          className="px-2.5 py-1 text-mono text-xs bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 rounded hover:bg-emerald-900/60"
                        >
                          ACCEPT
                        </button>
                        <button
                          onClick={() => handleUpdateJoinStatus(r.id, 'rejected')}
                          className="px-2.5 py-1 text-mono text-xs bg-red-950/60 border border-red-500/30 text-red-300 rounded hover:bg-red-900/60"
                        >
                          REJECT
                        </button>
                        <span className="text-mono text-xs text-nex-muted ml-2">[{r.status}]</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-mono text-nex-secondary">
                      <div>EMAIL: <span className="text-white">{r.email}</span></div>
                      {r.github && (
                        <div>GITHUB: <a href={r.github} target="_blank" rel="noreferrer" className="text-nex-cyan hover:underline">{r.github}</a></div>
                      )}
                    </div>

                    <div className="text-xs text-mono text-nex-secondary">
                      SKILLS: <span className="text-nex-cyan-light">{r.skills}</span>
                    </div>

                    <div className="p-3 rounded bg-[#060A17] text-xs text-nex-muted leading-relaxed">
                      "{r.whyNexoraa}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CHATBOT KNOWLEDGE MANAGEMENT */}
          {activeTab === 'knowledge' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <h1 className="font-editorial text-3xl font-bold uppercase">CHATBOT KNOWLEDGE BASE</h1>
                  <p className="text-xs text-nex-muted text-mono mt-1">
                    DYNAMIC RAG ENTRIES (UPDATE WITHOUT REDEPLOYING FRONTEND)
                  </p>
                </div>
                <button
                  onClick={() => setShowKnowledgeModal(true)}
                  className="px-4 py-2 bg-nex-cyan hover:bg-nex-cyan-light text-[#080D1D] font-bold text-mono text-xs rounded transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD ENTRY</span>
                </button>
              </div>

              <div className="space-y-4">
                {knowledge.map((k) => (
                  <div key={k.id} className="card-glass p-6 rounded-xl border border-white/10 space-y-2 relative">
                    <div className="flex items-center justify-between text-mono text-xs text-nex-muted">
                      <span className="text-nex-cyan">CATEGORY: {k.category}</span>
                      <div className="flex items-center gap-3">
                        <span>PRIORITY: {k.priority}</span>
                        <button
                          onClick={() => handleDeleteKnowledge(k.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-editorial text-lg font-bold text-nex-primary">
                      Q: {k.question}
                    </h3>
                    <p className="text-sm text-nex-secondary leading-relaxed bg-[#060A17] p-3 rounded border border-white/5">
                      A: {k.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: COMMUNITY */}
          {activeTab === 'community' && (
            <div className="space-y-6">
              <div className="pb-6 border-b border-white/10">
                <h1 className="font-editorial text-3xl font-bold uppercase">COMMUNITY MEMBERS</h1>
                <p className="text-xs text-nex-muted text-mono mt-1">
                  APPROVE / REJECT REGISTERED BUILDERS
                </p>
              </div>

              <div className="space-y-3">
                {community.map((c) => (
                  <div key={c.id} className="card-glass p-4 rounded-xl border border-white/10 flex items-center justify-between text-xs text-mono">
                    <div>
                      <span className="font-bold text-white mr-3">{c.name}</span>
                      <span className="text-nex-cyan mr-3">[{c.role}]</span>
                      <span className="text-nex-muted">{c.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        c.status === 'approved' ? 'bg-emerald-950/60 text-emerald-400' : 'bg-white/5 text-nex-muted'
                      }`}>
                        {c.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="pb-6 border-b border-white/10">
                <h1 className="font-editorial text-3xl font-bold uppercase">DISPATCHES &amp; INQUIRIES</h1>
                <p className="text-xs text-nex-muted text-mono mt-1">
                  INBOUND MESSAGES VIA SECURE UPLINK
                </p>
              </div>

              <div className="space-y-4">
                {messages.map((m) => (
                  <div key={m.id} className="card-glass p-6 rounded-xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-mono text-xs">
                      <span className="font-bold text-white">{m.name} ({m.email})</span>
                      <span className="text-nex-muted">{new Date(m.createdAt).toLocaleDateString()}</span>
                    </div>
                    {m.subject && <div className="text-mono text-xs text-nex-cyan">SUBJECT: {m.subject}</div>}
                    <p className="text-sm text-nex-secondary p-3 rounded bg-[#060A17] border border-white/5 leading-relaxed">
                      "{m.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* CREATE PROJECT MODAL */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="card-glass-active p-6 sm:p-8 rounded-2xl max-w-2xl w-full border border-nex-cyan/40 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 text-mono text-xs">
              <span className="font-bold text-nex-primary">NEW PROJECT SPECIFICATION</span>
              <button onClick={() => setShowProjectModal(false)} className="text-nex-muted hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-3 text-mono text-xs">
              <div>
                <label className="block text-nex-muted mb-1">PROJECT TITLE *</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g. AETHER"
                  className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-nex-muted mb-1">DOMAIN *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.domain}
                    onChange={(e) => setProjectForm({ ...projectForm, domain: e.target.value })}
                    className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-nex-muted mb-1">STATUS</label>
                  <input
                    type="text"
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                    className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-nex-muted mb-1">SHORT DESCRIPTION *</label>
                <textarea
                  rows={2}
                  required
                  value={projectForm.shortDescription}
                  onChange={(e) => setProjectForm({ ...projectForm, shortDescription: e.target.value })}
                  className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-nex-muted mb-1">TECH STACK (comma-separated)</label>
                <input
                  type="text"
                  value={projectForm.techStack}
                  onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                  className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-nex-muted mb-1">GITHUB URL</label>
                  <input
                    type="url"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-nex-muted mb-1">LIVE DEMO URL</label>
                  <input
                    type="url"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 border border-white/15 rounded text-nex-muted hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-nex-cyan hover:bg-nex-cyan-light text-[#080D1D] font-bold rounded"
                >
                  PUBLISH PROJECT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE KNOWLEDGE MODAL */}
      {showKnowledgeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="card-glass-active p-6 sm:p-8 rounded-2xl max-w-lg w-full border border-nex-cyan/40 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 text-mono text-xs">
              <span className="font-bold text-nex-primary">ADD CHATBOT KNOWLEDGE ENTRY</span>
              <button onClick={() => setShowKnowledgeModal(false)} className="text-nex-muted hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveKnowledge} className="space-y-3 text-mono text-xs">
              <div>
                <label className="block text-nex-muted mb-1">QUESTION / TRIGGER *</label>
                <input
                  type="text"
                  required
                  value={knowledgeForm.question}
                  onChange={(e) => setKnowledgeForm({ ...knowledgeForm, question: e.target.value })}
                  placeholder="e.g. What is the architecture of NEXUS?"
                  className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-nex-muted mb-1">GROUNDED ANSWER *</label>
                <textarea
                  rows={3}
                  required
                  value={knowledgeForm.answer}
                  onChange={(e) => setKnowledgeForm({ ...knowledgeForm, answer: e.target.value })}
                  placeholder="Provide authoritative technical response..."
                  className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-nex-muted mb-1">CATEGORY</label>
                  <input
                    type="text"
                    value={knowledgeForm.category}
                    onChange={(e) => setKnowledgeForm({ ...knowledgeForm, category: e.target.value })}
                    className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-nex-muted mb-1">PRIORITY (1-10)</label>
                  <input
                    type="number"
                    value={knowledgeForm.priority}
                    onChange={(e) => setKnowledgeForm({ ...knowledgeForm, priority: e.target.value })}
                    className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-nex-muted mb-1">KEYWORDS (comma-separated)</label>
                <input
                  type="text"
                  value={knowledgeForm.keywords}
                  onChange={(e) => setKnowledgeForm({ ...knowledgeForm, keywords: e.target.value })}
                  className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded p-2.5 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowKnowledgeModal(false)}
                  className="px-4 py-2 border border-white/15 rounded text-nex-muted hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-nex-cyan hover:bg-nex-cyan-light text-[#080D1D] font-bold rounded"
                >
                  SAVE KNOWLEDGE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE TEAM MODAL */}
      {showTeamModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="card-glass-active p-6 sm:p-8 rounded-2xl max-w-lg w-full border border-nex-cyan/40 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 text-mono text-xs">
              <span className="font-bold text-nex-primary">ADD CORE TEAM MEMBER</span>
              <button onClick={() => setShowTeamModal(false)} className="text-nex-muted hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTeamMember} className="space-y-3 text-mono text-xs">
              <div>
                <label className="block text-nex-muted mb-1">MEMBER NAME *</label>
                <input
                  type="text"
                  required
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                  className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-nex-muted mb-1">ROLE *</label>
                <input
                  type="text"
                  required
                  value={teamForm.role}
                  onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                  placeholder="e.g. AI / ML SYSTEMS LEAD"
                  className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-nex-muted mb-1">BIOGRAPHY</label>
                <textarea
                  rows={2}
                  value={teamForm.bio}
                  onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                  className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-nex-muted mb-1">GITHUB URL</label>
                  <input
                    type="url"
                    value={teamForm.githubUrl}
                    onChange={(e) => setTeamForm({ ...teamForm, githubUrl: e.target.value })}
                    className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-nex-muted mb-1">LINKEDIN URL</label>
                  <input
                    type="url"
                    value={teamForm.linkedinUrl}
                    onChange={(e) => setTeamForm({ ...teamForm, linkedinUrl: e.target.value })}
                    className="w-full bg-[#060A17] border border-white/15 focus:border-nex-cyan rounded p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowTeamModal(false)}
                  className="px-4 py-2 border border-white/15 rounded text-nex-muted hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-nex-cyan hover:bg-nex-cyan-light text-[#080D1D] font-bold rounded"
                >
                  SAVE MEMBER
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
