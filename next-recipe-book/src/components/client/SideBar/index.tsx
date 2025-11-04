"use client";

import { Input, FilterButton, Button } from "@/components/client";
import { CUISINE_TYPE_OPTIONS } from "@/constants/";

const SideBar = () => {
  return (
    <div className="flex border border-gray-100 flex-col gap-4 bg-background shadow-md rounded-lg">
      <div className="px-4 py-14">
        <Input id="11" value="" onChange={() => {}} />
      </div>
      <div className="px-4 pb-10">
        <FilterButton
          title="Cuisine Types"
          filterList={CUISINE_TYPE_OPTIONS}
          onClick={() => {}}
        />
      </div>
      <div className="border-t border-gray-300 px-4 py-6">
        <Button title="Add New Recipe" />
      </div>
    </div>
  );
};

export default SideBar;
