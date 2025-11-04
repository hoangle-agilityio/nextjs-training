"use client";

import { usePathname } from "next/navigation";
import { SideBar } from "@/components/client";
import { Suspense } from "react";

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isRecipeFormPage =
    pathname?.includes("/recipes/add") || pathname?.includes("/recipes/edit");

  return (
    <div className="flex flex-col-reverse md:flex-row gap-10 px-10 py-10 max-w-7xl mx-auto">
      {!isRecipeFormPage && (
        <div className="md:w-4/12 lg:w-3/12">
          <Suspense
            fallback={
              <div className="h-96 bg-gray-100 rounded-lg animate-pulse" />
            }
          >
            <SideBar />
          </Suspense>
        </div>
      )}
      <div className={isRecipeFormPage ? "w-full" : "md:w-8/12 lg:w-9/12"}>
        {children}
      </div>
    </div>
  );
};

export default LayoutContent;
