// categoryApi.ts
import baseApi from "@/redux/api/baseApi";

// Generic wrapper
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

// Category item
export interface Category {
  id: string;
  name: string;
  des: string;
  img: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// GET / LIST response
export interface CategoryListData {
  total: number;
  category: Category[];
}
export type GetCategoryListResponse = ApiResponse<CategoryListData>;

// CREATE response → data: Category
export type CreateCategoryResponse = ApiResponse<Category>;

// UPDATE response → data: { updatedCategory: Category }
export interface UpdateCategoryResponseData {
  updatedCategory: Category;
}
export type UpdateCategoryResponse = ApiResponse<UpdateCategoryResponseData>;

// DELETE response
export type DeleteCategoryResponse = ApiResponse<null>;

// Endpoints
export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET list
    getCategoryList: builder.query<GetCategoryListResponse, void>({
      query: () => "/category",
      providesTags: ["category"],
    }),

    // CREATE
    createCategory: builder.mutation<CreateCategoryResponse, FormData>({
      query: (formData) => ({
        url: "/category",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["category"],
    }),

    // ✅ UPDATE — now matches your API
    updateCategory: builder.mutation<UpdateCategoryResponse, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["category"],
    }),

    // DELETE
    deleteCategory: builder.mutation<DeleteCategoryResponse, string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCategoryListQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;