import BaseEvent from "ol/events/Event";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { centerState, resolutionState, storedFeatureCollectionState } from "../recoil/map";
import { LonLat } from "../types/type";
import OlMap from "ol/Map";
import View from "ol/View";
import { ObjectEvent } from "ol/Object";
import * as flatgeobuf from "flatgeobuf";
import { FeatureCollection, Geometry, GeoJsonProperties, Feature } from "geojson";
import { produce } from "immer";

export const useChangeSize = () => {
  const setCanvasSize = useSetRecoilState<LonLat>(centerState);
  return (event: ObjectEvent) => {
    const { target: olmap }: { target: OlMap } = event;
    const { clientHeight, clientWidth } = olmap.getViewport();
    setCanvasSize([clientWidth, clientHeight]);
  };
};

const isAsyncGenerator = (
  deserialize: FeatureCollection<Geometry, GeoJsonProperties> | AsyncGenerator<flatgeobuf.IGeoJsonFeature>,
): deserialize is AsyncGenerator<flatgeobuf.IGeoJsonFeature> => {
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
  const setCenter = useSetRecoilState<LonLat>(centerState);
  const setResolution = useSetRecoilState<number>(resolutionState);
  const setStoredFeatureCollection = useSetRecoilState<FeatureCollection>(storedFeatureCollectionState);
  const resetStoredFeatureCollection = useResetRecoilState(storedFeatureCollectionState);
  return async (event: BaseEvent) => {
    const { target: olview }: { target: View } = event;
    const center = olview.getCenter();
    const resolution = olview.getResolution();

    if (center) {
      setCenter(center as LonLat);
    }

    if (resolution !== undefined) {
      setResolution(resolution);
    }

    const zoom = olview.getZoom();

    if (zoom && zoom > 15) {
      const extent = olview.calculateExtent();
      const minX = extent[0];
      const minY = extent[1];
      const maxX = extent[2];
      const maxY = extent[3];
      const aws = "https://fgb-test.s3.ap-northeast-2.amazonaws.com/jijuk.fgb";
      //const yh = `http://192.168.10.33:8080/fgb?minx=${minX}&miny=${minY}&maxx=${maxX}&maxy=${maxY}`;
      const iter = flatgeobuf.geojson.deserialize(aws, {
        minX,
        minY,
        maxX,
        maxY,
      });
      resetStoredFeatureCollection();
      const features = [] as Feature[];
      if (isAsyncGenerator(iter)) {
        for await (const feature of iter) {
          if (feature.type === "Feature") {
            features.push(feature as Feature);
          }
        }

        setStoredFeatureCollection(
          produce(draft => {
            draft.features.length = 0;
            draft.features.push(...features);
          }),
        );
      } else {
        console.info("not async generator");
      }
    } else {
      resetStoredFeatureCollection();
    }
  };
};
