import { useRecoilValue } from "recoil";
import { DimensionState } from "../../recoil/common";
import { Dimension } from "../../types/type";
import Three from "./Three";
import Two from "./Two";

const Map = () => {
  const dimension = useRecoilValue<Dimension>(DimensionState);
  return (
    <div className="w-5/6 h-full float-right">
        {
            dimension === '2D' ? <Two /> : <Three />
        }
    </div>
  );
};

export default Map;
