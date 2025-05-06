import React, { useState, useEffect } from "react";
import axios from "axios";
import './HomeScreen.css';

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:9000/getRestaurants")
      .then((response) => {
        setRestaurants(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
        setLoading(false);
      });
  }, []);

  const renderItem = (restaurant) => {
    return (
      <div className="card" key={restaurant._id}>
        <img
          src={restaurant.imageURL}
          alt={restaurant.restName}
          className="image"
        />
        <h2 className="title">{restaurant.restName}</h2>
        <p className="description">{restaurant.restOptions}</p>
        <p className="hours">{restaurant.restHours}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loadingContainer">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="scrollContainer">
        {restaurants.map(renderItem)}
      </div>
    </div>
  );
};

export default HomeScreen;