/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, Table, Dropdown, Button, Modal, Skeleton } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useDeleteProductMutation, useGetProductListQuery } from "@/redux/service/admin/productApi";
import Swal from "sweetalert2";

/** Interface for product data */
interface ProductRecord {
  key: string;
  id: string;
  productId: string;
  productName: string;
  brandName: string;
  category: string;
  totalProduct: number;
  totalSales: number;
  available: number;
  price: number;
  totalSalesAmount: number;
  images: string[];
}

/** Props interface */
interface AllProductListProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function AllProductList({
  currentPage,
  setCurrentPage,
}: AllProductListProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductRecord | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteProduct] = useDeleteProductMutation();
  
  // ✅ Load ALL products at once (no pagination in API)
  const {  data: productsResponse, isLoading, isError } = useGetProductListQuery({ 
    page: 1, 
    limit: 1000 // Load all products
  });

  const [allTransformedProducts, setAllTransformedProducts] = useState<ProductRecord[]>([]);
  
  // ✅ Transform all products once 
  useEffect(() => {
    if (productsResponse?.data?.products) {
      const transformed = productsResponse.data.products.map((product: any) => ({
        key: product.id,
        id: product.id,
        productId: product.id,
        productName: product.name,
        brandName: product.brand.name,
        category: product.category.name,
        totalProduct: parseInt(product.quantity) || 0,
        totalSales: 0,
        available: product.stock ? parseInt(product.quantity) || 0 : 0,
        price: parseFloat(product.price) || 0,
        totalSalesAmount: 0,
        images: product.images || [],
      }));
      setAllTransformedProducts(transformed);
    }
  }, [productsResponse]);

  // ✅ Frontend pagination
  const pageSize = 10;
  const totalPages = Math.ceil(allTransformedProducts.length / pageSize);
  const paginatedProducts = allTransformedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

useEffect(() => {
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }
}, [totalPages, currentPage]);

  const showDetails = (record: ProductRecord) => {
    setSelectedProduct(record);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const res = await deleteProduct(productId).unwrap();
      if (res.status === true) {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: res.message || 'Product deleted successfully.',
          confirmButtonColor: '#AF6900',
          timer: 2000,
          showConfirmButton: false,  
        });
        // ✅ Force refresh to reload all data
        window.location.reload();
      } else {
        Swal.fire({
          icon: 'error',  
          title: 'Error',
          text: res.message || 'Failed to delete product.',
          confirmButtonColor: '#d33',
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete product.',
        confirmButtonColor: '#d33',
      });
    }
    closeModal();
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
          { 
            key: "2", 
            label: "Edit",
            onClick: () => {
              window.location.href = `/dashboard/all-product/${record.id}`;
            }
          },
          {
            key: "3",
            label: "Delete",
            onClick: () => handleDeleteProduct(record.id),
            danger: true,
          },
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

  if (isLoading) {
    return (
      <Card
        className="custom-all-product-card"
        title={
          <span className="text-lg font-semibold text-[#A7997D]">
            All Product
          </span>
        }
        style={{
          borderRadius: "0",
          border: "none",
          backgroundColor: "transparent",
        }}
        bodyStyle={{
          padding: 0,
          backgroundColor: "transparent",
        }}
      >
        <Skeleton active paragraph={{ rows: 5 }} />
      </Card>
    );
  }

  if (isError || !productsResponse?.data) {
    return (
      <Card
        className="custom-all-product-card"
        title={
          <span className="text-lg font-semibold text-[#A7997D]">
            All Product
          </span>
        }
        style={{
          borderRadius: "0",
          border: "none",
          backgroundColor: "transparent",
        }}
        bodyStyle={{
          padding: 20,
          backgroundColor: "transparent",
        }}
      >
        <div className="text-center text-red-500">Failed to load products</div>
      </Card>
    );
  }

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
  overflow: "visible",

        }}
        bodyStyle={{
          padding: 0,
          backgroundColor: "transparent",
        }}
      >
<div style={{ overflowX: "auto", width: "100%" }}>
  <Table
    columns={columns}
    dataSource={paginatedProducts}
    pagination={false}
    scroll={{ x: 1000 }}
  />
</div>

{/* ✅ Pagination (single wrapper, always visible) */}
<div className="custom-pagination">
  <Button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    Prev
  </Button>

  {Array.from({ length: totalPages || 1 }).map((_, i) => (
    <Button
      key={i}
      type={currentPage === i + 1 ? "primary" : "default"}
      onClick={() => setCurrentPage(i + 1)}
    >
      {i + 1}
    </Button>
  ))}

  <Button
    disabled={currentPage === totalPages || totalPages === 0}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next
  </Button>
</div>

{/* )} */}



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

          /* Custom Pagination */
          .custom-pagination {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin: 20px 0;
          }

          .custom-pagination .ant-btn-primary {
            background-color: #a7997d;
            border-color: #a7997d;
          }

          .custom-pagination .ant-btn-primary:hover {
            background-color: #8f8168;
            border-color: #8f8168;
          }
        `}</style>
      </Card>

      {/* Product Details Modal */}
      <Modal
        title={
          <div className="flex justify-between items-center w-full bg-white">
            <h3 className="text-lg font-semibold text-gray-800">
              Product Details
            </h3>
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
                src={selectedProduct.images[0] 
                  ? `http://localhost:4200/${selectedProduct.images[0]}`
                  : "/placeholder.svg"
                }
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
                  <span className="text-gray-900">{selectedProduct.productName}</span>
                </div>
              </div>
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-[#A7997D]">Brand Name</span>
                  <span className="text-gray-900">{selectedProduct.brandName}</span>
                </div>
              </div>
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-[#A7997D]">Product Id</span>
                  <span className="text-gray-900">{selectedProduct.productId}</span>
                </div>
              </div>
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-[#A7997D]">
                    Product Categories:
                  </span>
                  <span className="text-gray-900">{selectedProduct.category}</span>
                </div>
              </div>
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium text-[#A7997D]">
                    Bottle Size
                  </span>
                  <span className="text-gray-900">
                    {selectedProduct.totalProduct > 0 ? "500 ml" : "N/A"}
                  </span>
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