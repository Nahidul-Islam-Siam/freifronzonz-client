// components/dashboard/PaymentTable.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Table, Dropdown, Menu, Button, Tag, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Image from "next/image";
// import Link from "next/link";

// --------------------
// Interfaces
// --------------------
interface Payment {
  key: string;
  customerId: number;
  name: string;
  totalProduct: number;
  productName: string;
  paymentDate: string;
  paymentStatus: "Paid";
  totalPrice: number;
  transactionId: string;
}

// --------------------
// Mock Data (Only Payments)
// --------------------
const mockPaymentData: Payment[] = Array.from({ length: 12 }, (_, i) => ({
  key: `${i + 1}`,
  customerId: 12345,
  name: "Alfa Adison Jonson",
  totalProduct: 5,
  productName: "Whiskey",
  paymentDate: "12/12/2025",
  paymentStatus: "Paid",
  totalPrice: 600,
  transactionId: "Trd 000326532",
}));

// --------------------
// Action Menu
// --------------------
const ActionMenu: React.FC<{
  onViewDetails: () => void;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ onViewDetails, onEdit, onDelete }) => (
  <Menu>
    <Menu.Item key="view" onClick={onViewDetails}>
      View Details
    </Menu.Item>
    <Menu.Item key="edit" onClick={onEdit}>
      Edit
    </Menu.Item>
    <Menu.Item key="delete" danger onClick={onDelete}>
      Remove
    </Menu.Item>
  </Menu>
);

// --------------------
// Main Component (Payment List Only)
// --------------------
const PaymentTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  // Inside PaymentTable component, after existing useState hooks:
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showDetails = (record: Payment) => {
    setSelectedPayment(record);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedPayment(null);
  };
  // Render Payment Status Badge
  const renderPaymentTag = (status: Payment["paymentStatus"]) => (
    <Tag color="green">{status}</Tag>
  );

  const columns = [
    {
      title: "Customer ID",
      dataIndex: "customerId",
      key: "customerId",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 180,
    },
    {
      title: "Total Product",
      dataIndex: "totalProduct",
      key: "totalProduct",
      width: 100,
    },
    {
      title: "Product name",
      dataIndex: "productName",
      key: "productName",
      width: 150,
    },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      key: "paymentDate",
      width: 150,
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 100,
      render: renderPaymentTag,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 100,
      render: (price: number) => <span>${price}</span>,
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      width: 150,
    },
    {
      title: "Actions",
      key: "action",
      width: 80,
      render: (_: any, record: Payment) => (
        <Dropdown
          overlay={
            <ActionMenu
              onViewDetails={() => showDetails(record)} // 👈 Updated
              onEdit={() => console.log("Edit", record.key)}
              onDelete={() => console.log("Delete", record.key)}
            />
          }
          trigger={["click"]}
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
        <h2 className="text-xl font-semibold text-[#AF6900]">Payment List</h2>
        {/* Add Payment Button - Optional, can be removed if not needed */}
        {/* <Link href="/dashboard/payment/add-payment" className="bg-[#AF6900] hover:bg-[#8d7c68] text-white px-4 py-2 rounded-[14px] text-sm font-medium flex items-center space-x-1 transition-colors">
          <span>+</span>
          <span>Add Payment</span>
        </Link> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table
          dataSource={mockPaymentData}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: mockPaymentData.length,
            onChange: (page) => setCurrentPage(page),
            showSizeChanger: false,
            position: ["bottomCenter"], // Centered pagination
            hideOnSinglePage: true,
          }}
          rowClassName="hover:bg-gray-50"
          scroll={{ x: "max-content" }}
          className="w-full"
        />
      </div>

      {/* --- Global Style Copied from Booking Table --- */}
      <style jsx global>{`
        /* Match exactly with RecentBookingsTable */

        .custom-recent-bookings-card .ant-card-head {
          display: flex !important;
          justify-content: center !important;
          flex-direction: column !important;
          min-height: 40px !important;
          margin-bottom: -1px;
          background: transparent !important;
          border-bottom: 1px solid #f0f0f0 !important;
          border-radius: 10px 10px 0 0 !important;
          padding: 0px 0px !important;
        }

        .custom-recent-bookings-card .ant-card-head-title {
          color: #a7997d !important;
          font-weight: 600 !important;
          font-size: 18px !important;
        }

        /* Table Header */
        .custom-recent-bookings-card .ant-table-thead > tr > th {
          background-color: #f5f5f5 !important; /* Changed to light gray like image */
          color: #333 !important;
          font-weight: 600 !important;
          border: 1px solid #e5e7eb !important;
          padding: 12px 16px !important;
          font-size: 14px !important;
        }

        .custom-recent-bookings-card
          .ant-table-thead
          > tr:first-child
          > th:first-child {
          border-top-left-radius: 8px !important;
        }

        .custom-recent-bookings-card
          .ant-table-thead
          > tr:first-child
          > th:last-child {
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

      {/* Payment Details Modal */}
      <Modal
        title={
          <div className="flex justify-between items-center w-full bg-white">
            <h3 className="text-lg font-semibold text-gray-800">
              Payment Details
            </h3>
            {/* <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 text-xl"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              ×
            </button> */}
          </div>
        }
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        centered
        width={600}
        styles={{
          body: {
            padding: "24px",
            backgroundColor: "#fff",
            borderRadius: "8px",
          },
        }}
      >
        {selectedPayment && (
          <div className="space-y-6">
            {/* Customer Photo */}
            <div className="flex justify-center">
              <Image
                src="https://via.placeholder.com/150"
                alt="Customer"
                width={150}
                height={150}
                className="rounded-md object-cover"
                style={{ border: "1px solid #e5e7eb", padding: "12px" }}
              />
            </div>

            {/* Payment Info Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">
                    Customer Name
                  </span>
                  <span className="text-gray-900">{selectedPayment.name}</span>
                </div>
              </div>
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-[#A7997D]">
                    Customer ID
                  </span>
                  <span className="text-gray-900">
                    {selectedPayment.customerId}
                  </span>
                </div>
              </div>
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-[#A7997D]">
                    Product Name:
                  </span>
                  <span className="text-gray-900">
                    {selectedPayment.productName}
                  </span>
                </div>
              </div>
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-[#A7997D]">
                    Payment Date
                  </span>
                  <span className="text-gray-900">
                    {selectedPayment.paymentDate}
                  </span>
                </div>
              </div>
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-[#A7997D]">
                    Total Product
                  </span>
                  <span className="text-gray-900">
                    {selectedPayment.totalProduct}
                  </span>
                </div>
              </div>
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-[#A7997D]">Price</span>
                  <span className="text-gray-900">
                    ${selectedPayment.totalPrice}
                  </span>
                </div>
              </div>
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-[#A7997D]">Payment</span>
                  <Tag color="green">Paid</Tag>
                </div>
              </div>
              <div className="px-4 py-3">
                <div className="flex justify-between">
                  <span className="font-medium text-[#A7997D]">
                    Transaction ID
                  </span>
                  <span className="text-gray-900">
                    {selectedPayment.transactionId}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PaymentTable;
