/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDeleteBrandMutation } from '@/redux/service/admin/brandApi';
import Swal from 'sweetalert2';

interface Brand {
  id: string;
  name: string;
  des: string | null;
  img: string | null;
}

export default function BrandTable({ brands }: { brands: Brand[] }) {
  const [deleteBrand] = useDeleteBrandMutation();

  const handleDelete = async (id: string) => {
    // Step 1: Confirm deletion with Swal
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#AF6900',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    // Step 2: Show loading
    Swal.fire({
      title: 'Deleting...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await deleteBrand(id).unwrap();
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: res.message || 'Brand deleted successfully.',
        confirmButtonColor: '#AF6900',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error: any) {
      const message =
        error?.data?.message ||
        error?.message ||
        'An unexpected error occurred.';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonColor: '#d33',
      });
    }
  };

  const columns = [
    {
      title: 'Brand Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: Brand) => (
        <span className="font-roboto text-gray-700">{record.name}</span>
      ),
    },
    {
      title: 'Action',
      key: 'actions',
      width: 120,
      render: (_: any, record: Brand) => (
        <div className="flex space-x-2">
          <button className="text-gray-400 hover:text-gray-600">
            <EditOutlined />
          </button>
          {/* ✅ Replaced Popconfirm with Swal */}
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => handleDelete(record.id)}
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table
        dataSource={brands}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="font-roboto"
        style={{ background: 'transparent' }}
        bordered={false}
        components={{
          header: {
            cell: (props: any) => (
              <th
                {...props}
                className="py-3 px-4 font-medium text-gray-700 border-b border-gray-300"
              />
            ),
          },
          body: {
            row: (props: any) => (
              <tr {...props} className="hover:bg-gray-50" />
            ),
            cell: (props: any) => (
              <td
                {...props}
                className="py-3 px-4 text-gray-700 border-b border-gray-200"
              />
            ),
          },
        }}
      />
    </div>
  );
}