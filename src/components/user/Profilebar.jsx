import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocal } from "../../helpers/Auth";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { BACKEND_BASE_URL } from "../../utils/Config";

const Profilebar = () => {
  const[user,setUser] = useState([])
  const navigate = useNavigate();
  const token = getLocal('authToken');
  const decoded = jwtDecode(token)

  useEffect(() => {
    fetch(BACKEND_BASE_URL + `/api/profile/${decoded.user_id}/`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        console.log(data,'indoooooooo nokkkkkkk');
      })
      .catch((error) => {
        console.log("error fetch", error);
      });
  }, []);
  

  const handleclick = () => {
    localStorage.removeItem('authToken');
    navigate("/");
  };

  return (
    <div className="flex md:gap-6 m-3">
      <div className="md:flex hidden flex-col border rounded-xl overflow-hidden w-96 shadow-md h-fit">
        <div className="flex justify-center flex-col items-center bg-gray-200 py-4 px-3">
          <div className="rounded-full border border-pear">
            <div className="w-24 h-24 rounded-full object-cover">
              <div className="w-full h-full">
                <img
                  src={BACKEND_BASE_URL + user.profile_img}
                  alt="..."
                  className="w-24 h-24 rounded-full object-cover"
                  width="96"
                  height="96"
                />
              </div>
            </div>
          </div>
          <p className="mt-3 font-medium">{user.username}</p>
          <p className="mt-1 text-sm text-gray-500">9108281180036</p>
        </div>
        <div>
          <Link to="/profile">
            <div className="bg-pear/30 px-3 smooth-animate flex items-center border-b border-opacity-50 text-gray-700 border-gray-400 py-3 space-x-2 text-sm">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                className="w-5 h-5 opacity-70"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ... Your SVG Path Here ... */}
              </svg>
              <p>My Profile</p>
            </div>
          </Link>
          <Link to="/profile/bookings">
            <div className="hover:bg-pear/20 px-3 smooth-animate flex items-center border-b border-opacity-50 text-gray-700 border-gray-400 py-3 space-x-2 text-sm">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="w-5 h-5 opacity-70"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ... Your SVG Path Here ... */}
              </svg>
              <p>Bookings</p>
            </div>
          </Link>
          <Link to="/terms" >
            <div className="px-3 smooth-animate hover:bg-pear/20 flex items-center border-b border-opacity-50 text-gray-700 border-gray-400 py-3 space-x-2 text-sm">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="w-5 h-5 opacity-70"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ... Your SVG Path Here ... */}
              </svg>
              <p>Terms & Conditions</p>
            </div>
          </Link>

          <div
            role="button"
            className="px-3 smooth-animate hover:bg-pear/20 flex items-center text-gray-700 border-gray-400 py-3 space-x-2 text-sm"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="w-5 h-5 opacity-70"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* ... Your SVG Path Here ... */}
            </svg>
            {token ? (
              <button onClick={() => handleclick()}>Logout</button>
            ) : (
              <button>Login</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilebar;
