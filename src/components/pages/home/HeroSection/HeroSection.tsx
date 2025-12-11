// components/HeroSection.tsx

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative w-full h-[80vh] sm:h-[70vh] md:h-[80vh] lg:h-[100vh] overflow-hidden">
      {/* Background Image — FULL SECTION SIZE */}
      <div className="absolute inset-0">
        <Image
          src="/hero.png"
          alt="Wine Heritage"
          fill
          className="object-cover object-center" // ← Ensures center alignment
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-[20px] font-medium tracking-wider mb-2 text-[#AF6900]">
          The Art & Heritage of Winemaking
        </p>

        {/* Headline */}
 <h1 className="text-4xl sm:text-5xl md:text-[64px]  font-abhaya font-bold leading-tight md:leading-[94px] mb-4 max-w-5xl text-center">
  Discover Exceptional Wines From Every Corner of the Globe
</h1>


        {/* Description */}
        <p className="text-xs font-medium sm:text-sm md:text-[20px] max-w-5xl  mb-8 md:leading-normal text-center opacity-90">
          Experience the richness of global wine heritage with bottles that tell
          stories of tradition, innovation, and passion—crafted to offer
          unmatched depth, aroma, and elegance.
        </p>

        {/* Button */}
        <Link
          href="/shop"
          className="px-6 py-2 sm:px-8 sm:py-3 text-base md:text-2xl hover:bg-amber-700  border border-white bg-[#AF6900] text-white font-medium rounded-md font-abhaya font-bold transition-colors shadow-lg hover:shadow-xl  sm:text-base"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
