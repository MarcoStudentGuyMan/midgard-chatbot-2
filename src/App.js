import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Home/Navbar';
import Footer from './Home/Footer';
import Chatbot from './Home/Chatbot';
import HomePage from './Home/HomePage';
import FoodPlace from './Home/FoodPlace';
import Location from './Home/Location';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/food-places" element={<FoodPlace />} />
        <Route path="/location" element={<Location />} />
      </Routes>
      <Chatbot />
      <Footer />
    </Router>
  );
}

export default App;
