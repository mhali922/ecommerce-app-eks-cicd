const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3002;

// Enable CORS so frontend (localhost:3000) can call the backend (localhost:3002)
app.use(cors());
app.use(express.json());

// Sample product data
const products = [
  { id: 1, name: 'Shirt', price: 20 },
  { id: 2, name: 'Shoes', price: 50 },
  { id: 3, name: 'Hat', price: 15 },
];

// Routes
app.get('/products', (req, res) => {
  res.json(products);
});

// Health check (optional)
app.get('/', (req, res) => {
  res.send('Product API is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Product API is running on http://localhost:${PORT}`);
});
