import { ClockFading, Headset, Send } from "lucide-react";

const Specification: React.FC = () => {
  return (
    <div className="mt-24 max-w-7xl justify-center m-auto">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-800 text-center bt-red-100">
          Our Specification
        </h2>
        <p className="text-slate-600 text-center max-w-2xl m-auto text-sm">
          We offer top-tier service and convenience to ensure your shopping
          experience is smooth, secure and completely hassle-free.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="col-span-1 space-y-3 border rounded-md p-12 bg-green-50 border-green-200 relative">
          <Send className="size-12 text-white rounded-md bg-green-400 p-3 absolute -top-6 left-1/2 -translate-x-1/2" />
          <h3 className="text-center font-bold text-slate-800">
            Free Shipping
          </h3>
          <p className="text-center text-slate-600 text-sm">
            Enjoy fast, free delivery on every order no conditions, just
            reliable doorstep.
          </p>
        </div>

        <div className="col-span-1 space-y-3 border rounded-md p-12 bg-orange-50 border-orange-200 relative">
          <ClockFading className="size-12 text-white rounded-md bg-orange-400 p-3 absolute -top-6 left-1/2 -translate-x-1/2" />
          <h3 className="text-center font-bold text-slate-800">
            7 Days easy Return
          </h3>
          <p className="text-center text-slate-600 text-sm">
            Change your mind? No worries. Return any item within 7 days.
          </p>
        </div>

        <div className="col-span-1 space-y-3 border rounded-md p-12 bg-violet-50 border-violet-200 relative">
          <Headset className="size-12 text-white rounded-md bg-violet-400 p-3 absolute -top-6 left-1/2 -translate-x-1/2" />
          <h3 className="text-center font-bold text-slate-800">
            24/7 Customer Support
          </h3>
          <p className="text-center text-slate-600 text-sm">
            We're here for you. Get expert help with our customer support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Specification;
