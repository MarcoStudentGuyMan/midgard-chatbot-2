import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '../Style/location.module.css'; // CSS module for styling
import markerIconUrl from '../imgs/marker.png'; // Custom marker icon

// Define the custom marker icon
const markerIcon = new L.Icon({
  iconUrl: markerIconUrl,
  iconSize: [50, 45],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Location = () => {
  const center = [9.308715708493441, 123.30354446030861]; // Center coordinates for the map
  const zoom = 15;

  return (
    <div className={styles.container}>

      {/* Main content with the map */}
      <div className={styles.content}>
        <h1 className={styles.heading}>Our Location</h1>
        <div className={styles.mapBox}>
          <MapContainer center={center} zoom={zoom} className={styles.mapContainer}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={center} icon={markerIcon}>
              <Popup>MIDGARD</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

    </div>
  );
};

export default Location;
