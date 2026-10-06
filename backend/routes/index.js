const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');
const {
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
} = require('../controllers');

// Authentication
router.post('/auth/login', authController.login);
router.get('/auth/me', verifyToken, authController.me);

// Projects
router.get('/projects', projectController.getAll);
router.get('/projects/:slug', projectController.getBySlug);
router.post('/projects', verifyToken, projectController.create);
router.put('/projects/:id', verifyToken, projectController.update);
router.delete('/projects/:id', verifyToken, projectController.delete);

// Team
router.get('/team', teamController.getAll);
router.post('/team', verifyToken, teamController.create);
router.put('/team/:id', verifyToken, teamController.update);
router.delete('/team/:id', verifyToken, teamController.delete);

// Community
router.get('/community', communityController.getAll);
router.post('/community', communityController.create);
router.patch('/community/:id/status', verifyToken, communityController.updateStatus);

// Join Requests
router.post('/join', joinRequestController.submit);
router.get('/join-requests', verifyToken, joinRequestController.getAll);
router.patch('/join-requests/:id/status', verifyToken, joinRequestController.updateStatus);

// Research
router.get('/research', researchController.getAll);
router.post('/research', verifyToken, researchController.create);

// Achievements
router.get('/achievements', achievementController.getAll);
router.post('/achievements', verifyToken, achievementController.create);
router.delete('/achievements/:id', verifyToken, achievementController.delete);

// Chatbot & Knowledge Base
router.post('/ai/ask', chatbotController.ask);
router.get('/ai/knowledge', chatbotController.getKnowledge);
router.post('/ai/knowledge', verifyToken, chatbotController.createKnowledge);
router.put('/ai/knowledge/:id', verifyToken, chatbotController.updateKnowledge);
router.delete('/ai/knowledge/:id', verifyToken, chatbotController.deleteKnowledge);

// Contact Uplink
router.post('/contact', contactController.sendMessage);
router.get('/contact', verifyToken, contactController.getMessages);
router.patch('/contact/:id/read', verifyToken, contactController.markRead);

// System Status & Stats
router.get('/system/stats', systemController.getStats);

module.exports = router;
