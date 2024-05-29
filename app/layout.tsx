
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import { useCookies } from "react-cookie";
import axios from "axios";
import ClientSetup from "@/components/ClientSetup";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {

  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
    
      <Providers>
       <ClientSetup/>
        {children}
      </Providers>
      
        </body>
    </html>
  );
}
