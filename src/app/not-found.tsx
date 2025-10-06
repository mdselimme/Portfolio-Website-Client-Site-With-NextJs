import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white text-center px-6">
      <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse">
        404
      </h1>
      <p className="mt-4 text-2xl font-semibold">Oops! Page not found</p>
      <p className="mt-2 text-gray-400">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl shadow-lg hover:scale-105 transform transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}
