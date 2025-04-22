import { useParams } from "react-router-dom";
import { useCategoryStore, useProductStore } from "@/stores";
import { useEffect } from "react";
import { ProductCard, ProductCardLoader } from "./components";
import { ErrorCard, InfoCard } from "@/components/ui";
import { SEO } from "@/components";
import { NotFound } from "../Errors";

const ProductListPage = () => {
  const { category } = useParams();
  const { categories } = useCategoryStore();
  const { products, fetchProducts, loading, error } = useProductStore();

  useEffect(() => {
    fetchProducts(category || "all");
  }, [category, fetchProducts]);

  const categoryExists = categories.some((cat) => cat.name === category);

  if (!categoryExists && category) {
    return <NotFound message="Category not found" />;
  }

  if (error) {
    return (
      <ErrorCard className="wrapper-container">
        Something went wrong: <span className="font-semibold">{error}</span>
      </ErrorCard>
    );
  }

  return (
    <>
      <SEO
        title={category ? `${category} products` : "All products"}
        description="Explore our wide range of products."
      />
      <div className="wrapper-container body-container">
        <h1 className="text-2xl font-raleway font-medium mb-6 capitalize">
          {category || "all"}
        </h1>
        <div className={`products-container ${loading ? "opacity-50" : ""}`}>
          {loading && products.length === 0 ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ProductCardLoader key={index} />
            ))
          ) : !loading && products.length === 0 ? (
            <InfoCard className="col-span-full">
              No products available.
            </InfoCard>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProductListPage;
