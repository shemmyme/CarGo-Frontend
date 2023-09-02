import React from "react";
import { getLocal } from "../helpers/Auth";
import { useNavigate } from "react-router-dom";


const Profilebar = ()=>{
  const navigate = useNavigate()
  const localResponse=getLocal('authToken')
  
  const handleclick = () => {
    localStorage.removeItem('authToken');
    navigate('/login')
  }
  return (
    <div className="flex md:gap-6 m-3">
      <div className="md:flex hidden flex-col border rounded-xl overflow-hidden w-96 shadow-md h-fit">
        <div className="flex justify-center flex-col items-center bg-gray-200 py-4 px-3">
          <div className="rounded-full border border-pear">
            <div className="w-24 h-24 rounded-full object-cover">
              <div className="w-full h-full">
                <img src="https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg" alt="..." className="w-24 h-24 rounded-full object-cover" width="96" height="96" />
              </div>
            </div>
          </div>
          <p className="mt-3 font-medium">shameem muhammed shareef</p>
          <p className="mt-1 text-sm text-gray-500">9108281180036</p>
        </div>
        <div>
          <a href="/account/profile/">
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
                <path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
              </svg>
              <p>My Profile</p>
            </div>
          </a>
          <a href="/account/booking/">
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
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M13 3a9 9 0 00-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0013 21a9 9 0 000-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path>
              </svg>
              <p>Bookings</p>
            </div>
          </a>
          <a target="_blank" rel="noreferrer" href="/terms-and-conditions/">
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
                <g>
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fillRule="nonzero"
                    d="M16 20V4H4v15a1 1 0 0 0 1 1h11zm3 2H5a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v7h4v9a3 3 0 0 1-3 3zm-1-10v7a1 1 0 0 0 2 0v-7h-2zM6 6h6v6H6V6zm2 2v2h2V8H8zm-2 5h8v2H6v-2zm0 3h8v2H6v-2z"
                  ></path>
                </g>
              </svg>
              <p>Terms & Conditions</p>
            </div>
          </a>
          <a target="_blank" rel="noreferrer" href="/privacy-policy/">
            <div className="px-3 smooth-animate hover:bg-pear/20 flex items-center border-b border-opacity-50 text-gray-700 border-gray-400 py-3 space-x-2 text-sm">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                role="img"
                viewBox="0 0 24 24"
                className="w-5 h-5 opacity-70"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title></title>
                <path
                  d="M2.968 11.583h1.274v-3.82A7.76 7.76 0 0 1 12.005 0a7.76 7.76 0 0 1 7.762 7.763v3.783c-.018.01-.037.028-.056.037l-.01.01-.008.009h-.01l-.01.01-.009.009H19.636l-.018.018h-.02l-.018.01h-.01l-.009.01-.009.009h-.01l-.009.009-.009.01-.01.009-.009.009-.028.019-.019.01-.028.018-.018.01-.02.009-.027.018-.019.01-.018.009-.02.01h-.008l-.057.027h-.019c-.018.01-.037.02-.065.038h-.01l-.009.01-.028.018-.018.01-.029.018-.018.01h-.01l-.028.018-.018.01-.02.009c-.018.01-.046.019-.065.028l-.018.01-.02.009-.037.018-.037.02-.047.018-.047.019-.019.009-.037.019-.019.01c-1.545.739-4.017 1.516-8.708 1.853-3.362.244-5.403 1.723-6.724 3.502zm4.842 0h8.371v-3.82a4.184 4.184 0 0 0-4.186-4.186A4.184 4.184 0 0 0 7.81 7.763zm13.222 1.461V24H5.572c1.704-.946 2.968-.852 5.075-.787 2.865.094 6.03-1.105 7.585-2.696 1.554-1.592-.14-.375-1.901.074-1.76.45-5.17.497-7.454-.103 7.173.094 9.973-2.219 11.555-4.307 1.583-2.079-.683-.365-2.153.356-1.47.72-4.036 1.227-6.864.852 4.27-.01 7.52-2.144 9.607-4.345z"
                ></path>
              </svg>
              <p>Privacy Policy</p>
            </div>
          </a>
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
              <path
                d="M312 372c-7.7 0-14 6.3-14 14 0 9.9-8.1 18-18 18H94c-9.9 0-18-8.1-18-18V126c0-9.9 8.1-18 18-18h186c9.9 0 18 8.1 18 18 0 7.7 6.3 14 14 14s14-6.3 14-14c0-25.4-20.6-46-46-46H94c-25.4 0-46 20.6-46 46v260c0 25.4 20.6 46 46 46h186c25.4 0 46-20.6 46-46 0-7.7-6.3-14-14-14z"
              ></path>
              <path
                d="M372.9 158.1c-2.6-2.6-6.1-4.1-9.9-4.1-3.7 0-7.3 1.4-9.9 4.1-5.5 5.5-5.5 14.3 0 19.8l65.2 64.2H162c-7.7 0-14 6.3-14 14s6.3 14 14 14h256.6L355 334.2c-5.4 5.4-5.4 14.3 0 19.8l.1.1c2.7 2.5 6.2 3.9 9.8 3.9 3.8 0 7.3-1.4 9.9-4.1l82.6-82.4c4.3-4.3 6.5-9.3 6.5-14.7 0-5.3-2.3-10.3-6.5-14.5l-84.5-84.2z"
              ></path>
            </svg>
            {localResponse?  <button onClick={() => handleclick()}>Logout</button>: <button >Login</button>}
         
           
          </div>
        </div>
        {/* ... More content */}
      </div>
    </div>
  );
};

export default Profilebar;