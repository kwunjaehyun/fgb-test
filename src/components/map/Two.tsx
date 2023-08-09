import { useEffect, useRef } from "react";
import Map from 'ol/Map';
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";
import "ol/ol.css";

const Two = () => {
    const container = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!container.current) return;

        const map = new Map({
            target: container.current as HTMLElement,
            layers: [
                new TileLayer({
                    source: new OSM(),
                })
            ],
            view: new View({
                center: [0, 0],
                zoom: 2,
                projection: 'EPSG:4326'
            })
        });
        console.info(map.getView().getCenter());
    }, [container]);   
    return (
        <div ref={container} className="relative h-full w-full">
        </div>
    )
}

export default Two;