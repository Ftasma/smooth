import Navbar from "@/components/Navbar";
import ElectionName from "./_components/ElectionName";


export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <main className="h-[100%] w-full font-satosh bg-[#F6F6F6]">
      <Navbar/>
        <div className="pt-16 h-[100%]">
          <ElectionName/>
        {children}
        </div>
    </main>
  );
}
function removeCookie(arg0: string) {
  throw new Error("Function not implemented.");
}

