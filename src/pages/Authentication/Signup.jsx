import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast, Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { BACKEND_BASE_URL } from "../../utils/Config";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const history = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const data = {
    email,
    username,
    password,
  }

  const signupSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password == confirmPassword) {

        try {
          const response = await axios.post(BACKEND_BASE_URL + '/api/signup/', data);
          console.log(response);
          if (response.status) {
            toast.success('Registration successful! Check your email to activate your account', { duration: 5000 });
           
  
          }
          else {
            toast.error('Something went wrong');
          }
        } catch (error) {
  
          console.error(error);
        }
  
      }
      else {
        Swal.fire('oops', 'password mismatch', 'error')
      }
      

      // if (response.status === 201) {
        
      //   history("/login");
      // } else if (response.status === 400) {
       
      //   toast.error("Enter valid details");
      // } else {

      //   toast.error("An error occurred");
      // }
    } 
    catch (error) {
   
      toast.error("An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
        <h1 className="text-3xl font-semibold text-center mb-4 text-blue-500">
          Sign Up
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Please enter your sign up details
        </p>
        <form onSubmit={signupSubmit}>
          <div className="mb-4">
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400"
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400"
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="relative mb-4">
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400"
              type={passwordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            SIGN UP
          </button>
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already a member?{" "}
              <Link
                className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
