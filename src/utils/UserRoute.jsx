// Profile Toaster

import React, { useState, useEffect } from 'react';
import ProfileToast from '../pages/User/ProfileToast';

const UserProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!token) {
      // Token doesn't exist, user is not authenticated
      setShowToast(true); // Show a toast message
      
    }
  }, [token]);

  return (
    <>
      {showToast && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50"
        >
          <ProfileToast />
        </div>
      )}
      {token ? children : null}
    </>
  );
};

export default UserProtectedRoute;
