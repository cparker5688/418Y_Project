// src/Favorites.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Favorites() {
  const navigate = useNavigate();

  // Load favorites from localStorage (array of deal objects)
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );

  const removeFavorite = (id) => {
    const updated = favorites.filter(f => f._id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="container py-4">
      {/* Header with back navigation */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Your Favorites</h2>
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate(-1)}
        >
          ← Back to Deals
        </button>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center text-muted">
          No favorites yet! Swipe right on deals to add them here.
        </div>
      ) : (
        <div className="row">
          {favorites.map(deal => (
            <div key={deal._id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="card-img-top"
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{deal.name}</h5>
                  <p className="card-text text-truncate">{deal.happyHour}</p>
                  <button
                    className="btn btn-danger mt-auto"
                    onClick={() => removeFavorite(deal._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
