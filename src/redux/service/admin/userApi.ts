/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";

/* ================= GENERIC API RESPONSE ================= */

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

/* ================= USER TYPES ================= */

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  photo: string | null;
  role: "ADMIN" | "CUSTOMER" | string;
  joinedDate: string;
  lastOrderDate: string | null;
  totalOrders: number;
}

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

    // 🔹 Update user — expects FormData from frontend
    updateUserData: builder.mutation<ApiResponse<User>, FormData>({
      query: (formData) => ({
        url: "/user",
        method: "PUT",
        body: formData,
        // ✅ No headers — browser auto-sets Content-Type with boundary
      }),
      invalidatesTags: ["users"],
    }),
  }),
  overrideExisting: true,
});

/* ================= HOOK EXPORTS ================= */

export const {
  useGetAllUsersListQuery,
  useUpdateUserDataMutation,
} = userApi;