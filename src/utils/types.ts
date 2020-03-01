export interface ContinentTemps {
  [key: string]: number;
}

export interface Marker {
  markerOffset: number;
  name: String;
  coordinates: [number, number];
}
