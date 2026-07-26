const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const aiCareerRoutes = require('./routes/aiCareerRoutes');
const careerRoutes = require('./routes/careerRoutes');
const studentRoutes = require('./routes/studentRoutes');
const contactRoutes = require('./routes/contactRoutes');


const app = express();

app.use('/api/ai', aiCareerRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CareerPath Backend Running',
  });
});

// API Routes
app.use('/api/careers', careerRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/contact', contactRoutes);

// Port Configuration
const PORT = process.env.PORT || 5000;

// Start Server
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const whatsappRoutes = require("./routes/whatsappRoutes");

app.use("/api/whatsapp", whatsappRoutes);