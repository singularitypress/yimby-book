"use client";

import React, { Fragment } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { PathOptions } from "leaflet";

interface GeoJsonFeature {
  type: "Feature";
  properties: {
    [key: string]: any;
  };
  geometry: {
    type: string;
    coordinates: number[][][] | number[][] | number[];
  };
}

const colours: PathOptions["color"][] = [
  "#00876c",
  "#439981",
  "#6aaa96",
  "#8cbcac",
  "#aecdc2",
  "#cfdfd9",
  "#f1f1f1",
  "#f1d4d4",
  "#f0b8b8",
  "#ec9c9d",
  "#e67f83",
  "#de6069",
  "#d43d51",
];

const legend = {
  A1: {
    MaximumOccupants: 10,
    BuildingRequirements: "Detached house, 23 sqm per occupant",
    ParkingRequirements: "1.0 per owner + 1.0 per 2 occupants",
    AdditionalNotes: "Principal residence of owner",
  },
  B1: {
    MaximumOccupants: "Varies",
    BuildingRequirements: "Detached/semi-detached, 5 years old",
    ParkingRequirements: "1.0 per 3 rooms + 1.0 per 2 dwelling units",
    AdditionalNotes: "Exterior alterations limited",
  },
  B2: {
    MaximumOccupants: "Varies",
    BuildingRequirements: "Detached/semi-detached, 5 years old",
    ParkingRequirements: "1.0 per 3 rooms + 1.0 per 2 dwelling units",
    AdditionalNotes: "Max. 12 rooms",
  },
  B3: {
    MaximumOccupants: "Max. 25",
    BuildingRequirements: "No apartment buildings",
    ParkingRequirements: "1.0 per 3 rooms + 1.0 per 2 dwelling units",
    AdditionalNotes: "Max. 25 rooms",
  },
  C1: {
    MaximumOccupants: 10,
    BuildingRequirements: "Detached/semi-detached/duplex",
    ParkingRequirements: "1.0 per 3 rooms",
    AdditionalNotes: "Abuts a major street",
  },
};

export const DynamicMap = ({ data }: { data: any }) => {
  const colorMap: { [key: string]: PathOptions["color"] } = {};

  data.features.forEach((feature: GeoJsonFeature, index: number) => {
    const rmgString = feature.properties.RMG_STRING;
    if (!colorMap[rmgString]) {
      colorMap[rmgString] = colours[index % colours.length];
    }
  });

  return (
    <MapContainer
      style={{
        height: 600,
      }}
      className="w-full rounded-lg resize-y"
      center={[43.6532, -79.3832]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data && (
        <>
          {data.features.map((feature: GeoJsonFeature, index: number) => {
            const colour = colorMap[feature.properties.RMG_STRING];
            const { coordinates } = feature.geometry;
            const coords = coordinates as number[][][] | number[][] | number[];
            if (feature.geometry.type === "Polygon") {
              return (
                <Polygon
                  key={index}
                  pathOptions={{ color: colour }}
                  positions={coords as any}
                >
                  <Popup>
                    {Object.entries(feature.properties).map(([key, value]) => (
                      <Fragment key={key}>
                        <b>{key}</b>: {value}
                        <br />
                      </Fragment>
                    ))}
                  </Popup>
                </Polygon>
              );
            } else if (feature.geometry.type === "MultiPolygon") {
              return (
                <Fragment key={index}>
                  {(coords as number[][][]).map((polygon, index) => (
                    <Polygon
                      key={index}
                      pathOptions={{ color: colour }}
                      positions={polygon as any}
                    >
                      <Popup>
                        <strong>{feature.properties.RMG_STRING}</strong>
                        <br />
                        {Object.entries(
                          legend[
                            feature.properties.RMG_STRING as keyof typeof legend
                          ]
                        ).map(([key, value]) => (
                          <Fragment key={key}>
                            <strong>{key}</strong>: {value}
                            <br />
                          </Fragment>
                        ))}
                      </Popup>
                    </Polygon>
                  ))}
                </Fragment>
              );
            }
          })}
        </>
      )}
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};
