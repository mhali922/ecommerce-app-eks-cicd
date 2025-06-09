import React from "react";

export default function Header({ username, onLogout }) {
  return (
    <header>
      <h1>E-Commerce App</h1>
      <h2>Welcome, {username}</h2>
      <button onClick={onLogout}>Logout</button>
    </header>
  );
}
