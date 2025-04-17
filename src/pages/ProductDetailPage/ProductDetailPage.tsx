import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductDetailStore } from "@/stores/useProductDetailStore";
import { Attributes, ProductImageSwiper, Subtitle } from "./components";
import { Loading } from "@/components";
import { Interweave } from "interweave";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { product, loading, error, fetchProductDetail } =
    useProductDetailStore();

  useEffect(() => {
    if (id) fetchProductDetail(id);
  }, [id, fetchProductDetail]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!product) return <div>Product not found</div>;
  return (
    <div className="wrapper-container body-container flex lg:gap-28 gap-5 max-lg:flex-col ">
      <ProductImageSwiper images={product.gallery ?? []} />

      <div className="flex-3 flex flex-col lg:gap-6 gap-3">
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <Attributes attributes={product.attributes} />
        <div>
          <Subtitle>Price:</Subtitle>
          <p className="font-bold text-2xl">
            {product.prices[0].currency.symbol}
            {product.prices[0].amount.toFixed(2)}
          </p>
        </div>
        <button
          data-testid="add-to-cart"
          className="bg-green-primary uppercase text-white font-sans p-4 font-semibold hover:bg-green-500 transition-colors"
        >
          {product.in_stock ? "Add to Cart" : "Out of Stock"}
        </button>
        <Interweave
          data-testid="product-description"
          content={product.description}
          className="text-black-primary prose"
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;
