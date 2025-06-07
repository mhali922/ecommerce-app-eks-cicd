const express = require('express');
const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

app.get('/products', (req, res) => {
  res.json([
    { id: 1, name: 'Shirt', price: 20 },
    { id: 2, name: 'Shoes', price: 50 },
  ]);
});

app.listen(port, () => {
  console.log(`Product API running on port ${port}`);
});
