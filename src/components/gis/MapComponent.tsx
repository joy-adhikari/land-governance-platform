"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";


// Fix for default marker icons in Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Casting the image imports to any or using .src to avoid StaticImageData error
const iconUrl = (markerIcon as any).src || markerIcon;
const shadowUrl = (markerShadow as any).src || markerShadow;

let DefaultIcon = L.icon({
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  activeLayer: string;
  isSidePanelOpen?: boolean;
}

function MapResizer({ isSidePanelOpen }: { isSidePanelOpen?: boolean }) {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [isSidePanelOpen, map]);
  return null;
}

const MOCK_ZONES = [
  { id: 1, name: "Agricultural Zone A", color: "green", coords: [[28.61, 77.20], [28.62, 77.20], [28.62, 77.21], [28.61, 77.21]] as LatLngTuple[], risk: "Low" },
  { id: 2, name: "Urban Expansion Zone B", color: "orange", coords: [[28.63, 77.22], [28.64, 77.22], [28.64, 77.23], [28.63, 77.23]] as LatLngTuple[], risk: "High" },
  { id: 3, name: "Conservation Zone C", color: "blue", coords: [[28.60, 77.23], [28.61, 77.23], [28.61, 77.24], [28.60, 77.24]] as LatLngTuple[], risk: "Medium" },
];

export default function MapComponent({ activeLayer, isSidePanelOpen }: MapComponentProps) {
  return (
    <MapContainer
      center={[28.6139, 77.2090] as any}
      zoom={13}
      className="h-full w-full z-0"
    >
      <MapResizer isSidePanelOpen={isSidePanelOpen} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />


      {activeLayer === "landuse" && MOCK_ZONES.map(zone => (
        <Polygon
          key={zone.id}
          positions={zone.coords}
          pathOptions={{ color: zone.color, fillOpacity: 0.5 }}
        >
          <Tooltip>
            <strong>{zone.name}</strong><br/>Risk: {zone.risk}
          </Tooltip>
        </Polygon>
      ))}

      {activeLayer === "disputes" && (
        <>
          <Marker position={[28.61, 77.21] as any}>
            <Popup>High dispute concentration area (Case #402)</Popup>
          </Marker>
          <Marker position={[28.63, 77.23] as any}>
            <Popup>Pending adjudication (Case #119)</Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  );
}
