import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navber";

export const metadata = {
  title: "MotoBike — Premium Motorcycle Hub",
  description: "Explore, book, and ride premium motorcycles with cutting-edge performance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full dark">
      <body className="min-h-full flex flex-col font-sans bg-[#0b0f17] text-slate-100 relative selection:bg-emerald-500 selection:text-white">
        {/* Ambient Glowing Glass Orbs */}
        <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none -z-10"></div>
        <div className="fixed bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>
        <div className="fixed top-[40%] right-[30%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none -z-10"></div>

        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
