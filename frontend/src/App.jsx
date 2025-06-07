import React, { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import { fetchProducts } from "./api";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  return (
    <div>
      <h1>E-Commerce Store</h1>
      <ProductList products={products} />
    </div>
  );
};

export default App;
