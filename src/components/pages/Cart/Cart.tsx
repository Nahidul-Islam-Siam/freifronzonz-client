// app/cart/page.tsx
"use client";

import { useState } from "react";
import CartItemsList from "./CartItemsList";

// Mock cart data
const mockCartItems = [
  {
    id: 1,
    name: "Red Wine",
    volume: "400ml",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    price: 150.0,
    quantity: 1,
    image: "/images/c1.png",
  },
  {
    id: 2,
    name: "Whiskey",
    volume: "400ml",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    price: 450.25,
    quantity: 1,
    image: "/images/c2.png",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);

  const updateQuantity = (id: number, newQty: number) => {
    if (newQty < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-xl sm:text-2xl font-bold text-[#482817] mb-6">Your Cart</h1>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left: Cart Items (50%) */}
        <div className="lg:w-1/2 w-full">
          <CartItemsList
            items={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
          />
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-px bg-black my-12"></div>

        {/* Right: Summary (50%) */}
        <div className="lg:w-1/2 w-full items-center text-center p-5 sm:p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl md:text-3xl font-abhaya font-extrabold text-[#0B0B0B] mb-4 sm:mb-6">Summary</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between">
              <span className="text-[#1F1F1F] md:text-xl text-base font-medium">Sub Total:</span>
              <span className="font-extrabold text-2xl md:text-3xl font-abhaya text-[#C83734]">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#1F1F1F] md:text-xl text-base font-medium">Shipping fee:</span>
              <span className="font-extrabold text-2xl md:text-3xl font-abhaya text-[#1F1F1F]">$0.00</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between font-bold text-lg">
              <span className="text-[#1F1F1F] md:text-xl text-base font-medium">Total:</span>
              <span className="font-extrabold text-2xl md:text-3xl font-abhaya text-[#1F1F1F]">${total.toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full mt-4 sm:mt-6 bg-[#C77D2F] text-white py-2.5 sm:py-3 rounded-md hover:bg-[#B06A29] transition-colors font-medium">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}