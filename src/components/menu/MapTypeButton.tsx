import { useRecoilState } from "recoil";
import { CurrentMapState } from "../../recoil/common";
import { MapType } from "../../types/type";

const MapTypeButton = () => {
  const [mapType, setMapType] = useRecoilState<MapType>(CurrentMapState);
  const changeMap = () => {
    setMapType(mapType === "OL" ? "CESIUM" : "OL");
  };
  return (
    <>
      <button
        className="ms-3 mt-3 px-4 py-2 font-semibold text-sm rounded-full bg-cyan-500 text-white shadow-sm"
        onClick={changeMap}
      >
        {mapType === "OL" ? "Cesuium" : "OpenLayers"}
      </button>
    </>
  );
};

export default MapTypeButton;
