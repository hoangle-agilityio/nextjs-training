"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input, FilterButton, Button } from "@/components/client";
import { CUISINE_TYPE_OPTIONS, ROUTE_BASE } from "@/constants/";
import { RecipeFilters } from "@/types";

const SideBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCuisine, setSelectedCuisine] = useState<string>(
    searchParams.get("cuisineType") || ""
  );

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    updateURL({ search: value, cuisineType: selectedCuisine });
  };

  const handleCuisineTypeChange = (value: string) => {
    if (value === selectedCuisine) {
      setSelectedCuisine("");
      updateURL({ search: searchValue, cuisineType: "" });
      return;
    }

    setSelectedCuisine(value);
    updateURL({ search: searchValue, cuisineType: value });
  };

  const updateURL = (filters: RecipeFilters) => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.cuisineType) params.set("cuisineType", filters.cuisineType);

    router.push(`${ROUTE_BASE.RECIPES}?${params.toString()}`);
  };

  const handleRedirectAddRecipePage = () => {
    router.push(ROUTE_BASE.ADD_RECIPE);
  };

  return (
    <div className="flex border border-gray-100 flex-col gap-4 bg-background shadow-md rounded-lg">
      <div className="px-4 py-14">
        <Input isSearch value={searchValue} onChange={handleSearchChange} />
      </div>
      <div className="px-4 pb-10">
        <FilterButton
          title="Cuisine Types"
          filterList={CUISINE_TYPE_OPTIONS}
          filtered={selectedCuisine}
          onClick={handleCuisineTypeChange}
        />
      </div>
      <div className="border-t border-gray-300 px-4 py-6">
        <Button title="Add New Recipe" onClick={handleRedirectAddRecipePage} />
      </div>
    </div>
  );
};

export default SideBar;
