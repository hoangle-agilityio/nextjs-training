import { RecipeCard, RecipeCardsSkeleton } from "@/components/server";
import { getAllRecipes } from "@/lib/recipe-data";
import { RecipeFilters } from "@/types";
import { Suspense } from "react";

interface RecipesPageProps {
  searchParams: Promise<RecipeFilters>;
}

const RecipeList = async ({ searchParams }: RecipesPageProps) => {
  const filters = await searchParams;
  const recipes = await getAllRecipes(filters);

  if (recipes.length === 0) {
    return <p className="text-gray-500">No recipes found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={recipe.id}
          title={recipe.title}
          cuisineType={recipe.cuisineType}
          imageURL={recipe.imageUrl}
          priority={index < 4}
        />
      ))}
    </div>
  );
};

const RecipesPage = ({ searchParams }: RecipesPageProps) => (
  <div className="container mx-auto p-4">
    <Suspense fallback={<RecipeCardsSkeleton />}>
      <RecipeList searchParams={searchParams} />
    </Suspense>
  </div>
);

export default RecipesPage;
