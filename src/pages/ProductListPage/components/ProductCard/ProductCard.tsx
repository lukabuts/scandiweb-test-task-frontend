import { routes } from "@/routes";
import { useCartStore } from "@/stores";
import { Product } from "@/types";
import {
  addDefaultAttribute,
  generateDefaultCartProductId,
  toKebabCase,
} from "@/utils";
import { ShoppingCart } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
  const { id, name, in_stock, prices, gallery, attributes } = product;
  const { addProduct } = useCartStore();
  const price = prices[0];
  const image = gallery[0];

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();

    addProduct({
      id: generateDefaultCartProductId(product),
      productId: id,
      name,
      price: price.amount,
      currency: price.currency.symbol,
      attributes: addDefaultAttribute(attributes),
      image,
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
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
        />
        {in_stock ? (
          <button
            onClick={handleAddToCart}
            className="bg-green-primary p-3 rounded-full absolute -bottom-6 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
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
