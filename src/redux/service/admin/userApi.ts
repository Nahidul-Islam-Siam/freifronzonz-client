/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";

/* ================= GENERIC API RESPONSE ================= */

export interface ApiResponse<T> {
  success: boolean;
  status: boolean;
  message: string;
  data: T;
}

/* ================= USER RELATED TYPES ================= */

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  photo: string | null;
  role: "ADMIN" | "CUSTOMER" | string; // Extend as needed
  joinedDate: string; // ISO datetime
  lastOrderDate: string | null; // ISO datetime or null
  totalOrders: number;
}

/* ================= USER LIST RESPONSE ================= */

export interface UserListData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  users: User[];
}

export type GetAllUsersResponse = ApiResponse<UserListData>;

/* ================= API ENDPOINTS ================= */

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Get all users
    getAllUsersList: builder.query<GetAllUsersResponse, void>({
      query: () => "/user/userList",
      providesTags: ["users"],
    }),
  }),
  overrideExisting: true,
});

/* ================= HOOK EXPORTS ================= */

export const {
  useGetAllUsersListQuery,
} = userApi;