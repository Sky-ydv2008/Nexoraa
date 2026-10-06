const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nexoraa';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnected = true;
    console.log(`[NEXORAA DB] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`[NEXORAA DB] MongoDB connection not established (${error.message}).`);
    console.log(`[NEXORAA DB] Operating in high-reliability persistent local storage mode.`);
    return false;
  }
};

const getStatus = () => isConnected;

module.exports = { connectDB, getStatus };
