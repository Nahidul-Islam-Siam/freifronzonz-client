/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";

/* ================= GENERIC API RESPONSE ================= */

export interface ApiResponse<T> {
  success: boolean;
  status: boolean;
  message: string;
  data: T;
}

/* ================= ENUMS ================= */

export type PaymentMethod = "CARD" | "CASH" | "ONLINE";
export type PaymentStatus = "PENDING" | "CONFIRMED" | "FAILED";
export type OrderStatus = "PENDING" | "COMPLETED" | "CANCELLED";

/* ================= ORDER RELATED TYPES ================= */

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
  status: PaymentStatus;
  method: PaymentMethod;
  createdAt: string;
}

/* ================= ORDER ================= */

export interface Order {
  id:  string;
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

/* ================= LIST ORDERS RESPONSE ================= */

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

/* ================= CREATE ORDER ================= */

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

/* ✅ UPDATED: Create Order Response based on actual API */
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
    // 🔹 ADMIN: Get all orders
    getAllOrderByAdmin: builder.query<GetAllOrdersResponse, void>({
      query: () => "/order/allOrderAdmin",
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
  useCreateOrderMutation,
} = orderApi;