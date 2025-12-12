"use client"

import { useState } from "react"
import CategoryFilter from "./CategoryFilter"
import ProductCard from "./ProductCard"

const categories = ["All", "Rosé Wines", "Sparkling", "Red Wines", "White Wines"]

const products = [
  {
    id: 1,
    name: "Red Wine Selection",
    image: "/red-wine-bottle.png",
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
    image: "/sparkling-wine-bottle.png",
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
    image: "/red-wine-bottle-dark.jpg",
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
    image: "/sparkling-wine-bottle-green.jpg",
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
    image: "/whiskey-bottle-box.jpg",
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
    image: "/rose-champagne-bottle-box.jpg",
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
    image: "/highland-park-whiskey-bottle-box.jpg",
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
    image: "/rose-wine-bottle-box-premium.jpg",
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

  return (
    <main className="min-h-screen   container mx-auto">
      {/* Header */}
      <div className="py-12 px-4 sm:px-6 lg:px-8  mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Shop By Category</h1>

        {/* Category Filter */}
        <CategoryFilter categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>

      {/* Products Grid */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  )
}
