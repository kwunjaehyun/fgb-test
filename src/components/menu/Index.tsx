import Infomation from "./Infomation";
import MapTypeButton from "./MapTypeButton";

const Side = () => {
  return (
    <div className="w-1/6 h-full float-left bg-slate-400">
      <h2 className="px-4 py-2 font-semibold text-lg  bg-cyan-500 text-white shadow-sm">FlatGeoBuf Test Page</h2>
      <h4 className="px-4 py-2 text-sm  bg-cyan-500 text-white shadow-sm">(feat: 대한민국 지적도)</h4>
      <Infomation />
    </div>
  );
};

export default Side;
