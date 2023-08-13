export type MapType = "OL" | "CESIUM";
export type VectorSourceType = "canvas" | "webgl";
export type LonLat = [number, number];
export type CanvasSize = [number, number];

export type OlViewInfomation = {
  center: LonLat;
  resolution: number;
};
