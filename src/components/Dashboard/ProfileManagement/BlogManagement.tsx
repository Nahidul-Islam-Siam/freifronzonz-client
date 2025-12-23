'use client';

import { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
}

interface BlogManagementProps {
  initialPosts?: BlogPost[];
  onAdd: (post: Omit<BlogPost, 'id'>) => void;
  onEdit: (id: number, updatedPost: Partial<BlogPost>) => void;
  onDelete: (id: number) => void;
}

export default function BlogManagement({ 
  initialPosts = [
    { id: 1, title: "Share the Love for Prestation 1.7", excerpt: "A beautiful journey through our vineyards", image: "/placeholder.jpg" },
    { id: 2, title: "Share the Love for Prestation 1.7", excerpt: "A beautiful journey through our vineyards", image: "/placeholder.jpg" },
    { id: 3, title: "Share the Love for Prestation 1.7", excerpt: "A beautiful journey through our vineyards", image: "/placeholder.jpg" },
    { id: 4, title: "Share the Love for Prestation 1.7", excerpt: "A beautiful journey through our vineyards", image: "/placeholder.jpg" }
  ],
  onAdd,
//   onEdit,
  onDelete
}: BlogManagementProps) {
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    image: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPost = () => {
    if (!newPost.title || !newPost.excerpt) return;
    
    onAdd({
      title: newPost.title,
      excerpt: newPost.excerpt,
      image: newPost.image || "/placeholder.jpg"
    });
    
    // Reset form
    setNewPost({ title: "", excerpt: "", image: "" });
  };

//   const handleUpdatePost = (id: number, field: string, value: string) => {
//     onEdit(id, { [field]: value });
//   };

  return (
    <div className="space-y-6">
      {/* Published Blog Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Published Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {initialPosts.map((post) => (
            <div key={post.id} className="bg-white p-3 rounded-lg border">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-bold text-gray-500">0{post.id}.</span>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => console.log('Edit post', post.id)}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <span className="text-xs text-gray-400">|</span>
                  <button 
                    onClick={() => onDelete(post.id)}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <h3 className="font-medium text-sm mb-1">{post.title}</h3>
              <p className="text-xs text-gray-600 line-clamp-2">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Blog Form */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Blog Post</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              className="w-full p-4 border border-[#D9D9D9] rounded-lg focus:ring-2  focus:outline-none bg-white"
              placeholder="Enter blog title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt
            </label>
            <textarea
              name="excerpt"
              value={newPost.excerpt}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-4 border border-[#D9D9D9] rounded-lg focus:ring-2  focus:outline-none bg-white"
              placeholder="Enter blog excerpt"
            />
          </div>
          
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={newPost.image}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter image URL"
            />
          </div> */}

          {/* upload image not url */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                name="image"
                // value={newPost.image}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter image URL"
              />
            </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleAddPost}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors"
            disabled={!newPost.title || !newPost.excerpt}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}