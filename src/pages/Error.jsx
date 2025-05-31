import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <div>
        <h1 className="text-8xl font-extrabold text-[#4200a6]">4 0 4</h1>
        <img src="/404.png" className="w-96 mx-auto" />
        <h1 className="text-5xl font-extrabold text-red-700">Oops!</h1>
        <p className="text-red-800 mt-4 mb-10">
          We couldn't find the page you were looking for.
        </p>
        <Link
          to="/"
          className="mt- px-4 py-2 bg-[#4b257d] hover:bg-[#4200a6] text-white rounded"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
