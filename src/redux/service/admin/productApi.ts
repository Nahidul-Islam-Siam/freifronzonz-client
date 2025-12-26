// redux/service/admin/productApi.ts
import baseApi from "@/redux/api/baseApi";


// Generic wrapper
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  success: boolean;
}

// Product interfaces
export interface ProductCategory {
  id: string;
  name: string;
}

export interface ProductBrand {
  id: string;
  name: string;
}

// ✅ Product interface - matches your CREATE response
export interface Product {
  id: string;
  name: string;
  shortDes: string;
  des: string;
  images: string[]; // Array of image paths
  size: string;
  price: string;
  discount: boolean;
  discountPercent: string;
  shippingFee: string; // ✅ Added shippingFee
  stock: boolean;
  quantity: string;
  tag: string | null; // ✅ Added tag (can be null)
  categoryId: string; // ✅ Direct categoryId (not nested object)
  brandId: string;    // ✅ Direct brandId (not nested object)
  creatorId: string;  // ✅ Added creatorId
  createdAt: string;
  updatedAt: string;
  // ❌ No nested category/brand objects in CREATE response
}

// ✅ For LIST response, you have nested category/brand objects
export interface ProductWithRelations extends Omit<Product, 'categoryId' | 'brandId'> {
  category: ProductCategory; // ✅ Nested in LIST response
  brand: ProductBrand;       // ✅ Nested in LIST response
}

// Product list response (with nested category/brand)
export interface ProductListData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  products: ProductWithRelations[]; // ✅ Use ProductWithRelations for list
}

export type GetProductListResponse = ApiResponse<ProductListData>;

// ✅ CREATE response - uses flat Product (no nested category/brand)
export type CreateProductResponse = ApiResponse<Product>;

// UPDATE response 
export interface UpdateProductResponseData {
  updatedProduct: ProductWithRelations; // Assuming update returns nested objects like LIST
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
    // GET product list (returns nested category/brand)
    // getProductList: builder.query<GetProductListResponse, string>({
    //   query: (url) => url,
    //   providesTags: ["product"],
    // }),

    getProductList: builder.query<GetProductListResponse, ProductQueryParams>({
      query: (params) => ({
        url: "/product",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["product"],
    }),

    // ✅ CREATE product (returns flat Product)
    createProduct: builder.mutation<CreateProductResponse, FormData>({
      query: (formData) => ({
        url: "/product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    // UPDATE product
    updateProduct: builder.mutation<UpdateProductResponse, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    // DELETE product
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
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;