// brandApi.ts
import baseApi from "@/redux/api/baseApi";

// Generic wrapper
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  success: boolean;
}

// ✅ Brand item (similar to Category, but separate type)
export interface Brand {
  id: string;
  name: string; 
  des: string | null;    // Can be null (from your API)
  img: string | null;
}

// ✅ Brand list response
export interface BrandListData {
  total: number;
  brand: Brand[]; // 🔑 field name is "brand", not "category"
}

export type GetBrandListResponse = ApiResponse<BrandListData>;

// CREATE response →  Brand
export type CreateBrandResponse = ApiResponse<Brand>;

// UPDATE response →  { updatedBrand: Brand }
export interface UpdateBrandResponseData {
  updatedBrand: Brand;
}
export type UpdateBrandResponse = ApiResponse<UpdateBrandResponseData>;

// DELETE response
export type DeleteBrandResponse = ApiResponse<null>;

// Endpoints
export const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET brand list
    getBrandList: builder.query<GetBrandListResponse, void>({
      query: () => "/brand",
      providesTags: ["brand"],
    }),

    // CREATE brand
    createBrand: builder.mutation<CreateBrandResponse, FormData>({
      query: (formData) => ({
        url: "/brand",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["brand"],
    }),

    // UPDATE brand
    updateBrand: builder.mutation<UpdateBrandResponse, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/brand/${id}`,
        method: "PATCH", // or PUT, based on your backend
        body: formData,
      }),
      invalidatesTags: ["brand"],
    }),

    // ✅ DELETE brand (fixed URL)
    deleteBrand: builder.mutation<DeleteBrandResponse, string>({
      query: (id) => ({
        url: `/brand/${id}`, // ❌ was /category — now /brand
        method: "DELETE",
      }),
      invalidatesTags: ["brand"],
    }),
  }),
  overrideExisting: true,
});

// ✅ Export correct hooks
export const {
  useGetBrandListQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation, // ✅ renamed
} = brandApi;