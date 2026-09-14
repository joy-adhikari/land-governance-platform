export interface LandZone {
  id: number;
  name: string;
  color: string;
  coords: [number, number][];
  risk: "Low" | "Medium" | "High";
}

export interface StateData {
  name: string;
  center: [number, number];
  zoom: number;
  zones: LandZone[];
}

const STATE_DATA: Record<string, StateData> = {
  "Delhi": {
    name: "Delhi",
    center: [28.6139, 77.2090],
    zoom: 13,
    zones: [
      { id: 1, name: "Agricultural Zone A", color: "green", coords: [[28.61, 77.20], [28.62, 77.20], [28.62, 77.21], [28.61, 77.21]], risk: "Low" },
      { id: 2, name: "Urban Expansion Zone B", color: "orange", coords: [[28.63, 77.22], [28.64, 77.22], [28.64, 77.23], [28.63, 77.23]], risk: "High" },
      { id: 3, name: "Conservation Zone C", color: "blue", coords: [[28.60, 77.23], [28.61, 77.23], [28.61, 77.24], [28.60, 77.24]], risk: "Medium" },
    ],
  },
  "Maharashtra": {
    name: "Maharashtra",
    center: [19.0760, 72.8777],
    zoom: 10,
    zones: [
      { id: 4, name: "Konkan Coastline", color: "blue", coords: [[18.9, 72.8], [19.0, 72.8], [19.0, 72.9], [18.9, 72.9]], risk: "Medium" },
      { id: 5, name: "Western Ghats Forest", color: "green", coords: [[19.1, 73.0], [19.2, 73.0], [19.2, 73.1], [19.1, 73.1]], risk: "Low" },
    ],
  },
  "Tamil Nadu": {
    name: "Tamil Nadu",
    center: [13.0827, 80.2707],
    zoom: 10,
    zones: [
      { id: 6, name: "Cauvery Delta", color: "green", coords: [[11.0, 79.5], [11.1, 79.5], [11.1, 79.6], [11.0, 79.6]], risk: "Low" },
      { id: 7, name: "Industrial Corridor", color: "orange", coords: [[12.9, 80.1], [13.0, 80.1], [13.0, 80.2], [12.9, 80.2]], risk: "High" },
    ],
  },
  "Uttar Pradesh": {
    name: "Uttar Pradesh",
    center: [26.8467, 80.9462],
    zoom: 8,
    zones: [
      { id: 8, name: "Gangetic Plains", color: "green", coords: [[26.0, 80.0], [26.1, 80.0], [26.1, 80.1], [26.0, 80.1]], risk: "Low" },
      { id: 9, name: "Flood Vulnerable Zone", color: "red", coords: [[27.0, 81.0], [27.1, 81.0], [27.1, 81.1], [27.0, 81.1]], risk: "High" },
    ],
  },
  "Assam": {
    name: "Assam",
    center: [26.2006, 92.9376],
    zoom: 9,
    zones: [
      { id: 10, name: "Brahmaputra Basin", color: "blue", coords: [[26.1, 92.0], [26.2, 92.0], [26.2, 92.1], [26.1, 92.1]], risk: "Medium" },
      { id: 11, name: "Tea Plantation Belt", color: "green", coords: [[27.0, 93.0], [27.1, 93.0], [27.1, 93.1], [27.0, 93.1]], risk: "Low" },
    ],
  },
};

export function getStates() {
  return Object.keys(STATE_DATA);
}

export function getStateData(state: string): StateData | undefined {
  return STATE_DATA[state];
}
