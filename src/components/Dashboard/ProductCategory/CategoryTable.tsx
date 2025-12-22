/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Table, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
  logo: string;
}

export default function CategoryTable({ categories }: { categories: Category[] }) {
  const handleDelete = (id: number) => {
    message.success('Category deleted');
  };

  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Category) => (
        <div className="flex items-center">
          <Image
            width={400}
            height={400}
            src={record.logo} 
            alt={text} 
            className="h-8 w-8 rounded mr-3 object-contain"
            onError={(e) => (e.currentTarget.src = '/placeholder-logo.png')}
          />
          <span className="font-roboto text-gray-700">{text}</span>
        </div>
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
        rowKey="id"
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