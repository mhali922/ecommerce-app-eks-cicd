import React, { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ username: '', password: '' });
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [profile, setProfile] = useState(null);

  // Fetch products (unauthenticated)
  useEffect(() => {
    fetch('http://localhost:3001/products') // make sure this is your product API
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // Fetch profile if token exists
  useEffect(() => {
    if (!token) return;

    fetch('http://localhost:3002/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setProfile(data.user))
      .catch(() => setProfile(null));
  }, [token]);

  const handleRegister = async (e) => {
    e.preventDefault();
    await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    alert('Registered! You can now login.');
  };

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json(); // ⬅️ Only one call to res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      alert('Login successful!');
      // Redirect or update UI
    } else {
      alert('Invalid credentials');
    }
  } catch (err) {
    console.error('Login error:', err);
    alert(err.message);
  }
};

  return (
    <div>
      <h1>E-Commerce App</h1>

      {!token ? (
        <div>
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input type="text" placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
            <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <button type="submit">Register</button>
          </form>

          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
            <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Welcome, {profile?.username}</h2>
          <button onClick={() => {
            localStorage.removeItem('token');
            setToken('');
            setProfile(null);
          }}>Logout</button>
        </div>
      )}

      <h2>Products</h2>
      {products.map(p => (
        <div key={p.id}>
          <strong>{p.name}</strong>: ${p.price}
        </div>
      ))}
    </div>
  );
}

export default App;
