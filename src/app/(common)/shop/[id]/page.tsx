"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, ZoomIn, Facebook, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

const PRODUCT_IMAGES = [
  "/images/c1.png",
  "/images/c2.png",
  "/images/c3.png",
  "/images/c4.png",
];

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(PRODUCT_IMAGES[0]);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8 ">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-[#C77D2F]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-[#C77D2F]">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#482817]">Red Wine</span>
        </div>

        {/* Product Section */}
        <div className="p-6 rounded-lg lg:p-10 mb-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative   overflow-hidden group">
                <div className="aspect-square flex items-center justify-center">
                  <Image
                    src={mainImage || "/placeholder.svg"}
                    alt="Red Wine"
                    width={500}
                    height={500}
                    className="w-full h-full object-contain"
                  />
                </div>
                <button className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all">
                  <ZoomIn className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-3">
                {PRODUCT_IMAGES.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(image)}
                    className={`relative bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                      mainImage === image
                        ? "border-[#C77D2F]"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <div className="aspect-square flex items-center justify-center p-2">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Product view ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-[48px] font-extrabold text-black">
                Red Wine
              </h1>

              <div className="text-2xl md:text-3xl font-extrabold font-abhaya text-[#AF6900]">$150.00</div>

              <p className="text-[#968F8F] font-normal text-sm md:text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>

              {/* Quantity and Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center border border-gray-300  overflow-hidden w-32">
                  <button
                    onClick={decrementQuantity}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-full text-center border-x border-gray-300 py-2 focus:outline-none"
                  />
                  <button
                    onClick={incrementQuantity}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                <button className="flex-1 bg-[#9E845C] font-marcellus font-normal hover:bg-[#B36D25] text-white text-sm md:text-base py-3 px-6  transition-colors">
                  ADD TO CART
                </button>

                <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              <button className="w-full bg-[#AF6900] font-marcellus  hover:bg-[#8A5620] text-sm md:text-base text-white font-medium py-3 px-6  transition-colors">
                BUY NOW
              </button>

              {/* Product Details */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-sm md:text-base font-normal text-[#868686]  w-24">
                    SKU:
                  </span>
                  <span className="text-sm md:text-base font-normal text-[#482817]">02304-3</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm md:text-base font-normal text-[#868686] w-24">
                    Categories:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/shop?category=half-bottle"
                      className="text-sm md:text-base font-normal text-[#482817]"
                    >
                      Half Bottle
                    </Link>
                    <span className="text-gray-400">|</span>
                    <Link
                      href="/shop?category=red-wines"
                      className="text-sm md:text-base font-normal text-[#482817]"
                    >
                      Red Wines
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm md:text-base font-normal text-[#868686] w-24">
                    Tags:
                  </span>
                  <Link
                    href="/shop?tag=hot"
                    className="text-sm md:text-base font-normal text-[#482817]"
                  >
                    Hot
                  </Link>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm md:text-base font-normal text-[#868686] w-24">
                    Brand:
                  </span>
                  <span className="text-sm md:text-base font-normal text-[#482817]">Brand-5</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="ext-sm md:text-base font-normal text-[#868686] w-24">
                    Bottle Size:
                  </span>
                  <span className="text-sm md:text-base font-normal text-[#482817]">500 ml</span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm md:text-base font-normal text-[#868686]">
                    In Stock
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm md:text-base font-normal text-[#868686]">
                    Sold Out
                  </span>
                </div>
              </div>

              {/* Social Share */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-2">
                  <span className="ext-sm md:text-base font-normal text-[#868686]">
                    Share:
                  </span>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
                      <Facebook className="w-4 h-4 text-[#1877F2]" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
                      <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
                      <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
                      <svg
                        className="w-4 h-4 text-[#25D366]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
      <div className="bg-[#FAF4EE] rounded-lg p-6">
  {/* Tab Headers */}
  <div className="border-b border-gray-200 mb-6">
    <div className="flex">
      <button
        onClick={() => setActiveTab("description")}
        className={`px-8 py-3 font-medium transition-colors relative ${
          activeTab === "description"
            ? "text-[#482817] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C77D2F]"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Description
      </button>
      <button
        onClick={() => setActiveTab("reviews")}
        className={`px-8 py-3 font-medium transition-colors relative ${
          activeTab === "reviews"
            ? "text-[#482817] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C77D2F]"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Reviews (0)
      </button>
    </div>
  </div>

  {/* Tab Content */}
  <div className="p-6">
    {activeTab === "description" && (
      <div className="prose max-w-none">
        <p className="text-gray-600 leading-relaxed mb-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
        </p>
      </div>
    )}

    {activeTab === "reviews" && (
      <div className="space-y-8">
        {/* Add A Review Form */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#482817] mb-2">Add A review</h3>
          <p className="text-xs text-gray-500 mb-4">
            Your email address will not be published. Required fields are marked *
          </p>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`w-5 h-5 ${
                  star <= 1 // Default: 1 star selected
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                onClick={() => console.log(`Rated ${star} stars`)}
              >
                ★
              </button>
            ))}
          </div>

          {/* Name & Email Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Type your name"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C77D2F] w-full"
            />
            <input
              type="email"
              placeholder="Type your Email"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C77D2F] w-full"
            />
          </div>

          {/* Review Textarea */}
          <textarea
            placeholder="Type your Review"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C77D2F] resize-none mb-4"
          ></textarea>

          {/* Save Info Checkbox */}
          <div className="flex items-start mb-6">
            <input
              type="checkbox"
              id="save-info"
              className="mt-1 mr-2"
            />
            <label htmlFor="save-info" className="text-xs text-gray-500">
              Save my name, email, and website in this browser for the next time I comment
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-[#C77D2F] text-white font-medium rounded-md hover:bg-[#B06A29] transition-colors"
          >
            Submit
          </button>
        </div>

        {/* Sample Review */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-start gap-4">
            <Image
              width={48}
              height={48}
              src="/images/review-avatar.png" // 👈 Replace with actual avatar image
              alt="Reviewer"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">Saitama One</span>
                <div className="flex text-red-500 text-sm">
                  ★★★★★
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-2">12/12/2025</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
      </div>
    </div>
  );
}
