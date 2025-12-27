/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useRef } from 'react';
import { Upload } from 'antd';
import Image from 'next/image';
import Swal from 'sweetalert2';
import BottleSizeTable from './BottleSize';
import { useGetSizeListQuery } from '@/redux/service/admin/bottleSizeApi';


export default function BottleManagement() {
  const [bottleSizes, setBottleSizes] = useState<{ id: string; name: string; img: string | null }[]>([]);
  const [sizeName, setSizeName] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {data: sizeData} = useGetSizeListQuery();

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleAdd = () => {
    if (!sizeName.trim()) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Size name is required', confirmButtonColor: '#d33' });
      return;
    }
    if (!logoFile) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Image is required', confirmButtonColor: '#d33' });
      return;
    }

    if (logoFile.size > 10 * 1024 * 1024) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'File must be < 10MB', confirmButtonColor: '#d33' });
      return;
    }
    if (!logoFile.type.match("image/(png|jpeg|jpg)")) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Only PNG/JPG allowed', confirmButtonColor: '#d33' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const newBottle = {
        id: Date.now().toString(),
        name: sizeName.trim(),
        img: e.target?.result as string,
      };
      setBottleSizes([...bottleSizes, newBottle]);
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'Bottle size added successfully.',
        timer: 1500,
        showConfirmButton: false,
      });

      // Reset
      setSizeName('');
      setLogoFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsDataURL(logoFile);
  };

  const handleFileChange = (info: any) => {
    const file = info.file.originFileObj;
    if (!file) return;
    setLogoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveLogo = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setLogoFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = (id: string) => {
    setBottleSizes(bottleSizes.filter((b) => b.id !== id));
  };

  const handleUpdate = (id: string, name: string, img: string | null) => {
    setBottleSizes(
      bottleSizes.map((b) =>
        b.id === id ? { ...b, name, img } : b
      )
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 font-marcellus">Wind Bottle Size Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Form */}
        <div className="p-5">
          <h2 className="text-lg font-semibold mb-4 font-roboto">Add New Bottle Size</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bottle Size *</label>
              <input
                type="text"
                value={sizeName}
                onChange={(e) => setSizeName(e.target.value)}
                className="w-full p-2 border rounded-md font-roboto border-gray-300"
                placeholder="e.g. 500ml, 1L"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bottle Image *</label>
              {!previewUrl ? (
                <Upload.Dragger
                  name="img"
                  maxCount={1}
                  accept=".png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  showUploadList={false}
                  className="border-dashed rounded-lg border border-gray-300"
                >
                  <div className="p-6 text-center">
                    <p className="text-gray-600">Click to upload image</p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                  </div>
                </Upload.Dragger>
              ) : (
                <div className="border rounded-lg p-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Image width={40} height={40} src={previewUrl} alt="Preview" className="w-10 h-10 object-contain" />
                    <span className="text-sm">{logoFile?.name}</span>
                  </div>
                  <button onClick={handleRemoveLogo} className="text-red-500 text-sm">Delete</button>
                </div>
              )}
            </div>

            <button
              className="w-full mt-2 bg-[#AF6900] text-white py-3 rounded-md font-roboto"
              onClick={handleAdd}
            >
              Add Bottle Size
            </button>
          </div>
        </div>

        {/* Bottle List */}
        <div className="p-5">
          <h2 className="text-lg font-semibold mb-4 font-roboto">Bottle Sizes</h2>
          <BottleSizeTable
            bottleSizes={(sizeData?.data.sizes || []).map((size: any) => ({
              ...size,
              img: size.img || null,
            }))}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}