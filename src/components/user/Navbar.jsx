import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Typography } from "@mui/material";
import { getLocal } from "../../helpers/Auth";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const localResponse = getLocal("authToken");

  const handlelogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      {/* <nav className={`relative bg-white shadow dark:bg-gray-800 ${window.location.pathname === '/' ? 'sticky top-0 z-50' : ''}`}></nav> */}
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <Typography
          as="a"
          variant="h5"
          className="mr-4 cursor-pointer py-1.5 text-2xl font-bold text-white-800"
        >
          CarGo
        </Typography>
        <div
          className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${
            isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
          }`}
        >
          <div className="flex flex-col md:flex-row md:mx-6">
            <a
              onClick={() => navigate("/")}
              className="hover:cursor-pointer my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
            >
              Home
            </a>

            <a
              className="hover:cursor-pointer my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
              onClick={() => navigate("/cars")}
            >
              Cars
            </a>

            {/* <a
              className="hover:cursor-pointer my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
              onClick={() => navigate("/offers")}
            >
              Offers
            </a> */}
          </div>
          <div className="flex items-center space-x-1">
            <a
              onClick={() => navigate("/profile")}
              className="hover:cursor-pointer my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
            >
              Account
            </a>

            {/* <a className="hover:cursor-pointer relative text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300">
              <div className="w-8 rounded-full">
                <img
                  src="photo-1534528741775-53994a69daeb.jpg"
                  alt="User Icon"
                  onClick={() => navigate("/profile")}
                />
              </div>
            </a> */}
          </div>
          <div>
            {localResponse ? (
              <button className="md:pl-8" onClick={handlelogout}>
                <LogoutIcon />
              </button>
            ) : (
              <button className="md:pl-8" onClick={() => navigate("/login")}>
                <LoginIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
