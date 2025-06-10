const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// ✅ Enable CORS for frontend on localhost:3000
app.use(cors({
//origin: 'http://localhost:3000',
  origin: 'http://3.83.129.140:3000',
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
