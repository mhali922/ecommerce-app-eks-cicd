import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// Material UI imports for the better page
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
const authApiBase = import.meta.env.VITE_AUTH_API_URL;
const productApiBase = import.meta.env.VITE_PRODUCT_API_URL

function App() {
  const [products, setProducts] = useState([]);
  const [registerForm, setRegisterForm] = useState({ username: '', password: '' });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    //fetch('http://localhost:3001/products')
    fetch(`${productApiBase}/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  useEffect(() => {
    if (!token) return;

    //fetch('http://localhost:3002/api/auth/profile', {
    fetch(`${authApiBase}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then(data => setProfile(data.user || data))
      .catch(() => setProfile(null));
  }, [token]);

  const handleRegister = async (e) => {
    e.preventDefault();
    await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerForm),
    });
    alert('Registered! You can now login.');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        alert('Login successful!');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setProfile(null);
  };

  return (
    <Router>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            E-Commerce App
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button color="inherit" component={Link} to="/">Products</Button>
            {!token ? (
              <>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
              </>
            ) : (
              <>
                <Typography>Welcome, {profile?.username}</Typography>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route path="/login" element={
            token ? <Navigate to="/" /> : (
              <LoginForm form={loginForm} setForm={setLoginForm} onSubmit={handleLogin} />
            )
          } />
          <Route path="/register" element={
            token ? <Navigate to="/" /> : (
              <RegisterForm form={registerForm} setForm={setRegisterForm} onSubmit={handleRegister} />
            )
          } />
        </Routes>
      </Container>
    </Router>
  );
}

function ProductList({ products }) {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Products</Typography>
      {products.map(p => (
        <Box key={p.id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
          <Typography variant="h6">{p.name}</Typography>
          <Typography>${p.price}</Typography>
        </Box>
      ))}
    </Box>
  );
}

function LoginForm({ form, setForm, onSubmit }) {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
        required
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
      />
      <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>Login</Button>
    </Box>
  );
}

function RegisterForm({ form, setForm, onSubmit }) {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
        required
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
      />
      <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>Register</Button>
    </Box>
  );
}

export default App;
