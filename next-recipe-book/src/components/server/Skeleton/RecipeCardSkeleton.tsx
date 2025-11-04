export const RecipeCardSkeleton = () => (
  <div className="shadow-md border border-gray-300 rounded-lg p-3 flex flex-col gap-2 33vw">
    <div className="relative h-48 w-full bg-gray-200 animate-pulse rounded-lg" />
    <div className="w-3/4 h-8 bg-gray-200 animate-pulse rounded" />
    <div className="w-1/2 h-6 bg-gray-200 animate-pulse rounded" />
  </div>
);
