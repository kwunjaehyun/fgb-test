import { useEffect } from "react";
import { useMapController } from "../../provider/MapControllerProvider";
import { useChangeSize, useChangeViewCallback } from "../../hook/changeOpenlayers";
import { useRecoilValue } from "recoil";
import { OlViewInfomation } from "../../types/type";
import { olViewState, storedFeatureCollectionState } from "../../recoil/map";
import { FeatureCollection } from "geojson";
import GeoJsonFormat from "ol/format/GeoJSON";

const geojsonFormat = new GeoJsonFormat();
const TwoControll = () => {
  const { mapController, olState } = useMapController();
  const changeViewCallback = useChangeViewCallback();
  const changeSizeCallback = useChangeSize();
  const olViewInfomation = useRecoilValue<OlViewInfomation>(olViewState);
  const storedFeatureCollection = useRecoilValue<FeatureCollection>(storedFeatureCollectionState);

  useEffect(() => {
    if (!olState) return;
    const { ol } = mapController;

    ol.addChangeViewCallback(changeViewCallback);
    ol.addChangeSizeCallback(changeSizeCallback);

    ol.appliViewState(olViewInfomation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [olState]);

  useEffect(() => {
    if (!olState) return;
    /* const { ol } = mapController;
    const vectorSource = ol.zizukVectorSource;
    vectorSource.clear(true);

    if (storedFeatureCollection.features.length === 0) return;
    const features = geojsonFormat.readFeatures(storedFeatureCollection);
    vectorSource.addFeatures(features); */

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedFeatureCollection]);
  return null;
};
export default TwoControll;
