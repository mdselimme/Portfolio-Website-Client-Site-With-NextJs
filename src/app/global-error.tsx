"use client"; // Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white text-center px-6">
          <h2>Something went wrong!</h2>
          <p>{error?.message}</p>
          <button
            className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl shadow-lg hover:scale-105 transform transition duration-300"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
