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
import MapEvent from "ol/MapEvent";
import Feature from "ol/Feature";
import Geometry from "ol/geom/Geometry";

class WebGLLayer extends Layer {
  createRenderer(): WebGLVectorLayerRenderer {
    return new WebGLVectorLayerRenderer(this, {
      style: {
        "stroke-color": ["*", ["get", "COLOR"], [0, 162, 232]],
        "stroke-width": 1.5,
        "fill-color": ["*", ["get", "COLOR"], [153, 217, 234, 0.45]],
      },
    });
  }
}

export class OlController {
  private _olMap: OlMap | undefined;
  private _changeViewCallback: ((event: MapEvent) => void) | undefined;
  private _changeSizeCallback: ((event: ObjectEvent) => void) | undefined;
  public zizukVectorSource = new VectorSource();
  public webglVectorSource = new VectorSource();
  public newFeaturesGenerator: AsyncGenerator<Feature<Geometry>, any, unknown> | undefined;
  public prevFeatures: Feature<Geometry>[] | undefined;

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

  addChangeViewCallback(callback: (event: MapEvent) => void) {
    if (!this.olMap) return;
    const view = this.olMap.getView();
    this._changeViewCallback = debounce(callback, 0);
    this.olMap.on("moveend", this._changeViewCallback);
  }

  removeChangeViewCallback() {
    if (!this.olMap || !this._changeViewCallback) return;
    this.olMap.un("moveend", this._changeViewCallback);
  }

  addChangeSizeCallback(callback: (event: ObjectEvent) => void) {
    if (!this.olMap) return;
    this._changeSizeCallback = debounce(callback, 0);
    this.olMap.on("change:size", this._changeSizeCallback);
  }

  removeChangeSizeCallback() {
    if (!this.olMap || !this._changeSizeCallback) return;
    this.olMap.un("change:size", this._changeSizeCallback);
  }
}
