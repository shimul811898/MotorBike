import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaMotorcycle, FaShieldAlt } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="w-full max-w-7xl mx-auto ">
      {/* Main Container */}
      <div className="relative bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden p-6 md:p-12 lg:p-20 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
        
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Content */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <span className="w-10 h-[2px] bg-green-500"></span>
              <span className="text-green-600 font-bold tracking-widest uppercase text-xs md:text-sm">Welcome to MotoHub</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1]">
              Engineered for <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">
                True Performance
              </span>
            </h1>

            <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-lg">
              Explore a curated collection of premium motorcycles. Verified quality, 
              unbeatable prices, and a seamless ride experience waiting just for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#"
                className="group flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200"
              >
                Find Your Ride <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="#"
                className="flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold hover:border-green-600 hover:text-green-600 transition"
              >
                Sell Your Bike
              </Link>
            </div>
          </div>

          {/* Right Visuals */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            {/* Main Image Wrapper */}
            <div className="relative w-full max-w-[500px] h-[300px] md:h-[400px] lg:h-[500px]">
              <Image
                src="/assests/Banner.jpg"
                alt="Premium Motorcycle"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Floating Badge (Visible on Desktop) */}
            <div className="hidden md:flex absolute -bottom-4 lg:bottom-10 -left-4 lg:-left-10 bg-white p-4 lg:p-6 rounded-2xl shadow-xl border border-slate-100 items-center gap-4">
              <div className="bg-green-100 p-3 rounded-xl text-green-600">
                <FaShieldAlt size={24} />
              </div>
              <div>
                <p className="font-bold text-slate-900">Verified Sellers</p>
                <p className="text-xs text-slate-400">100% Quality Assured</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;