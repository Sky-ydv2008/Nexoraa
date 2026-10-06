require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./config/db');
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS Configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Rate Limiting for Public Submissions
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: 'Too many requests from this IP, please try again later.' }
});

app.use('/api/join', publicLimiter);
app.use('/api/contact', publicLimiter);
app.use('/api/ai/ask', publicLimiter);

// Serve static assets from project root if needed
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Mount API routes
app.use('/api', apiRoutes);

// Root Ping
app.get('/', (req, res) => {
  res.json({
    brand: "NEXORAA",
    tagline: "BUILDING WHAT COMES NEXT.",
    status: "SYSTEM_ONLINE",
    version: "2026.1.0",
    docs: "/api/system/stats"
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found on NEXORAA node.' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('[NEXORAA Server Error]', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error occurred.'
  });
});

// Initialize Database & Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  NEXORAA CORE API ENGINE`);
    console.log(`  PORT: http://localhost:${PORT}`);
    console.log(`  ENVIRONMENT: ${process.env.NODE_ENV || 'development'}`);
    console.log(`  SYSTEM: ONLINE & READY`);
    console.log(`====================================================`);
  });
};

startServer();

module.exports = app;
