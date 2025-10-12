export default function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full ">
      {new Array(8).fill("").map((i, index) => (
        <div key={index} className="col-span-1">
          <div className="w-40 sm:w-full transition-all">
            <div className="flex flex-col gap-2 group cursor-pointer">
              <div className="bg-slate-100 p-4 rounded-sm flex justify-center items-center">
                <div className="relative size-32 max-h-40 w-32">
                  <div className="bg-slate-200 animate-pulse w-full h-full rounded"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <div className="bg-slate-100 animate-pulse w-1/2 h-4 rounded"></div>
                  <div className="bg-slate-100 animate-pulse w-1/4 h-4 rounded"></div>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="bg-slate-200 animate-pulse w-4 h-4 rounded"></div>
                  <div className="bg-slate-200 animate-pulse w-4 h-4 rounded"></div>
                  <div className="bg-slate-200 animate-pulse w-4 h-4 rounded"></div>
                  <div className="bg-slate-200 animate-pulse w-4 h-4 rounded"></div>
                  <div className="bg-slate-200 animate-pulse w-4 h-4 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
