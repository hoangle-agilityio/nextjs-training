import type { Metadata } from "next";
import "../styles/globals.css";
import { Header } from "@/components/server";
import { LayoutContent } from "@/components/client";

export const metadata: Metadata = {
  title: "Next Recipe Book",
  description: "Find and share your favorite recipes!",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className="antialiased">
      <Header />
      <LayoutContent>{children}</LayoutContent>
    </body>
  </html>
);

export default RootLayout;
