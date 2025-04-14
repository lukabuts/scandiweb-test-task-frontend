import logo from "@/assets/images/logo.png";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { categories } = useCategoryStore();
  const location = useLocation();

  return (
    <header className="lg:mb-16 sm:mb-11 mb-4 max-sm:mt-4 wrapper-container sticky bg-white top-0">
      <div className="flex justify-between items-center">
        <nav className="font-raleway font-normal">
          <ul className="flex items-center space-x-4">
            {categories.map((category) => {
              const isActive =
                location.pathname === `/${category.name}` ||
                (location.pathname === "/" && category.name === "all");
              return (
                <li
                  key={category.id}
                  className={`lg:h-16 sm:h-11 flex items-center relative uppercase px-2 ${
                    isActive ? "text-green-primary" : ""
                  }`}
                >
                  <Link
                    to={`/${category.name}`}
                    data-testid={
                      isActive ? "active-category-link" : "category-link"
                    }
                  >
                    {category.name}
                  </Link>
                  <div
                    className={`absolute bottom-0 left-0 w-full h-0.5 ${
                      isActive ? "bg-green-primary" : ""
                    }`}
                  />
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="max-sm:hidden">
          <img src={logo} alt="Logo" className="size-10" />
        </div>
        <button data-testid="cart-btn" className="cursor-pointer">
          <ShoppingCart />
        </button>
      </div>
    </header>
  );
};

export default Header;
