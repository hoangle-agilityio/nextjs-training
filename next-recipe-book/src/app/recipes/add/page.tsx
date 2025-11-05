"use client";

import { BreadCrumb, Input, Select } from "@/components/client";
import { CUISINE_TYPE_OPTIONS } from "@/constants";

const AddRecipePage = () => {
  const items = [{ label: "Add Recipe", href: "/recipes/add" }];

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-primary font-bold text-5xl">Add New Recipe</h1>
      <div>
        <BreadCrumb items={items} />
      </div>
      <div>
        <p className="text-primary font-bold text-xl">Recipe Details</p>
        <Input placeholder="Recipe Title" value="" onChange={() => {}} />
        <Input
          isTextArea
          placeholder="Description"
          value=""
          onChange={() => {}}
        />
        <Select
          label="Cuisine Type"
          name="cuisine"
          value=""
          onChange={() => {}}
          options={CUISINE_TYPE_OPTIONS}
        />
      </div>
    </div>
  );
};

export default AddRecipePage;
