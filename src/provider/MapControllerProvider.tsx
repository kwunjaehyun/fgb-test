import { createContext, useContext, useState, useMemo } from "react";
import { MapController, MapControllerEvent } from "../api/MapController";

interface IMapControllerContextProps {
  mapController: MapController;
  olState: boolean;
  cesiumState: boolean;
}

const MapControllerContext = createContext<IMapControllerContextProps>({} as IMapControllerContextProps);

// eslint-disable-next-line react-refresh/only-export-components
export const useMapController = () => useContext(MapControllerContext);

const MapControllerProvider = ({ children }: { children: React.ReactNode }) => {
  const [olState, setOlState] = useState<boolean>(false);
  const [cesiumState, setCesiumState] = useState<boolean>(false);
  const mapController = useMemo(() => new MapController(), []);

  mapController.emitter.on(MapControllerEvent.CHANGE_OL_STATE, setOlState);
  mapController.emitter.on(MapControllerEvent.CHANGE_CESIUM_STATE, setCesiumState);

  const props = {
    mapController,
    olState,
    cesiumState,
  } as IMapControllerContextProps;

  return <MapControllerContext.Provider value={props}>{children}</MapControllerContext.Provider>;
};

export default MapControllerProvider;
