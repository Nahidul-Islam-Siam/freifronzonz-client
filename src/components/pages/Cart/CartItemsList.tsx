/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/CartItemsList.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import Swal from "sweetalert2";
import { 
  useUpdateCartItemMutation, 
  useRemoveCartItemMutation 
} from '@/redux/service/admin/cartApi';

interface CartItemsListProps {
  carts: any[]; // API cart item objects
  refetchCart: () => void;
}

export default function CartItemsList({
  carts,
  refetchCart,
}: CartItemsListProps) {
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();

  // Handle quantity update with API
  const handleUpdateQuantity = async (
    cartItemId: string,
    productId: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) {
      await handleRemoveItem(cartItemId);
      return;
    }

    const quantityAsString = newQuantity.toString();

    try {
      const res = await updateCartItem({
        id: cartItemId,
        productId: productId,
        quantity: quantityAsString,
      }).unwrap();
      
      if (res.status === true) {
        await refetchCart();
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: res.message || "Failed to update quantity.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update quantity. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  // Handle item removal with API
  const handleRemoveItem = async (cartItemId: string) => {
    try {
      const res = await removeCartItem(cartItemId).unwrap();
      if (res.status === true) {
        await refetchCart();
      } else {
        Swal.fire({
          icon: "error",
          title: "Removal Failed",
          text: res.message || "Failed to remove item.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Removal Failed",
        text: "Failed to remove item. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  // This will never render due to redirect, but added for safety
  if (carts.length === 0) {
    return null;
  }


  return (
    <div className="space-y-6">
      {carts.map((cartItem) => {
        const product = cartItem.product;
        const priceInfo = cartItem.priceInfo;
        const quantity = parseInt(cartItem.quantity);

        return (
          <div
            key={cartItem.id}
            className="p-4 sm:p-6 rounded-lg flex flex-col sm:flex-row items-start gap-4 sm:gap-6 border border-gray-200"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
              <Image
                src={product.images?.[0] ? `http://localhost:4200/${product.images[0]}` : "/placeholder.svg"}
                alt={product.name}
                width={128}
                height={128}
                className="object-cover w-full h-full rounded-md"
              />
            </div>

            <div className="flex-1 w-full">
              <h3 className="font-bold font-abhaya text-[#1F1F1F] text-base sm:text-xl">
                {product.name}{" "}
                <span className="text-sm text-gray-500">({product.sizeId})</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#968F8F] mt-1 mb-3 leading-relaxed">
                {product.des || product.shortDes}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <span className="text-[#C83734] font-abhaya font-extrabold text-xl sm:text-2xl">
                  ${priceInfo.finalPrice.toFixed(2)}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateQuantity(cartItem.id, cartItem.productId, quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-[#E9E9E9] rounded hover:bg-gray-200"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-[#1F1F1F]">
                    {quantity.toString().padStart(2, "0")}
                  </span>
                  <button
                    onClick={() => handleUpdateQuantity(cartItem.id, cartItem.productId, quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-[#E9E9E9] rounded hover:bg-gray-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <Link href={`/shop/${product.id}`} className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 border border-[#1F1F1F] rounded whitespace-nowrap hover:bg-gray-50">
                  View Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="14"
                    viewBox="0 0 17 14"
                    fill="#1F1F1F"
                    className="shrink-0"
                  >
                    <path d="M9.625 0L8.64187 0.957688L13.8531 6.1875H0V7.5625H13.8531L8.64187 12.7689L9.625 13.75L16.5 6.875L9.625 0Z" />
                  </svg>
                </Link>
              </div>
            </div>

            <button
              onClick={() => handleRemoveItem(cartItem.id)}
              className="text-[#AF6900] hover:text-orange-700 self-start mt-1 sm:mt-0"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        );
      })}
    </div>
  );
}