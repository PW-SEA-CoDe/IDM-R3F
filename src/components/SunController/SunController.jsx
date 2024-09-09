import { useState, useEffect, useCallback } from "react";
import Slider from "../UI/Slider/Slider";
import { useSunContext } from "../../SunContext";
import { calculateSunPosition, sunPositionToCartesian } from "../../lib/utils";

import "./SunController.css";
import LocationButton from "./LocationButton/LocationButton";

// default latitude and longitude to seattle
const SunController = ({ latitude = 47.6061, longitude = 122.3328 }) => {
  const [time, setTime] = useState(new Date());
  const { setSunPosition } = useSunContext();

  const updateSunPosition = useCallback(() => {
    const { elevation, azimuth } = calculateSunPosition(
      time,
      latitude,
      longitude,
    );
    const position = sunPositionToCartesian(elevation, azimuth);
    console.log(position);
    setSunPosition(position);
  }, [time, setSunPosition]);

  useEffect(() => {
    updateSunPosition();
  }, [updateSunPosition]);

  const handleTimeChange = (newTime) => {
    const date = new Date(time);
    date.setHours(Math.floor(newTime / 60));
    date.setMinutes(newTime % 60);
    setTime(date);
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
  };

  return (
    <div className="sun-controller">
      <h3 className="component-header">Solar Controls</h3>
      <div className="columns spaced-out">
        <p className="component-body">Project location: </p>
        <LocationButton />
      </div>
      <div className="location-input-container">
        <label htmlFor="lat">
          {/* Lat: */}
          <input
            id="lat"
            type="text"
            className="location-text"
            placeholder="47.6061"
          />
        </label>
        <label htmlFor="lat">
          {/* Long: */}
          <input
            id="long"
            type="text"
            className="location-text"
            placeholder="122.3328"
          />
        </label>
      </div>
      <p className="component-body">
        Time: {formatTime(time.getHours() * 60 + time.getMinutes())}
      </p>
      <Slider
        min={0}
        max={1439}
        step={1}
        initialValue={time.getHours() * 60 + time.getMinutes()}
        onChange={handleTimeChange}
      />
    </div>
  );
};

export default SunController;
