import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/WebGLTile";
import OSM from "ol/source/OSM";
import debounce from "lodash.debounce";
import BaseEvent from "ol/events/Event";
import { ObjectEvent } from "ol/Object";
import { OlViewInfomation } from "../types/type";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Layer from "ol/layer/Layer";
import WebGLVectorLayerRenderer from "ol/renderer/webgl/VectorLayer.js";

class WebGLLayer extends Layer {
  createRenderer(): WebGLVectorLayerRenderer {
    return new WebGLVectorLayerRenderer(this, {
      style: {
        "stroke-color": ["*", ["get", "COLOR"], [220, 220, 220]],
        "stroke-width": 1.5,
        "fill-color": ["*", ["get", "COLOR"], [255, 255, 255, 0.6]],
      },
    });
  }
}

export class OlController {
  private _olMap: OlMap | undefined;
  private _changeViewCallback: ((event: BaseEvent) => void) | undefined;
  private _changeSizeCallback: ((event: ObjectEvent) => void) | undefined;
  public zizukVectorSource = new VectorSource();
  public webglVectorSource = new VectorSource({
    loader: (extent, resolution, projection) => {
      console.info(extent, resolution, projection);
    },
  });

  constructor() {}

  get olMap(): OlMap | undefined {
    return this._olMap;
  }

  set olMap(olMap: OlMap | undefined) {
    this._olMap = olMap;
  }

  public start(container: HTMLElement) {
    if (!this.olMap) this.olMap = this.createMap(container);
  }

  public stop() {
    if (!this.olMap) return;
  }

  createMap(container: HTMLElement): OlMap {
    return new OlMap({
      target: container,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: this.zizukVectorSource,
        }),
        new WebGLLayer({
          source: this.webglVectorSource,
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: "EPSG:4326",
      }),
    });
  }

  appliViewState(info: OlViewInfomation): void {
    if (!this.olMap) return;
    const { center, resolution } = info;
    const view = this.olMap.getView();

    view.setCenter(center);
    view.setResolution(resolution);
  }

  addChangeViewCallback(callback: (event: BaseEvent) => void) {
    if (!this.olMap) return;
    const view = this.olMap.getView();
    this._changeViewCallback = debounce(callback, 800);
    view.on("change", this._changeViewCallback);
  }

  removeChangeViewCallback() {
    if (!this.olMap || !this._changeViewCallback) return;
    const view = this.olMap.getView();
    view.un("change", this._changeViewCallback);
  }

  addChangeSizeCallback(callback: (event: ObjectEvent) => void) {
    if (!this.olMap) return;
    this._changeSizeCallback = debounce(callback, 800);
    this.olMap.on("change:size", this._changeSizeCallback);
  }

  removeChangeSizeCallback() {
    if (!this.olMap || !this._changeSizeCallback) return;
    this.olMap.un("change:size", this._changeSizeCallback);
  }
}
