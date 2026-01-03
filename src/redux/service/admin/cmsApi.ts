/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";

/* ================= GENERIC API RESPONSE ================= */

export interface ApiResponse<T> {
  success: boolean;
  status: boolean;
  message: string;
  data: T;
}

/* ================= HERO RELATED TYPES ================= */

export interface Hero {
  id: string;
  title: string;
  subTitle: string;
  image: string; // Can be empty string or URL
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
}

/* ================= HERO API RESPONSE ================= */

export type GetHeroResponse = ApiResponse<Hero>;

/* ================= API ENDPOINTS ================= */

export const cmsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Get hero data
    getHeroData: builder.query<GetHeroResponse, void>({
      query: () => "/hero",
      providesTags: ["cms"],
    }),
  }),
  overrideExisting: true,
});

/* ================= HOOK EXPORTS ================= */

export const {
  useGetHeroDataQuery,
} = cmsApi;