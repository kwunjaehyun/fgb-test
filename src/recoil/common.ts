import { atom } from "recoil";
import { MapType } from "../types/type";

export const CurrentMapState = atom<MapType>({
  key: "CurrentMapState",
  default: "OL",
});
