import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MemoryGrid",
  description: "Interactive computer memory evolution and simulation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0D1117] text-[#E6EDF3]">
        <Navbar />
        {children}
        <body className="bg-[#0D1117] text-[#E6EDF3]">
  <Navbar />
  {children}
  <Footer />
</body>
      </body>
    </html>
  );
}
