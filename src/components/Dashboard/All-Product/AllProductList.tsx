// components/dashboard/AllProductList.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, Table, Dropdown, Button, Modal } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import Image from "next/image";

/** Interface for product data */
interface ProductRecord {
  key: number;
  productId: number;
  productName: string;
  brandName: string;
  category: string;
  totalProduct: number;
  totalSales: number;
  available: number;
  price: number;
  totalSalesAmount: number;
}

/** Props interface */
interface AllProductListProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

// Mock data generation
const productData: ProductRecord[] = Array.from({ length: 12 }, (_, i) => ({
  key: i,
  productId: 12345,
  productName: "Basket with handles",
  brandName: "Basket with handles",
  category: "Whiskey",
  totalProduct: 45,
  totalSales: 30,
  available: 15,
  price: 600,
  totalSalesAmount: 23300,
}));

export default function AllProductList({
  currentPage,
  setCurrentPage,
}: AllProductListProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductRecord | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showDetails = (record: ProductRecord) => {
    setSelectedProduct(record);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  // Render Actions Menu
  const renderActions = (_: any, record: ProductRecord) => (
    <Dropdown
      menu={{
        items: [
          {
            key: "1",
            label: "View Details",
            onClick: () => showDetails(record),
          },
          { key: "2", label: "Edit" },
          { key: "3", label: "Remove", danger: true },
        ],
      }}
      placement="bottomRight"
    >
      <Button type="text" icon={<EllipsisOutlined />} />
    </Dropdown>
  );

  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
      width: 100,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      width: 180,
    },
    {
      title: "Brand Name",
      dataIndex: "brandName",
      key: "brandName",
      width: 180,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 120,
    },
    {
      title: "Total Product",
      dataIndex: "totalProduct",
      key: "totalProduct",
      width: 100,
    },
    {
      title: "Total Sales",
      dataIndex: "totalSales",
      key: "totalSales",
      width: 100,
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      width: 80,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 80,
      render: (price: number) => `$${price}`,
    },
    {
      title: "Total Sales",
      dataIndex: "totalSalesAmount",
      key: "totalSalesAmount",
      width: 100,
      render: (amount: number) => `$${amount}`,
    },
    {
      title: "Actions",
      key: "actions",
      width: 60,
      render: renderActions,
    },
  ];

  return (
    <>
      <Card
        className="custom-all-product-card"
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Left: Title */}
            <span
              style={{
                fontSize: "18px",
                color: "#A7997D",
                fontWeight: "600",
              }}
            >
              All Product
            </span>
          </div>
        }
        style={{
          borderRadius: "0",
          border: "none",
          backgroundColor: "transparent",
          overflow: "hidden",
        }}
        bodyStyle={{
          padding: 0,
          backgroundColor: "transparent",
        }}
      >
        <div style={{ overflowX: "auto", width: "100%" }}>
          <Table
            columns={columns}
            dataSource={productData}
            pagination={{
              current: currentPage,
              pageSize: 10,
              total: productData.length,
              onChange: setCurrentPage,
              showSizeChanger: false,
              position: ["bottomCenter"], // Centered pagination
              hideOnSinglePage: true,
            }}
            scroll={{ x: 1000 }}
            tableLayout="auto"
            bordered={false}
            style={{ marginTop: "20px" }}
          />
        </div>

        {/* --- Global Styles --- */}
        <style jsx global>{`
          .ant-table-tbody {
            background-color: #fff !important;
          }

          .custom-all-product-card .ant-card-head {
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

          .custom-all-product-card .ant-card-head-title {
            color: #a7997d !important;
            font-weight: 600 !important;
            font-size: 18px !important;
          }

          /* Table Header */
          .custom-all-product-card .ant-table-thead > tr > th {
            background-color: #f5f5f5 !important;
            color: #333 !important;
            font-weight: 600 !important;
            border: 1px solid #e5e7eb !important;
            padding: 12px 16px;
            font-size: 14px;
          }

          .custom-all-product-card
            .ant-table-thead
            > tr:first-child
            > th:first-child {
            border-top-left-radius: 8px !important;
          }

          .custom-all-product-card
            .ant-table-thead
            > tr:first-child
            > th:last-child {
            border-top-right-radius: 8px !important;
          }

          /* Table Body Rows */
          .custom-all-product-card .ant-table-tbody > tr {
            border-bottom: 1px solid #e5e7eb !important;
          }

          .custom-all-product-card .ant-table-tbody > tr:hover {
            background-color: #fafafa !important;
          }

          /* Pagination Styling */
          .custom-all-product-card .ant-pagination {
            display: flex !important;
            justify-content: center !important;
            margin-top: 16px !important;
          }

          .custom-all-product-card .ant-pagination-item-link,
          .custom-all-product-card .ant-pagination-item a {
            color: black !important;
            border-color: #a7997d !important;
          }

          .custom-all-product-card .ant-pagination-item-active {
            background-color: #a7997d !important;
            border-color: #a7997d !important;
          }

          .custom-all-product-card .ant-pagination-item-active a {
            color: white !important;
          }

          .custom-all-product-card .ant-pagination-item:hover a,
          .custom-all-product-card .ant-pagination-item-link:hover {
            color: #5e5e5e !important;
            border-color: #5e5e5e !important;
          }

          .custom-all-product-card .ant-pagination-prev a,
          .custom-all-product-card .ant-pagination-next a {
            color: black !important;
          }

          .custom-all-product-card .ant-pagination-prev button:disabled,
          .custom-all-product-card .ant-pagination-next button:disabled {
            border-color: #ddd !important;
            color: #ccc !important;
          }
        `}</style>
      </Card>

      {/* 💡 Modal: Product Details — You can add later if needed */}
      {/* 💡 Modal: Product Details — EXACT MATCH TO IMAGE */}
      <Modal
        title={
          <div className="flex justify-between items-center w-full bg-white">
            <h3 className="text-lg font-semibold text-gray-800">
              Product Details
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
        {selectedProduct && (
          <div className="space-y-6">
            {/* Product Image */}
            <div className="flex justify-center">
              <Image
                src= "/images/p1.png"
                width={400}
                height={400}
                alt="Product"
                className="w-32 h-32 object-contain rounded-md"
                style={{ border: "1px solid #e5e7eb", padding: "12px" }}
              />
            </div>

            {/* Product Info Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">
                    Product Name
                  </span>
                  <span className="text-gray-900">Red Wine</span>
                </div>
              </div>
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-[#A7997D]">Brand Name</span>
                  <span className="text-gray-900">Basket with handles</span>
                </div>
              </div>
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-[#A7997D]">Product Id</span>
                  <span className="text-gray-900">11111111</span>
                </div>
              </div>
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-[#A7997D]">
                    Product Categories:
                  </span>
                  <span className="text-gray-900">Basket with handles</span>
                </div>
              </div>
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-[#A7997D]">
                    Bottle Size
                  </span>
                  <span className="text-gray-900">500 ml</span>
                </div>
              </div>
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-[#A7997D]">
                    Total Product
                  </span>
                  <span className="text-gray-900">
                    {selectedProduct.totalProduct}
                  </span>
                </div>
              </div>
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-[#A7997D]">
                    Total Available
                  </span>
                  <span className="text-gray-900">
                    {selectedProduct.available}
                  </span>
                </div>
              </div>
              <div className="px-4 py-3">
                <div className="flex justify-between">
                  <span className="font-medium text-[#A7997D]">Price</span>
                  <span className="text-gray-900">
                    ${selectedProduct.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
