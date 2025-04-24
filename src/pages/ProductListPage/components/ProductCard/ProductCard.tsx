import { routes } from "@/routes";
import { useCartStore } from "@/stores";
import { Product } from "@/types";
import {
  addDefaultAttribute,
  generateDefaultCartProductId,
  toKebabCase,
} from "@/utils";
import { ShoppingCart } from "lucide-react";
import { memo, useRef } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
  const { id, name, in_stock, prices, gallery, attributes } = product;
  const { addProduct } = useCartStore();
  const price = prices[0];
  const image = gallery[0];
  const productImageRef = useRef<HTMLImageElement>(null);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();

    // Add the product to the cart
    addProduct({
      id: generateDefaultCartProductId(product),
      productId: id,
      name,
      price: price.amount,
      currency: price.currency.symbol,
      attributes: addDefaultAttribute(attributes),
      image,
    });

    // Animate the product image to the cart button
    const productImageDiv = productImageRef.current;
    const cartBtn = document.querySelector('[data-testid="cart-btn"]');
    if (!productImageDiv || !cartBtn) return;

    const imageRect = productImageDiv.getBoundingClientRect();
    const cartRect = cartBtn.getBoundingClientRect();

    const clone = productImageDiv.cloneNode(true) as HTMLDivElement;
    const style = clone.style;

    // Get original dimensions
    const originalWidth = imageRect.width;
    const originalHeight = imageRect.height;

    // Set initial styles
    style.position = "fixed";
    style.top = `${
      imageRect.top + imageRect.height / 2 - originalHeight / 2
    }px`;
    style.left = `${
      imageRect.left + imageRect.width / 2 - originalWidth / 2
    }px`;
    style.width = `${originalWidth}px`;
    style.height = `${originalHeight}px`;
    style.borderRadius = "0";
    style.overflow = "hidden";
    style.zIndex = "1000";
    style.transition = `
        width 0.3s ease-in-out,
        height 0.3s ease-in-out,
        border-radius 0.3s ease-in-out,
        top 0.3s ease-in-out,
        left 0.3s ease-in-out
    `;
    style.pointerEvents = "none";

    document.body.appendChild(clone);

    // First animation: scale down to 60px
    requestAnimationFrame(() => {
      style.top = `${imageRect.top + imageRect.height / 2 - 30}px`;
      style.left = `${imageRect.left + imageRect.width / 2 - 30}px`;
      style.width = "60px";
      style.height = "60px";
      style.borderRadius = "100%";
    });

    // After scale-down completes, start the move animation
    clone.addEventListener("transitionend", (e) => {
      // Only proceed if this was the scale-down transition
      if (e.propertyName === "width" || e.propertyName === "height") {
        // Calculate movement deltas
        const deltaX =
          cartRect.left +
          cartRect.width / 2 -
          (imageRect.left + imageRect.width / 2);
        const deltaY =
          cartRect.top +
          cartRect.height / 2 -
          (imageRect.top + imageRect.height / 2);

        // Change transition properties for the movement
        style.transition = `
            transform 0.7s ease-in-out,
            opacity 0.7s ease-in-out
        `;

        // Start movement animation
        requestAnimationFrame(() => {
          style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.7)`;
          style.opacity = "0.5";
        });

        // Remove after movement completes
        clone.addEventListener("transitionend", (e) => {
          if (e.propertyName === "transform") {
            clone.remove();
          }
        });
      }
    });
  }

  return (
    <Link
      to={routes.productShow(id)}
      className="group flex flex-col gap-6 max-w-product-card w-full p-4 bg-white hover:shadow-md transition-shadow"
      data-testid={`product-${toKebabCase(name)}`}
    >
      <div className="relative flex items-center justify-center h-72">
        <img
          ref={productImageRef}
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
        />
        {in_stock ? (
          <button
            onClick={handleAddToCart}
            className="bg-green-primary p-3 rounded-full absolute -bottom-6 right-4 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
          >
            <ShoppingCart className="text-white size-5" />
          </button>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-black/5 flex items-center justify-center">
            <span className="text-gray-neutral font-regular text-2xl uppercase">
              out of stock
            </span>
          </div>
        )}
      </div>
      <div>
        <h2 className="text-lg font-light">{name}</h2>
        <p className="text-xl font-medium">
          {price.currency.symbol}
          {price.amount.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default memo(ProductCard);
