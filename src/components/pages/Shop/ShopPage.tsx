/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";

import { Search, SlidersHorizontal, ChevronDown, X, Check } from "lucide-react";
import Image from "next/image";
import ProductCard from "../cards/ProductCard";

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
  category: string;
  bottleSize: string;
  brand: string;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Dolan Lorem 3 years Merlot Reserve Red Wine",
    image: "/images/c1.png",
    price: 89.99,
    originalPrice: 50.0,
    rating: 5,
    reviews: 3,
    description: "Premium red wine",
    discount: "-44%",
    category: "Red Wine",
    bottleSize: "750ml",
    brand: "VESEVO",
  },
  {
    id: 2,
    name: "Moet & Chandon Brut Imperial Champagne",
    image: "/images/c1.png",
    price: 120.0,
    originalPrice: 150.0,
    rating: 5,
    reviews: 2,
    description: "Luxury champagne",
    discount: null,
    category: "Champagne",
    bottleSize: "750ml",
    brand: "ARGENTINA",
  },
  {
    id: 3,
    name: "Perrier-Jouët Grand Brut Champagne",
    image: "/images/c1.png",
    price: 85.0,
    originalPrice: 95.0,
    rating: 5,
    reviews: 3,
    description: "Premium champagne",
    discount: null,
    category: "Champagne",
    bottleSize: "750ml",
    brand: "JACK DANIEL'S",
  },
  {
    id: 4,
    name: "Dolan Lorem 5 years Cabernet Reserve Red Wine",
    image: "/images/c1.png",
    price: 99.99,
    originalPrice: 60.0,
    rating: 5,
    reviews: 3,
    description: "Aged red wine",
    discount: null,
    category: "Red Wine",
    bottleSize: "750ml",
    brand: "BAREFOOT",
  },
  {
    id: 5,
    name: "Jack Daniel's Old No. 7 Tennessee Whiskey",
    image: "/images/c1.png",
    price: 45.0,
    originalPrice: 55.0,
    rating: 5,
    reviews: 3,
    description: "Classic whiskey",
    discount: "-20%",
    category: "Spirit Wine",
    bottleSize: "1.5L",
    brand: "JACK DANIEL'S",
  },
  {
    id: 6,
    name: "Hennessy VS Cognac with Gift Box",
    image: "/images/c1.png",
    price: 75.0,
    originalPrice: 85.0,
    rating: 5,
    reviews: 3,
    description: "Premium cognac",
    discount: null,
    category: "Spirit Wine",
    bottleSize: "750ml",
    brand: "JACK BOTTLE",
  },
  {
    id: 7,
    name: "Johnnie Walker Blue Label Scotch Whisky",
    image: "/images/c1.png",
    price: 199.99,
    originalPrice: 220.0,
    rating: 5,
    reviews: 3,
    description: "Luxury whisky",
    discount: null,
    category: "Spirit Wine",
    bottleSize: "750ml",
    brand: "VALDO",
  },
  {
    id: 8,
    name: "Château Margaux 2015 Bordeaux Red Wine",
    image: "/images/c1.png",
    price: 350.0,
    originalPrice: 400.0,
    rating: 5,
    reviews: 3,
    description: "Prestigious wine",
    discount: null,
    category: "Red Wine",
    bottleSize: "750ml",
    brand: "VESEVO",
  },
];

const CATEGORIES = [
  "Champagne",
  "White Wine",
  "Red Wine",
  "Rosé Wine",
  "Spirit Wine",
];

const BOTTLE_SIZES = ["150ml", "375ml", "750ml", "1.5L"];

