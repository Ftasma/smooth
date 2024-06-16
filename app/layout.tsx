
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import { useCookies } from "react-cookie";
import axios from "axios";
import ClientSetup from "@/components/ClientSetup";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {

  title: "Smooth-Ballot",
  description: "Generated by create next app",
  icons:{
    icon:"/smoothBallotLogoLight.jpg",
  }
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
       <ToastProvider/>
        {children}
       <Toaster />
      </Providers>
       
        </body>
    </html>
  );
}
function removeCookie(arg0: string) {
  throw new Error("Function not implemented.");
}

