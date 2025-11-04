import { RecipeCard, RecipeCardsSkeleton } from "@/components/server";
import { getAllRecipes } from "@/lib/recipe-data";
import { Suspense } from "react";

const RecipeList = async () => {
  const recipes = await getAllRecipes();

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

const RecipesPage = () => (
  <div className="container mx-auto p-4">
    <Suspense fallback={<RecipeCardsSkeleton />}>
      <RecipeList />
    </Suspense>
  </div>
);

export default RecipesPage;
