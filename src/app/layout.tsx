
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer.component";




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Film Fair",
  description: "All movies, shows, series available here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    
    <html lang="en" className="">
      <body className={inter.className}>  

        <Navbar />
        <main className="flex justify-center">
       
          {children}


        </main>
        <Toaster/>
        <Footer/>

      </body>
    </html>
  );
}
