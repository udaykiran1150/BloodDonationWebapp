import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
    <div className="text-center">
      <h1 className="text-[120px] font-bold text-red-600">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
        Oops! Page not found.
      </h2>
      <p className="text-gray-600 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-red-400 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-600 transition"
      >
        Back to Home
      </Link>
    </div>
  </div>
  );
};

export default Unauthorized;
