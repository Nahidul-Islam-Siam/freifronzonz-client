/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useRef } from 'react';
import { Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { UploadIcon } from 'lucide-react';

interface BottleSize {
  id: string;
  name: string; // e.g., "500ml", "1L"
  img: string | null; // Base64 or object URL
}

export default function BottleSizeTable({ 
  bottleSizes, 
  onDelete, 
  onUpdate 
}: { 
  bottleSizes: BottleSize[]; 
  onDelete: (id: string) => void;
  onUpdate: (id: string, name: string, img: string | null) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBottleSize, setSelectedBottleSize] = useState<BottleSize | null>(null);
  const [formData, setFormData] = useState({ name: '' });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#AF6900',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Bottle size deleted successfully.',
          confirmButtonColor: '#AF6900',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleEdit = (size: BottleSize) => {
    setSelectedBottleSize(size);
    setFormData({ name: size.name });
    setPreviewUrl(size.img);
    setLogoFile(null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'File must be < 10MB', confirmButtonColor: '#d33' });
      return;
    }
    if (!file.type.match("image/(png|jpeg|jpg)")) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Only PNG/JPG allowed', confirmButtonColor: '#d33' });
      return;
    }

    setLogoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpdate = () => {
    if (!selectedBottleSize || !formData.name.trim()) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Size name is required', confirmButtonColor: '#d33' });
      return;
    }

    // let finalImgUrl = previewUrl;
    if (logoFile) {
      // Convert to base64 for persistence (optional: you could keep object URLs if only for preview)
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        onUpdate(selectedBottleSize.id, formData.name.trim(), base64);
        closeAndReset();
      };
      reader.readAsDataURL(logoFile);
    } else {
      onUpdate(selectedBottleSize.id, formData.name.trim(), selectedBottleSize.img);
      closeAndReset();
    }

    function closeAndReset() {
      setIsModalOpen(false);
      setLogoFile(null);
      setPreviewUrl(null);
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Bottle size updated.',
        confirmButtonColor: '#AF6900',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const columns = [
    {
      title: 'Bottle Size',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: BottleSize) => (
        <span className="font-roboto text-gray-700">{record.name}</span>
      ),
    },
    {
      title: 'Image',
      key: 'img',
      render: (_: any, record: BottleSize) => (
        record.img ? (
          <Image
            width={40}
            height={40}
            src={record.img}
            alt="Bottle"
            className="w-10 h-10 object-contain"
          />
        ) : <span className="text-gray-400">—</span>
      ),
    },
    {
      title: 'Action',
      key: 'actions',
      width: 120,
      render: (_: any, record: BottleSize) => (
        <div className="flex space-x-2">
          <button className="text-gray-400 hover:text-gray-600" onClick={() => handleEdit(record)}>
            <EditOutlined />
          </button>
          <button className="text-gray-400 hover:text-gray-600" onClick={() => handleDelete(record.id)}>
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="overflow-x-auto">
        <Table
          dataSource={bottleSizes}
          columns={columns}
          rowKey="id"
          pagination={false}
          className="font-roboto"
          style={{ background: 'transparent' }}
          bordered={false}
          components={{
            header: {
              cell: (props: any) => (
                <th {...props} className="py-3 px-4 font-medium text-gray-700 border-b border-gray-300" />
              ),
            },
            body: {
              row: (props: any) => <tr {...props} className="hover:bg-gray-50" />,
              cell: (props: any) => (
                <td {...props} className="py-3 px-4 text-gray-700 border-b border-gray-200" />
              ),
            },
          }}
        />
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedBottleSize && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-gray-900">Edit Bottle Size</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form className="space-y-5">
              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bottle Image</label>
                <div className="flex items-center gap-4">
                  {previewUrl ? (
                    <Image width={100} height={100} src={previewUrl} alt="Preview" className="w-16 h-16 rounded object-contain border" />
                  ) : selectedBottleSize.img ? (
                    <Image width={100} height={100} src={selectedBottleSize.img} alt="Current" className="w-16 h-16 rounded object-contain border" />
                  ) : (
                    <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center">
                      <UploadIcon className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 cursor-pointer hover:text-[#AF6900]">
                      Upload New Image
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
                    {(previewUrl || selectedBottleSize.img) && (
                      <button type="button" onClick={handleRemoveLogo} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                    )}
                  </div>
                </div>
              </div>

              {/* Size Name */}
              <div>
                <label htmlFor="sizeName" className="block text-sm font-medium text-gray-700 mb-1">Bottle Size *</label>
                <input
                  type="text"
                  id="sizeName"
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#AF6900]"
                  placeholder="e.g. 500ml, 1L"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={handleUpdate} className="flex-1 py-2.5 bg-[#AF6900] text-white font-medium rounded-md hover:bg-[#9E845C]">
                  Save Changes
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}