const BRANDS = [
  { name: "VESEVO", logo: "/images/brand-1.png" },
  { name: "ARGENTINA", logo: "/images/brand-2.png" },
  { name: "JACK DANIEL'S", logo: "/images/brand-3.png" },
  { name: "BAREFOOT", logo: "/images/brand-4.png" },
  { name: "JACK BOTTLE", logo: "/images/brand-5.png" },
  { name: "VALDO", logo: "/images/brand-5.png" },
];

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([40, 400]);
  const [selectedBottleSizes, setSelectedBottleSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("best-offer");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const itemsPerPage = 12;

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Simulate categories
  const categories = [
    { id: "red-wine", name: "Red Wine", checked: true },
    { id: "white-wine", name: "White Wine", checked: false },
    { id: "rose-wine", name: "Rosé Wine", checked: false },
    { id: "sparkling", name: "Sparkling", checked: false },
  ];

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleBottleSize = (size: string) => {
    setSelectedBottleSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesPrice =
      product.originalPrice >= priceRange[0] &&
      product.originalPrice <= priceRange[1];
    const matchesBottleSize =
      selectedBottleSizes.length === 0 ||
      selectedBottleSizes.includes(product.bottleSize);
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchesCategory &&
      matchesPrice &&
      matchesBottleSize &&
      matchesBrand &&
      matchesSearch
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.originalPrice - b.originalPrice;
      case "price-high":
        return b.originalPrice - a.originalPrice;
      case "wishlist":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="w-full bg-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50"
          >
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">
              Filters & Categories
            </span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block lg:w-64 space-y-6">
            <div className="">
              <h3 className="text-base font-medium md:text-xl text-[#482817] mb-4">
                Categories
              </h3>
              <div className="space-y-3">
                {CATEGORIES.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="w-4 h-4 text-orange-400 border-gray-300 rounded focus:ring-orange-400 cursor-pointer"
                    />
                    <label
                      htmlFor={category}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="">
              <h3 className="text-base font-medium md:text-xl text-[#482817] mb-4">
                Price
              </h3>
              <div className="mb-4">
                <input
                  type="range"
                  min={40}
                  max={400}
                  step={10}
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([
                      Number.parseInt(e.target.value),
                      priceRange[1],
                    ])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-400"
                />
                <input
                  type="range"
                  min={40}
                  max={400}
                  step={10}
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([
                      priceRange[0],
                      Number.parseInt(e.target.value),
                    ])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-400 mt-2"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div className="">
              <h3 className="text-base font-medium md:text-xl text-[#482817] mb-4">
                Bottle Sizes
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {BOTTLE_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleBottleSize(size)}
                    className={`px-2 py-4 text-xs rounded border transition-colors ${
                      selectedBottleSizes.includes(size)
                        ? "bg-orange-400 text-white border-orange-400"
                        : " text-gray-700 border-gray-300 hover:border-orange-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className=" ">
              <h3 className="text-base font-medium md:text-xl text-[#482817] mb-4">
                Select Brands
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {BRANDS.map((brand) => (
                  <button
                    key={brand.name}
                    onClick={() => toggleBrand(brand.name)}
                    className={`border-2 rounded-lg  transition-all ${
                      selectedBrands.includes(brand.name)
                        ? "border-orange-400 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={brand.logo || "brand-1.png"}
                      alt={brand.name}
                      width={100}
                      height={100}
                      className="w-full h-auto"
                    />
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {mobileFiltersOpen && (
            <>
              <div
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#482817]">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="p-4 space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-[#482817] mb-4">
                      Categories
                    </h3>
                    <div className="space-y-3">
                      {CATEGORIES.map((category) => (
                        <div
                          key={category}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={`mobile-${category}`}
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="w-4 h-4 text-orange-400 border-gray-300 rounded focus:ring-orange-400 cursor-pointer"
                          />
                          <label
                            htmlFor={`mobile-${category}`}
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-[#482817] mb-4">Price</h3>
                    <div className="mb-4">
                      <input
                        type="range"
                        min={40}
                        max={400}
                        step={10}
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            Number.parseInt(e.target.value),
                            priceRange[1],
                          ])
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-400"
                      />
                      <input
                        type="range"
                        min={40}
                        max={400}
                        step={10}
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            Number.parseInt(e.target.value),
                          ])
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-400 mt-2"
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-[#482817] mb-4">
                      Bottle Size
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                      {BOTTLE_SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => toggleBottleSize(size)}
                          className={`px-2 py-1.5 text-xs rounded border transition-colors ${
                            selectedBottleSizes.includes(size)
                              ? "bg-orange-400 text-white border-orange-400"
                              : "bg-white text-gray-700 border-gray-300 hover:border-orange-300"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-[#482817] mb-4">
                      Select Brands
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {BRANDS.map((brand) => (
                        <button
                          key={brand.name}
                          onClick={() => toggleBrand(brand.name)}
                          className={`border-2 rounded-lg p-2 transition-all ${
                            selectedBrands.includes(brand.name)
                              ? "border-orange-400 bg-orange-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Image
                            src={brand.logo || "/brand-1.png"}
                            alt={brand.name}
                            width={60}
                            height={60}
                            className="w-full h-auto"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full bg-orange-400 text-white py-3 rounded-lg font-medium hover:bg-orange-500 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </aside>
            </>
          )}

          <main className="flex-1">
            <div className=" p-4 rounded-lg mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xl md:text-2xl font-semibold  text-[#968F8F]">
                  Showing {startIndex + 1}-
                  {Math.min(startIndex + itemsPerPage, sortedProducts.length)}{" "}
                  of {sortedProducts.length} item(s)
                </div>

                <div className="py-4 px-4 sm:px-6 lg:px-8 ">
                  <div className="max-w-7xl mx-auto">
                    {/* Search + Sort Row */}
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-4">
                      {/* Search Bar */}
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="
      pl-10 pr-3 py-2 w-full 
      bg-transparent               
      border border-[#DEEDE2]      
      rounded-[4px]
      text-gray-700           
      placeholder:text-gray-400    
      outline-none                
focus:outline-none focus:ring-2              
      focus:border-[#DEEDE2]    
    "
                        />
                      </div>

                      {/* Sort By Dropdown */}
                      <div className="relative w-full sm:w-40">
                        <button
                          onClick={() => toggleDropdown("sort")}
                          className="
      w-full px-3 py-2 

      border border-[#DEEDE2] 
      rounded-[4px] 
      text-sm text-gray-700 
      flex items-center justify-between 
      hover:border-gray-400 
      focus:outline-none focus:ring-2  focus:border-transparent
    "
                        >
                          <span>Sort by</span>
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        </button>

                        {activeDropdown === "sort" && (
                          <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            <button
                              onClick={() => {
                                setSortBy("best-offer");
                                setActiveDropdown(null);
                              }}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                            >
                              Best Offer
                            </button>
                            <button
                              onClick={() => {
                                setSortBy("price-low");
                                setActiveDropdown(null);
                              }}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                            >
                              Price Low
                            </button>
                            <button
                              onClick={() => {
                                setSortBy("price-high");
                                setActiveDropdown(null);
                              }}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                            >
                              Price High
                            </button>
                            <button
                              onClick={() => {
                                setSortBy("wishlist");
                                setActiveDropdown(null);
                              }}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                            >
                              Wishlist
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Filter Dropdowns Row */}
                    <div className="flex flex-wrap gap-3">
                      {/* Brand Dropdown */}
                <div className="relative w-full sm:w-32">
  <button
    onClick={() => toggleDropdown("brand")}
    className="w-full px-3 py-2 border border-[#DEEDE2] rounded-[4px]  flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2  text-sm text-gray-700"
  >
    <span>Brand</span>
    <ChevronDown className="w-4 h-4 text-gray-600" />
  </button>

  {activeDropdown === "brand" && (
    <div className="absolute top-full mt-1 w-full bg-white border border-[#DEEDE2] rounded-md shadow-lg z-10">
      <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100">All Brands</button>
      <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100">Brand A</button>
      <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100">Brand B</button>
    </div>
  )}
</div>

                      {/* Categories Dropdown */}
                      <div className="relative w-full sm:w-40">
                        <button
                          onClick={() => toggleDropdown("categories")}
                          className="w-full px-3 py-2 border border-[#DEEDE2] rounded-[4px]  flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2  text-sm text-gray-700"
                        >
                          <span className="text-sm">Categories</span>
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        </button>
                        {activeDropdown === "categories" && (
                          <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            <div className="p-3">
                              <div className="text-xs font-medium text-gray-500 mb-2">
                                Filter by Categories
                              </div>
                              {categories.map((cat) => (
                                <label
                                  key={cat.id}
                                  className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-50"
                                >
                                  <div
                                    className={`w-4 h-4 border ${
                                      cat.checked
                                        ? "bg-[#EA1E1E] border-[#EA1E1E]"
                                        : "border-gray-300"
                                    } rounded flex items-center justify-center`}
                                  >
                                    {cat.checked && (
                                      <Check className="w-3 h-3 text-white" />
                                    )}
                                  </div>
                                  <span className="text-sm">{cat.name}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Bottle Size Dropdown */}
                      <div className="relative w-full sm:w-36">
                        <button
                          onClick={() => toggleDropdown("bottleSize")}
                          className="w-full px-3 py-2 border border-[#DEEDE2] rounded-[4px]  flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2  text-sm text-gray-700"
                        >
                          <span className="text-sm">Bottle Size</span>
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        </button>
                        {activeDropdown === "bottleSize" && (
                          <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100">
                              All Sizes
                            </button>
                            <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100">
                              750ml
                            </button>
                            <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100">
                              1.5L
                            </button>
                            <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100">
                              3L
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-500 text-lg">
                  No products found matching your filters.
                </p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-md border ${
                      currentPage === i + 1
                        ? "bg-orange-400 text-white border-orange-400"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
