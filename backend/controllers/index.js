const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const storage = require('../services/storage');

const JWT_SECRET = process.env.JWT_SECRET || 'nexoraa_quantum_secure_jwt_secret_key_2026_prod';

// Auth Controller
const authController = {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Email and password required.' });
      }

      const admin = await storage.findAdminByEmail(email);
      if (!admin) {
        return res.status(401).json({ success: false, error: 'Invalid credentials.' });
      }

      const isMatch = bcrypt.compareSync(password, admin.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ success: false, error: 'Invalid credentials.' });
      }

      const token = jwt.sign(
        { id: admin._id || admin.id, email: admin.email, role: admin.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        token,
        admin: {
          id: admin._id || admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      });
    } catch (err) {
      console.error('[Auth Error]', err);
      return res.status(500).json({ success: false, error: 'Internal authentication error.' });
    }
  },

  async me(req, res) {
    return res.json({ success: true, admin: req.admin });
  }
};

// Project Controller
const projectController = {
  async getAll(req, res) {
    try {
      const projects = await storage.getProjects();
      return res.json({ success: true, count: projects.length, data: projects });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async getBySlug(req, res) {
    try {
      const project = await storage.getProjectBySlug(req.params.slug);
      if (!project) {
        return res.status(404).json({ success: false, error: 'Project not found.' });
      }
      return res.json({ success: true, data: project });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async create(req, res) {
    try {
      const created = await storage.createProject(req.body);
      return res.status(201).json({ success: true, data: created });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await storage.updateProject(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Project not found.' });
      }
      return res.json({ success: true, data: updated });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await storage.deleteProject(req.params.id);
      return res.json({ success: true, message: 'Project removed.' });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};

// Team Controller
const teamController = {
  async getAll(req, res) {
    try {
      const team = await storage.getTeamMembers();
      return res.json({ success: true, count: team.length, data: team });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async create(req, res) {
    try {
      const member = await storage.createTeamMember(req.body);
      return res.status(201).json({ success: true, data: member });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await storage.updateTeamMember(req.params.id, req.body);
      return res.json({ success: true, data: updated });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await storage.deleteTeamMember(req.params.id);
      return res.json({ success: true, message: 'Member removed.' });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};

// Community Controller
const communityController = {
  async getAll(req, res) {
    try {
      const members = await storage.getCommunityMembers();
      return res.json({ success: true, count: members.length, data: members });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async create(req, res) {
    try {
      const item = await storage.createCommunityMember(req.body);
      return res.status(201).json({ success: true, data: item });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  },

  async updateStatus(req, res) {
    try {
      const updated = await storage.updateCommunityMemberStatus(req.params.id, req.body.status);
      return res.json({ success: true, data: updated });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }
};

// Join Requests Controller
const joinRequestController = {
  async submit(req, res) {
    try {
      const { name, email, role, skills, whyNexoraa } = req.body;
      if (!name || !email || !role || !skills || !whyNexoraa) {
        return res.status(400).json({ success: false, error: 'Please fill in all required fields.' });
      }
      const request = await storage.createJoinRequest(req.body);
      return res.status(201).json({
        success: true,
        message: 'APPLICATION RECEIVED. Nexoraa will review your application.',
        data: request
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const requests = await storage.getJoinRequests();
      return res.json({ success: true, count: requests.length, data: requests });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async updateStatus(req, res) {
    try {
      const updated = await storage.updateJoinRequestStatus(req.params.id, req.body.status);
      return res.json({ success: true, data: updated });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }
};

// Research Controller
const researchController = {
  async getAll(req, res) {
    try {
      const list = await storage.getResearchTracks();
      return res.json({ success: true, count: list.length, data: list });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async create(req, res) {
    try {
      const item = await storage.createResearchTrack(req.body);
      return res.status(201).json({ success: true, data: item });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }
};

// Achievement Controller
const achievementController = {
  async getAll(req, res) {
    try {
      const list = await storage.getAchievements();
      return res.json({ success: true, count: list.length, data: list });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async create(req, res) {
    try {
      const item = await storage.createAchievement(req.body);
      return res.status(201).json({ success: true, data: item });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await storage.deleteAchievement(req.params.id);
      return res.json({ success: true, message: 'Achievement deleted.' });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};

// Chatbot Controller
const chatbotController = {
  async ask(req, res) {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ success: false, error: 'Query message is required.' });
      }
      const response = await storage.queryChatbot(message);
      return res.json({ success: true, data: response });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async getKnowledge(req, res) {
    try {
      const list = await storage.getChatbotKnowledge();
      return res.json({ success: true, count: list.length, data: list });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async createKnowledge(req, res) {
    try {
      const item = await storage.createChatbotKnowledge(req.body);
      return res.status(201).json({ success: true, data: item });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  },

  async updateKnowledge(req, res) {
    try {
      const item = await storage.updateChatbotKnowledge(req.params.id, req.body);
      return res.json({ success: true, data: item });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  },

  async deleteKnowledge(req, res) {
    try {
      await storage.deleteChatbotKnowledge(req.params.id);
      return res.json({ success: true, message: 'Knowledge entry removed.' });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};

// Contact Controller
const contactController = {
  async sendMessage(req, res) {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'Please enter name, email, and message.' });
      }
      const msg = await storage.createContactMessage(req.body);
      return res.status(201).json({
        success: true,
        message: 'Message transmitted to Nexoraa uplink.',
        data: msg
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async getMessages(req, res) {
    try {
      const list = await storage.getContactMessages();
      return res.json({ success: true, count: list.length, data: list });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  async markRead(req, res) {
    try {
      const updated = await storage.markContactMessageRead(req.params.id);
      return res.json({ success: true, data: updated });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }
};

// System Controller
const systemController = {
  async getStats(req, res) {
    try {
      const stats = await storage.getSystemStats();
      return res.json({ success: true, data: stats });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = {
  authController,
  projectController,
  teamController,
  communityController,
  joinRequestController,
  researchController,
  achievementController,
  chatbotController,
  contactController,
  systemController
};
