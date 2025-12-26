/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Upload, message } from "antd";
import Image from "next/image";
import BrandTable from "./BrandTable";
import { useGetBrandListQuery, useCreateBrandMutation } from "@/redux/service/admin/brandApi";
import Swal from 'sweetalert2';

export default function BrandManagement() {
  const { data: brandsResponse, isLoading, isError, refetch } = useGetBrandListQuery();
  const [createBrand] = useCreateBrandMutation();

  const brands = brandsResponse?.data?.brand || [];

  const [brandName, setBrandName] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // ✅ Handle Add Brand with SweetAlert2 (consistent with your app)
  const handleAddBrand = () => {
    let nameInput: HTMLInputElement;
    let fileInput: HTMLInputElement;

    Swal.fire({
      title: 'Add New Brand',
      html: `
        <input 
          id="swal-name" 
          class="swal2-input" 
          placeholder="Brand Name"
        >
        <div class="mt-3">
          <label class="block text-sm md:text-base text-[#4E4E4A] mb-1 font-roboto font-medium">
            Brand Logo *
          </label>
          <input 
            id="swal-file" 
            type="file" 
            accept=".png,.jpg,.jpeg"
            class="w-full p-2 border rounded-md font-roboto border-[#D9D9D9] bg-white"
          />
        </div>
      `,
      focusConfirm: false,
      confirmButtonText: 'Add Brand',
      confirmButtonColor: '#AF6900',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      preConfirm: () => {
        nameInput = document.getElementById('swal-name') as HTMLInputElement;
        fileInput = document.getElementById('swal-file') as HTMLInputElement;

        const name = nameInput?.value.trim();
        const file = fileInput?.files?.[0];

        if (!name) {
          Swal.showValidationMessage('Brand name is required');
          return false;
        }
        if (!file) {
          Swal.showValidationMessage('Logo is required');
          return false;
        }

        // Validate file
        if (file.size > 10 * 1024 * 1024) {
          Swal.showValidationMessage('File must be smaller than 10MB');
          return false;
        }
        if (!file.type.match("image/(png|jpeg|jpg)")) {
          Swal.showValidationMessage('Only PNG/JPG files allowed');
          return false;
        }

        // ✅ Build FormData with data + img
        const formData = new FormData();
        const payload = { name }; // des is null for now
        formData.append('data', JSON.stringify(payload));
        formData.append('img', file);

        return formData;
      },
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        const formData = result.value;

        Swal.fire({
          title: 'Adding...',
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => Swal.showLoading(),
        });

        try {
          const res = await createBrand(formData).unwrap();
          Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: res.message || 'Brand added successfully.',
            confirmButtonColor: '#AF6900',
            timer: 2000,
            showConfirmButton: false,
          });
          refetch(); // ✅ Refresh list
        } catch (error: any) {
          const message = error?.data?.message || error?.message || 'Failed to add brand.';
          Swal.fire({ icon: 'error', title: 'Error', text: message, confirmButtonColor: '#d33' });
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 font-marcellus">Brand Management</h1>
        <p>Loading brands...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 font-marcellus">Brand Management</h1>
        <p className="text-red-500">Failed to load brands.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 font-marcellus">
        Brand Management
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Brand Form */}
        <div className=" p-5 ">
          <h2 className="text-lg font-semibold mb-4 font-roboto">
            Add New Brand
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm md:text-base text-[#4E4E4A] mb-1 font-roboto font-medium">
                Brand Name *
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full p-2 border rounded-md font-roboto border-[#D9D9D9] bg-white"
                placeholder="Enter brand name"
              />
            </div>

            <div>
              <label className="block text-sm md:text-base text-[#4E4E4A] mb-1 font-roboto font-medium">
                Brand Logo *
              </label>
              
              {/* Upload Area */}
              {!previewUrl ? (
                <Upload.Dragger
                  name="logo"
                  maxCount={1}
                  accept=".png,.jpg,.jpeg"
                  onChange={(info: any) => {
                    const file = info.file.originFileObj;
                    if (!file) return;

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
                  }}
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
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M34 16L24 6L14 16"
                        stroke="#A7997D"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M42 30V38C42 39.0609 41.5786 40.0783 40.8284 40.8284C40.0783 41.5786 39.0609 42 38 42H10C8.93913 42 7.92172 41.5786 7.17157 40.8284C6.42143 40.0783 6 39.0609 6 38V30"
                        stroke="#A7997D"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                      onClick={() => {
                        if (previewUrl) URL.revokeObjectURL(previewUrl);
                        setLogoFile(null);
                        setPreviewUrl(null);
                      }}
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
              onClick={handleAddBrand}
            >
              Add
            </button>
          </div>
        </div>

        {/* Brand List */}
        <div className=" p-5">
          <h2 className="text-lg font-semibold mb-4 font-roboto">Brand List</h2>
          <BrandTable brands={brands} />
        </div>
      </div>
    </div>
  );
}