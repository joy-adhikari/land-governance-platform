"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Layers,
  Info,
  Filter,
  Maximize,
  Download,
  AlertTriangle
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Button
} from "@/components/ui/button";
import {
  Badge
} from "@/components/ui/badge";
import {
  ScrollArea
} from "@/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

// Dynamically import MapComponent to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("@/components/gis/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-muted">
      <div className="flex flex-col items-center gap-2">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-sm text-muted-foreground">Loading Geospatial Data...</p>
      </div>
    </div>
  ),
});

const LAYERS = [
  { id: "landuse", name: "Land Use Patterns", icon: Layers, color: "text-green-500" },
  { id: "disputes", name: "Dispute Hotspots", icon: AlertTriangle, color: "text-red-500" },
  { id: "climate", name: "Climate Vulnerability", icon: Info, color: "text-blue-500" },
];

export default function GISPage() {
  const [activeLayer, setActiveLayer] = useState("landuse");

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Side Panel */}
      <aside className="w-80 md:w-96 border-r bg-background flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold tracking-tight">GIS Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Geospatial analysis of land governance and climate impact.
          </p>
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                <Layers className="h-4 w-4" /> Layer Control
              </h3>
              <div className="grid gap-2">
                {LAYERS.map(layer => (
                  <Button
                    key={layer.id}
                    variant={activeLayer === layer.id ? "default" : "outline"}
                    className="justify-start gap-3 h-12"
                    onClick={() => setActiveLayer(layer.id)}
                  >
                    <layer.icon className={cn("h-4 w-4", layer.color)} />
                    {layer.name}
                  </Button>
                ))}
              </div>
            </div>

            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Info className="h-4 w-4" /> Layer Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                {activeLayer === "landuse" && (
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Visualizing agricultural vs urban land usage. Green zones indicate high agricultural productivity.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded bg-green-500/10 border border-green-500/20">
                        <div className="text-[10px] text-green-600 font-bold">AGRI</div>
                        <div className="text-xs font-semibold">62% Area</div>
                      </div>
                      <div className="p-2 rounded bg-orange-500/10 border border-orange-500/20">
                        <div className="text-[10px] text-orange-600 font-bold">URBAN</div>
                        <div className="text-xs font-semibold">28% Area</div>
                      </div>
                    </div>
                  </div>
                )}
                {activeLayer === "disputes" && (
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Displaying areas with high litigation density. Red markers indicate unresolved ownership disputes.
                    </p>
                    <div className="p-3 rounded bg-red-500/10 border border-red-500/20">
                      <div className="text-xs font-bold text-red-600 mb-1">High Risk Area</div>
                      <div className="text-[10px] text-muted-foreground">Average resolution time: 4.2 years</div>
                    </div>
                  </div>
                )}
                {activeLayer === "climate" && (
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Mapping flood vulnerability and soil erosion risks using satellite data.
                    </p>
                    <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20">
                      <div className="text-xs font-bold text-blue-600 mb-1">Vulnerability High</div>
                      <div className="text-[10px] text-muted-foreground">Est. crop loss risk: 15% in 2026</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex flex-col gap-2">
              <Button variant="outline" className="w-full gap-2">
                <Download className="h-4 w-4" /> Export Layer (GeoJSON)
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Maximize className="h-4 w-4" /> Fullscreen Analysis
              </Button>
            </div>
          </div>
        </ScrollArea>
      </aside>

      {/* Map Area */}
      <main className="flex-1 relative">
        <MapComponent activeLayer={activeLayer} />

        {/* Map Overlays */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <Badge className="bg-background/80 backdrop-blur-md text-foreground border-border px-3 py-1">
            Live Data: ISRO Bhuvan API
          </Badge>
          <Badge className="bg-primary/80 backdrop-blur-md text-white border-transparent px-3 py-1">
            Projection: EPSG:4326
          </Badge>
        </div>
      </main>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
