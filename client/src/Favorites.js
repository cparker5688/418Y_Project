// src/Favorites.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css'; // optional

export default function Favorites() {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    setFavs(JSON.parse(localStorage.getItem('favs') || '[]'));
  }, []);

  const remove = id => {
    const updated = favs.filter(d => d.id !== id);
    localStorage.setItem('favs', JSON.stringify(updated));
    setFavs(updated);
  };

  if (!favs.length) {
    return (
      <div>
        <p>No favorites yet.</p>
        <Link to="/homepage">Browse Deals</Link>
      </div>
    );
  }

  return (
    <div className="fav-list">
      <h1>Your Favorites</h1>
      {favs.map(d => (
        <div key={d.id} className="fav-card">
          <h3>{d.name}</h3>
          <p><em>{d.happyHour}</em></p>
          <p>{d.description}</p>
          <button onClick={() => remove(d.id)}>Remove</button>
        </div>
      ))}
      <Link to="/homepage">← Back to browse</Link>
    </div>
  );
}
