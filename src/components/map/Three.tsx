import { useEffect, useRef } from "react";
import { Viewer, ImageryLayer, OpenStreetMapImageryProvider } from "cesium";

const Three = () => {
    const container = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!container.current) return;
        const viewer = new Viewer(container.current, {
            baseLayer: new ImageryLayer(new OpenStreetMapImageryProvider({
                url: "https://a.tile.openstreetmap.org/"
            }), {show: true}),
            geocoder: false,
            homeButton: false,
            baseLayerPicker: false,
            sceneModePicker: false,
            navigationHelpButton: false,
            animation: false,
            timeline: false,
            fullscreenButton: false,
            shouldAnimate: true,
            infoBox: false,
            selectionIndicator: false,
        });
    }, []);
    return (
        <div ref={container} className="relative h-full w-full">
        </div>
    )
}

export default Three;