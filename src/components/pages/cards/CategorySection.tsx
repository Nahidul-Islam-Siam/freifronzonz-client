"use client"

import { useState } from "react"
import CategoryFilter from "./CategoryFilter"
import ProductCard from "./ProductCard"
import { useRouter } from "next/navigation"
import { products } from "./ProductsDummyData"

// const categories = ["All", "Rosé Wines", "Sparkling", "Red Wines", "White Wines"]



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
    <main className="min-h-screen max-w-7xl mx-auto py-12 md:py-24">
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
