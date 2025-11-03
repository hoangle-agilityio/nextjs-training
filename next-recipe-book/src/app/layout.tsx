import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/server";
import SideBar from "@/components/client";

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
        <SideBar />
        {children}
      </body>
    </html>
  );
}
