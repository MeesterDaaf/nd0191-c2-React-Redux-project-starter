import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <main className="px-4 py-6 mx-auto max-w-3xl sm:px-6 lg:px-8">
        <div className="p-8 text-center bg-red-50 rounded-lg border-2 border-red-200 shadow-lg">
          <div className="mb-6">
            <svg
              className="mx-auto w-16 h-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-red-700">404</h1>
          <h2 className="mb-2 text-2xl font-semibold text-red-600">Page Not Found</h2>
          <p className="mb-8 text-red-600">Oops! The page you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-md transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Return Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound; 