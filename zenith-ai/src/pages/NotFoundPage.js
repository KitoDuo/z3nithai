import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zenith-white p-4 text-center">
      <h1 className="text-6xl font-display text-zenith-pink">404</h1>
      <p className="text-2xl font-body text-zenith-gray-700 mt-4">Oops! Page Not Found.</p>
      <p className="text-md font-body text-zenith-gray-500 mt-2">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-zenith-blue text-white font-body rounded-lg shadow-md hover:bg-opacity-80 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
