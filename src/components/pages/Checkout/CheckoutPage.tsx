// app/checkout/page.tsx
"use client";

import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { removeFromCart, updateQuantity } from '@/redux/slices/cartSlice';

import Link from "next/link";
import CartItemsList from "../Cart/CartItemsList";

export default function CheckoutPage() {
  // ✅ Get cart data from Redux store
  const { items, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ Cart management functions
  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ In a real app, you'd send this to your backend along with cart items
    console.log("Order submitted:", {
      customer: formData,
      cartItems: items,
      total: total
    });

    alert("Order placed successfully!");
    
    // ✅ Optional: Clear cart after successful order
    // dispatch(clearCart());
  };

  // ✅ Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Add some items to your cart before checking out.</p>
        <Link 
          href="/shop" 
          className="bg-[#AF6900] text-white px-6 py-3 rounded-md hover:bg-[#9E845C] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-xl sm:text-2xl font-bold text-[#482817] mb-6">Checkout</h1>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left: Cart Items (50%) */}
        <div className="lg:w-1/2 w-full">
          <CartItemsList
            items={items}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            showSummary={true}
          />
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-px bg-black my-12"></div>

        {/* Right: Checkout Form (50%) */}
        <div className="lg:w-1/2 w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-lg p-6">
              <h2 className="text-xl font-extrabold text-[#0B0B0B] md:text-3xl font-abhaya mb-4">Fill info</h2>

              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm md:text-base font-normal text-[#1f1f1f] mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-4 bg-[#F0F0F0] placeholder:text-gray-400 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.firstName
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-[#C77D2F]"
                    }`}
                    placeholder="Your Name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm md:text-base font-normal text-[#1f1f1f] mb-1">
                    Last Name 
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-4 bg-[#F0F0F0] placeholder:text-gray-400 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.lastName
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-[#C77D2F]"
                    }`}
                    placeholder="Your Name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-sm md:text-base font-normal text-[#1f1f1f] mb-1">
                  Email 
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-[#F0F0F0] placeholder:text-gray-400 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-[#C77D2F]"
                  }`}
                  placeholder="Your Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="mb-4">
                <label className="block text-sm md:text-base font-normal text-[#1f1f1f] mb-1">
                  Phone 
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-[#F0F0F0] placeholder:text-gray-400 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-[#C77D2F]"
                  }`}
                  placeholder="+880 1XXXXXXXX"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Address Field */}
              <div className="mb-6">
                <label className="block text-sm md:text-base font-normal text-[#1f1f1f] mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-[#F0F0F0] placeholder:text-gray-400 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.address
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-[#C77D2F]"
                  }`}
                  placeholder="Your Address"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4 mb-6">
                <h3 className="font-bold text-lg mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#1F1F1F]">Subtotal:</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1F1F1F]">Shipping:</span>
                    <span className="font-bold">$0.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#C77D2F] text-white font-bold py-4 px-4 rounded hover:bg-[#B06A28] transition-colors"
              >
                Submit Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}