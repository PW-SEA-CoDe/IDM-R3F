import { useState, useEffect, useCallback } from "react";
import Slider from "../UI/Slider/Slider";
import { useSunContext } from "../../SunContext";
import { calculateSunPosition, sunPositionToCartesian } from "../../lib/utils";

import "./SunController.css";

const SunController = () => {
  const [time, setTime] = useState(new Date());
  const { setSunPosition } = useSunContext();

  // seattle example
  const latitude = 47.6061;
  const longitude = 122.3328;

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
      <h3>Sun Position</h3>
      <p>Time of Day: {formatTime(time.getHours() * 60 + time.getMinutes())}</p>
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
