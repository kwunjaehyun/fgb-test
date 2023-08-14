import { useCallback, useEffect, useRef } from "react";
import { useMapController } from "../../provider/MapControllerProvider";
import { useChangeSize, useChangeViewCallback } from "../../hook/ol";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { OlViewInfomation } from "../../types/type";
import { featuresCountState, olViewState } from "../../recoil/map";

const TwoControll = () => {
  const { mapController, olState } = useMapController();
  const changeViewCallback = useChangeViewCallback();
  const changeSizeCallback = useChangeSize();
  const olViewInfomation = useRecoilValue<OlViewInfomation>(olViewState);
  const requestRef = useRef<number|undefined>(undefined);
  const setFeaturesCount = useSetRecoilState<number>(featuresCountState);
  
  const animate = useCallback(async (time: number) => {
    const iter = mapController.ol.newFeaturesGenerator;
    
    if (!iter) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }
    const frameStartTime = new Date().getTime();
    const olController = mapController.ol;
    const vs = olController.webglVectorSource;
    let doing = true;
    let done: boolean | undefined = false;
    while (doing) {
      try {
        const curime = new Date().getTime();
        const feature = await iter.next();
        const value = feature.value; 
        if (value) vs.addFeature(value);
        
        doing = curime - frameStartTime < 200/*  ||  */;
        done = feature.done;
        if (done) olController.newFeaturesGenerator = undefined;
      } catch (err) {
        doing = false;
        olController.newFeaturesGenerator = undefined;
      }
    }

    if (done) {
      const prevFeatures = olController.prevFeatures;
      prevFeatures?.forEach((feature) => {
        vs.removeFeature(feature);
      });
      olController.prevFeatures = undefined;

      setFeaturesCount(vs.getFeatures().length);
    }
    requestRef.current = requestAnimationFrame(animate);
  }, []);
    
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== undefined) cancelAnimationFrame(requestRef.current)
    };
  }, []);

  useEffect(() => {
    if (!olState) return;
    const { ol } = mapController;

    ol.addChangeViewCallback(changeViewCallback);
    ol.addChangeSizeCallback(changeSizeCallback);

    ol.appliViewState(olViewInfomation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [olState]);

  return null;
};
export default TwoControll;
