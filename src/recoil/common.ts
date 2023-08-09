import { atom } from "recoil";
import { Dimension } from "../types/type";

export const DimensionState = atom<Dimension>({
    key: "DimensionState",
    default: "2D",
  });