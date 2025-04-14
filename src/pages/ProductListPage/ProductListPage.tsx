import { useParams } from "react-router-dom";
import { useCategoryStore } from "@/stores/useCategoryStore";

const ProductListPage = () => {
  const { category } = useParams();
  const { categories } = useCategoryStore();

  if (!categories.find((cat) => cat.name === category) && category)
    return (
      <div className="wrapper-container">Category {category} not found</div>
    );

  return <div className="wrapper-container">ProductListPage, {category}</div>;
};

export default ProductListPage;
