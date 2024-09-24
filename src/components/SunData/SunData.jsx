import { useState } from "react";
import { useSunContext } from "../../SunContext";
import { roundTo } from "../../lib/utils";

const SunData = () => {
  const { pos, bright, temp } = useSunContext();

  const [sunPosition] = pos;
  const [sunBrightness] = bright;
  const [sunTemperature] = temp;

  const [x, y, z] = sunPosition;
  const posString = roundTo(x, 0) + ", " + roundTo(y, 0) + ", " + roundTo(z, 0);
  const brightString = roundTo(sunBrightness, 2);
  const tempString = roundTo(sunTemperature, 0);

  return (
    <section className="card">
      <h3 className="component-header">Solar Info</h3>
      <div className="component-horizontal-container">
        <p className="component-subheader">Position: </p>
        <p className="component-body">{posString}</p>
      </div>
      <div className="component-horizontal-container">
        <p className="component-subheader">Brightness: </p>
        <p className="component-body">{brightString}</p>
      </div>
      <div className="component-horizontal-container">
        <p className="component-subheader">Temperature: </p>
        <p className="component-body">{tempString}</p>
      </div>
    </section>
  );
};

export default SunData;
