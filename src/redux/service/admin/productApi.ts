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

// ✅ Statistics object (from your /getAllByAdmin response)
export interface ProductStatistics {
  totalSales: number;
  totalQuantitySold: number;
  totalRevenue: number;
  totalPayments: number;
  totalAvailable: number;
  isOutOfStock: boolean;
}

// ✅ Product interface for ADMIN LIST response (`/product/getAllByAdmin`)
export interface ProductForAdmin {
  id: string;
  name: string;
  shortDes: string;
  des: string;
  images: string[];
  sizeId: string; // 👈 API returns `sizeId`, not `size`
  price: string;
  discount: boolean;
  discountPercent: string;
  stock: boolean;
  quantity: string;
  createdAt: string;
  updatedAt: string;
  category: ProductCategory;
  brand: ProductBrand;
  statistics: ProductStatistics;
}

// ✅ Response data for admin product list
export interface AdminProductListData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  products: ProductForAdmin[];
  dashboardStats: {
    totalProducts: number;
    totalProductsInStock: number;
    totalProductsOutOfStock: number;
    totalProductsWithDiscount: number;
    totalSales: number;
    totalRevenue: number;
  };
}

export type GetAdminProductListResponse = ApiResponse<AdminProductListData>;

// ==========
// Interfaces for regular (non-admin) product operations (e.g., public shop or detail view)
// ==========

// Review interface (if used in detail view)
export interface ProductReview {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

// ✅ Product interface for GET by ID (assumes full details with `size`, `shippingFee`, etc.)
export interface ProductWithRelations {
  id: string;
  name: string;
  shortDes: string;
  des: string;
  images: string[];
  size: string; // 👈 full product may return `size` name
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
  category: ProductCategory;
  brand: ProductBrand;
  reviews: ProductReview[];
}

// Product list response (for public `/product` endpoint, if used)
export interface ProductListData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  products: ProductWithRelations[];
}

export type GetProductListResponse = ApiResponse<ProductListData>;
export type GetProductByIdResponse = ApiResponse<ProductWithRelations>;

// Product interface for CREATE response (flat)
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
}

export type CreateProductResponse = ApiResponse<Product>;

// UPDATE response
export interface UpdateProductResponseData {
  updatedProduct: ProductWithRelations;
}
export type UpdateProductResponse = ApiResponse<UpdateProductResponseData>;

// DELETE response
export type DeleteProductResponse = ApiResponse<null>;

// Query parameters interface (shared)
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
    // Public product list (optional, keep if used)
    getProductList: builder.query<GetProductListResponse, ProductQueryParams>({
      query: (params) => ({
        url: "/product",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["product"],
    }),

    // ✅ ADMIN endpoint — correctly typed
    getProductByAdmin: builder.query<GetAdminProductListResponse, ProductQueryParams>({
      query: (params) => ({
        url: "/product/getAllByAdmin",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["product"],
    }),

    // Product detail (assumes full object with relations)
    getProductById: builder.query<GetProductByIdResponse, string>({
      query: (id) => `/product/${id}`,
      providesTags: ["product"],
    }),

    // Mutations
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

// ✅ Export all hooks
export const {
  useGetProductListQuery,
  useGetProductByAdminQuery,        // 👈 Use this in your dashboard
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;