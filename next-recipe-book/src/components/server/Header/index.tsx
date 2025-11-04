import { ROUTE_BASE } from "@/constants";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-primary">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={ROUTE_BASE.RECIPES}>
          <h1 className="text-xl font-semibold text-white tracking-wide">
            The Next Recipe Book
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
