import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import login from "../../helpers/Auth";
import jwtDecode from 'jwt-decode';
import { toast, Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';


function AdminLogin() {
  const [passwordVisible, setPasswordVisible] = useState(false);
 
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginResponse = await login(e);

    if (loginResponse) {
      const localResponse = localStorage.getItem('authToken');
      const decoded = jwtDecode(localResponse);

      if (decoded.is_admin) {
        toast.success('Logged in successfully');
        navigate('/admin/home');
      } else {
           toast.error("You can't login because you are not an admin.");
      }
    } 
  };

  
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
        <h1 className="text-3xl font-semibold text-center mb-4 text-blue-500">
          Login
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Please enter your login details
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400"
              type="email"
              name="username"
              placeholder="Email"
      
            />
          </div>
          <div className="relative mb-4">
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400"
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
          
            />
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              {passwordVisible ? (
                <AiOutlineEyeInvisible
                  className="cursor-pointer text-gray-500"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <AiOutlineEye
                  className="cursor-pointer text-gray-500"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="submit"
          >
            LOGIN
          </button>
         
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
