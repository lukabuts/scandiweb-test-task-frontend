import { useParams } from "react-router-dom";
import { useCategoryStore, useProductStore } from "@/stores";
import { useEffect } from "react";
import { ProductCard, ProductCardLoader } from "./components";
import { ErrorCard, InfoCard } from "@/components/ui";

const ProductListPage = () => {
  const { category } = useParams();
  const { categories } = useCategoryStore();
  const { products, fetchProducts, loading, error } = useProductStore();

  useEffect(() => {
    fetchProducts(category || "all");
  }, [category, fetchProducts]);

  const categoryExists = categories.some((cat) => cat.name === category);

  if (!categoryExists && category) {
    return (
      <ErrorCard className="wrapper-container">
        Category <span className="font-semibold">{category}</span> not found.
      </ErrorCard>
    );
  }

  if (error) {
    return (
      <ErrorCard className="wrapper-container">
        Something went wrong: <span className="font-semibold">{error}</span>
      </ErrorCard>
    );
  }

  return (
    <div className="wrapper-container mb-10">
      <h1 className="text-2xl font-raleway font-medium mb-6 capitalize">
        {category || "all"}
      </h1>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${
          loading ? "opacity-50" : ""
        }`}
      >
        {loading && products.length === 0 ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ProductCardLoader key={index} />
          ))
        ) : !loading && products.length === 0 ? (
          <InfoCard className="col-span-full">No products available.</InfoCard>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
