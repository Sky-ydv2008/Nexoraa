const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const seedData = require('../data/seedData');
const { getStatus } = require('../config/db');
const models = require('../models');

const DB_PATH = path.join(__dirname, '../data/db.json');

// In-memory cache for fallback store
let localStore = null;

const initStorage = () => {
  try {
    if (!fs.existsSync(path.dirname(DB_PATH))) {
      fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    }

    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, 'utf-8');
      localStore = JSON.parse(raw);
    } else {
      // Hash admin password for seed
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(seedData.admin.password, salt);

      localStore = {
        admins: [{
          id: "admin-1",
          username: seedData.admin.username,
          email: seedData.admin.email,
          passwordHash,
          role: seedData.admin.role,
          createdAt: new Date().toISOString()
        }],
        projects: seedData.projects.map((p, idx) => ({ id: `proj-${idx + 1}`, ...p })),
        team: seedData.team,
        research: seedData.research,
        achievements: seedData.achievements,
        community: seedData.community,
        joinRequests: seedData.joinRequests,
        events: seedData.events,
        announcements: seedData.announcements,
        chatbotKnowledge: seedData.chatbotKnowledge,
        contactMessages: seedData.contactMessages
      };
      saveToDisk();
      console.log('[NEXORAA Storage] Initialized db.json with seed data.');
    }
  } catch (err) {
    console.error('[NEXORAA Storage] Init error:', err);
  }
};

const saveToDisk = () => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(localStore, null, 2), 'utf-8');
  } catch (err) {
    console.error('[NEXORAA Storage] Error saving to disk:', err);
  }
};

// Initialize on module load
initStorage();

