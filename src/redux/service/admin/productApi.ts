// redux/service/admin/productApi.ts
import baseApi from "@/redux/api/baseApi";

// Generic wrapper
export interface ApiResponse<T> {
  status: boolean;
  message: string;
   data: T;
  success: boolean;
}

// Category and Brand interfaces
export interface ProductCategory {
  id: string;
  name: string;
  des: string | null;
  img: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductBrand {
  id: string;
  name: string;
  des: string | null;
  img: string | null;
  createdAt: string;
  updatedAt: string;
}

// Review interface (empty array in your response)
export interface ProductReview {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

// ✅ Product interface for GET by ID response
export interface ProductWithRelations {
  id: string;
  name: string;
  shortDes: string;
  des: string;
  images: string[]; // Array of image paths
  size: string;
  price: string;
  discount: boolean;
  discountPercent: string;
  shippingFee: string;
  stock: boolean;
  quantity: string;
  tag: string | null;
  categoryId: string; // Direct ID (also available in nested category)
  brandId: string;    // Direct ID (also available in nested brand)
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  isLoading?: boolean;
  category: ProductCategory; // ✅ Nested category object
  brand: ProductBrand;       // ✅ Nested brand object
  reviews: ProductReview[];  // ✅ Reviews array (currently empty)
}

// Product interface for CREATE response (flat structure)
export interface Product {
  id: string;
  name: string;
  shortDes: string;
  des: string;
  images: string[];
  size: string;
  price: string;
  discount: boolean;
  discountPercent: string;
  shippingFee: string;
  stock: boolean;
  quantity: string;
  tag: string | null;
  categoryId: string;
  brandId: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  // ❌ No nested category/brand in CREATE response
}

// Product list response
export interface ProductListData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  products: ProductWithRelations[]; // ✅ List also returns nested objects
}

export type GetProductListResponse = ApiResponse<ProductListData>;
export type GetProductByIdResponse = ApiResponse<ProductWithRelations>;
export type CreateProductResponse = ApiResponse<Product>;

// UPDATE response 
export interface UpdateProductResponseData {
  updatedProduct: ProductWithRelations;
}
export type UpdateProductResponse = ApiResponse<UpdateProductResponseData>;

// DELETE response
export type DeleteProductResponse = ApiResponse<null>;

// Query parameters interface
export interface ProductQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  categoryId?: string;
  brandId?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
  hasDiscount?: string;
  search?: string;
}

// Endpoints
export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductList: builder.query<GetProductListResponse, ProductQueryParams>({
      query: (params) => ({
        url: "/product",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["product"],
    }),

    getProductById: builder.query<GetProductByIdResponse, string>({
      query: (id) => `/product/${id}`,
      providesTags: ["product"],
    }),

    createProduct: builder.mutation<CreateProductResponse, FormData>({
      query: (formData) => ({
        url: "/product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation<UpdateProductResponse, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation<DeleteProductResponse, string>({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProductListQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;