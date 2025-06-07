// auth/controllers/authController.js
const jwt = require("jsonwebtoken");

const users = []; // In-memory user store for demo

exports.register = (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ username, password });
  res.status(201).json({ message: "User registered" });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, "mySuperSecretKey", { expiresIn: "1h" });
  res.json({ token });
};
