import { useRecoilValue } from "recoil";
import { featuresCountState } from "../../recoil/map";

const FeaturesCount = () => {
    const featuresCount = useRecoilValue<number>(featuresCountState);
    return (
        <>
            <p className="px-4 py-2 font-semibold">현재 객체 수 : <strong>{featuresCount}</strong></p>
        </>
    )
}
export default FeaturesCount;
