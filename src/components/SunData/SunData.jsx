import { useState } from "react";
import { useSunContext } from "../../SunContext";
import { roundTo } from "../../lib/utils";

const SunData = () => {
  const { pos, bright, temp } = useSunContext();

  const [sunPosition] = pos;
  const [sunBrightness] = bright;
  const [sunTemperature] = temp;

  const [x, y, z] = sunPosition;
  const posString = roundTo(x, 2) + ", " + roundTo(y, 2) + ", " + roundTo(z, 2);
  const brightString = roundTo(sunBrightness, 2);
  const tempString = roundTo(sunTemperature, 2);

  return (
    <section className="card">
      <h3 className="component-header">Solar Info</h3>
      <p className="component-subheader">Sun Position: </p>
      <div className="component-vertical-container">
        <p className="component-body">{posString}</p>
      </div>
      <p className="component-subheader">Sun Brightness: </p>
      <div className="component-vertical-container">
        <p className="component-body">{brightString}</p>
      </div>
      <p className="component-subheader">Sun Temperature: </p>
      <div className="component-vertical-container">
        <p className="component-body">{tempString}</p>
      </div>
    </section>
  );
};

export default SunData;
