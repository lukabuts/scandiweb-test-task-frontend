import { useCartStore } from "@/stores";
import { MinusIcon, PlusIcon } from "lucide-react";

const CartProductCard = ({ product }: { product: CartProduct }) => {
  const { increaseQuantity, decreaseQuantity } = useCartStore();
  return (
    <div className="flex gap-2">
      <div className="flex-5 space-y-1 overflow-x-hidden">
        <h4 className="capitalize text-lg font-light">{product.name}</h4>
        <p className="font-medium">
          {product.currency} {product.price}
        </p>
        {product.attributes.length > 0 &&
          product.attributes.map((attribute) => (
            <div className="space-y-2" key={attribute.id}>
              <p className="text-sm capitalize">{attribute.name}</p>
              <div className="flex gap-2 overflow-x-auto">
                {attribute.items.map((item) =>
                  attribute.type.name === "text" ? (
                    <span
                      key={item.id}
                      className={`product-text-attribute p-1 flex items-center justify-center text-xs uppercase ${
                        item.selected
                          ? "bg-black-primary text-white"
                          : "border border-black-primary"
                      }`}
                    >
                      {item.value}
                    </span>
                  ) : (
                    <span
                      style={{
                        backgroundColor: item.value,
                      }}
                      key={item.id}
                      className={`size-4 ${
                        item.selected ? "border border-green-primary" : ""
                      } `}
                    ></span>
                  )
                )}
              </div>
            </div>
          ))}
      </div>
      <div className="w-6 flex  flex-col justify-between items-center">
        <button onClick={() => increaseQuantity(product.id)}>
          <PlusIcon className="border border-black-primary p-1 primary-black-btn-hover" />
        </button>
        <div className="text-center">
          <p>{product.quantity}</p>
        </div>
        <button onClick={() => decreaseQuantity(product.id)}>
          <MinusIcon className="border border-black-primary p-1 primary-black-btn-hover" />
        </button>
      </div>
      <div className="flex-3 shrink-0 flex items-center">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-40 object-contain shrink-0"
        />
      </div>
    </div>
  );
};

export default CartProductCard;
