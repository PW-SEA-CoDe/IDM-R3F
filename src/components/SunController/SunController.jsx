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

//BUG: fix sun resetting when toggling panel containing this component

// default latitude and longitude to seattle
const SunController = ({ latitude = 47.6061, longitude = -122.3328 }) => {
  const [date, setDate] = useState(() => {
    const currentDate = new Date();
    const currentTime = currentDate.getHours();
    //TODO: update logic to check between sunrise/sunset (use suncalc)
    if (currentTime < 8 || currentTime > 19) {
      const newDate = currentDate.setHours(12, 0, 0);
      console.log("time before 8 or after 19, setting time to: " + newDate);
      return newDate;
    }
    console.log("current time during daylight, using current time");
    return new Date();
  });

  const [location, setLocation] = useState({ lat: null, long: null });
  const [latText, setLatText] = useState("47.6061");
  const [longText, setLongText] = useState("-122.3328");

  const { pos, bright, temp } = useSunContext();

  const [, setSunPosition] = pos;
  const [, setSunBrightness] = bright;
  const [, setSunTemperature] = temp;

  const sliderValue = date.getHours() * 60 + date.getMinutes();

  const updateSunPosition = useCallback(() => {
    const localDate = new Date(date.getTime());
    const { elevation, azimuth } = calculateSunPosition(
      localDate,
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
  }, [
    date,
    latitude,
    longitude,
    setSunPosition,
    setSunBrightness,
    setSunTemperature,
  ]);

  useEffect(() => {
    updateSunPosition();
  }, [updateSunPosition]);

  const handleLocationChange = (latitude, longitude) => {
    setLocation({ latitude, longitude });
    setLatText(location.lat);
    setLongText(location.long);
  };

  const handleTimeChange = (newTime) => {
    const newDate = new Date(date);
    newDate.setHours(Math.floor(newTime / 60), newTime % 60, 0, 0);
    setDate(newDate);
  };

  const formatTime = (date) => {
    const localTime = new Date(date.getTime());
    return localTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="sun-controller card">
      <h3 className="component-header">Solar Controls</h3>
      <div className="component-horizontal-container">
        <p className="component-subheader">Position: </p>
        <LocationButton onLocationChange={handleLocationChange} />
      </div>
      <div className="component-horizontal-container">
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
        <label htmlFor="long">
          {/* Long: */}
          <input
            id="long"
            type="text"
            className="location-text"
            placeholder="-122.3328"
            value={longText}
            onChange={setLongText}
          />
        </label>
      </div>

      <div className="component-horizontal-container">
        <p className="component-subheader">Time:</p>
        <span className="component-body">{" " + formatTime(date)}</span>
      </div>
      <Slider
        min={0}
        max={1439}
        step={1}
        initialValue={sliderValue}
        onChange={handleTimeChange}
      />
    </div>
  );
};

export default SunController;
