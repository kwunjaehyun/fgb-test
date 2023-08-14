import { atom, selector } from "recoil";
import { CanvasSize, LonLat, OlViewInfomation } from "../types/type";

import Feature from "ol/Feature"
import Geometry from "ol/geom/Geometry"
import Vector from "ol/source/Vector";
import { useMapController } from "../provider/MapControllerProvider";

export type testtype = {
  iter: AsyncGenerator<Feature<Geometry>, any, unknown> | null
}
export const centerState = atom<LonLat>({
  key: "centerState",
  default: [126.92402046760674, 37.52379857407708] as LonLat,
});

export const canvasSizeState = atom<CanvasSize>({
  key: "canvasSizeState",
  default: [1600, 955] as CanvasSize,
});

export const resolutionState = atom<number>({
  key: "resolutionState",
  default: 0.000019660611469737723,
});

export const distanceState = atom<number>({
  key: "distanceState",
  default: 1000,
});

export const olViewState = selector<OlViewInfomation>({
  key: "olViewInfomationState",
  get: ({ get }) => {
    const center = get(centerState);
    const resolution = get(resolutionState);
    return { center, resolution };
  },
});

export const featuresCountState = atom<number>({
  key: "featuresCountState",
  default: 0
});

/* export const resolutionState = selector<number>({
  key: "resolutionState",
  get: ({ get }) => {
    const distance = get(distanceState);
    return distance;
  },
}); */
