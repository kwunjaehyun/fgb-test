import { Viewer } from "cesium";
import { OlController } from "./OlController";
import Emittery from "emittery";

export const MapControllerEvent = {
  CHANGE_OL_STATE: "CHANGE_OL_STATE",
  CHANGE_CESIUM_STATE: "CHANGE_CESIUM_STATE",
};

export class MapController {
  public ol = new OlController();
  public cesium: Viewer | undefined;
  public emitter = new Emittery();
  constructor() {}

  public olStart(container: HTMLElement) {
    this.ol.start(container);
    this.emitter.emit(MapControllerEvent.CHANGE_OL_STATE, true);
  }
  public olStop() {
    this.ol.stop();
    this.emitter.emit(MapControllerEvent.CHANGE_OL_STATE, false);
  }
}
