// categoryApi.ts
import baseApi from "@/redux/api/baseApi";

// Generic response wrapper
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

// Category item
export interface Category {
  id: string;
  name: string;
  des: string; // description
  img: string | null;
}

// Category list response data
export interface CategoryListData {
  total: number;
  category: Category[];
}

// Full response types
export type GetCategoryListResponse = ApiResponse<CategoryListData>;

// API Endpoints
export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET category list
    getCategoryList: builder.query<GetCategoryListResponse, void>({
      query: () => "/category",
      providesTags: ["category"],
    }),

    // ✅ DELETE category by ID
    deleteCategory: builder.mutation<ApiResponse<null>, string>({
      query: (id: string) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"], // ✅ auto-refetch category list after delete
    }),
  }),
  // ✅ overrideExisting goes HERE (not inside endpoints)
  overrideExisting: true,
});

export const { useGetCategoryListQuery, useDeleteCategoryMutation } = categoryApi;