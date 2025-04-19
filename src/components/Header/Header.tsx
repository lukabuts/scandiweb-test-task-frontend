import logo from "@/assets/images/logo.png";
import { useCategoryStore } from "@/stores";
import { NavLinkCard, ShoppingCart } from "./components";
import { useEffect, useState } from "react";

const Header = () => {
  const { categories } = useCategoryStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`lg:mb-11 mb-4 wrapper-container sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <nav className="font-raleway font-normal">
          <ul className="flex items-center space-x-4">
            {categories.map((category) => (
              <NavLinkCard category={category} key={category.id} />
            ))}
          </ul>
        </nav>
        <div className="max-sm:hidden">
          <img src={logo} alt="Logo" className="size-10" />
        </div>
        <ShoppingCart />
      </div>
    </header>
  );
};

export default Header;
