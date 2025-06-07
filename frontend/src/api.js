import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_PRODUCT_API_URL || "http://localhost:3001";

export const fetchProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};
