/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";

/* ================= GENERIC ================= */

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  success: boolean;
}

/* ================= PAYMENT TYPES ================= */

export interface PaymentOrderProduct {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  isReviewed: boolean;
  product: {
    name: string;
    images: string[];
  };
}

export interface PaymentOrder {
  id: string;
  userId: string;
  amount: number;
  orderNo: string;
  name: string;
  email: string;
  address: string;
  currency: string;
  shippingFee: number;
  paymentMethod: string;
  orderProducts: PaymentOrderProduct[];
  createdAt: string;
}

export interface PaymentItem {
  id: string;
  userId: string;
  orderId: string | null;
  transactionId: string | null;
  name: string | null;
  amount: number;
  paidAmount: number;
  currency: string;
  status: "PENDING" | "CONFIRMED" | "FAILED";
  method: "CARD" | "CASH" | "ONLINE";
  order: PaymentOrder | null;
}

export interface PaymentListData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  payments: PaymentItem[];
  createdAt: string;
}

export type GetPaymentHistoryResponse = ApiResponse<PaymentListData>;

/* ================= API ================= */

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET all payments (admin)
    getPaymentHistoryByAdmin: builder.query<GetPaymentHistoryResponse, void>({
      query: () => "/payment/adminHistory",
      providesTags: ["payment"],
    }),
  }),
  overrideExisting: true,
});

/* ================= HOOKS ================= */

export const {
  useGetPaymentHistoryByAdminQuery,
} = paymentApi;
