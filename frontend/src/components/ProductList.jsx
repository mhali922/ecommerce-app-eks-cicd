import React from "react";

const ProductList = ({ products }) => (
  <ul>
    {products.map((product) => (
      <li key={product.id}>
        {product.name} - ${product.price}
      </li>
    ))}
  </ul>
);

export default ProductList;
