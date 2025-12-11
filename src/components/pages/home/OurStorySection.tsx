// components/OurStorySection.tsx

import Image from "next/image";
import Link from "next/link";

export default function OurStorySection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12">
      <div className="container mx-auto flex flex-col lg:flex-row items-start gap-12">
        {/* LEFT SIDE - TEXT CONTENT */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-[#6D0E0B] font-abhaya">
            Our Story
          </h2>

          <p className="text-gray-600 leading-relaxed">
            From the sun-kissed vineyards to your glass, our journey began with
            a passion for discovering exceptional wines from around the world.
            We believe every bottle tells a story—of tradition, craft, and the
            people behind it. Our mission is simple: to bring the finest wines
            to your table, making every sip an experience to remember.
          </p>

          <p className="text-gray-600 leading-relaxed">
            We bring you handpicked wines from around the world, celebrating
            craftsmanship, flavor, and unforgettable moments.
          </p>

          <Link
            href="/about"
            className="inline-block px-6 py-3 bg-[#AF6900] text-white font-medium rounded-md transition-colors shadow-md hover:shadow-lg"
          >
            See More
          </Link>
        </div>

        {/* RIGHT SIDE - IMAGE (appears BELOW text on mobile, RIGHT on lg+) */}
        <div className="lg:w-1/2 w-full">
          <div className="relative w-full h-[300px] sm:h-[400px]">
            <Image
              src="/h3.png"
              alt="Vineyard scene showcasing wine heritage"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
