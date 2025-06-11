// frontend/src/api/auth.js

const API_BASE = process.env.REACT_APP_AUTH_API_URL;

export const register = async (username, password) => {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};

export const login = async (username, password) => {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};

export const getProfile = async (token) => {
  const res = await fetch(`${API_BASE}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
