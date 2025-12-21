// components/dashboard/UserList.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Table, Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import UserDetailsModal from "./UserDetailsModal";

// --------------------
// Interfaces
// --------------------
interface User {
  key: string;
  userId: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  lastOrder: string;
  totalOrder: number;
  event: string;
}

// --------------------
// Mock Data (Single list)
// --------------------
const mockUserData: User[] = [
  { key: "1", userId: "12345", name: "Basket with handles", address: "Dhaka, mirpur, Bangladesh", phone: "018000000000", email: "customer00@gmail.com", lastOrder: "12/12/2025", totalOrder: 0, event: "Booking" },
  { key: "2", userId: "12345", name: "Basket with handles", address: "Dhaka, mirpur, Bangladesh", phone: "018000000000", email: "customer00@gmail.com", lastOrder: "12/12/2025", totalOrder: 5, event: "—" },
  { key: "3", userId: "12345", name: "Basket with handles", address: "Dhaka, mirpur, Bangladesh", phone: "018000000000", email: "customer00@gmail.com", lastOrder: "12/12/2025", totalOrder: 0, event: "Booking" },
  { key: "4", userId: "12345", name: "Basket with handles", address: "Dhaka, mirpur, Bangladesh", phone: "018000000000", email: "customer00@gmail.com", lastOrder: "12/12/2025", totalOrder: 6, event: "—" },
  { key: "5", userId: "12345", name: "Basket with handles", address: "Dhaka, mirpur, Bangladesh", phone: "018000000000", email: "customer00@gmail.com", lastOrder: "12/12/2025", totalOrder: 0, event: "Booking" },
  { key: "6", userId: "12345", name: "Basket with handles", address: "Dhaka, mirpur, Bangladesh", phone: "018000000000", email: "customer00@gmail.com", lastOrder: "12/12/2025", totalOrder: 0, event: "Booking" },
  { key: "7", userId: "12345", name: "Basket with handles", address: "Dhaka, mirpur, Bangladesh", phone: "018000000000", email: "customer00@gmail.com", lastOrder: "12/12/2025", totalOrder: 0, event: "Booking" },
  { key: "8", userId: "12345", name: "Basket with handles", address: "Dhaka, mirpur, Bangladesh", phone: "018000000000", email: "customer00@gmail.com", lastOrder: "12/12/2025", totalOrder: 0, event: "Booking" },
  { key: "9", userId: "12345", name: "Basket with handles", address: "Dhaka, mirpur, Bangladesh", phone: "018000000000", email: "customer00@gmail.com", lastOrder: "12/12/2025", totalOrder: 0, event: "Booking" },
  { key: "10", userId: "12345", name: "Basket with handles", address: "Dhaka, mirpur, Bangladesh", phone: "018000000000", email: "customer00@gmail.com", lastOrder: "12/12/2025", totalOrder: 0, event: "Booking" },
  { key: "11", userId: "12345", name: "Basket with handles", address: "Dhaka, mirpur, Bangladesh", phone: "018000000000", email: "customer00@gmail.com", lastOrder: "12/12/2025", totalOrder: 0, event: "Booking" },
  { key: "12", userId: "12345", name: "Basket with handles", address: "Dhaka, mirpur, Bangladesh", phone: "018000000000", email: "customer00@gmail.com", lastOrder: "12/12/2025", totalOrder: 0, event: "Booking" },
];

