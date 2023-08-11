import { useRecoilValue } from "recoil";
import { CurrentMapState } from "../../recoil/common";
import { MapType } from "../../types/type";
import Three from "./Three";
import Two from "./Two";

const Map = () => {
  const dimension = useRecoilValue<MapType>(CurrentMapState);
  return <div className="w-5/6 h-full float-right">{dimension === "OL" ? <Two /> : <Three />}</div>;
};

export default Map;
