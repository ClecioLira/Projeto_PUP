import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Banner from "@/components/Banner/Banner";

export const metadata: Metadata = {
  title: "Plante uma Planta",
  description: "Site e-commerce de plantas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`antialiased`}>
        <header>
          <Navbar />
          <Banner/>
        </header>
        {children}
      </body>
    </html>
  );
}
