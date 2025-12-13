import React from "react";

export default function Hero2() {
  return (
    <div>
      {/* Hero Banner */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden mb-8">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/h2.png')`, // 👈 Replace with your actual image path
          }}
        ></div>

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Centered "Shop" Text */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-abhaya font-extrabold text-white tracking-wide drop-shadow-lg">
            Shop
          </h1>
        </div>
      </div>
    </div>
  );
}
