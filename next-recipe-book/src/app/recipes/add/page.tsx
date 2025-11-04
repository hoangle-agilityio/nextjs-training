import { BreadCrumb } from "@/components/client";

const AddRecipePage = () => {
  const items = [{ label: "Add Recipe", href: "/recipes/add" }];

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-primary font-bold text-5xl">Add New Recipe</h1>
      <div>
        <BreadCrumb items={items} />
      </div>
    </div>
  );
};

export default AddRecipePage;
