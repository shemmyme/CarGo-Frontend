import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      {/* <nav className={`relative bg-white shadow dark:bg-gray-800 ${window.location.pathname === '/' ? 'sticky top-0 z-50' : ''}`}></nav> */}
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <a href="#">
            <img
              className="w-auto h-6 sm:h-7"
              src="https://merakiui.com/images/full-logo.svg"
              alt=""
            />
          </a>
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              {!isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${
            isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
          }`}
        >
          <div className="flex flex-col md:flex-row md:mx-6">

              <a onClick={()=> navigate('/')} className="hover:cursor-pointer my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">
                Home
              </a>
           
              <a 
                className="hover:cursor-pointer my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                onClick={()=> navigate('/cars')} 
              >
                Cars
              </a>
       
              <a
                className="hover:cursor-pointer my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                onClick={()=> navigate('/cars')} 
              >
                Offers
              </a>
            
          </div>
          <div className="flex items-center space-x-1">
            
              <a onClick={()=> navigate('/profile')}  className="hover:cursor-pointer my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
                Account
              </a>
            
            <a
              className="hover:cursor-pointer relative text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <div className="w-8 rounded-full">
                <img
                  src="photo-1534528741775-53994a69daeb.jpg"
                  alt="User Icon"
                  onClick={()=> navigate('/profile')} 
                />
              </div>
              <span className="absolute top-0 left-0 p-1 text-xs text-white bg-blue-500 rounded-full"></span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
