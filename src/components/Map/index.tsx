import "maplibre-gl/dist/maplibre-gl.css";
import "./index.css";
import { useMap } from "./useMap.ts";

const Map = () => {
  const { mapContainer } = useMap();

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Map;
