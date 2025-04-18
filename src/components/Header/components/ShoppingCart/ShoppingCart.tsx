import { useCartStore } from "@/stores";
import { toKebabCase } from "@/utils";
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react";
import { createPortal } from "react-dom";

const ShoppingCart = () => {
  const { isCartOpen, toggleCart, closeCart } = useCartStore();

  return (
    <>
      <div className="relative">
        <button
          data-testid="cart-btn"
          className="flex items-center justify-center p-2 relative"
          onClick={toggleCart}
        >
          <ShoppingCartIcon className="text-black-primary" />
          <div className="absolute -top-2 -right-2 bg-black-primary w-6 h-6 rounded-full flex items-center justify-center">
            <span
              className="text-white text-xs font-semibold"
              data-testid="cart-item-amount"
            >
              0
            </span>
          </div>
        </button>

        {isCartOpen && (
          <div className="absolute lg:top-13 sm:top-10 top-14 right-0 w-80 py-8 px-4 bg-white space-y-8 text-black-primary">
            <h3>
              <span className="capitalize font-bold">my bag,</span>{" "}
              <span className="font-medium">3 items</span>
            </h3>
            {/* Cart Items */}
            <div className="space-y-8 max-h-cart-content-height overflow-y-auto">
              <div className="flex gap-2">
                <div className="flex-5 space-y-1">
                  <h4 className="capitalize text-lg font-light">
                    Running Bags
                  </h4>
                  <p className="font-medium">$ 50.00</p>
                  <div className="space-y-2">
                    <p className="text-sm capitalize">Size</p>
                    <div className="flex gap-2">
                      <span className="product-text-attribute size-6 flex items-center justify-center text-xs uppercase bg-black-primary text-white">
                        sm
                      </span>
                      <span className="product-text-attribute size-6 flex items-center justify-center border text-xs uppercase border-black-primary">
                        md
                      </span>
                      <span className="product-text-attribute size-6 flex items-center justify-center border text-xs uppercase border-black-primary  ">
                        l
                      </span>
                      <span className="product-text-attribute size-6 flex items-center justify-center border text-xs uppercase border-black-primary  ">
                        xl
                      </span>
                    </div>
                    <p className="text-sm capitalize">color</p>
                    <div className="flex gap-2">
                      <span className="bg-red-500 size-6"></span>
                      <span className="bg-green-500 size-6"></span>
                      <span className="bg-yellow-500 size-6"></span>
                    </div>
                  </div>
                </div>
                <div className="w-6 flex  flex-col justify-between items-center">
                  <button>
                    <PlusIcon className="border border-black-primary p-1 primary-black-btn-hover" />
                  </button>
                  <div className="text-center">
                    <p>1</p>
                  </div>
                  <button>
                    <MinusIcon className="border border-black-primary p-1 primary-black-btn-hover" />
                  </button>
                </div>
                <div className="flex-3">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087"
                    alt="image"
                    className="w-full h-40 object-contain"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-5 space-y-1">
                  <h4 className="capitalize text-lg font-light">
                    Running Bags
                  </h4>
                  <p className="font-medium">$ 50.00</p>
                  <div className="space-y-2">
                    <p className="text-sm capitalize">Size</p>
                    <div className="flex gap-2">
                      <span className="product-text-attribute size-6 flex items-center justify-center text-xs uppercase bg-black-primary text-white">
                        sm
                      </span>
                      <span className="product-text-attribute size-6 flex items-center justify-center border text-xs uppercase border-black-primary">
                        md
                      </span>
                      <span className="product-text-attribute size-6 flex items-center justify-center border text-xs uppercase border-black-primary  ">
                        l
                      </span>
                      <span className="product-text-attribute size-6 flex items-center justify-center border text-xs uppercase border-black-primary  ">
                        xl
                      </span>
                    </div>
                    <p className="text-sm capitalize">color</p>
                    <div className="flex gap-2">
                      <span className="bg-red-500 size-6"></span>
                      <span className="bg-green-500 size-6"></span>
                      <span className="bg-yellow-500 size-6"></span>
                    </div>
                  </div>
                </div>
                <div className="w-6 flex  flex-col justify-between items-center">
                  <button>
                    <PlusIcon className="border border-black-primary p-1 primary-black-btn-hover" />
                  </button>
                  <div className="text-center">
                    <p>1</p>
                  </div>
                  <button>
                    <MinusIcon className="border border-black-primary p-1 primary-black-btn-hover" />
                  </button>
                </div>
                <div className="flex-3">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087"
                    alt="image"
                    className="w-full h-40 object-contain"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-5 space-y-1">
                  <h4 className="capitalize text-lg font-light">
                    Running Bags
                  </h4>
                  <p className="font-medium">$ 50.00</p>
                  <div className="space-y-2">
                    <p className="text-sm capitalize">Size</p>
                    <div
                      className="flex gap-2"
                      data-testid={`cart-item-attribute-${toKebabCase("size")}`}
                    >
                      <span
                        data-testid={`cart-item-attribute-${toKebabCase(
                          "size"
                        )}-${toKebabCase("sm")}`}
                        className="product-text-attribute size-6 flex items-center justify-center text-xs uppercase bg-black-primary text-white"
                      >
                        sm
                      </span>
                      <span
                        data-testid={`cart-item-attribute-${toKebabCase(
                          "size"
                        )}-${toKebabCase("sm")}-selected`}
                        className="product-text-attribute size-6 flex items-center justify-center border text-xs uppercase border-black-primary"
                      >
                        md
                      </span>
                      <span className="product-text-attribute size-6 flex items-center justify-center border text-xs uppercase border-black-primary  ">
                        l
                      </span>
                      <span className="product-text-attribute size-6 flex items-center justify-center border text-xs uppercase border-black-primary  ">
                        xl
                      </span>
                    </div>
                    <p className="text-sm capitalize">color</p>
                    <div className="flex gap-2">
                      <span className="bg-red-500 size-6"></span>
                      <span className="bg-green-500 size-6"></span>
                      <span className="bg-yellow-500 size-6"></span>
                    </div>
                  </div>
                </div>
                <div className="w-6 flex  flex-col justify-between items-center">
                  <button data-testid="cart-item-amount-decrease">
                    <PlusIcon className="border border-black-primary p-1 primary-black-btn-hover" />
                  </button>
                  <div className="text-center">
                    <p>1</p>
                  </div>
                  <button data-testid="cart-item-amount-increase">
                    <MinusIcon className="border border-black-primary p-1 primary-black-btn-hover" />
                  </button>
                </div>
                <div className="flex-3">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087"
                    alt="image"
                    className="w-full h-40 object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="font-bold flex justify-between items-center">
              <p className="capitalize">total</p>
              <p className="font-bold" data-testid="cart-total">
                $250.00
              </p>
            </div>
            <button className="action-button p-3">place order</button>
          </div>
        )}
      </div>

      {isCartOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="bg-cart-overlay-background fixed top-0 left-0 w-full h-full z-40"
            onClick={closeCart}
          ></div>,
          document.body
        )}
    </>
  );
};

export default ShoppingCart;
