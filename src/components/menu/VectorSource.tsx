import { useRecoilState } from "recoil";
import { vectorSourceTypeState } from "../../recoil/map";
import { VectorSourceType } from "../../types/type";


const VectorSource = () => {
    const [currentVectorSourceType, setVectorSource] = useRecoilState<VectorSourceType>(vectorSourceTypeState);
    
    const getClassName = (type: string) => `ms-3 mt-3 px-4 py-2 font-semibold text-sm rounded-full shadow-sm ${currentStyle(type)}`;
    const currentStyle = (type: string) => currentVectorSourceType === type ? "bg-cyan-500 text-white":"bg-white text-cyan-500";

    return (
        <>
        <p className="px-4 py-2 font-semibold"> 벡터소스 :
            <button
                className={getClassName('canvas')}
                onClick={()=> setVectorSource("canvas")}
            >
                canvas
            </button>
            <button
                className={getClassName('webgl')}
                onClick={()=> setVectorSource("webgl")}
            >
                webgl
            </button>
      </p>
        </>
    )
}
export default VectorSource;
