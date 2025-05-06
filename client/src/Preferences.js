// src/Preferences.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Preferences.css';

export default function Preferences() {
  const [showRestaurants, setShowRestaurants] = useState(true);
  const [showBars, setShowBars]             = useState(true);
  const [startTime, setStartTime]           = useState('17:00');
  const [endTime, setEndTime]               = useState('20:00');

  // New preference states
  const [priceLevels, setPriceLevels]       = useState({ 1: true, 2: true, 3: true });
  const [minRating, setMinRating]           = useState(0);
  const [maxDistance, setMaxDistance]       = useState(5);
  const [days, setDays]                     = useState({
    Mon: true, Tue: true, Wed: true,
    Thu: true, Fri: true, Sat: true,
    Sun: true
  });

  const navigate = useNavigate();

  const togglePrice = level => {
    setPriceLevels(prev => ({ ...prev, [level]: !prev[level] }));
  };

  const toggleDay = day => {
    setDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const prefs = {
      showRestaurants,
      showBars,
      startTime,
      endTime,
      priceLevels,
      minRating,
      maxDistance,
      days
    };
    localStorage.setItem('preferences', JSON.stringify(prefs));
    navigate('/homepage');
  };

  return (
    <div className="preferences-container">
      <h1>Set Your Happy Hour Preferences</h1>
      <form onSubmit={handleSubmit} className="preferences-form">
        <label>
          <input
            type="checkbox"
            checked={showRestaurants}
            onChange={e => setShowRestaurants(e.target.checked)}
          />
          Show Restaurants
        </label>

        <label>
          <input
            type="checkbox"
            checked={showBars}
            onChange={e => setShowBars(e.target.checked)}
          />
          Show Bars
        </label>

        <label>
          Start Time:
          <input
            type="time"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
          />
        </label>

        <label>
          End Time:
          <input
            type="time"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
          />
        </label>

        {/* Price Level checkboxes */}
        <fieldset>
          <legend>Price Levels</legend>
          {[1, 2, 3].map(level => (
            <label key={level}>
              <input
                type="checkbox"
                checked={priceLevels[level]}
                onChange={() => togglePrice(level)}
              />
              {'$'.repeat(level)}
            </label>
          ))}
        </fieldset>

        {/* Minimum rating */}
        <label>
          Minimum Rating:
          <input
            type="number"
            min="0"
            max="5"
            step="0.5"
            value={minRating}
            onChange={e => setMinRating(parseFloat(e.target.value))}
          />
        </label>

        {/* Maximum distance */}
        <label>
          Max Distance (miles):
          <input
            type="number"
            min="1"
            max="50"
            step="1"
            value={maxDistance}
            onChange={e => setMaxDistance(parseInt(e.target.value))}
          />
        </label>

        {/* Days of the Week */}
        <fieldset>
          <legend>Days of Week</legend>
          {Object.keys(days).map(day => (
            <label key={day}>
              <input
                type="checkbox"
                checked={days[day]}
                onChange={() => toggleDay(day)}
              />
              {day}
            </label>
          ))}
        </fieldset>

        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
}