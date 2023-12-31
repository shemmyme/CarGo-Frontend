import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import login from "../../helpers/Auth";
import { getLocal } from "../../helpers/Auth";
import { toast, Toaster } from "react-hot-toast";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const localResponse = getLocal('authToken');
  
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    const loginResponse = await login(e);

    if (loginResponse) {
      toast.success('Logged in successfully');
      navigate('/');
    } else {
      toast.error('Credentials are wrong or user is not registered.');
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-4 text-blue-500">
          Login
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Please enter your login details
        </p>
        <form onSubmit={loginSubmit}>
          <div className="mb-4">
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400"
              type="email"
              name="username"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative mb-4">
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400"
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
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
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Not a member yet?{" "}
              <Link
                className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
                to="/signup"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
    </div>
  );
}

export default LoginPage;
