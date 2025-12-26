/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, SlidersHorizontal, ChevronDown, X, Check } from "lucide-react";
import Image from "next/image";
import ProductCard from "../cards/ProductCard";
import { products } from "../cards/ProductsDummyData";


const BOTTLE_SIZES = ["150ml", "375ml", "750ml", "1.5L", "3L"];

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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedBottleSizes, setSelectedBottleSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("best-offer");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const itemsPerPage = 12;

  const normalizeCategory = (cat: string): string => {
    return cat.toLowerCase().replace(/\s+/g, "-");
  };

  const CATEGORY_METADATA = [
    { id: "red-wine", name: "Red Wine" },
    { id: "white-wine", name: "White Wine" },
    { id: "rose-wine", name: "Rosé Wine" },
    { id: "champagne", name: "Champagne" },
    { id: "sparkling", name: "Sparkling" },
    { id: "spirit-wine", name: "Spirit Wine" },
  ];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "red-wine": 0,
      "white-wine": 0,
      "rose-wine": 0,
      "champagne": 0,
      "sparkling": 0,
      "spirit-wine": 0,
    };

    products.forEach((product) => {
      const norm = normalizeCategory(product.category);
      if (counts[norm] !== undefined) {
        counts[norm]++;
      }
    });

    return counts;
  }, []);

  const CATEGORIES = useMemo(() => {
    return [
      { id: "all", name: "All Categories", count: products.length },
      ...CATEGORY_METADATA.map((meta) => ({
        ...meta,
        count: categoryCounts[meta.id],
      })),
    ];
  }, [categoryCounts]);

  const toggleCategory = (categoryId: string) => {
    if (categoryId === "all") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId)
          : [...prev, categoryId]
      );
    }
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

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice =
      product.originalPrice >= priceRange[0] &&
      product.originalPrice <= priceRange[1];

    const productCategoryNormalized = normalizeCategory(product.category);
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(productCategoryNormalized);

    const matchesBottleSize =
      selectedBottleSizes.length === 0 ||
      selectedBottleSizes.includes(product.bottleSize);

    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    return (
      matchesSearch &&
      matchesPrice &&
      matchesCategory &&
      matchesBottleSize &&
      matchesBrand
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.originalPrice - b.originalPrice;
    if (sortBy === "price-high") return b.originalPrice - a.originalPrice;
    if (sortBy === "wishlist") return b.rating - a.rating;
    if (sortBy === "best-offer") {
      const aHasDiscount = a.discount !== null;
      const bHasDiscount = b.discount !== null;
      if (aHasDiscount && !bHasDiscount) return -1;
      if (!aHasDiscount && bHasDiscount) return 1;
      return b.originalPrice - a.originalPrice;
    }
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, priceRange, selectedBottleSizes, selectedBrands, searchQuery, sortBy]);

  // Reusable Price Filter Component
  const PriceFilter = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={isMobile ? "bg-gray-50 p-4 rounded-lg" : ""}>
      <h3 className="font-bold text-[#482817] mb-4">Price</h3>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={500}
            step={10}
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-400"
          />
          <input
            type="range"
            min={0}
            max={500}
            step={10}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-400 ${
              isMobile ? "mt-2" : ""
            }`}
          />
        </div>
      </div>
      <div className="text-sm text-gray-600">
        <span>Range: </span>
        <span className="font-medium">${priceRange[0]} – ${priceRange[1]}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="w-full bg-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50"
          >
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Filters & Categories</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters (Sidebar) */}
          <aside className="hidden lg:block lg:w-64 space-y-6">
            {/* Categories */}
            <div className="">
              <h3 className="text-base font-medium md:text-xl text-[#482817] mb-4">
                Categories
              </h3>
              <div className="">
                {CATEGORIES.map((category) => (
                  <div
                    key={category.id}
                    className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors cursor-pointer ${
                      category.id === "all"
                        ? selectedCategories.length === 0
                          ? "bg-orange-100 text-orange-800"
                          : "hover:bg-gray-50"
                        : selectedCategories.includes(category.id)
                        ? "bg-orange-50 border-l-4 border-orange-400"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => toggleCategory(category.id)}
                  >
                    <span className="text-sm md:text-base font-normal text-[#968F8F]">
                      {category.name}
                    </span>
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-sm text-[#968F8F]">
                      {category.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price */}
            <PriceFilter />

            {/* Bottle Sizes */}
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
                        : "text-gray-700 border-gray-300 hover:border-orange-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className=" ">
              <h3 className="text-base font-medium md:text-xl text-[#482817] mb-4">
                Select Brands
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {BRANDS.map((brand) => (
                  <button
                    key={brand.name}
                    onClick={() => toggleBrand(brand.name)}
                    className={`border-2 rounded-lg transition-all ${
                      selectedBrands.includes(brand.name)
                        ? "border-orange-400 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={brand.logo}
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

          {/* Mobile Filters (Slide-in) */}
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
                  {/* Categories */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-[#482817] mb-4">Categories</h3>
                    <div className="space-y-3">
                      {CATEGORIES.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`mobile-${category.id}`}
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => toggleCategory(category.id)}
                            className="w-4 h-4 text-orange-400 border-gray-300 rounded focus:ring-orange-400 cursor-pointer"
                          />
                          <label
                            htmlFor={`mobile-${category.id}`}
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <PriceFilter isMobile={true} />

                  {/* Bottle Size */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-[#482817] mb-4">Bottle Size</h3>
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

                  {/* Brands */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-[#482817] mb-4">Select Brands</h3>
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
                            src={brand.logo}
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

          {/* Main Content */}
          <main className="flex-1">
            <div className="p-4 rounded-lg mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xl md:text-2xl font-semibold text-[#968F8F]">
                  Showing {startIndex + 1}–
                  {Math.min(startIndex + itemsPerPage, sortedProducts.length)} of {sortedProducts.length} item(s)
                </div>

                <div className="py-4 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-7xl mx-auto">
                    {/* Search + Sort */}
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-4">
                      {/* Search */}
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-3 py-2 w-full bg-transparent border border-[#DEEDE2] rounded-[4px] text-gray-700 placeholder:text-gray-400 outline-none focus:outline-none focus:ring-2 focus:border-[#DEEDE2]"
                        />
                      </div>

                      {/* Sort */}
                      <div className="relative w-full sm:w-40">
                        <button
                          onClick={() => toggleDropdown("sort")}
                          className="w-full px-3 py-2 border border-[#DEEDE2] rounded-[4px] text-sm text-gray-700 flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2"
                        >
                          <span>Sort by</span>
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        </button>

                        {activeDropdown === "sort" && (
                          <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            {[
                              { key: "best-offer", label: "Best Offer" },
                              { key: "price-low", label: "Price Low" },
                              { key: "price-high", label: "Price High" },
                              { key: "wishlist", label: "Wishlist" },
                            ].map((opt) => (
                              <button
                                key={opt.key}
                                onClick={() => {
                                  setSortBy(opt.key);
                                  setActiveDropdown(null);
                                }}
                                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Additional Dropdowns */}
                    <div className="flex flex-wrap gap-3">
                      {/* Brand */}
                      <div className="relative w-full sm:w-32">
                        <button
                          onClick={() => toggleDropdown("brand")}
                          className="w-full px-3 py-2 border border-[#DEEDE2] rounded-[4px] flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 text-sm text-gray-700"
                        >
                          <span>Brand</span>
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        </button>
                        {activeDropdown === "brand" && (
                          <div className="absolute top-full mt-1 w-full bg-white border border-[#DEEDE2] rounded-md shadow-lg z-10">
                            <button
                              onClick={() => {
                                setSelectedBrands([]);
                                setActiveDropdown(null);
                              }}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                            >
                              All Brands
                            </button>
                            {BRANDS.map((brand) => (
                              <button
                                key={brand.name}
                                onClick={() => {
                                  toggleBrand(brand.name);
                                  setActiveDropdown(null);
                                }}
                                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                              >
                                <Image
                                  src={brand.logo}
                                  alt={brand.name}
                                  width={20}
                                  height={20}
                                  className="w-5 h-5"
                                />
                                {brand.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Category */}
                      <div className="relative w-full sm:w-40">
                        <button
                          onClick={() => toggleDropdown("categories")}
                          className="w-full px-3 py-2 border border-[#DEEDE2] rounded-[4px] flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 text-sm text-gray-700"
                        >
                          <span>Categories</span>
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        </button>
                        {activeDropdown === "categories" && (
                          <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            <div className="p-3">
                              {CATEGORIES.map((cat) => (
                                <label
                                  key={cat.id}
                                  className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-50"
                                >
                                  <div
                                    className={`w-4 h-4 border rounded flex items-center justify-center ${
                                      selectedCategories.includes(cat.id)
                                        ? "bg-[#EA1E1E] border-[#EA1E1E]"
                                        : "border-gray-300"
                                    }`}
                                  >
                                    {selectedCategories.includes(cat.id) && (
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

                      {/* Bottle Size */}
                      <div className="relative w-full sm:w-36">
                        <button
                          onClick={() => toggleDropdown("bottleSize")}
                          className="w-full px-3 py-2 border border-[#DEEDE2] rounded-[4px] flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 text-sm text-gray-700"
                        >
                          <span>Bottle Size</span>
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        </button>
                        {activeDropdown === "bottleSize" && (
                          <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            <button
                              onClick={() => {
                                setSelectedBottleSizes([]);
                                setActiveDropdown(null);
                              }}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                            >
                              All Sizes
                            </button>
                            {BOTTLE_SIZES.map((size) => (
                              <button
                                key={size}
                                onClick={() => {
                                  toggleBottleSize(size);
                                  setActiveDropdown(null);
                                }}
                                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  let pageNum = i + 1;
                  if (totalPages > 5 && currentPage > 3 && i === 4) {
                    pageNum = totalPages;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-md border ${
                        currentPage === pageNum
                          ? "bg-orange-400 text-white border-orange-400"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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