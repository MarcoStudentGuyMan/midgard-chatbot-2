import React from 'react';
import styles from '../Style/foodPlaceDetails.module.css';

const FoodPlaceDetails = ({ place, onClose }) => {
  if (!place) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>✖</button>
        <h2>{place.food_place_name}</h2>
        <img src={place.food_place_logo} alt={place.food_place_name} className={styles.foodImage} />
        <p><strong>Description:</strong> {place.food_place_desc}</p>
        <p><strong>Type:</strong> {place.food_place_type}</p>
      </div>
    </div>
  );
};

export default FoodPlaceDetails;
