/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Image from "next/image";

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

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    // Removed city, postalCode, country as per image
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update quantity
  const updateQuantity = (id: number, newQty: number) => {
    if (newQty < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Remove item
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

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
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

    // Form is valid — proceed to payment
    alert("Order placed successfully!");
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-xl sm:text-2xl font-bold text-[#482817] mb-6">Checkout</h1>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left: Cart Items (50%) */}
        <div className="lg:w-1/2 w-full space-y-6">
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg text-center border border-[#000000] p-6">
              <p className="text-gray-500">Your cart is empty.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-6 rounded-lg flex flex-col sm:flex-row items-start gap-4 sm:gap-6 border border-gray-200"
              >
                {/* Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>

                {/* Info & Controls */}
                <div className="flex-1 w-full">
                  <h3 className="font-bold font-abhaya text-[#1F1F1F] text-base sm:text-xl">
                    {item.name}{" "}
                    <span className="text-sm text-gray-500">({item.volume})</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#968F8F] mt-1 mb-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    {/* Price */}
                    <span className="text-[#C83734] font-abhaya font-extrabold text-xl sm:text-2xl">
                      ${item.price.toFixed(2)}
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-[#E9E9E9] rounded hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-bold text-[#1F1F1F]">
                        {item.quantity.toString().padStart(2, "0")}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-[#E9E9E9] rounded hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>

                    {/* View Details Button */}
                    <button className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 border border-[#1F1F1F] rounded whitespace-nowrap hover:bg-gray-50">
                      View Details
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="14"
                        viewBox="0 0 17 14"
                        fill="#1F1F1F"
                        className="shrink-0"
                      >
                        <path d="M9.625 0L8.64187 0.957688L13.8531 6.1875H0V7.5625H13.8531L8.64187 12.7689L9.625 13.75L16.5 6.875L9.625 0Z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-[#AF6900] hover:text-orange-700 self-start mt-1 sm:mt-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 25 25"
                    fill="none"
                    className="w-6 h-6"
                  >
                    <path
                      d="M10.9375 4.6875H14.0625C14.0625 4.2731 13.8979 3.87567 13.6049 3.58265C13.3118 3.28962 12.9144 3.125 12.5 3.125C12.0856 3.125 11.6882 3.28962 11.3951 3.58265C11.1021 3.87567 10.9375 4.2731 10.9375 4.6875ZM9.375 4.6875C9.375 3.8587 9.70424 3.06384 10.2903 2.47779C10.8763 1.89174 11.6712 1.5625 12.5 1.5625C13.3288 1.5625 14.1237 1.89174 14.7097 2.47779C15.2958 3.06384 15.625 3.8587 15.625 4.6875H21.875C22.0822 4.6875 22.2809 4.76981 22.4274 4.91632C22.5739 5.06284 22.6562 5.26155 22.6562 5.46875C22.6562 5.67595 22.5739 5.87466 22.4274 6.02118C22.2809 6.16769 22.0822 6.25 21.875 6.25H20.9937L19.1109 20.0594C18.9832 20.9952 18.5208 21.8531 17.8092 22.4742C17.0976 23.0953 16.1851 23.4375 15.2406 23.4375H9.75937C8.81487 23.4375 7.90236 23.0953 7.19078 22.4742C6.47921 21.8531 6.01676 20.9952 5.88906 20.0594L4.00625 6.25H3.125C2.9178 6.25 2.71909 6.16769 2.57257 6.02118C2.42606 5.87466 2.34375 5.67595 2.34375 5.46875C2.34375 5.26155 2.42606 5.06284 2.57257 4.91632C2.71909 4.76981 2.9178 4.6875 3.125 4.6875H9.375ZM10.9375 10.1562C10.9375 9.94905 10.8552 9.75034 10.7087 9.60382C10.5622 9.45731 10.3635 9.375 10.1562 9.375C9.94905 9.375 9.75034 9.45731 9.60382 9.60382C9.45731 9.75034 9.375 9.94905 9.375 10.1562V17.9688C9.375 18.176 9.45731 18.3747 9.60382 18.5212C9.75034 18.6677 9.94905 18.75 10.1562 18.75C10.3635 18.75 10.5622 18.6677 10.7087 18.5212C10.8552 18.3747 10.9375 18.176 10.9375 17.9688V10.1562ZM14.8438 9.375C14.6365 9.375 14.4378 9.45731 14.2913 9.60382C14.1448 9.75034 14.0625 9.94905 14.0625 10.1562V17.9688C14.0625 18.176 14.1448 18.3747 14.2913 18.5212C14.4378 18.6677 14.6365 18.75 14.8438 18.75C15.051 18.75 15.2497 18.6677 15.3962 18.5212C15.5427 18.3747 15.625 18.176 15.625 17.9688V10.1562C15.625 9.94905 15.5427 9.75034 15.3962 9.60382C15.2497 9.45731 15.051 9.375 14.8438 9.375Z"
                      fill="#AF6900"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}

          {/* Modified Total Display */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="font-bold text-lg md:text-xl text-[#1F1F1F]">Total:</span>
            <span className="font-extrabold text-2xl md:text-3xl font-abhaya text-[#1F1F1F]">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-px bg-black my-12"></div>

        {/* Right: Checkout Form (50%) - Modified to match image */}
        <div className="lg:w-1/2 w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className=" rounded-lg p-6">
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
                    className={`w-full px-4 py-4 bg-[#F0F0F0] placeholder:text-gray-400 border rounded-md focus:outline-none  focus:ring-2 ${
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