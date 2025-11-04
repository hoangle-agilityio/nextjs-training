import { RecipeCardSkeleton } from "./RecipeCardSkeleton";

interface RecipeCardsSkeletonProps {
  count?: number;
}

export const RecipeCardsSkeleton = ({
  count = 4,
}: RecipeCardsSkeletonProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <RecipeCardSkeleton key={index} />
    ))}
  </div>
);
