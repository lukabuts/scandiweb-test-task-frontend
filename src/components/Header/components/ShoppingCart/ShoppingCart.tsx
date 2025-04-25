import { useCartStore } from "@/stores";
import { ShoppingCartIcon } from "lucide-react";
import { memo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CartProductCard, PlaceOrderButton } from "./components";

const ShoppingCart = () => {
  const { isCartOpen, toggleCart, closeCart } = useCartStore();
  const { products } = useCartStore();
  const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isCartOpen &&
        cartRef.current &&
        !cartRef.current.contains(event.target as Node)
      ) {
        closeCart();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen, closeCart]);

  return (
    <>
      <div className="relative" ref={cartRef}>
        <button
          data-testid="cart-btn"
          className="flex items-center justify-center p-2 relative"
          onClick={toggleCart}
        >
          <ShoppingCartIcon className="text-black-primary" />
          {totalQuantity > 0 && (
            <div className="absolute -top-2 -right-2 bg-black-primary w-6 h-6 rounded-full flex items-center justify-center">
              <span
                className="text-white text-xs font-semibold"
                data-testid="cart-item-amount"
              >
                {totalQuantity}
              </span>
            </div>
          )}
        </button>

        {isCartOpen && (
          <div
            data-testid="cart-overlay"
            className="absolute top-12 sm:top-13 right-0 w-80 py-8 px-4 bg-white space-y-8 text-black-primary"
          >
            <h3>
              <span className="capitalize font-bold">my bag,</span>{" "}
              <span className="font-medium">
                {totalQuantity} item{totalQuantity > 1 ? "s" : ""}
              </span>
            </h3>
            {/* Cart Items */}
            <div className="space-y-10 max-h-cart-content-height overflow-y-auto">
              {totalQuantity === 0 ? (
                <p className="capitalize text-gray-400 text-center italic">
                  items you add will appear here
                </p>
              ) : (
                products.map((product) => (
                  <CartProductCard product={product} key={product.id} />
                ))
              )}
            </div>
            <div className="font-bold flex justify-between items-center">
              <p className="capitalize">total</p>
              <p className="font-bold" data-testid="cart-total">
                ${" "}
                {Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(
                  products.reduce((acc, product) => {
                    return acc + product.price * product.quantity;
                  }, 0)
                )}
              </p>
            </div>
            <PlaceOrderButton cartItems={products} />
          </div>
        )}
      </div>

      {isCartOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="bg-cart-overlay-background fixed top-0 left-0 w-full h-full z-40"></div>,
          document.body
        )}
    </>
  );
};

export default memo(ShoppingCart);
