import { routes } from "@/routes";
import { Category } from "@/types";
import { Link, useLocation } from "react-router-dom";

const NavLinkCard = ({ category }: { category: Category }) => {
  const location = useLocation();
  const { name, id } = category;
  const isActive =
    location.pathname === `/${name}` ||
    (location.pathname === "/" && name === "all");

  return (
    <li
      key={id}
      className={`lg:h-16 sm:h-11 flex items-center relative uppercase px-2 ${
        isActive ? "text-green-primary" : ""
      }`}
    >
      <Link
        to={routes.category(name)}
        data-testid={isActive ? "active-category-link" : "category-link"}
      >
        {name}
      </Link>
      <div
        className={`absolute bottom-0 left-0 w-full h-0.5 ${
          isActive ? "bg-green-primary" : ""
        }`}
      />
    </li>
  );
};

export default NavLinkCard;
