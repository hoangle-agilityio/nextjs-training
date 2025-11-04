import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/server";
import { SideBar } from "@/components/client";

export const metadata: Metadata = {
  title: "Next Recipe Book",
  description: "Find and share your favorite recipes!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <div className="flex flex-col-reverse md:flex-row gap-8 px-10 py-10">
          <div className="md:w-5/12 lg:w-4/12 xl:w-3/12 2xl:w-2/12">
            <SideBar />
          </div>
          <div className="md:w-7/12 lg:w-8/12 xl:w-9/12 2xl:w-10/12">{children}</div>
        </div>
      </body>
    </html>
  );
}
