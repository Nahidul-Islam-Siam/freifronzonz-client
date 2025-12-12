"use client"

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
<div className="border-b-1 border-[#968F8F]">
  <div
    className="
      flex 
      justify-start md:justify-center 
      gap-4 md:gap-8 
      pb-4 
      overflow-x-auto 
      px-4 
      scrollbar-hide
    "
  >
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onCategoryChange(category)}
        className={`whitespace-nowrap text-sm font-medium transition-colors ${
          activeCategory === category
            ? "text-[#968F8F] border-b-2 border-[#9E845C] pb-2"
            : "text-[#968F8F] hover:text-gray-900 pb-2"
        }`}
      >
        {category}
      </button>
    ))}
  </div>
</div>

  )
}