// --------------------
// Main Component (No Tabs)
// --------------------
const UserList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const pageSize = 10;

  const openDetailsModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const columns = [
    { 
      title: "ID", 
      dataIndex: "userId", 
      key: "userId",
      width: 80,
    },
    { 
      title: "Name", 
      dataIndex: "name", 
      key: "name",
      width: 180,
    },
    { 
      title: "Address", 
      dataIndex: "address", 
      key: "address",
      width: 200,
    },
    { 
      title: "Phone", 
      dataIndex: "phone", 
      key: "phone",
      width: 150,
    },
    { 
      title: "Email", 
      dataIndex: "email", 
      key: "email",
      width: 200,
    },
    { 
      title: "Last Order", 
      dataIndex: "lastOrder", 
      key: "lastOrder",
      width: 120,
    },
    { 
      title: "Total Order", 
      dataIndex: "totalOrder", 
      key: "totalOrder",
      width: 100,
    },
    { 
      title: "Event", 
      dataIndex: "event", 
      key: "event",
      width: 100,
      render: (text: string) => (
        text === "—" ? <span className="text-gray-400">—</span> : <span>{text}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 80,
      render: (_: any, record: User) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'disable',
                danger: true,
                label: 'Disable',
                onClick: () => console.log('Disable user:', record.key),
              },
              {
                key: 'details',
                label: 'Details',
                onClick: () => openDetailsModal(record),
              },
            ],
          }}
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm custom-recent-bookings-card">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#AF6900]">User List</h2>
        <Button
          href="/dashboard/user/add-user"
          className="bg-[#A7997D] hover:bg-[#8d7c68] text-white px-4 py-2 rounded-[14px] text-sm font-medium flex items-center space-x-1 transition-colors"
        >
          <span>+</span>
          <span>Add User</span>
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table
          dataSource={mockUserData}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: mockUserData.length,
            onChange: (page) => setCurrentPage(page),
            showSizeChanger: false,
            position: ['bottomCenter'], // Centered pagination
            hideOnSinglePage: true,
          }}
          rowClassName="hover:bg-gray-50"
          scroll={{ x: "max-content" }}
          className="w-full"
        />
      </div>

      {/* User Details Modal */}
      <UserDetailsModal visible={isModalOpen} onCancel={closeDetailsModal} user={selectedUser} />

      {/* --- Global Style: Match Booking Table Exactly --- */}
      <style jsx global>{`
        /* Table Header */
        .custom-recent-bookings-card .ant-table-thead > tr > th {
          background-color: #f5f5f5 !important; /* Light gray like image */
          color: #333 !important;
          font-weight: 600 !important;
          border: 1px solid #e5e7eb !important;
          padding: 12px 16px !important;
          font-size: 14px !important;
        }

        .custom-recent-bookings-card .ant-table-thead > tr:first-child > th:first-child {
          border-top-left-radius: 8px !important;
        }

        .custom-recent-bookings-card .ant-table-thead > tr:first-child > th:last-child {
          border-top-right-radius: 8px !important;
        }

        /* Table Body */
        .custom-recent-bookings-card .ant-table-tbody > tr > td {
          padding: 12px 16px !important;
          border-bottom: 1px solid #f0f0f0;
        }

        .custom-recent-bookings-card .ant-table-tbody > tr:hover > td {
          background-color: #fafafa !important;
        }

        /* Pagination Styling */
        .custom-recent-bookings-card .ant-pagination {
          display: flex !important;
          justify-content: center !important;
          margin-top: 16px !important;
        }

        .custom-recent-bookings-card .ant-pagination-item-link,
        .custom-recent-bookings-card .ant-pagination-item a {
          color: black !important;
          border-color: #a7997d !important;
        }

        .custom-recent-bookings-card .ant-pagination-item-active {
          background-color: #a7997d !important;
          border-color: #a7997d !important;
        }

        .custom-recent-bookings-card .ant-pagination-item-active a {
          color: white !important;
        }

        .custom-recent-bookings-card .ant-pagination-item:hover a,
        .custom-recent-bookings-card .ant-pagination-item-link:hover {
          color: #8d7c68 !important;
          border-color: #8d7c68 !important;
        }

        .custom-recent-bookings-card .ant-pagination-prev a,
        .custom-recent-bookings-card .ant-pagination-next a {
          color: black !important;
        }

        .custom-recent-bookings-card .ant-pagination-prev button:disabled,
        .custom-recent-bookings-card .ant-pagination-next button:disabled {
          border-color: #ddd !important;
          color: #ccc !important;
        }
      `}</style>
    </div>
  );
};

export default UserList;