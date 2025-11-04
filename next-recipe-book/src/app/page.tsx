import { ROUTE_BASE } from "@/constants";
import { redirect } from "next/navigation";

const Home = () => {
  redirect(ROUTE_BASE.RECIPES);
};

export default Home;
