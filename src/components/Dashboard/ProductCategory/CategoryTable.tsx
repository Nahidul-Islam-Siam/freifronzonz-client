/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Table, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';
// import { API_BASE_URL } from '@/lib/apiConfig'; // Add this if you have it

// ✅ Match your real API response
interface Category {
  id: string;           // ✅ string (MongoDB ObjectId)
  name: string;
  des: string;          // description
  img: string | null;   // ✅ field name is "img", not "logo"
}

// Helper: Build full image URL or use placeholder
// const getImageUrl = (imgPath: string | null): string => {
//   if (!imgPath) return '/placeholder-logo.png';
  
//   // If img is a full URL (http://...), use as-is
//   if (imgPath.startsWith('http')) return imgPath;
  
//   // If relative path, prefix with API base URL
//   return `${API_BASE_URL}/${imgPath}`;
// };

export default function CategoryTable({ categories }: { categories: Category[] }) {
  const handleDelete = (id: string) => {
    message.success('Category deleted');
    // TODO: Call delete mutation here
  };

  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: Category) => (
        <div className="flex items-center">

          <span className="font-roboto text-gray-700">{record.name}</span>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'des',
      key: 'des',
      render: (text: string) => (
        <span className="font-roboto text-gray-600 text-sm">{text}</span>
      ),
    },
    {
      title: 'Action',
      key: 'actions',
      width: 120,
      render: (_: any, record: Category) => (
        <div className="flex space-x-3">
          <button className="text-gray-400 hover:text-gray-600">
            <EditOutlined />
          </button>
          <Popconfirm
            title="Delete category?"
            description="Are you sure you want to delete this category?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <button className="text-gray-400 hover:text-gray-600">
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-transparent">
      <Table
        dataSource={categories}
        columns={columns}
        rowKey="id" // ✅ Now safe: id is string
        pagination={false}
        className="font-roboto"
        style={{ background: 'transparent' }}
        bordered={false}
        scroll={{ x: 'max-content' }}
        components={{
          header: {
            wrapper: (props: any) => (
              <thead {...props} className="bg-gray-100" />
            ),
            cell: (props: any) => (
              <th
                {...props}
                className={`${props.className} py-3 px-4 font-medium text-gray-700 border-b border-gray-300`}
              />
            ),
          },
          body: {
            wrapper: (props: any) => (
              <tbody {...props} className="bg-white" />
            ),
            row: (props: any) => (
              <tr
                {...props}
                className={`${props.className} hover:bg-gray-50`}
              />
            ),
            cell: (props: any) => (
              <td
                {...props}
                className={`${props.className} py-3 px-4 text-gray-700 border-b border-gray-200`}
              />
            ),
          },
        }}
      />
    </div>
  );
}