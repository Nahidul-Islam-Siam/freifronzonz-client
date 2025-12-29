/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";

/* ================= GENERIC ================= */

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  success: boolean;
}

/* ================= ORDER TYPES ================= */

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
  method: "CARD" | "CASH" | "ONLINE";
  createdAt: string;
}

export interface Order {
  id: string;
  orderNo: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  paymentMethod: string;
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

/* ================= LIST RESPONSE ================= */

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

/* ================= API ================= */

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET all orders (ADMIN)
    getAllOrderByAdmin: builder.query<GetAllOrdersResponse, void>({
      query: () => "/order/allOrderAdmin",
      providesTags: ["order"],
    }),
  }),
  overrideExisting: true,
});

/* ================= HOOKS ================= */

export const {
  useGetAllOrderByAdminQuery,
} = orderApi;
