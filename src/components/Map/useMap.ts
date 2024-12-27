import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import {
  addMarker,
  loadMarkersFromStorage,
  removeMarker,
} from "../../store/slices/mapSlice";
import { MarkerI } from "../../store/slices/mapSlice/types.ts";

// использую начальное значение метро калжуское
const lng = 37.5406;
const lat = 55.6571;
const zoom = 16;
const API_KEY = "3QiafPZ1H9X0Pm9cC6uA";

export const useMap = () => {
  const dispatch = useDispatch();

  const markers = useSelector((state: RootState) => state.map.markers);

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markerRefs = useRef<Record<string, maplibregl.Marker>>({});

  useEffect(() => {
    dispatch(loadMarkersFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current!,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("click", (e) => {
      const target = e.originalEvent.target as HTMLElement;

      if (target.closest(".maplibregl-marker")) return;

      const lngLat = e.lngLat;
      const newMarker = {
        coordinates: { lng: lngLat.lng, lat: lngLat.lat },
      };
      dispatch(addMarker(newMarker as MarkerI));
    });
  }, [dispatch]);

  useEffect(() => {
    if (!map.current) return;

    Object.values(markerRefs.current).forEach((marker) => marker.remove());
    markerRefs.current = {};

    markers.forEach((marker) => {
      const newMarker = new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat(marker.coordinates)
        .addTo(map.current!);

      markerRefs.current[marker.id] = newMarker;

      newMarker.getElement().addEventListener("click", () => {
        dispatch(removeMarker(marker.id));
      });
    });
  }, [markers, dispatch]);

  return {
    mapContainer,
  };
};
