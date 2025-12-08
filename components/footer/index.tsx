import Contacts from "./contacts";
import Products from "./products";
import Website from "./website";
import Welcome from "./welcome";

const Footer: React.FC = () => {
  return (
    <div className="px-6 max-w-7xl m-auto mt-24 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="col-span-1 space-y-6">
          <Welcome />
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 ">
            <div className="col-span-1">
              <Products />
            </div>

            <div className="col-span-1">
              <Website />
            </div>

            <div className="col-span-1">
              <Contacts />
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-slate-500 py-5 border-t">
        Copyright 2025 © gocart All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
