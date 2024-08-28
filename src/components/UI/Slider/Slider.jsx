import "./Slider.css";

import { useState } from "react";

const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  initialValue = 50,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        name="sunSlider"
        className="slider"
      />
      <span className="slider-value">{value}</span>
    </div>
  );
};

export default Slider;
