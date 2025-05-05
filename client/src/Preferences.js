import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Preferences() {
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState({
    cuisines: [], priceRange: { min: 1, max: 5 }, distance: 5
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/user/me')
      .then(res => {
        if (res.data.preferences) setPrefs(res.data.preferences);
      })
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleChange = field => e => {
    const value = e.target.value;
    setPrefs(p => {
      if (field === 'cuisines') {
        return { ...p, cuisines: value.split(',').map(s => s.trim()) };
      }
      if (field === 'distance') {
        return { ...p, distance: +value };
      }
      const [parent, child] = field.split('.');
      return {
        ...p,
        [parent]: { ...p[parent], [child]: +value }
      };
    });
  };

  const handleSave = () => {
    axios.put('/api/user/preferences', prefs)
      .then(() => alert('Preferences saved!'))
      .catch(err => console.error(err));
  };

  if (loading) return <p>Loading preferences…</p>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Edit Preferences</h1>
      <label>
        Cuisines (comma-separated):<br/>
        <input
          type="text"
          value={prefs.cuisines.join(', ')}
          onChange={handleChange('cuisines')}
          style={{ width: '100%' }}
        />
      </label>
      <br/><br/>
      <label>
        Price Range:<br/>
        Min: <input
          type="number"
          value={prefs.priceRange.min}
          onChange={handleChange('priceRange.min')}
          style={{ width: 80, marginRight: 8 }}
        />
        Max: <input
          type="number"
          value={prefs.priceRange.max}
          onChange={handleChange('priceRange.max')}
          style={{ width: 80 }}
        />
      </label>
      <br/><br/>
      <label>
        Max Distance (miles):<br/>
        <input
          type="number"
          value={prefs.distance}
          onChange={handleChange('distance')}
          style={{ width: 100 }}
        />
      </label>
      <br/><br/>
      <button onClick={handleSave} style={{ padding: '8px 16px' }}>
        Save Preferences
      </button>
    </div>
  );
}
