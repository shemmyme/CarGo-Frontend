import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileToast() {
  const navigate = useNavigate();

  return (
    <div
      id="toast-interactive"
      className="w-full max-w-md p-6 text-gray-800 bg-white rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-400"
      role="alert"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              You Must Login to Continue
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              If you wish to continue press Login , or go back to Home
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={() => navigate('/login')}
          className="block w-full px-4 py-2 text-base font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/')}
          className="mt-2 block w-full px-4 py-2 text-base font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
        >
          Go Back To Home
        </button>
      </div>
    </div>
  );
}

export default ProfileToast;
