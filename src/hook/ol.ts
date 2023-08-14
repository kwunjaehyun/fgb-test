import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { centerState, featuresCountState, resolutionState } from "../recoil/map";
import { LonLat } from "../types/type";
import OlMap from "ol/Map";

import { ObjectEvent } from "ol/Object";
import * as flatgeobuf from "flatgeobuf";
import Feature from "ol/Feature"
import Geometry from "ol/geom/Geometry"
import { useMapController } from "../provider/MapControllerProvider";
import MapEvent from "ol/MapEvent";
import Vector from "ol/source/Vector";

export const useChangeSize = () => {
  const setCanvasSize = useSetRecoilState<LonLat>(centerState);
  return (event: ObjectEvent) => {
    const { target: olmap }: { target: OlMap } = event;
    const { clientHeight, clientWidth } = olmap.getViewport();
    setCanvasSize([clientWidth, clientHeight]);
  };
};

const isAsyncGenerator = <T>(
  deserialize: Feature<Geometry>[] | AsyncGenerator<T>,
): deserialize is AsyncGenerator<T> => {
  return (
    typeof deserialize === "object" &&
    deserialize !== null &&
    "next" in deserialize &&
    "throw" in deserialize &&
    "return" in deserialize &&
    deserialize[Symbol.asyncIterator] &&
    typeof deserialize[Symbol.asyncIterator] === "function"
  );
};

export const useChangeViewCallback = () => {
  const { mapController } = useMapController();
  const setCenter = useSetRecoilState<LonLat>(centerState);
  const setResolution = useSetRecoilState<number>(resolutionState);
  const setFeaturesCount = useSetRecoilState<number>(featuresCountState);

  return async (event: MapEvent) => {
    const {map} = event;
    const olview = map.getView();    
    const center = olview.getCenter();
    const resolution = olview.getResolution();

    if (center) {
      setCenter(center as LonLat);
    }

    if (resolution !== undefined) {
      setResolution(resolution);
    }

    const zoom = olview.getZoom();
    const vs = mapController.ol.webglVectorSource;
    if (zoom && zoom > 15) {
      mapController.ol.newFeaturesGenerator = undefined;
      const extent = olview.calculateExtent();
      const minX = extent[0];
      const minY = extent[1];
      const maxX = extent[2];
      const maxY = extent[3];
      const aws = "https://fgb-test.s3.ap-northeast-2.amazonaws.com/jijuk.fgb";
      //const yh = `http://192.168.10.33:8080/fgb?minx=${minX}&miny=${minY}&maxx=${maxX}&maxy=${maxY}`;
      const iter = flatgeobuf.ol.deserialize(aws, {
        minX,
        minY,
        maxX,
        maxY,
      });
      
      if (isAsyncGenerator<Feature<Geometry>>(iter)) {
        mapController.ol.newFeaturesGenerator = iter;
        mapController.ol.prevFeatures = vs.getFeatures();
      } else {
        console.info("not async generator");
      }
    } else {      
      vs.clear(true);
      mapController.ol.newFeaturesGenerator = undefined;
      setFeaturesCount(0);
    }
  };
};
