/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";

/* ================= GENERIC API RESPONSE ================= */

export interface ApiResponse<T> {
  status: boolean;
  message: string;
   data: T;
}

/* ================= DASHBOARD STATS TYPES ================= */

export interface StatBlock<T> {
  entireTotal: T;
  selectedMonthTotal: T;
  change: number;
}

export interface DashboardStats {
  totalEarnings: StatBlock<string>;
  totalOrders: StatBlock<number>;
  totalCustomers: StatBlock<number>;
  totalProducts: StatBlock<number>;
}

/* ================= RECENT ACTIVITY TYPES ================= */

export interface RecentActivityItem {
  type: "PAYMENT" | "ORDER" | string; // You can restrict to known types if needed
  text: string;
  time: string; // ISO 8601 datetime string
}

/* ================= API RESPONSE TYPES ================= */

export type GetDashboardStatsResponse = ApiResponse<DashboardStats>;
export type GetRecentActivityResponse = ApiResponse<RecentActivityItem[]>;

/* ================= API ENDPOINTS ================= */

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Get dashboard statistics (supports month filter in "YYYY-MM")
    getStatsData: builder.query<
      GetDashboardStatsResponse,
      { month?: string } | void
    >({
      query: (params) => ({
        url: "/dashboard/stats",
        params: params ?? undefined,
      }),
      providesTags: ["stats"],
    }),

    // 🔹 Get recent activity list
    getRecentActivity: builder.query<GetRecentActivityResponse, void>({
      query: () => "/dashboard/recent",
      providesTags: ["stats"],
    }),
  }),
  overrideExisting: true,
});

/* ================= HOOK EXPORTS ================= */

export const {
  useGetStatsDataQuery,
  useGetRecentActivityQuery, // ✅ don't forget to export this!
} = dashboardApi;