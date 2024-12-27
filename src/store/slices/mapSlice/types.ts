export interface MarkerI {
  id: string;
  coordinates: {
    lng: number;
    lat: number;
  };
  name: string;
}

export interface MapState {
  markers: MarkerI[];
  markerCounter: number;
}
