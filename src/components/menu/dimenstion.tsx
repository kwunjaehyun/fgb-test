import { useRecoilState } from "recoil";
import { DimensionState } from "../../recoil/common";
import { Dimension } from "../../types/type";

const DimensionButton = () => {
  const [dimension, setDimenstion] = useRecoilState<Dimension>(DimensionState);
  const changeDimension = () => {
    setDimenstion(dimension === '2D' ? '3D' : '2D');
  }
  return (
    <>
      <button className="ms-3 mt-3 px-4 py-2 font-semibold text-sm rounded-full bg-cyan-500 text-white shadow-sm" onClick={changeDimension}>
        {dimension === '2D' ? '3D Mode' : '2D Mode'}
      </button>
    </>
  );
};

export default DimensionButton;
