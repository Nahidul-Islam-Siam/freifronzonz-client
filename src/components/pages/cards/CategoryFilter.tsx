"use client"

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="border-b border-gray-300">
      <div className="flex justify-center gap-8 pb-4 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`whitespace-nowrap text-sm font-medium transition-colors ${
              activeCategory === category
                ? "text-gray-900 border-b-2 border-gray-900 pb-2"
                : "text-gray-600 hover:text-gray-900 pb-2"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
