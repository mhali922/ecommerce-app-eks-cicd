import React, { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {products.map(p => (
        <div key={p.id}>
          <strong>{p.name}</strong>: ${p.price}
        </div>
      ))}
    </div>
  );
}

export default App;
