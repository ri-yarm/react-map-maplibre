import "./index.css";
import { memo } from "react";
import { MarkerI } from "../../../../store/slices/mapSlice/types.ts";

type Props = {
  marker: MarkerI;
  handleRemoveMarker: (id: string) => void;
};

const Marker = ({ marker, handleRemoveMarker }: Props) => {
  const lng = marker.coordinates.lng.toFixed(4);
  const lat = marker.coordinates.lat.toFixed(4);

  return (
    <li className="marker">
      <h6>{marker.name}</h6>
      <p>
        {lng}, {lat}
      </p>
      <button onClick={() => handleRemoveMarker(marker.id)}>Удалить</button>
    </li>
  );
};

export default memo(Marker);
