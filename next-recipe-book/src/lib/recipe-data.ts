import { unstable_cache } from "next/cache";
import prisma from "./db";
import { RecipeFilters, RecipeListItem } from "@/types/";
import { REVALIDATE } from "@/constants";

export const getAllRecipes = async (
  filters?: RecipeFilters
): Promise<RecipeListItem[]> => {
  const cacheRecipes = await unstable_cache(
    async () => {
      return await prisma.recipe.findMany({
        where: {
          ...(filters?.cuisineType && { cuisineType: filters.cuisineType }),
          ...(filters?.search && {
            OR: [
              { title: { contains: filters.search, mode: "insensitive" } },
              {
                description: { contains: filters.search, mode: "insensitive" },
              },
            ],
          }),
        },
        select: {
          id: true,
          title: true,
          cuisineType: true,
          imageUrl: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
    ["all-recipes-cache"],
    {
      revalidate: REVALIDATE,
      tags: ["recipes"],
    }
  )();

  return cacheRecipes;
};
