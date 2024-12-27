import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import MarkersList from "./MarkersList";
import "./index.css";

const Sidebar = () => {
  const markersCount = useSelector(
    (state: RootState) => state.map.markerCounter,
  );

  return (
    <div className="sidebar-wrap">
      <h3>количество меток: {markersCount}</h3>
      <MarkersList />
    </div>
  );
};

export default Sidebar;
