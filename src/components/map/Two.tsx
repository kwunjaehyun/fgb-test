import { useEffect, useRef } from "react";
import "ol/ol.css";
import TwoControll from "./TwoControll";
import { useMapController } from "../../provider/MapControllerProvider";

const Two = () => {
  const container = useRef<HTMLDivElement>(null);
  const { mapController } = useMapController();
  useEffect(() => {
    if (!container.current) return;
    mapController.olStart(container.current);

    return () => mapController.olStop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div ref={container} className="relative h-full w-full">
      <TwoControll />
    </div>
  );
};
export default Two;
