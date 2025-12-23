/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';

interface HeroSectionProps {
  initialData?: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  onSave: (data: any) => void;
}

export default function HeroSection({ 
  initialData = {
    title: "Wine Garden Tour",
    subtitle: "Experience the finest wines",
    buttonText: "Explore Now"
  },
  onSave 
}: HeroSectionProps) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hero Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-4 border border-[#D9D9D9] rounded-lg focus:ring-2  focus:outline-none bg-white"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sub Title
        </label>
        <input
          type="text"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          className="w-full p-4 border border-[#D9D9D9] rounded-lg focus:ring-2  focus:outline-none bg-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Button Text
        </label>
        <input
          type="text"
          name="buttonText"
          value={formData.buttonText}
          onChange={handleChange}
          className="w-full p-4 border border-[#D9D9D9] rounded-lg focus:ring-2  focus:outline-none bg-white"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors"
        >
          Save Change
        </button>
      </div>
    </form>
  );
}