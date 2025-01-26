import type { Metadata } from "next";
import "../assets/styles/scss/index.scss";

export const metadata: Metadata = {
  title: "Plante uma Planta",
  description: "Site e-commerce de venda de plantas.",
};

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning={true}>
      <body>
        <header><Navbar/></header>
        {children}
        <footer><Footer/></footer>
      </body>
    </html>
  );
}
