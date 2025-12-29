// redux/service/admin/productApi.ts
import baseApi from "@/redux/api/baseApi";

// --------------------
// Generic API Wrapper
// --------------------
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  success: boolean;
}

// --------------------
// Category & Brand
// --------------------
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

// --------------------
// Product Statistics (Admin) 
// --------------------
export interface ProductStatistics {
  totalSales: number;
  totalQuantitySold: number;
  totalRevenue: number;
  totalPayments: number;
  totalAvailable: number;
  isOutOfStock: boolean;
}

// --------------------
// Product (Admin List)
// --------------------
export interface ProductForAdmin {
  id: string;
  name: string;
  shortDes: string;
  des: string;
  images: string[];
  sizeId: string;
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

// Admin product list response
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

// --------------------
// Public Product List
// --------------------
export interface ProductReview {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductWithRelations {
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
  category: ProductCategory;
  brand: ProductBrand;
  reviews: ProductReview[];
}

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

// --------------------
// Product Detail (GET /product/:id) with proper typing
// --------------------
export interface ProductDetailCategory {
  id: string;
  name: string;
  des: string | null;
  img: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDetailBrand {
  id: string;
  name: string;
  des: string | null;
  img: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  shortDes: string;
  des: string;
  images: string[];
  sizeId: string;
  categoryId: string;
  brandId: string;
  tag: string | null;
  price: string;
  discount: boolean;
  discountPercent: string;
  shippingFee: string;
  stock: boolean;
  quantity: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  category: ProductDetailCategory;
  brand: ProductDetailBrand;
  reviews: ProductReview[];
  size: string;
}

export type GetProductDetailResponse = ApiResponse<ProductDetail>;

// --------------------
// Create / Update / Delete Responses
// --------------------
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

export interface UpdateProductResponseData {
  updatedProduct: ProductWithRelations;
}

export type UpdateProductResponse = ApiResponse<UpdateProductResponseData>;
export type DeleteProductResponse = ApiResponse<null>;

// --------------------
// Query Parameters
// --------------------
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

// --------------------
// API Endpoints
// --------------------
export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductList: builder.query<GetProductListResponse, ProductQueryParams>({
      query: (params) => ({ url: "/product", method: "GET", params }),
      providesTags: ["product"],
    }),

    getProductByAdmin: builder.query<GetAdminProductListResponse, ProductQueryParams>({
      query: (params) => ({ url: "/product/getAllByAdmin", method: "GET", params }),
      providesTags: ["product"],
    }),

    getProductById: builder.query<GetProductDetailResponse, string>({
      query: (id) => `/product/${id}`,
      providesTags: ["product"],
    }),

    createProduct: builder.mutation<CreateProductResponse, FormData>({
      query: (formData) => ({ url: "/product", method: "POST", body: formData }),
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation<UpdateProductResponse, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({ url: `/product/${id}`, method: "PATCH", body: formData }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation<DeleteProductResponse, string>({
      query: (id) => ({ url: `/product/${id}`, method: "DELETE" }),
      invalidatesTags: ["product"],
    }),
  }),
  overrideExisting: true,
});

// --------------------
// Export Hooks
// --------------------
export const {
  useGetProductListQuery,
  useGetProductByAdminQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
