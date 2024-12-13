import React from 'react';
import '../Style/HomePage.css';
import FoodPark from '../imgs/FoodPark.jpg';

function HomePage() {
  return (
    <div className="home-container">

      {/* Main Content */}
      <main className="main-content">
        <div className="text-section">
          <h2>Manage your stalls, and handle inventory effortlessly.</h2>
          <h1>Satisfy Cravings at <span className="highlight">Midgard Food Park</span></h1>
          <p>
            The Midgard Food Park is a place to eat in Dumaguete City where one can find a variety of food served by a variety of food stalls. Come visit Midgard.
          </p>
        </div>
        <div className="image-section">
          <img src={FoodPark} alt="Food Park" className="food-image" />
        </div>
      </main>


    </div>
  );
}

export default HomePage;
