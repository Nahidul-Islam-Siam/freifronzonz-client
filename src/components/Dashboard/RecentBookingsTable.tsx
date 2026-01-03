/* eslint-disable @typescript-eslint/no-explicit-any */
// components/dashboard/RecentBookingsTable.tsx

'use client';

import { Card, Table, Dropdown, Button, Modal, Typography, Tag, Spin } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useState, useMemo } from 'react';
import { useGetAllOrderByAdminQuery } from '@/redux/service/admin/orderApi';

const { Text } = Typography;

/** Interface for order data from API */
interface OrderRecord {
  key: string;
  orderId: string;
  customer: string;
  product: string;
  orderDate: string;
  qty: number;
  totalAmount: number;
  status: 'Complete' | 'Cancelled' | 'Pending';
}

/** Props interface */
interface RecentBookingsTableProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function RecentBookingsTable({
  currentPage,
  setCurrentPage,
}: RecentBookingsTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: orders, isLoading, isError } = useGetAllOrderByAdminQuery();

  // Transform API data to table format
  const tableData: OrderRecord[] = useMemo(() => {
    if (!orders?.data?.orders) return [];
    
    return orders.data.orders.map((order: any) => ({
      key: order.id,
      orderId: order.orderNo,
      customer: order.name,
      product: order.orderProducts?.[0]?.product?.name || 'N/A',
      orderDate: new Date(order.createdAt).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).replace(/\//g, '/').replace(/,/, ' -'),
      qty: order.orderProducts?.[0]?.quantity || 0,
      totalAmount: order.amount,
      status: order.status === 'COMPLETED' 
        ? 'Complete' 
        : order.status === 'CANCELLED' 
        ? 'Cancelled' 
        : 'Pending',
    }));
  }, [orders]);

  const showDetails = (record: OrderRecord) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  // Status badge renderer
  const renderStatusTag = (status: OrderRecord['status']) => {
    let color = 'default';
    if (status === 'Complete') color = 'green';
    if (status === 'Cancelled') color = 'red';
    if (status === 'Pending') color = 'purple';

    return <Tag color={color}>{status}</Tag>;
  };

  // Qty renderer
  const renderQty = (qty: number) => (
    <span
      style={{
        backgroundColor: '#A7997D',
        color: 'white',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 500,
      }}
    >
      {qty}
    </span>
  );

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      width: 180,
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      width: 160,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      width: 60,
      render: renderQty,
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 120,
      render: (amount: number) => `$${amount}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: renderStatusTag,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      render: (_: any, record: OrderRecord) => (
        <Dropdown
          menu={{
            items: [
              {
                key: '1',
                label: 'View Details',
                onClick: () => showDetails(record),
              },
              {
                key: '2',
                label: 'View Profile',
                onClick: () => alert('View Profile clicked'),
              },
              {
                key: '3',
                label: 'Remove',
                danger: true,
                onClick: () => alert('Remove clicked'),
              },
            ],
          }}
          placement="bottomRight"
        >
          <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Card
        className="custom-recent-order-card"
        title={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <span
              style={{
                fontSize: '18px',
                color: '#A7997D',
                fontWeight: '600',
              }}
            >
              Recent Order
            </span>
            <a
              href="#"
              style={{
                fontSize: '14px',
                color: '#A7997D',
                textDecoration: 'none',
                fontWeight: '500',
              }}
            >
              Show All Orders
            </a>
          </div>
        }
        style={{
          borderRadius: '0',
          border: 'none',
          backgroundColor: 'transparent',
          overflow: 'hidden',
        }}
        bodyStyle={{
          padding: 0,
          backgroundColor: 'transparent',
        }}
      >
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card
        className="custom-recent-order-card"
        title={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <span
              style={{
                fontSize: '18px',
                color: '#A7997D',
                fontWeight: '600',
              }}
            >
              Recent Order
            </span>
            <a
              href="#"
              style={{
                fontSize: '14px',
                color: '#A7997D',
                textDecoration: 'none',
                fontWeight: '500',
              }}
            >
              Show All Orders
            </a>
          </div>
        }
        style={{
          borderRadius: '0',
          border: 'none',
          backgroundColor: 'transparent',
          overflow: 'hidden',
        }}
        bodyStyle={{
          padding: 0,
          backgroundColor: 'transparent',
        }}
      >
        <div className="text-center text-red-500 py-12">
          Failed to load orders. Please try again.
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card
        className="custom-recent-order-card"
        title={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* Left: Title */}
            <span
              style={{
                fontSize: '18px',
                color: '#A7997D',
                fontWeight: '600',
              }}
            >
              Recent Order
            </span>
            {/* Right: Show All Orders */}
            <a
              href="#"
              style={{
                fontSize: '14px',
                color: '#A7997D',
                textDecoration: 'none',
                fontWeight: '500',
              }}
            >
              Show All Orders
            </a>
          </div>
        }
        style={{
          borderRadius: '0',
          border: 'none',
          backgroundColor: 'transparent',
          overflow: 'hidden',
        }}
        bodyStyle={{
          padding: 0,
          backgroundColor: 'transparent',
        }}
      >
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={{
              current: currentPage,
              pageSize: 10,
              total: tableData.length,
              onChange: setCurrentPage,
              showSizeChanger: false,
              position: ['bottomRight'],
              // hideOnSinglePage: true,
            }}
            scroll={{ x: 800 }}
            tableLayout="auto"
            bordered={false}
            style={{ marginTop: '20px' }}
            locale={{ emptyText: 'No orders found' }}
          />
        </div>

        {/* --- Global Styles --- */}
        <style jsx global>{`
          .ant-table-tbody {
            background-color: #fff !important;
          }

          .custom-recent-order-card .ant-card-head {
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

          .custom-recent-order-card .ant-card-head-title {
            color: #a7997d !important;
            font-weight: 600 !important;
            font-size: 18px !important;
          }

          /* Table Header */
          .custom-recent-order-card .ant-table-thead > tr > th {
            background-color: #f5f5f5 !important;
            color: #333 !important;
            font-weight: 600 !important;
            border: 1px solid #e5e7eb !important;
            padding: 12px 16px;
            font-size: 14px;
          }

          .custom-recent-order-card .ant-table-thead > tr:first-child > th:first-child {
            border-top-left-radius: 8px !important;
          }

          .custom-recent-order-card .ant-table-thead > tr:first-child > th:last-child {
            border-top-right-radius: 8px !important;
          }

          /* Table Body Rows */
          .custom-recent-order-card .ant-table-tbody > tr {
            border-bottom: 1px solid #e5e7eb !important;
          }

          .custom-recent-order-card .ant-table-tbody > tr:hover {
            background-color: #fafafa !important;
          }

          /* Pagination Styling */
          .custom-recent-order-card .ant-pagination-item-link,
          .custom-recent-order-card .ant-pagination-item a {
            color: black !important;
            border-color: #a7997d !important;
          }

          .custom-recent-order-card .ant-pagination-item-active {
            background-color: #a7997d !important;
            border-color: #a7997d !important;
          }

          .custom-recent-order-card .ant-pagination-item-active a {
            color: white !important;
          }

          .custom-recent-order-card .ant-pagination-item:hover a,
          .custom-recent-order-card .ant-pagination-item-link:hover {
            color: #5e5e5e !important;
            border-color: #5e5e5e !important;
          }

          .custom-recent-order-card .ant-pagination-prev a,
          .custom-recent-order-card .ant-pagination-next a {
            color: black !important;
          }

          .custom-recent-order-card .ant-pagination-prev button:disabled,
          .custom-recent-order-card .ant-pagination-next button:disabled {
            border-color: #ddd !important;
            color: #ccc !important;
          }
        `}</style>
      </Card>

      {/* 💡 Modal: Order Details */}
      <Modal
        title="Order Details"
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        centered
        width={600}
      >
        {selectedOrder && (
          <div style={{ padding: '20px', lineHeight: '2.2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>Order ID</Text>
              <Text>{selectedOrder.orderId}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>Customer</Text>
              <Text>{selectedOrder.customer}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>Product</Text>
              <Text>{selectedOrder.product}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>Order Date</Text>
              <Text>{selectedOrder.orderDate}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>Qty</Text>
              <span
                style={{
                  backgroundColor: '#A7997D',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 500,
                }}
              >
                {selectedOrder.qty}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>Total Amount</Text>
              <Text>${selectedOrder.totalAmount}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>Status</Text>
              {renderStatusTag(selectedOrder.status)}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}