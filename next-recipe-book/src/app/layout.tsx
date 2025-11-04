import type { Metadata } from "next";
import "../styles/globals.css";
import { Header } from "@/components/server";
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
        <div className="flex flex-col-reverse md:flex-row gap-10 px-10 py-10 max-w-7xl mx-auto">
          <div className="md:w-4/12 lg:w-3/12">
            <SideBar />
          </div>
          <div className="md:w-8/12 lg:w-9/12">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
