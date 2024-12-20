
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const gatepassRoutes = require('./routes/gatepassRoutes');
require('dotenv').config();

const app = express();

// Database connection
connectDB();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this based on your frontend URL
  credentials: true,
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: connectMongo.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/gatepass', gatepassRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
