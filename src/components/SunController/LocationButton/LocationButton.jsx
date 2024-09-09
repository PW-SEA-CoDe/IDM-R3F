import { useState } from "react";

import "./LocationButton.css";

const LocationButton = ({ onLocationChange }) => {
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { lat, long } = pos.coords;
          onLocationChange(lat, long);
          setError(null); // clear prev errors
        },
        (error) => {
          setError(error.message);
        },
      );
    } else {
      setError(
        "Geolocation not supported by this browser. Defaulting to Seattle, WA",
      );
    }
  };
  return (
    <>
      <button className="location-button" onClick={getLocation}>
        <p className="button-body">Locate</p>
      </button>
      {error && <p>Error: {error}</p>}
    </>
  );
};

export default LocationButton;
