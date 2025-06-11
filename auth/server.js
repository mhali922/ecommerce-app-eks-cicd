const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// ✅ Use environment variable for CORS origin
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
