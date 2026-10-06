const mongoose = require('mongoose');

// Admin Schema
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'ADMIN', enum: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
  createdAt: { type: Date, default: Date.now }
});

// Project Schema
const ProjectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  number: { type: String, required: true },
  title: { type: String, required: true },
  domain: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String },
  problem: { type: String },
  solution: { type: String },
  features: [{ type: String }],
  architecture: { type: String },
  aiDetails: { type: String },
  techStack: [{ type: String }],
  status: { type: String, default: 'ACTIVE' },
  githubUrl: { type: String },
  liveUrl: { type: String },
  previewImage: { type: String },
  screenshots: [{ type: String }],
  featured: { type: Boolean, default: false },
  priority: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Team Member Schema
const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  bio: { type: String },
  photoUrl: { type: String },
  githubUrl: { type: String },
  linkedinUrl: { type: String },
  portfolioUrl: { type: String },
  skills: [{ type: String }],
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
});

// Community Member Schema
const CommunityMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: 'DEVELOPER' },
  skills: [{ type: String }],
  github: { type: String },
  status: { type: String, default: 'approved', enum: ['approved', 'pending', 'rejected'] },
  joinedAt: { type: Date, default: Date.now }
});

// Join Request Schema
const JoinRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  github: { type: String },
  portfolio: { type: String },
  role: { type: String, required: true },
  skills: { type: String, required: true },
  experience: { type: String },
  whyNexoraa: { type: String, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'reviewed', 'accepted', 'rejected', 'archived'] },
  createdAt: { type: Date, default: Date.now }
});

// Research Track Schema
const ResearchTrackSchema = new mongoose.Schema({
  number: { type: String, required: true },
  title: { type: String, required: true },
  domain: { type: String, required: true },
  summary: { type: String, required: true },
  keyAreas: [{ type: String }],
  status: { type: String, default: 'ACTIVE' }
});

// Achievement Schema
const AchievementSchema = new mongoose.Schema({
  year: { type: String, required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  event: { type: String, required: true },
  result: { type: String, required: true },
  description: { type: String },
  date: { type: String }
});

// Event Schema
const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  mode: { type: String, default: 'hybrid', enum: ['online', 'offline', 'hybrid'] },
  description: { type: String },
  link: { type: String },
  status: { type: String, default: 'UPCOMING' }
});

// Announcement Schema
const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  priority: { type: String, default: 'normal', enum: ['normal', 'high', 'critical'] },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Chatbot Knowledge Schema
const ChatbotKnowledgeSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, default: 'GENERAL' },
  keywords: [{ type: String }],
  priority: { type: Number, default: 5 },
  pageReference: { type: String, default: '/' },
  helpfulCount: { type: Number, default: 0 }
});

// Contact Message Schema
const ContactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = {
  Admin: mongoose.model('Admin', AdminSchema),
  Project: mongoose.model('Project', ProjectSchema),
  TeamMember: mongoose.model('TeamMember', TeamMemberSchema),
  CommunityMember: mongoose.model('CommunityMember', CommunityMemberSchema),
  JoinRequest: mongoose.model('JoinRequest', JoinRequestSchema),
  ResearchTrack: mongoose.model('ResearchTrack', ResearchTrackSchema),
  Achievement: mongoose.model('Achievement', AchievementSchema),
  Event: mongoose.model('Event', EventSchema),
  Announcement: mongoose.model('Announcement', AnnouncementSchema),
  ChatbotKnowledge: mongoose.model('ChatbotKnowledge', ChatbotKnowledgeSchema),
  ContactMessage: mongoose.model('ContactMessage', ContactMessageSchema)
};
