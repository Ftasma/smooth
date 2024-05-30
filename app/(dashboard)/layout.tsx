import Navbar from "@/components/Navbar";

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-[100%] w-full bg-[#F6F6F6]">
      <Navbar/>
        <div className="pt-16 h-[100%]">
        {children}
        </div>
    </main>
  );
}
function removeCookie(arg0: string) {
  throw new Error("Function not implemented.");
}

