// brandApi.ts
import baseApi from "@/redux/api/baseApi";

// Generic wrapper
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  success: boolean;
}

// ✅ Size item (similar to Category, but separate type)
export interface Size {
  id: string;
  name: string; 
}

// ✅ Size list response
export interface SizeListData {
  total: number;
  sizes: Size[]; // 🔑 field name is "size", not "brand"
}

export type GetSizeListResponse = ApiResponse<SizeListData>;

// CREATE response →  Size
export type CreateSizeResponse = ApiResponse<Size>;

// UPDATE response →  { updatedSize: Size }
export interface UpdateSizeResponseData {
  updatedSize: Size;
}
export type UpdateSizeResponse = ApiResponse<UpdateSizeResponseData>;

// DELETE response
export type DeleteSizeResponse = ApiResponse<null>;

// Endpoints
export const bottleSizeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET size list
    getSizeList: builder.query< GetSizeListResponse, void>({
      query: () => "/size",
      providesTags: ["size"],
    }),

    // CREATE size
    createSize: builder.mutation<CreateSizeResponse, { name: string }>({
      query: ({ name }) => ({
        url: "/size",
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["size"],
    }),

    // UPDATE size
    updateSize: builder.mutation<UpdateSizeResponse, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/size/${id}`,
        method: "PATCH", // or PUT, based on your backend
        body: formData,
      }),
      invalidatesTags: ["size"],
    }),

    // ✅ DELETE size (fixed URL)
    deleteSize: builder.mutation<DeleteSizeResponse, string>({
      query: (id) => ({
        url: `/size/${id}`, // ❌ was /category — now /size
        method: "DELETE",
      }),
      invalidatesTags: ["size"],
    }),
  }),
  overrideExisting: true,
});

// ✅ Export correct hooks
export const {
    useGetSizeListQuery,
    useCreateSizeMutation,
    useUpdateSizeMutation,
    useDeleteSizeMutation,
} = bottleSizeApi;