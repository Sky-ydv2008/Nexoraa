import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercept requests to attach JWT token
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('nexoraa_admin_token') || localStorage.getItem('nexoraa_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProjects = async () => (await api.get('/projects')).data;
export const getProjectBySlug = async (slug) => (await api.get(`/projects/${slug}`)).data;
export const createProject = async (data) => (await api.post('/projects', data)).data;
export const updateProject = async (id, data) => (await api.put(`/projects/${id}`, data)).data;
export const deleteProject = async (id) => (await api.delete(`/projects/${id}`)).data;

export const getTeam = async () => (await api.get('/team')).data;
export const createTeamMember = async (data) => (await api.post('/team', data)).data;
export const updateTeamMember = async (id, data) => (await api.put(`/team/${id}`, data)).data;
export const deleteTeamMember = async (id) => (await api.delete(`/team/${id}`)).data;

export const getCommunity = async () => (await api.get('/community')).data;
export const updateCommunityStatus = async (id, status) => (await api.patch(`/community/${id}/status`, { status })).data;

export const submitJoin = async (data) => (await api.post('/join', data)).data;
export const getJoinRequests = async () => (await api.get('/join-requests')).data;
export const updateJoinRequestStatus = async (id, status) => (await api.patch(`/join-requests/${id}/status`, { status })).data;

export const getResearch = async () => (await api.get('/research')).data;
export const getAchievements = async () => (await api.get('/achievements')).data;
export const deleteAchievement = async (id) => (await api.delete(`/achievements/${id}`)).data;

export const askAI = async (message) => (await api.post('/ai/ask', { message })).data;
export const getChatbotKnowledge = async () => (await api.get('/ai/knowledge')).data;
export const createChatbotKnowledge = async (data) => (await api.post('/ai/knowledge', data)).data;
export const updateChatbotKnowledge = async (id, data) => (await api.put(`/ai/knowledge/${id}`, data)).data;
export const deleteChatbotKnowledge = async (id) => (await api.delete(`/ai/knowledge/${id}`)).data;

export const sendContact = async (data) => (await api.post('/contact', data)).data;
export const getContactMessages = async () => (await api.get('/contact')).data;
export const markContactRead = async (id) => (await api.patch(`/contact/${id}/read`)).data;

export const getSystemStats = async () => (await api.get('/system/stats')).data;

export const adminLogin = async (credentials) => (await api.post('/auth/login', credentials)).data;
export const getAdminProfile = async () => (await api.get('/auth/me')).data;

export default api;
