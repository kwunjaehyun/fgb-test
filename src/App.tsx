import Side from "./components/menu/Index";
import Map from "./components/map/Index";
import MapControllerProvider from "./provider/MapControllerProvider";

function App() {
  return (
    <>
      <MapControllerProvider>
        <Side />
        <Map />
      </MapControllerProvider>
    </>
  );
}

export default App;
