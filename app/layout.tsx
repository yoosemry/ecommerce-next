import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProviders from "./providers/NextAuthProviders";
import ReactQueryClientProvider from "./providers/ReactQueryClientProvider";
import  { Toaster } from 'react-hot-toast';

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
        <ReactQueryClientProvider>
          <NextAuthProviders>{children}</NextAuthProviders>
        
        </ReactQueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
