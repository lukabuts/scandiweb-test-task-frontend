import { routes } from "@/routes";
import { Product } from "@/types";
import { toKebabCase } from "@/utils";
import { ShoppingCart } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
  const { id, name, in_stock, prices, gallery } = product;
  const price = prices[0];
  const image = gallery[0];

  return (
    <Link
      to={routes.productShow(id)}
      className="group"
      data-testid={`product-${toKebabCase(name)}`}
    >
      <div className="p-4 w-full max-w-sm bg-white font-raleway hover:shadow-lg transition-shadow">
        <div className="relative">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-48 object-contain rounded-xl"
          />
          {in_stock ? (
            <button className="bg-green-primary p-3 rounded-full absolute -bottom-7 right-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
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
        <h2 className="text-lg font-light mt-6">{name}</h2>
        <p className="text-xl font-medium">
          {price.currency.symbol}
          {price.amount.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default memo(ProductCard);
