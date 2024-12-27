import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store.ts";
import { removeMarker } from "../../../store/slices";
import Marker from "./Marker";
import "./index.css";
import { useCallback } from "react";

const MarkersList = () => {
  const dispatch = useDispatch();

  const markers = useSelector((state: RootState) => state.map.markers);

  const handleRemoveMarker = useCallback((id: string) => {
    dispatch(removeMarker(id));
  }, []);

  return (
    <ul className="markers-list">
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          marker={marker}
          handleRemoveMarker={handleRemoveMarker}
        />
      ))}
    </ul>
  );
};

export default MarkersList;
