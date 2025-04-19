import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCartStore, useProductDetailStore } from "@/stores";
import { Attributes, ProductImageSwiper, Subtitle } from "./components";
import { Loading } from "@/components";
import { Interweave } from "interweave";
import { SelectedProductAttribute } from "./types";
import { addSelectedAttribute, generateCartProductId } from "@/utils";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { product, loading, error, fetchProductDetail } =
    useProductDetailStore();
  const { addProduct, openCart } = useCartStore();
  const [selectedAttributes, setSelectedAttributes] = useState<
    SelectedProductAttribute[]
  >([]);

  useEffect(() => {
    if (id) fetchProductDetail(id);
  }, [id, fetchProductDetail]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!product) return <div>Product not found</div>;

  function handleAddToCart() {
    if (!product.in_stock) return;

    addProduct({
      id: generateCartProductId(product, selectedAttributes),
      productId: product.id,
      name: product.name,
      price: product.prices[0].amount,
      currency: product.prices[0].currency.symbol,
      attributes: addSelectedAttribute(product, selectedAttributes),
      image: product.gallery[0],
    });
    openCart();
  }

  return (
    <div className="wrapper-container body-container flex lg:gap-28 gap-5 max-lg:flex-col ">
      <ProductImageSwiper images={product.gallery ?? []} />

      <div className="flex-3 flex flex-col lg:gap-6 gap-3">
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <Attributes
          attributes={product.attributes}
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />
        <div>
          <Subtitle>Price:</Subtitle>
          <p className="font-bold text-2xl">
            {product.prices[0].currency.symbol}
            {product.prices[0].amount.toFixed(2)}
          </p>
        </div>
        <button
          data-testid="add-to-cart"
          className="action-button p-4"
          disabled={
            !product.in_stock ||
            selectedAttributes.length !== product.attributes.length
          }
          onClick={handleAddToCart}
        >
          {product.in_stock ? "Add to Cart" : "Out of Stock"}
        </button>
        <div data-testid="product-description">
          <Interweave
            content={product.description}
            className="text-black-primary prose"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
