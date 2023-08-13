import { useRecoilState } from "recoil";
import { CurrentMapState } from "../../recoil/common";
import { MapType } from "../../types/type";

const MapTypeButton = () => {
  const [mapType, setMapType] = useRecoilState<MapType>(CurrentMapState);
  const changeMap = () => {
    alert('준비중');
    return;
    //setMapType(mapType === "OL" ? "CESIUM" : "OL");
  };
  return (
    <>
      <span className="px-4 py-2 font-semibold">지도 변환 : </span>
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
