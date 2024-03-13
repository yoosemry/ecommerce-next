import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProviders from "./providers/NextAuthProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecomerce Web",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <NextAuthProviders>
        {children}
        </NextAuthProviders>
          
        </body>
    </html>
  );
}
