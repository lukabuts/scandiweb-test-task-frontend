import { SEO } from "@/components";
import { routes } from "@/routes";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist."
        keywords="404, not found, error"
      />
      <div className="flex items-center justify-center h-screen p-16 fixed top-0 left-0 w-full">
        <div className="container flex flex-col items-center">
          <div className="flex flex-col gap-6 text-center">
            <h2 className="font-extrabold text-9xl text-gray-600">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl md:text-3xl">
              Sorry, we couldn't find this page.
            </p>
            <Link
              to={routes.home}
              className="px-8 py-4 text-xl font-semibold rounded bg-green-primary text-gray-50 hover:bg-green-500 transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
