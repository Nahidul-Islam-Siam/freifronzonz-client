// redux/service/admin/cartApi.ts
import baseApi from "@/redux/api/baseApi";

// Generic wrapper (consistent with your other APIs)
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  success: boolean;
}

// 🔹 Product (nested inside cart item)
export interface CartProduct {
  id: string;
  name: string;
  shortDes: string;
  des: string;
  images: string[];
  sizeId: string;
  categoryId: string;
  brandId: string;
  tag: string;
  price: string; // e.g. "200"
  discount: boolean;
  discountPercent: string; // e.g. "10"
  shippingFee: string; // e.g. "0"
  stock: boolean;
  quantity: string; // product inventory count
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
  };
  brand: {
    id: string;
    name: string;
    img: string | null;
  };
}

// 🔹 Price breakdown for a cart item
export interface CartItemPriceInfo {
  unitPrice: number;
  discountPercent: number;
  discountAmount: number;
  shippingFee: number;
  finalPrice: number;
  itemTotal: number;
}

// 🔹 Single Cart Item (used in both POST and GET)
export interface CartItem {
  id: string; // cart item ID
  productId: string;
  userId: string;
  quantity: string; // e.g. "6" — string from API
  createdAt: string;
  updatedAt: string;
  product: CartProduct;
  priceInfo: CartItemPriceInfo;
}

// 🔹 Cart Summary (totals at bottom of GET /cart)
export interface CartSummary {
  subtotal: number;
  totalDiscount: number;
  totalItems: number; // number of unique products
  totalQuantity: number; // total units (e.g. 6 bottles)
  totalShippingFee: number;
  estimatedTotal: number;
}

// 🔹 Full Cart List Response (from GET /cart)
export interface CartListData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  carts: CartItem[]; // 🔑 field name is "carts", not "items"
  summary: CartSummary;
}

// 🔹 Add to Cart Request
export interface AddToCartPayload {
  productId: string;
  quantity: string; // send as number; backend may accept string too
}

// 🔹 Response Types
export type GetCartListResponse = ApiResponse<CartListData>;
export type AddToCartResponse = ApiResponse<CartItem>; // POST returns single CartItem
export type UpdateCartItemResponse = ApiResponse<CartItem>;
export type RemoveCartItemResponse = ApiResponse<null>;
export type ClearCartResponse = ApiResponse<null>;

// 🔹 Endpoints
export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET full cart list
    getCartList: builder.query<GetCartListResponse, void>({
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

    // ✅ UPDATE cart item
    updateCartItem: builder.mutation<
      UpdateCartItemResponse,
      { id: string; quantity: string; productId: string }
    >({
      query: ({ id, quantity, productId }) => ({
        url: `/cart/${id}`,
        method: "PATCH",
        body: { quantity, productId },
      }),
      invalidatesTags: ["cart"],
    }),

    // ✅ REMOVE cart item
    removeCartItem: builder.mutation<RemoveCartItemResponse, string>({
      query: (cartItemId) => ({
        url: `/cart/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
  overrideExisting: true,
});

// ✅ Export hooks (consistent naming)
export const {
  useGetCartListQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} = cartApi;
