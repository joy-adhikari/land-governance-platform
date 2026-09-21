import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");
  const requestGeoJson = searchParams.get("geojson");

  if (!state && !requestGeoJson) {
    return NextResponse.json({ error: "State or geojson parameter is required" }, { status: 400 });
  }

  try {
    if (requestGeoJson === "true") {
      const geoJsonPath = path.join(process.cwd(), "src/app/api/gis/data/geojson/india_states.json");
      const geoJsonContent = await fs.readFile(geoJsonPath, "utf8");
      try {
        const parsedGeoJson = JSON.parse(geoJsonContent);
        return NextResponse.json(parsedGeoJson);
      } catch (parseError) {
        console.error("GeoJSON Parse Error:", parseError);
        return NextResponse.json({ error: "Invalid GeoJSON data format" }, { status: 500 });
      }
    }

    const filePath = path.join(process.cwd(), "src/app/api/gis/data/spatial_db.json");
    const fileContent = await fs.readFile(filePath, "utf8");

    let db;
    try {
      db = JSON.parse(fileContent);
    } catch (parseError) {
      console.error("Spatial DB Parse Error:", parseError);
      return NextResponse.json({ error: "Invalid Spatial DB data format" }, { status: 500 });
    }

    const stateData = db.states[state || "Delhi"];
    if (!stateData) {
      return NextResponse.json({ error: "State data not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: state,
      center: stateData.center,
      zoom: stateData.zoom,
      zones: stateData.layers.landuse,
      disputes: stateData.layers.disputes,
      climate: stateData.layers.climate,
    });
  } catch (error) {
    console.error("GIS API Error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
