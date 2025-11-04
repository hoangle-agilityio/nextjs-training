"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "@/components/icons";
import { LinkItemType } from "@/types";

interface BreadCrumbProps {
  items: LinkItemType[];
}

const BreadCrumb = ({ items }: BreadCrumbProps) => {
  const pathname = usePathname();

  return (
    <nav aria-label="Breadcrumb" className="text-sm font-medium">
      <ol className="flex items-center space-x-2 text-gray-500">
        <li>
          <Link href="/recipes" className="hover:text-accent-indigo transition">
            Home
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = item.href === pathname || index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />

              {!isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-accent-indigo transition"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-accent-indigo cursor-default font-semibold">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
