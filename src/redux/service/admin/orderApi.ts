/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";

/* ================= GENERIC API RESPONSE ================= */

export interface ApiResponse<T> {
  status: boolean; // Note: your response has "status", not "success"
  message: string;
  data: T;
}

/* ================= ENUMS ================= */

export type PaymentMethod = "CARD" | "CASH" | "ONLINE";
export type OrderStatus = "PENDING" | "COMPLETED" | "CANCELLED";

/* ================= FULL ORDER (for admin/detail views) ================= */

// Keep your existing full Order interface for getAllOrderByAdmin
export interface OrderUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string | null;
}

export interface OrderProductItem {
  id: string;
  quantity: number;
  price: number;
  isReviewed: boolean;
  product: {
    id: string;
    name: string;
    images: string[];
    price: string;
  };
}

export interface OrderPayment {
  id: string;
  amount: number;
  paidAmount: number;
  status: "PENDING" | "CONFIRMED" | "FAILED";
  method: PaymentMethod;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNo: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: "PENDING" | "CONFIRMED";
  amount: number;
  currency: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string | null;
  state: string | null;
  country: string | null;
  zipCode: string | null;
  shippingFee: number;
  trackingNumber: string | null;
  estimatedDelivery: string | null;
  createdAt: string;
  updatedAt: string;
  user: OrderUser;
  orderProducts: OrderProductItem[];
  payments: OrderPayment[];
}

/* ================= RECENT ORDER (for dashboard) ================= */

export interface RecentOrderUser {
  id: string;
  name: string;
}

export interface RecentOrderProduct {
  id: string;
  name: string;
}

export interface RecentOrderProductItem {
  productId: string;
  quantity: number;
  price: number;
  product: RecentOrderProduct;
}

export interface RecentOrder {
  id: string;
  createdAt: string; // ISO string
  amount: number;
  status: OrderStatus;
  user: RecentOrderUser;
  orderProducts: RecentOrderProductItem[];
}

/* ================= RESPONSE TYPES ================= */

export interface OrderListData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  orders: Order[];
}

export type GetAllOrdersResponse = ApiResponse<OrderListData>;
export type GetRecentOrdersResponse = ApiResponse<RecentOrder[]>;

/* ================= CREATE ORDER TYPES (unchanged) ================= */

export interface CreateOrderShippingDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface CreateOrderRequest {
  shippingDetails: CreateOrderShippingDetails;
  paymentMethod: PaymentMethod;
}

export interface CartSummary {
  subtotal: number;
  totalDiscount: number;
  totalItems: number;
  totalQuantity: number;
  totalShippingFee: number;
  estimatedTotal: number;
}

export interface PaymentInfo {
  type: "stripe";
  sessionId: string;
  url: string;
}

export interface CreateOrderData {
  cartSummary: CartSummary;
  payment: PaymentInfo;
}

export type CreateOrderResponse = ApiResponse<CreateOrderData>;

/* ================= API ENDPOINTS ================= */

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 ADMIN: Full order list
    getAllOrderByAdmin: builder.query<GetAllOrdersResponse, void>({
      query: () => "/order/allOrderAdmin",
      providesTags: ["order"],
    }),

    // 🔹 DASHBOARD: Recent orders (lightweight)
    getRecentBookings: builder.query<GetRecentOrdersResponse, void>({
      query: () => "/dashboard/recent-orders",
      providesTags: ["order"],
    }),

    // 🔹 CREATE ORDER
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (body) => ({
        url: "/order/createOrder",
        method: "POST",
        body,
      }),
      invalidatesTags: ["order"],
    }),
  }),
  overrideExisting: true,
});

/* ================= HOOK EXPORTS ================= */

export const {
  useGetAllOrderByAdminQuery,
  useGetRecentBookingsQuery, // ✅ Export the new hook
  useCreateOrderMutation,
} = orderApi;