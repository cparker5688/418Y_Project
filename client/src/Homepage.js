// src/Homepage.js
import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomeScreen.css';

export default function Homepage() {
  const [deals, setDeals]     = useState([]);
  const [idx, setIdx]         = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate              = useNavigate();

  // Fetch happy-hour deals
  useEffect(() => {
    axios.get('http://localhost:9000/getDeals')
      .then(response => {
        setDeals(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Swipe handlers: left = skip, right = favorite + next
  const handlers = useSwipeable({
    onSwipedLeft: () => setIdx(i => Math.min(i + 1, deals.length - 1)),
    onSwipedRight: () => {
      const favs = JSON.parse(localStorage.getItem('favs') || '[]');
      const current = deals[idx];
      if (!favs.find(d => d.id === current.id)) {
        favs.push(current);
        localStorage.setItem('favs', JSON.stringify(favs));
      }
      setIdx(i => Math.min(i + 1, deals.length - 1));
    },
    trackMouse: true,
  });

  if (loading) return <p>Loading…</p>;

  if (!deals.length) {
    return (
      <div>
        <p>No deals found.</p>
        <button onClick={() => navigate('/preferences')}>Set Preferences</button>
        <button onClick={() => navigate('/favorites')} style={{ marginLeft: 8 }}>
          View Favorites
        </button>
      </div>
    );
  }

  const { name, description, happyHour } = deals[idx];

  return (
    <div className="card-container" {...handlers}>
      <div className="card">
        <h2>{name}</h2>
        <p><em>{happyHour}</em></p>
        <p>{description}</p>
        <div className="card-actions">
          <button onClick={() => setIdx(i => Math.max(i - 1, 0))}>Prev ←</button>
          <button onClick={() => navigate('/favorites')}>View Favorites</button>
          <button onClick={() => setIdx(i => Math.min(i + 1, deals.length - 1))}>Next →</button>
        </div>
        <small>Swipe right to add to favorites</small>
      </div>
    </div>
  );
}
