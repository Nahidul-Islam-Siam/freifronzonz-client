/* eslint-disable @typescript-eslint/no-unused-vars */
import { Heart, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  description: string;
  discount: string | null;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-[#EA1E1E] ">
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
 <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
  <div className="relative bg-gray-50 h-48 sm:h-56 md:h-64 flex items-center justify-center overflow-hidden group">
    <Image
      width={400}
      height={400}
      src={product.image || "/placeholder.svg"}
      alt={product.name}
      className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
    />

    {product.discount && (
      <div className="absolute top-3 right-3 bg-orange-400 text-white px-2 py-1 rounded text-xs font-bold">
        {product.discount}
      </div>
    )}

    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity p-2">
      <button className="w-8 h-8 flex items-center justify-center border border-[#482817] hover:bg-gray-100">
        <ShoppingCart className="w-5 h-5 text-[#482817]" />
      </button>
      <button className="w-8 h-8 flex items-center justify-center border border-[#482817] hover:bg-gray-100">
        <Search className="w-5 h-5 text-[#482817]" />
      </button>
      <button className="w-8 h-8 flex items-center justify-center border border-[#482817] hover:bg-gray-100">
        <Heart className="w-5 h-5 text-[#482817]" />
      </button>
    </div>
  </div>

  <div className="p-4 text-center sm:p-5">
    <div className="flex items-center justify-center gap-2 mb-2">
      {renderStars(product.rating)}
      <span className="text-xs md:text-sm text-[#482817]">
        ({product.reviews} reviews)
      </span>
    </div>

    <h3 className="text-sm font-semibold text-[#482817] mb-2 line-clamp-2">
      {product.name}
    </h3>

    <div className="flex items-baseline justify-center gap-2">
      <span className="text-sm font-bold text-[#968F8F]">
        ${product.originalPrice.toFixed(2)}
      </span>
      <span className="text-xs text-gray-500 line-through">
        ${product.price.toFixed(2)}
      </span>
    </div>
  </div>
</div>

  );
}
