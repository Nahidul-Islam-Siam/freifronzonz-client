/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';

interface OurStoryProps {
  initialData?: {
    title: string;
    description: string;
  };
  onSave: (data: any) => void;
}

export default function OurStory({ 
  initialData = {
    title: "Wine Garden Tour",
    description: "Wine Garden Tour"
  },
  onSave 
}: OurStoryProps) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
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