// redux/service/admin/cartApi.ts
import baseApi from "@/redux/api/baseApi";

// Generic wrapper (same as other APIs)
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  success: boolean;
}

// 🔹 Cart Item from API (single item in cart response)
export interface CartItemDto {
  id: string; // cart item ID (not product ID)
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    images: string[];
    price: string;
    category: {
      id: string;
      name: string;
    };
    brand: {
      id: string;
      name: string;
    };
    des: string;
    size?: string;
    sizeId?: string;
  };
}

// 🔹 Full Cart Response
export interface CartData {
  items: CartItemDto[];
  totalItems: number;
  totalAmount: number;
}

// 🔹 Add to Cart Request Payload
export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

// 🔹 API Response Types
export type GetCartResponse = ApiResponse<CartData>;
export type AddToCartResponse = ApiResponse<CartData>;
export type UpdateCartItemResponse = ApiResponse<CartData>;
export type RemoveCartItemResponse = ApiResponse<CartData>;
export type ClearCartResponse = ApiResponse<null>;

// 🔹 Endpoints
export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET current user's cart
    getCart: builder.query<GetCartResponse, void>({
      query: () => "/cart",
      providesTags: ["cart"],
    }),

    // ✅ ADD item to cart
    addToCart: builder.mutation<AddToCartResponse, AddToCartPayload>({
      query: (body) => ({
        url: "/cart",
        method: "POST",
        body,
      }),
      invalidatesTags: ["cart"],
    }),

    // ✅ UPDATE item quantity
    updateCartItem: builder.mutation<UpdateCartItemResponse, { id: string; quantity: number }>({
      query: ({ id, quantity }) => ({
        url: `/cart/${id}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["cart"],
    }),

    // ✅ REMOVE item from cart
    removeCartItem: builder.mutation<RemoveCartItemResponse, string>({
      query: (cartItemId) => ({
        url: `/cart/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),

    // ✅ CLEAR entire cart
    clearCart: builder.mutation<ClearCartResponse, void>({
      query: () => ({
        url: "/cart/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
  overrideExisting: true,
});

// ✅ Export hooks (consistent naming)
export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} = cartApi;