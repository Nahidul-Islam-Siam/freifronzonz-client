/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Upload, message } from "antd";
import Image from "next/image";
import CategoryTable from "./CategoryTable";

export default function CategoryManagement() {
  const [categoryName, setCategoryName] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [categories, setCategories] = useState([
    { id: 1, name: "Category Name", logo: "/images/logo1.png" },
    { id: 2, name: "Category Name", logo: "/images/logo1.png" },
    { id: 3, name: "Category Name", logo: "/images/logo1.png" },
  ]);

  const handleAddCategory = () => {
    if (!categoryName.trim()) {
      message.error("Category name is required");
      return;
    }
    if (!logoFile) {
      message.error("Logo is required");
      return;
    }

    const newCategory = {
      id: categories.length + 1,
      name: categoryName,
      logo: previewUrl || "/placeholder-logo.png",
    };

    setCategories([...categories, newCategory]);
    setCategoryName("");
    setLogoFile(null);
    setPreviewUrl(null);
    message.success("Category added successfully!");
  };

  const handleFileChange = (info: any) => {
    const file = info.file.originFileObj;
    if (!file) return;

    // Validate file
    if (file.size > 10 * 1024 * 1024) {
      message.error("File must be smaller than 10MB");
      return;
    }
    if (!file.type.match("image/(png|jpeg|jpg)")) {
      message.error("Only PNG/JPG files allowed");
      return;
    }

    setLogoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    message.success("File uploaded");
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 font-marcellus">
        Category Management
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Category Form */}
        <div className=" p-5 ">
          <h2 className="text-lg font-semibold mb-4 font-roboto">
            Add New Category
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm md:text-base text-[#4E4E4A] mb-1 font-roboto font-medium">
                Category Name *
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full p-2 border rounded-md font-roboto border-[#D9D9D9] bg-white"
                placeholder="Enter category name"
              />
            </div>

            <div>
              <label className="block text-sm md:text-base text-[#4E4E4A] mb-1 font-roboto font-medium">
                Category Logo *
              </label>
              
              {/* Upload Area */}
              {!previewUrl ? (
                <Upload.Dragger
                  name="logo"
                  maxCount={1}
                  accept=".png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  showUploadList={false}
                  className="border-dashed rounded-[14px] border border-[#D1D5DC] bg-white"
                >
                  <div className="p-6 text-center justify-center flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                    >
                      <path
                        d="M24 6V30"
                        stroke="#A7997D"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M34 16L24 6L14 16"
                        stroke="#A7997D"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M42 30V38C42 39.0609 41.5786 40.0783 40.8284 40.8284C40.0783 41.5786 39.0609 42 38 42H10C8.93913 42 7.92172 41.5786 7.17157 40.8284C6.42143 40.0783 6 39.0609 6 38V30"
                        stroke="#A7997D"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p className="text-gray-600 font-roboto mt-2">
                      Click to upload images
                    </p>
                    <p className="text-xs text-gray-400 mt-1 font-roboto">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </Upload.Dragger>
              ) : (
                /* Preview Area with Delete Button */
                <div className="border rounded-[14px] border-[#D1D5DC] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image
                        width={48}
                        height={48}
                        src={previewUrl}
                        alt="Preview"
                        className="h-12 w-12 object-contain"
                      />
                      <span className="text-sm text-gray-600 font-roboto">
                        {logoFile?.name}
                      </span>
                    </div>
                    <button
                      onClick={handleRemoveLogo}
                      className="text-red-500 hover:text-red-700 font-roboto text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              className="w-full mt-2 bg-[#AF6900] text-white py-4 rounded-md font-roboto"
              onClick={handleAddCategory}
            >
              Add
            </button>
          </div>
        </div>

        {/* Category List */}
        <div className=" p-5">
          <h2 className="text-lg font-semibold mb-4 font-roboto">Category List</h2>
          <CategoryTable categories={categories} />
        </div>
      </div>
    </div>
  );
}