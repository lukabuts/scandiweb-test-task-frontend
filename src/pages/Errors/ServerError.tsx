import { SEO } from "@/components";

const ServerError = () => {
  return (
    <>
      <SEO
        title="Server Error"
        description="An unexpected error occurred on the server."
        keywords="500, server error, internal server error"
      />
      <div className="px-2 text-center">
        <div className="h-screen flex flex-col justify-center items-center">
          <h1 className="text-8xl font-extrabold text-red-500">500</h1>
          <p className="text-4xl font-medium text-gray-800">
            Internal Server Error
          </p>
          <p className="text-xl text-gray-800 mt-4">
            We apologize for the inconvenience. Please try again later.
          </p>
        </div>
      </div>
    </>
  );
};

export default ServerError;
