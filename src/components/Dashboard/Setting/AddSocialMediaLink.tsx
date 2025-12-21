// components/dashboard/AddSocialMediaLink.tsx

"use client";
import React, { useState } from 'react';

export default function AddSocialMediaLink() {
  // State to hold form values
  const [formData, setFormData] = useState({
    pinterest: "https://demo.printease.com/user/12345",
    instagram: "https://demo.printease.com/user/12345",
    linkedin: "https://demo.printease.com/user/12345",
    facebook: "https://demo.printease.com/user/12345",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    alert("Social media links saved successfully!");
    // You can add API call or state update here
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 w-full">
      {/* Header */}
      <h2 className="text-[#482817] md:text-3xl text-2xl font-extrabold font-abhaya mb-4">Add Social Media Link</h2>

      {/* Form Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Pinterest */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pinterest*
          </label>
          <input
            type="url"
            name="pinterest"
            value={formData.pinterest}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A7997D] focus:border-[#A7997D]"
            placeholder="https://demo.printease.com/user/12345"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn*
          </label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A7997D] focus:border-[#A7997D]"
            placeholder="https://demo.printease.com/user/12345"
          />
        </div>

        {/* Instagram */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instagram*
          </label>
          <input
            type="url"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A7997D] focus:border-[#A7997D]"
            placeholder="https://demo.printease.com/user/12345"
          />
        </div>

        {/* Facebook */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Facebook*
          </label>
          <input
            type="url"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A7997D] focus:border-[#A7997D]"
            placeholder="https://demo.printease.com/user/12345"
          />
        </div>
      </form>

      {/* Save Button */}
      <button
        type="submit"
        className="px-6 py-2 bg-[#AF6900] text-white rounded-md text-sm font-medium hover:bg-[#8d7c68] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A7997D]"
      >
        Save & Update
      </button>
    </div>
  );
}