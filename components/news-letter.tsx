import { Button } from "./ui/button";
import { Input } from "./ui/input";

const NewsLetter: React.FC = () => {
  return (
    <div className="px-6 mt-24 max-w-7xl justify-center m-auto">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-800 text-center bt-red-100">
          Join Newsletter
        </h2>
        <p className="text-slate-600 text-center max-w-2xl m-auto text-sm">
          Subscribe to get exclusive deals, new arrivals, and insider updates
          delivered straight to your inbox every week.
        </p>
        <div className="flex bg-slate-100 text-sm p-1 rounded-full w-full max-w-xl my-10 border-2 border-white ring ring-slate-200 mx-auto">
          <input
            className="flex-1 pl-5 outline-none"
            type="text"
            placeholder="Enter your email address"
          />
          <button className="font-medium bg-green-500 text-white px-7 py-3 rounded-full hover:scale-103 active:scale-95 transition">
            Get Updates
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
