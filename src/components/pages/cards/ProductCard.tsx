/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image"

interface Product {
  id: number
  name: string
  image: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  description: string
  discount: string | null
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-red-500 text-sm">
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Container */}
      <div className="relative bg-gray-50 h-64 flex items-center justify-center overflow-hidden group">
        <Image
          width={400}
          height={400}
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 right-3 bg-orange-400 text-white px-2 py-1 rounded text-xs font-bold">
            {product.discount}
          </div>
        )}

        {/* Action Icons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg shadow-md p-2">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-600">({product.reviews} reviews)</span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

        {/* Description */}
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-gray-900">${product.originalPrice.toFixed(2)}</span>
          <span className="text-xs text-gray-500 line-through">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
