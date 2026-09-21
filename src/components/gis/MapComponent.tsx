"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, Tooltip, useMap, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import { LandZone } from "@/lib/gis-api";


// Fix for default marker icons in Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const iconUrl = (markerIcon as any).src || markerIcon;
const shadowUrl = (markerShadow as any).src || markerShadow;

const createColoredIcon = (color: string) => L.icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const ICONS = {
  red: createColoredIcon('red'),
  blue: createColoredIcon('blue'),
  green: createColoredIcon('green'),
  violet: createColoredIcon('violet'),
  orange: createColoredIcon('orange'),
};

L.Marker.prototype.options.icon = L.icon({
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapComponentProps {
  activeLayer: string;
  isSidePanelOpen?: boolean;
  center: [number, number];
  zoom: number;
  zones: LandZone[];
}

function MapResizer({ isSidePanelOpen }: { isSidePanelOpen?: boolean }) {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [isSidePanelOpen, map]);
  return null;
}

export default function MapComponent({ activeLayer, isSidePanelOpen, center, zoom, zones = [] }: MapComponentProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function loadGeoJson() {
      try {
        // Fetching from local API instead of volatile external URL
        const response = await fetch("/api/gis?geojson=true");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        const data = JSON.parse(text.trim());
        setGeoData(data);
      } catch (err) {
        console.error("Failed to load local GeoJSON", err);
      }
    }
    loadGeoJson();
  }, []);

  if (!isMounted) {
    return <div className="h-full w-full bg-muted animate-pulse" />;
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full z-0"
    >
      <MapResizer isSidePanelOpen={isSidePanelOpen} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {activeLayer === "landuse" && geoData && (
        <GeoJSON
          data={geoData}
          style={(feature: any) => {
            const stateName = feature?.properties?.ST_NM || feature?.properties?.state_name;
            const stateInfo = zones.find((z: any) => z.name === stateName);

            return {
              color: stateInfo?.color || "#2ecc71",
              fillColor: stateInfo?.color || "#2ecc71",
              fillOpacity: 0.4,
              weight: 1,
            };
          }}
          onEachFeature={(feature: any, layer: any) => {
            const stateName = feature?.properties?.ST_NM || feature?.properties?.state_name;
            const stateInfo = zones.find((z: any) => z.name === stateName);
            layer.bindTooltip(`<strong>${stateName || 'Unknown'}</strong><br/>Risk: ${stateInfo?.risk || 'N/A'}`);
          }}
        />
      )}

      {activeLayer === "disputes" && zones?.map(zone => (
        zone.risk === "High" && (
          <Marker key={`dispute-${zone.id}`} position={zone.coords?.[0] as any}>
            <Popup>High dispute concentration area: {zone.name}</Popup>
          </Marker>
        )
      ))}

      {activeLayer === "climate" && zones?.map(zone => (
        (zone.risk === "Medium" || zone.risk === "High") && (
          <Marker key={`climate-${zone.id}`} position={zone.coords?.[0] as any}>
            <Popup>Climate Vulnerability: {zone.name} ({zone.risk} Risk)</Popup>
          </Marker>
        )
      ))}
      {activeLayer === "svamitva" && zones?.map(zone => (
        zone.risk === "Low" && (
          <Marker key={`svamitva-${zone.id}`} position={zone.coords?.[0] as any}>
            <Popup>SVAMITVA Property Record: {zone.name} (Verified)</Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
}
