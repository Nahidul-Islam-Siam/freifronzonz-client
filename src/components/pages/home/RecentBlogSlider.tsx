'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import BlogCard from '../cards/BlogCard';


// Sample data — replace with real CMS or API later
export const blogPosts = [
  {
    id: 1,
    title: "Share the Love for PrestaShop 1.7",
    excerpt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/images/b1.png",
    date: "2025-12-10",
    author: "Martin Frank",
    views: 1888,
  },
  {
    id: 2,
    title: "How to Optimize Your Wine Store",
    excerpt:
      "Discover expert tips to boost conversions and customer retention in your online wine shop with modern e-commerce strategies.",
      image: "/images/b1.png",
    date: "2025-12-11",
    author: "Martin Frank",
    views: 2105,
  },
  {
    id: 3,
    title: "Top Trends in Luxury Packaging",
    excerpt:
      "Sustainable, elegant, and interactive — explore the latest packaging innovations that elevate wine gifting experiences.",
     image: "/images/b1.png",
    date: "2025-12-20",
    author: "Martin Frank",
    views: 1642,
  },
  {
    id: 4,
    title: "The Art of Wine Pairing",
    excerpt:
      "Learn how to perfectly match reds, whites, and rosés with food to delight your customers and enhance sales.",
    image: "/images/b1.png",
    date: "2025-12-22",
    author: "Emma Clark",
    views: 2450,
  },
];

export default function RecentBlogSlider() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1">
      <h1 className="text-4xl font-extrabold font-abhaya text-center text-[#6D0E0B] md:text-[48px] mb-8">
          Recent Blog
        </h1>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {blogPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <BlogCard post={post} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
       <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:-left-20 z-10">
            <button className="swiper-button-prev  w-10 h-10 flex items-center justify-center text-[#482817] hover:bg-gray-100 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="48"
                viewBox="0 0 24 48"
                fill="none"
              >
                <path
                  d="M19.096 13.16L16.974 11.04L5.41603 22.594C5.22972 22.7791 5.08186 22.9993 4.98096 23.2418C4.88007 23.4843 4.82812 23.7443 4.82812 24.007C4.82812 24.2696 4.88007 24.5297 4.98096 24.7722C5.08186 25.0147 5.22972 25.2348 5.41603 25.42L16.974 36.98L19.094 34.86L8.24603 24.01L19.096 13.16Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>

         <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:-right-20 z-10">
            <button className="swiper-button-next  w-10 h-10 flex items-center justify-center text-[#482817] hover:bg-gray-100 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="48"
                viewBox="0 0 24 48"
                fill="none"
              >
                <path
                  d="M4.90397 13.16L7.02597 11.04L18.584 22.594C18.7703 22.7791 18.9181 22.9993 19.019 23.2418C19.1199 23.4843 19.1719 23.7443 19.1719 24.007C19.1719 24.2696 19.1199 24.5297 19.019 24.7722C18.9181 25.0147 18.7703 25.2348 18.584 25.42L7.02597 36.98L4.90597 34.86L15.754 24.01L4.90397 13.16Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="swiper-pagination flex justify-center mt-6 space-x-2"></div>
        </div>
      </div>
    </section>
  );
}