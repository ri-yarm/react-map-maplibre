import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MapState, MarkerI } from "./types.ts";

const initialState: MapState = {
  markers: [],
  markerCounter: 0,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    addMarker: (state, action: PayloadAction<Omit<MarkerI, "name">>) => {
      const newMarker: MarkerI = {
        ...action.payload,
        // текущее время как id
        id: `marker-${Date.now()}`,
        name: `Метка ${state.markerCounter + 1}`,
      };
      state.markers.push(newMarker);
      state.markerCounter += 1;

      localStorage.setItem("markers", JSON.stringify(state.markers));
    },

    removeMarker: (state, action: PayloadAction<string>) => {
      state.markers = state.markers.filter(
        (marker) => marker.id !== action.payload,
      );
      state.markerCounter -= 1;

      localStorage.setItem("markers", JSON.stringify(state.markers));
    },

    loadMarkersFromStorage: (state) => {
      const storedMarkers = localStorage.getItem("markers");
      if (storedMarkers) {
        state.markers = JSON.parse(storedMarkers);
        state.markerCounter = state.markers.length;
      }
    },
  },
});

export const { addMarker, removeMarker, loadMarkersFromStorage } =
  mapSlice.actions;

export default mapSlice.reducer;
