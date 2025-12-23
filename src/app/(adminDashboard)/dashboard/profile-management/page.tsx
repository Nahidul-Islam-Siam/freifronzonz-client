/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import BlogManagement from '@/components/Dashboard/ProfileManagement/BlogManagement';
import HeroSection from '@/components/Dashboard/ProfileManagement/HeroSection';
import OurStory from '@/components/Dashboard/ProfileManagement/OurStory';
import { useState } from 'react';

export default function ProfileManagement() {
  const [activeTab, setActiveTab] = useState<'hero' | 'story' | 'blog'>('hero');
  
  // Mock save handlers - replace with actual API calls
  const handleSaveHero = (data: any) => {
    console.log('Saving Hero Section:', data);
    alert('Hero section saved!');
  };
  
  const handleSaveStory = (data: any) => {
    console.log('Saving Our Story:', data);
    alert('Our Story section saved!');
  };
  
  const handleAddBlog = (post: any) => {
    console.log('Adding new blog post:', post);
    alert('Blog post added!');
  };
  
  const handleEditBlog = (id: number, updatedPost: any) => {
    console.log(`Editing blog ${id}:`, updatedPost);
    alert(`Blog post ${id} edited!`);
  };
  
  const handleDeleteBlog = (id: number) => {
    console.log(`Deleting blog ${id}`);
    alert(`Blog post ${id} deleted!`);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Management</h1>
        
        {/* Button-Style Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
              activeTab === 'hero'
                ? 'bg-amber-600 text-white'
                : 'bg-white text-gray-700 border border-amber-600 hover:bg-amber-50'
            }`}
          >
            Hero Section
          </button>
          
          <button
            onClick={() => setActiveTab('story')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
              activeTab === 'story'
                ? 'bg-amber-600 text-white'
                : 'bg-white text-gray-700 border border-amber-600 hover:bg-amber-50'
            }`}
          >
            Our Story
          </button>
          
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
              activeTab === 'blog'
                ? 'bg-amber-600 text-white'
                : 'bg-white text-gray-700 border border-amber-600 hover:bg-amber-50'
            }`}
          >
            Blog
          </button>
        </div>
        
        {/* Tab Content */}
        <div className=" p-6">
          {activeTab === 'hero' && (
            <HeroSection
              onSave={handleSaveHero} 
            />
          )}
          
          {activeTab === 'story' && (
            <OurStory 
              onSave={handleSaveStory} 
            />
          )}
          
          {activeTab === 'blog' && (
            <BlogManagement 
              onAdd={handleAddBlog}
              onEdit={handleEditBlog}
              onDelete={handleDeleteBlog}
            />
          )}
        </div>
      </div>
    </div>
  );
}