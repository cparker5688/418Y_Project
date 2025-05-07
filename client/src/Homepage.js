import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomeScreen.css';

export default function Homepage() {
  const [deals, setDeals] = useState([]);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch deals
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

  const handleLike = async () => {
    const currentDeal = deals[idx];
    const userId = localStorage.getItem('userId');
  
    if (!userId || !currentDeal._id) {
      console.error("Missing userId or deal ID");
      return;
    }
  
    try {
      await axios.post('http://localhost:9000/addFavorite', {
        userId,
        restaurantId: currentDeal._id,
      });
  
      // Move to next deal
      setIdx(i => Math.min(i + 1, deals.length - 1));
    } catch (error) {
      console.error("Failed to add favorite:", error);
    }
  };
  const handleSkip = () => {
    setIdx(i => Math.min(i + 1, deals.length - 1));
  };

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: handleSkip,
    onSwipedRight: handleLike,
    trackMouse: true,
  });

  if (loading) return <div className="loadingContainer"><p className="spinner">Loading…</p></div>;

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

  const { name, description, happyHour, image } = deals[idx];

  return (
    <div className="container" {...handlers} style={{ touchAction: 'pan-y' }}>
      <div className="card">
        <h2 className="title">{name}</h2>
        <p className="hours"><em>{happyHour}</em></p>
        <img src={image} alt={name} className="image" />
        <p className="description">{description}</p>

        <div className="card-actions">
          <button onClick={() => setIdx(i => Math.max(i - 1, 0))}>← Prev</button>
          <button onClick={() => navigate('/favorites')}>View Favorites</button>
          <button onClick={handleSkip}>Skip →</button>
        </div>

        <div style={{ marginTop: 10 }}>
        <button onClick={handleSkip} style={{ backgroundColor: '#c0f0c0' }}>
            👎 Dislike
          </button>
          <button onClick={handleLike} style={{ backgroundColor: '#c0f0c0' }}>
            👍 Like
          </button>
        </div>
        <small>Swipe right to like, left to skip</small>
      </div>
      <div>
            <Link to = "/preferences">User Preferences</Link>
        </div>
    </div>
    
  );
}