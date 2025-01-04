import { Skeleton } from "./skeleton";

export const LoadingCards = ({ items_cant }: { items_cant: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 w-full max-w-7xl">
      {[...Array(items_cant)].map((_, index) => (
        <div
          key={index}
          className="pokemon-card w-full max-w-xs overflow-hidden transition-all duration-300 hover:shadow-xl bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 hover:-translate-y-2 relative"
        >
          <div className="relative">
            {/* Skeleton for Card Header */}
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-pokemon-pattern opacity-5"></div>
              <Skeleton className="h-6 w-3/4 rounded-md mb-2" />{" "}
              {/* Skeleton for Pokemon Name */}
              <div className="flex flex-wrap justify-start mt-1">
                {[...Array(3)].map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="pokemon-type inline-block px-2 py-0.5 rounded-full bg-white text-gray-800 text-xs font-bold mr-1 mb-1"
                  />
                ))}
              </div>
            </div>

            {/* Skeleton for Pokemon Image */}
            <div className="flex justify-center mb-4 relative">
              <div className="absolute w-24 h-24 bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
              <div className="w-[150px] h-[150px] flex items-center justify-center">
                <Skeleton className="w-24 h-24 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>

          {/* Skeleton for Card Content */}
          <div className="p-4">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Skeleton for Stat Items */}
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="stat-item">
                  <div className="flex items-center mb-0.5">
                    <Skeleton className="w-4 h-4 mr-1" />
                    <Skeleton className="h-4 w-1/2 rounded-md" />
                  </div>
                  <div className="pl-5">
                    <Skeleton className="h-3 w-3/4 rounded-md mb-1" />
                    <Skeleton className="h-3 w-2/3 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
            {/* Skeleton for Button */}
            <div className="mt-4 relative">
              <Skeleton className="h-10 w-full rounded-lg bg-blue-400" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