// Storage API abstraction
const storage = {
  // Admin Auth
  async findAdminByEmail(email) {
    if (getStatus()) {
      try {
        const found = await models.Admin.findOne({ email });
        if (found) return found;
      } catch (e) { /* fallback */ }
    }
    return localStore.admins.find(a => a.email.toLowerCase() === email.toLowerCase());
  },

  async findAdminById(id) {
    if (getStatus()) {
      try {
        const found = await models.Admin.findById(id);
        if (found) return found;
      } catch (e) { /* fallback */ }
    }
    return localStore.admins.find(a => a.id === id);
  },

  // Projects
  async getProjects() {
    if (getStatus()) {
      try {
        const list = await models.Project.find().sort({ priority: 1, createdAt: -1 });
        if (list && list.length > 0) return list;
      } catch (e) { /* fallback */ }
    }
    return [...localStore.projects].sort((a, b) => (a.priority || 0) - (b.priority || 0));
  },

  async getProjectBySlug(slug) {
    if (getStatus()) {
      try {
        const item = await models.Project.findOne({ slug });
        if (item) return item;
      } catch (e) { /* fallback */ }
    }
    return localStore.projects.find(p => p.slug === slug || p.id === slug);
  },

  async createProject(data) {
    if (getStatus()) {
      try {
        const item = await models.Project.create(data);
        return item;
      } catch (e) { /* fallback */ }
    }
    const newProject = {
      id: `proj-${Date.now()}`,
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      number: data.number || `0${localStore.projects.length + 1}`,
      createdAt: new Date().toISOString(),
      ...data
    };
    localStore.projects.push(newProject);
    saveToDisk();
    return newProject;
  },

  async updateProject(identifier, data) {
    if (getStatus()) {
      try {
        const item = await models.Project.findOneAndUpdate(
          { $or: [{ slug: identifier }, { _id: identifier }] },
          data,
          { new: true }
        );
        if (item) return item;
      } catch (e) { /* fallback */ }
    }
    const idx = localStore.projects.findIndex(p => p.id === identifier || p.slug === identifier);
    if (idx !== -1) {
      localStore.projects[idx] = { ...localStore.projects[idx], ...data, updatedAt: new Date().toISOString() };
      saveToDisk();
      return localStore.projects[idx];
    }
    return null;
  },

  async deleteProject(identifier) {
    if (getStatus()) {
      try {
        await models.Project.findOneAndDelete({ $or: [{ slug: identifier }, { _id: identifier }] });
      } catch (e) { /* fallback */ }
    }
    localStore.projects = localStore.projects.filter(p => p.id !== identifier && p.slug !== identifier);
    saveToDisk();
    return true;
  },

  // Team
  async getTeamMembers() {
    if (getStatus()) {
      try {
        const members = await models.TeamMember.find().sort({ order: 1 });
        if (members && members.length > 0) return members;
      } catch (e) { /* fallback */ }
    }
    return [...localStore.team].sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  async createTeamMember(data) {
    if (getStatus()) {
      try {
        const member = await models.TeamMember.create(data);
        return member;
      } catch (e) { /* fallback */ }
    }
    const newMember = {
      id: `member-${Date.now()}`,
      order: localStore.team.length + 1,
      ...data
    };
    localStore.team.push(newMember);
    saveToDisk();
    return newMember;
  },

  async updateTeamMember(id, data) {
    if (getStatus()) {
      try {
        const item = await models.TeamMember.findByIdAndUpdate(id, data, { new: true });
        if (item) return item;
      } catch (e) { /* fallback */ }
    }
    const idx = localStore.team.findIndex(m => m.id === id);
    if (idx !== -1) {
      localStore.team[idx] = { ...localStore.team[idx], ...data };
      saveToDisk();
      return localStore.team[idx];
    }
    return null;
  },

  async deleteTeamMember(id) {
    if (getStatus()) {
      try {
        await models.TeamMember.findByIdAndDelete(id);
      } catch (e) { /* fallback */ }
    }
    localStore.team = localStore.team.filter(m => m.id !== id);
    saveToDisk();
    return true;
  },

  // Research Tracks
  async getResearchTracks() {
    if (getStatus()) {
      try {
        const list = await models.ResearchTrack.find().sort({ number: 1 });
        if (list && list.length > 0) return list;
      } catch (e) { /* fallback */ }
    }
    return localStore.research;
  },

  async createResearchTrack(data) {
    if (getStatus()) {
      try {
        return await models.ResearchTrack.create(data);
      } catch (e) { /* fallback */ }
    }
    const item = { id: `res-${Date.now()}`, ...data };
    localStore.research.push(item);
    saveToDisk();
    return item;
  },

  // Achievements
  async getAchievements() {
    if (getStatus()) {
      try {
        const list = await models.Achievement.find().sort({ year: -1 });
        if (list && list.length > 0) return list;
      } catch (e) { /* fallback */ }
    }
    return localStore.achievements;
  },

  async createAchievement(data) {
    if (getStatus()) {
      try {
        return await models.Achievement.create(data);
      } catch (e) { /* fallback */ }
    }
    const item = { id: `ach-${Date.now()}`, ...data };
    localStore.achievements.unshift(item);
    saveToDisk();
    return item;
  },

  async deleteAchievement(id) {
    if (getStatus()) {
      try {
        await models.Achievement.findByIdAndDelete(id);
      } catch (e) { /* fallback */ }
    }
    localStore.achievements = localStore.achievements.filter(a => a.id !== id);
    saveToDisk();
    return true;
  },

  // Community
  async getCommunityMembers() {
    if (getStatus()) {
      try {
        const list = await models.CommunityMember.find().sort({ joinedAt: -1 });
        if (list && list.length > 0) return list;
      } catch (e) { /* fallback */ }
    }
    return localStore.community;
  },

  async createCommunityMember(data) {
    if (getStatus()) {
      try {
        return await models.CommunityMember.create(data);
      } catch (e) { /* fallback */ }
    }
    const item = { id: `com-${Date.now()}`, joinedAt: new Date().toISOString(), ...data };
    localStore.community.push(item);
    saveToDisk();
    return item;
  },

  async updateCommunityMemberStatus(id, status) {
    if (getStatus()) {
      try {
        return await models.CommunityMember.findByIdAndUpdate(id, { status }, { new: true });
      } catch (e) { /* fallback */ }
    }
    const idx = localStore.community.findIndex(c => c.id === id);
    if (idx !== -1) {
      localStore.community[idx].status = status;
      saveToDisk();
      return localStore.community[idx];
    }
    return null;
  },

  // Join Requests
  async getJoinRequests() {
    if (getStatus()) {
      try {
        const list = await models.JoinRequest.find().sort({ createdAt: -1 });
        if (list && list.length > 0) return list;
      } catch (e) { /* fallback */ }
    }
    return localStore.joinRequests;
  },

  async createJoinRequest(data) {
    if (getStatus()) {
      try {
        return await models.JoinRequest.create(data);
      } catch (e) { /* fallback */ }
    }
    const item = {
      id: `join-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...data
    };
    localStore.joinRequests.unshift(item);
    saveToDisk();
    return item;
  },

  async updateJoinRequestStatus(id, status) {
    if (getStatus()) {
      try {
        return await models.JoinRequest.findByIdAndUpdate(id, { status }, { new: true });
      } catch (e) { /* fallback */ }
    }
    const idx = localStore.joinRequests.findIndex(r => r.id === id);
    if (idx !== -1) {
      localStore.joinRequests[idx].status = status;
      saveToDisk();
      return localStore.joinRequests[idx];
    }
    return null;
  },

  // Events & Announcements
  async getEvents() {
    if (getStatus()) {
      try {
        const list = await models.Event.find();
        if (list && list.length > 0) return list;
      } catch (e) { /* fallback */ }
    }
    return localStore.events;
  },

  async createEvent(data) {
    if (getStatus()) {
      try {
        return await models.Event.create(data);
      } catch (e) { /* fallback */ }
    }
    const item = { id: `ev-${Date.now()}`, ...data };
    localStore.events.push(item);
    saveToDisk();
    return item;
  },

  async getAnnouncements() {
    if (getStatus()) {
      try {
        const list = await models.Announcement.find({ active: true });
        if (list && list.length > 0) return list;
      } catch (e) { /* fallback */ }
    }
    return localStore.announcements.filter(a => a.active);
  },

  // Chatbot Knowledge
  async getChatbotKnowledge() {
    if (getStatus()) {
      try {
        const list = await models.ChatbotKnowledge.find().sort({ priority: -1 });
        if (list && list.length > 0) return list;
      } catch (e) { /* fallback */ }
    }
    return localStore.chatbotKnowledge;
  },

  async createChatbotKnowledge(data) {
    if (getStatus()) {
      try {
        return await models.ChatbotKnowledge.create(data);
      } catch (e) { /* fallback */ }
    }
    const item = { id: `kb-${Date.now()}`, ...data };
    localStore.chatbotKnowledge.push(item);
    saveToDisk();
    return item;
  },

  async updateChatbotKnowledge(id, data) {
    if (getStatus()) {
      try {
        return await models.ChatbotKnowledge.findByIdAndUpdate(id, data, { new: true });
      } catch (e) { /* fallback */ }
    }
    const idx = localStore.chatbotKnowledge.findIndex(k => k.id === id);
    if (idx !== -1) {
      localStore.chatbotKnowledge[idx] = { ...localStore.chatbotKnowledge[idx], ...data };
      saveToDisk();
      return localStore.chatbotKnowledge[idx];
    }
    return null;
  },

  async deleteChatbotKnowledge(id) {
    if (getStatus()) {
      try {
        await models.ChatbotKnowledge.findByIdAndDelete(id);
      } catch (e) { /* fallback */ }
    }
    localStore.chatbotKnowledge = localStore.chatbotKnowledge.filter(k => k.id !== id);
    saveToDisk();
    return true;
  },

  // Contact Messages
  async getContactMessages() {
    if (getStatus()) {
      try {
        const list = await models.ContactMessage.find().sort({ createdAt: -1 });
        if (list && list.length > 0) return list;
      } catch (e) { /* fallback */ }
    }
    return localStore.contactMessages;
  },

  async createContactMessage(data) {
    if (getStatus()) {
      try {
        return await models.ContactMessage.create(data);
      } catch (e) { /* fallback */ }
    }
    const item = {
      id: `msg-${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString(),
      ...data
    };
    localStore.contactMessages.unshift(item);
    saveToDisk();
    return item;
  },

  async markContactMessageRead(id) {
    if (getStatus()) {
      try {
        return await models.ContactMessage.findByIdAndUpdate(id, { read: true }, { new: true });
      } catch (e) { /* fallback */ }
    }
    const idx = localStore.contactMessages.findIndex(m => m.id === id);
    if (idx !== -1) {
      localStore.contactMessages[idx].read = true;
      saveToDisk();
      return localStore.contactMessages[idx];
    }
    return null;
  },

  // Intelligent RAG Chatbot Query Execution
  async queryChatbot(queryText) {
    if (!queryText || typeof queryText !== 'string') {
      return {
        answer: "System operational. Please submit a valid inquiry regarding Nexoraa's projects, research, architecture, or team.",
        confidence: 0,
        sources: []
      };
    }

    const cleanQuery = queryText.toLowerCase().trim();
    const knowledgeList = await this.getChatbotKnowledge();
    const projectsList = await this.getProjects();
    const teamList = await this.getTeamMembers();

    let bestMatch = null;
    let highestScore = 0;

    // 1. Check exact question match or keyword intersection
    for (const kb of knowledgeList) {
      let score = 0;
      const qLower = kb.question.toLowerCase();

      if (cleanQuery === qLower) {
        score += 100;
      } else if (cleanQuery.includes(qLower) || qLower.includes(cleanQuery)) {
        score += 50;
      }

      // Check keywords
      if (Array.isArray(kb.keywords)) {
        for (const kw of kb.keywords) {
          const kwLower = kw.toLowerCase();
          if (cleanQuery.includes(kwLower)) {
            score += 20;
          }
        }
      }

      // Word token overlap
      const queryTokens = cleanQuery.split(/\s+/).filter(t => t.length > 2);
      const answerTokens = kb.answer.toLowerCase().split(/\s+/);
      for (const token of queryTokens) {
        if (answerTokens.includes(token)) score += 3;
        if (qLower.includes(token)) score += 5;
      }

      // Weight by priority
      score += (kb.priority || 0) * 2;

      if (score > highestScore) {
        highestScore = score;
        bestMatch = kb;
      }
    }

    // 2. Direct project check if query mentions a project by name
    for (const p of projectsList) {
      if (cleanQuery.includes(p.slug) || cleanQuery.includes(p.title.toLowerCase())) {
        return {
          answer: `[${p.title}] (${p.domain}): ${p.shortDescription} Tech Stack: ${p.techStack.join(', ')}. Status: ${p.status}. View live code at ${p.githubUrl || '/projects/' + p.slug}.`,
          confidence: 0.95,
          category: "PROJECTS",
          pageReference: `/projects/${p.slug}`,
          sources: [p.title, p.domain]
        };
      }
    }

    // 3. Direct team check
    for (const member of teamList) {
      if (cleanQuery.includes(member.name.toLowerCase()) || cleanQuery.includes(member.username.toLowerCase())) {
        return {
          answer: `${member.name} (${member.role}): ${member.bio} Core skills: ${member.skills.join(', ')}. GitHub: ${member.githubUrl}.`,
          confidence: 0.92,
          category: "TEAM",
          pageReference: "/team",
          sources: [member.name]
        };
      }
    }

    if (bestMatch && highestScore >= 15) {
      return {
        answer: bestMatch.answer,
        confidence: Math.min(0.98, Math.max(0.65, highestScore / 100)),
        category: bestMatch.category,
        pageReference: bestMatch.pageReference || '/',
        sources: [bestMatch.question]
      };
    }

    // Fallback synthesis
    return {
      answer: "Nexoraa is an advanced technology collective pioneering Artificial Intelligence, Full-Stack Systems, Cybersecurity, Developer Tools, and Experimental Labs. Ask about our projects (NEXUS, NetraAI, MindWeave, BriefBox, XAPEXX), our research initiatives, or how to join our builder network.",
      confidence: 0.5,
      category: "GENERAL",
      pageReference: "/",
      sources: ["Nexoraa Core Overview"]
    };
  },

  // System Stats for Admin Dashboard
  async getSystemStats() {
    const projects = await this.getProjects();
    const team = await this.getTeamMembers();
    const community = await this.getCommunityMembers();
    const joinRequests = await this.getJoinRequests();
    const messages = await this.getContactMessages();
    const knowledge = await this.getChatbotKnowledge();

    return {
      status: "ONLINE",
      build: "2026.1.0-PROD",
      database: getStatus() ? "MongoDB Atlas / Connected" : "Persistent Engine / Active",
      uptime: process.uptime(),
      counts: {
        projects: projects.length,
        team: team.length,
        community: community.length,
        pendingJoinRequests: joinRequests.filter(r => r.status === 'pending').length,
        totalJoinRequests: joinRequests.length,
        unreadMessages: messages.filter(m => !m.read).length,
        totalMessages: messages.length,
        knowledgeBaseItems: knowledge.length
      },
      lastSync: new Date().toISOString()
    };
  }
};

module.exports = storage;
