import BlogCard2 from "@/components/pages/Blog/BlogCard2";
import BlogCard3 from "@/components/pages/Blog/BlogCard3";
import BlogCard1 from "@/components/pages/Blog/page";
import Hero from "@/components/shared/Hero2";
import React from "react";

export default function page() {
  return (
    <div>
      <Hero title="Blog" backgroundImage="/images/h2.png" />
      <BlogCard1 />
      <BlogCard2 />
      <BlogCard3 />
    </div>
  );
}
