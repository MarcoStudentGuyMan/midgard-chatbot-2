import React, { useEffect, useState } from 'react';
import styles from '../Style/foodPlace.module.css';
import { supabase } from '../supabaseClient';
import FoodPlaceDetails from './FoodPlace_details';

const FoodPlace = () => {
  const [foodPlaces, setFoodPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    const fetchFoodPlaces = async () => {
      const { data, error } = await supabase
        .from('FOOD_PLACES')
        .select('food_place_name, food_place_desc, food_place_type, food_place_logo');

      if (error) {
        console.error("Error fetching food places:", error);
      } else {
        setFoodPlaces(data);
        setFilteredPlaces(data); // Initialize filtered list
      }
      setLoading(false);
    };

    fetchFoodPlaces();
  }, []);

  const openDetails = (place) => {
    setSelectedPlace(place);
  };

  const closeDetails = () => {
    setSelectedPlace(null);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    filterFoodPlaces(e.target.value, filterType);
  };

  // Handle filter dropdown change
  const handleFilterChange = (e) => {
    const type = e.target.value;
    setFilterType(type);
    filterFoodPlaces(searchText, type);
  };

  // Filter and search logic
  const filterFoodPlaces = (search, type) => {
    let filtered = foodPlaces;

    if (search) {
      filtered = filtered.filter((place) =>
        place.food_place_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type) {
      filtered = filtered.filter((place) => place.food_place_type === type);
    }

    setFilteredPlaces(filtered);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.foodPlaceContainer}>
      <main className={styles.mainContent}>
        <div className={styles.searchFilterContainer}>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
            value={searchText}
            onChange={handleSearchChange}
          />
          <select
            className={styles.filterSelect}
            value={filterType}
            onChange={handleFilterChange}
          >
            <option value="">All Types</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Dessert">Dessert</option>
            <option value="Mexican">Mexican</option>
            <option value="Japanese">Japanese</option>
          </select>
        </div>

        <div className={styles.foodList}>
          {filteredPlaces.map((place, index) => (
            <div key={index} className={styles.foodItem}>
              <img src={place.food_place_logo} alt={place.food_place_name} className={styles.foodImage} />
              <div className={styles.foodDetails}>
                <h2 className={styles.foodName}>{place.food_place_name}</h2>
                <button className={styles.viewButton} onClick={() => openDetails(place)}>View</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal Popup */}
      {selectedPlace && <FoodPlaceDetails place={selectedPlace} onClose={closeDetails} />}
    </div>
  );
};

export default FoodPlace;
