import { useState, useEffect, useCallback } from "react";
import Slider from "../UI-primitives/Slider/Slider";
import { useSunContext } from "../../SunContext";
import {
  calculateSunPosition,
  calculateSunProperties,
  sunPositionToCartesian,
} from "../../lib/utils";

import "./SunController.css";
import LocationButton from "./LocationButton/LocationButton";

// default latitude and longitude to seattle
const SunController = ({ latitude = 47.6061, longitude = 122.3328 }) => {
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState({ lat: null, long: null });
  const [latText, setLatText] = useState("47.6061");
  const [longText, setLongText] = useState("122.3328");

  const { pos, bright, temp } = useSunContext();

  const [, setSunPosition] = pos;
  const [, setSunBrightness] = bright;
  const [, setSunTemperature] = temp;

  const updateSunPosition = useCallback(() => {
    const { elevation, azimuth } = calculateSunPosition(
      time,
      latitude,
      longitude,
    );
    const position = sunPositionToCartesian(elevation, azimuth);
    const { brightness, temperature } = calculateSunProperties(elevation);
    console.log("pos: ", position);
    console.log("bri: ", brightness);
    console.log("temp: ", temperature);
    setSunPosition(position);
    setSunBrightness(1 + brightness);
    setSunTemperature(temperature);
  }, [time, setSunPosition]);

  useEffect(() => {
    updateSunPosition();
  }, [updateSunPosition]);

  const handleLocationChange = (latitude, longitude) => {
    setLocation({ latitude, longitude });
    setLatText(location.lat);
    setLongText(location.long);
  };

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
    <div className="sun-controller card">
      <h3 className="component-header">Solar Controls</h3>
      <p className="component-body">Location: </p>
      <LocationButton onLocationChange={handleLocationChange} />
      <div className="location-input">
        <label htmlFor="lat">
          {/* Lat: */}
          <input
            id="lat"
            type="text"
            className="location-text"
            placeholder="47.6061"
            value={latText}
            onChange={setLatText}
          />
        </label>
        <label htmlFor="lat">
          {/* Long: */}
          <input
            id="long"
            type="text"
            className="location-text"
            placeholder="122.3328"
            value={longText}
            onChange={setLongText}
          />
        </label>
      </div>
      <div className="location-input-container"></div>
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
