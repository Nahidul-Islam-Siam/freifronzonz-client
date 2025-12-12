"use client"

import { useState } from "react"
import CategoryFilter from "./CategoryFilter"
import ProductCard from "./ProductCard"
import { useRouter } from "next/navigation"

// const categories = ["All", "Rosé Wines", "Sparkling", "Red Wines", "White Wines"]

export const products = [
  {
    id: 1,
    name: "Red Wine Selection",
    image: "/images/c1.png",
    price: 120,
    originalPrice: 100,
    rating: 5,
    reviews: 2,
    description: "Donec a enim a ipsum lobortis blandit interdum",
    discount: null,
  },
  {
    id: 2,
    name: "Sparkling Premium",
      image: "/images/c1.png",
    price: 120,
    originalPrice: 100,
    rating: 5,
    reviews: 2,
    description: "Donec a enim a ipsum lobortis blandit interdum",
    discount: null,
  },
  {
    id: 3,
    name: "Dark Red Reserve",
      image: "/images/c1.png",
    price: 120,
    originalPrice: 100,
    rating: 5,
    reviews: 2,
    description: "Donec a enim a ipsum lobortis blandit interdum",
    discount: null,
  },
  {
    id: 4,
    name: "Green Label Sparkling",
      image: "/images/c1.png",
    price: 120,
    originalPrice: 100,
    rating: 5,
    reviews: 2,
    description: "Donec a enim a ipsum lobortis blandit interdum",
    discount: null,
  },
  {
    id: 5,
    name: "Whiskey Collection",
      image: "/images/c1.png",
    price: 120,
    originalPrice: 100,
    rating: 5,
    reviews: 2,
    description: "Donec a enim a ipsum lobortis blandit interdum",
    discount: "-43%",
  },
  {
    id: 6,
    name: "Rosé Champagne Box",
      image: "/images/c1.png",
    price: 120,
    originalPrice: 100,
    rating: 5,
    reviews: 2,
    description: "Donec a enim a ipsum lobortis blandit interdum",
    discount: null,
  },
  {
    id: 7,
    name: "Highland Park Whiskey",
      image: "/images/c1.png",
    price: 120,
    originalPrice: 100,
    rating: 5,
    reviews: 2,
    description: "Donec a enim a ipsum lobortis blandit interdum",
    discount: null,
  },
  {
    id: 8,
    name: "Premium Rosé Box",
      image: "/images/c1.png",
    price: 120,
    originalPrice: 100,
    rating: 5,
    reviews: 2,
    description: "Donec a enim a ipsum lobortis blandit interdum",
    discount: null,
  },

  {
    id: 9,
    name: "Sparkling Champagne Box",
    image: "/images/c1.png",
    price: 120,
    originalPrice: 100,
    rating: 5,
    reviews: 2,
    description: "Donec a enim a ipsum lobortis blandit interdum",
    discount: null,
  },

{
  id: 10,
  name: "Sparkling Champagne Box",
    image: "/images/c1.png",
  price: 120,
  originalPrice: 100,
  rating: 5,
  reviews: 2,
  description: "Donec a enim a ipsum lobortis blandit interdum",
  discount: null,
},

{
  id: 11,
  name: "Sparkling Champagne Box",
    image: "/images/c1.png",
  price: 120,
  originalPrice: 100,
  rating: 5,
  reviews: 2,
  description: "Donec a enim a ipsum lobortis blandit interdum",
  discount: null,
},

{
  id: 12,
  name: "Sparkling Champagne Box",
    image: "/images/c1.png",
  price: 120,
  originalPrice: 100,
  rating: 5,
  reviews: 2,
  description: "Donec a enim a ipsum lobortis blandit interdum",
  discount: null,
},

{
  id: 13,
  name: "Sparkling Champagne Box",
    image: "/images/c1.png",
  price: 120,
  originalPrice: 100,
  rating: 5,
  reviews: 2,
  description: "Donec a enim a ipsum lobortis blandit interdum",
  discount: null,
},

{
  id: 14,
  name: "Sparkling Champagne Box",
    image: "/images/c1.png",
  price: 120,
  originalPrice: 100,
  rating: 5,
  reviews: 2,
  description: "Donec a enim a ipsum lobortis blandit interdum",
  discount: null,
},

{
  id: 15,
  name: "Sparkling Champagne Box",
    image: "/images/c1.png",
  price: 120,
  originalPrice: 100,
  rating: 5,
  reviews: 2,
  description: "Donec a enim a ipsum lobortis blandit interdum",
  discount: null,
},

{
  id: 16,
  name: "Sparkling Champagne Box",
    image: "/images/c1.png",
  price: 120,
  originalPrice: 100,
  rating: 5,
  reviews: 2,
  description: "Donec a enim a ipsum lobortis blandit interdum",
  discount: null,
},

{
  id: 17,
  name: "Sparkling Champagne Box",
    image: "/images/c1.png",
  price: 120,
  originalPrice: 100,
  rating: 5,
  reviews: 2,
  description: "Donec a enim a ipsum lobortis blandit interdum",
  discount: null,
},

{
  id: 18,
  name: "Sparkling Champagne Box",
    image: "/images/c1.png",
  price: 120,
  originalPrice: 100,
  rating: 5,
  reviews: 2,
  description: "Donec a enim a ipsum lobortis blandit interdum",
  discount: null,
},

{
  id: 19,
  name: "Sparkling Champagne Box",
    image: "/images/c1.png",
  price: 120,
  originalPrice: 100,
  rating: 5,
  reviews: 2,
  description: "Donec a enim a ipsum lobortis blandit interdum",
  discount: null,
},

]

export default function CategorYSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [visibleCount, setVisibleCount] = useState(8)

  const router = useRouter()

  // Filter (you can improve later)
  const filteredProducts = products

  const visibleProducts = filteredProducts.slice(0, visibleCount)

  const handleLoadMore = () => {
    if (visibleCount === 8) {
      setVisibleCount(12)
    }
  }

  const handleSeeAll = () => {
    router.push("/shop")   // <-- redirect page
  }

  const hasMore = filteredProducts.length > 12

  return (
    <main className="min-h-screen container mx-auto py-12 md:py-24">
      {/* Header */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 mx-auto">
        <h1 className="text-4xl font-extrabold font-abhaya text-center text-[#6D0E0B] md:text-[48px] mb-8">
          Shop By Category
        </h1>

        <CategoryFilter
          categories={["All", "Rosé Wines", "Sparkling", "Red Wines", "White Wines"]}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Products Grid */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-10">
          {/* SHOW LOAD MORE when visibleCount == 8 */}
          {visibleCount === 8 && (
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-[#6D0E0B] text-white rounded-md hover:bg-[#540b08] transition"
            >
              Load More
            </button>
          )}

          {/* SHOW SEE ALL when visibleCount == 12 & more products exist */}
          {visibleCount === 12 && hasMore && (
            <button
              onClick={handleSeeAll}
              className="px-6 py-2 bg-[#6D0E0B] text-white rounded-md hover:bg-[#540b08] transition"
            >
              See All
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
