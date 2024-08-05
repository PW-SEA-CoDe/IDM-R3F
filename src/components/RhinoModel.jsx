import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { rhino3dm } from "rhino3dm";

const RhinoModel = ({ url }) => {
  const [geometry, setGeometry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    rhino3dm()
      .then((rhino) => {
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Could not load ${url}: ${response.statusText}`);
            }
            return response.arrayBuffer();
          })
          .then((buffer) => {
            const doc = rhino.File3dm.fromByteArray(new Uint8Array(buffer));
            const objects = doc.objects();
            if (objects.count === 0) {
              throw new Error("No objects found in the .3dm file");
            }
            const rhinoObject = objects.get(0).geometry();
            const threeMesh = rhinoObjectToThreeMesh(rhinoObject, rhino);
            setGeometry(threeMesh.geometry);
          })
          .catch((err) => setError(`Error loading .3dm file: ${err.message}`));
      })
      .catch((err) => setError(`Error initializing rhino3dm: ${err.message}`));
  }, [url]);

  const rhinoObjectToThreeMesh = (rhinoObject, rhino) => {
    // You might need to adjust this based on your Rhino3dm usage
    const loader = new THREE.BufferGeometryLoader();
    const bufferGeometry = loader.parse(rhinoObject.toThreejsJSON());
    return new THREE.Mesh(
      bufferGeometry,
      new THREE.MeshStandardMaterial({ color: "orange" }),
    );
  };

  if (error) {
    return <div>{error}</div>;
  }

  return geometry ? <primitive object={geometry} /> : null;
};

export default RhinoModel;
