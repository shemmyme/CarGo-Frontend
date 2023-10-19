import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { Typography } from '@mui/material';
import { getLocal } from "../../helpers/Auth";



function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const localResponse=getLocal('authToken')
  
  const handleclick = () => {
    localStorage.removeItem('authToken');
    navigate('/admin')
  }

    return (
        <nav x-data={{ isOpen: false }} className="relative bg-white shadow dark:bg-gray-800">
            <div className="container px-6 py-3 mx-auto md:flex">
                <div className="flex items-center justify-between">
                <Typography as="a"  variant="h5" className="mr-4 cursor-pointer py-1.5 text-2xl font-bold text-white-800">
                    CarGo
                </Typography>
                </div>

    
                <div className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between ${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'}`}>
                    <div className="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0">
                        <a onClick={() => navigate('/admin/home')} className="px-2.5 py-2 text-gray-700 text-sm transition-colors duration-300 transform rounded-lg dark:text-gray-200  hover:text-blue-500 hover:cursor-pointer">HOME</a>
                        <a onClick={() => navigate('/admin/user')} className="px-2.5 py-2 text-gray-700 text-sm transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2 hover:text-blue-500 hover:cursor-pointer">USER</a>
                        <a onClick={() => navigate('/admin/listcar')} className="px-2.5 py-2 text-gray-700 text-sm transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2  hover:text-blue-500 hover:cursor-pointer">VEHICLE</a>
                        <a onClick={() => navigate('/admin/coupon')} className="px-2.5 py-2 text-gray-700 text-sm transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2  hover:text-blue-500 hover:cursor-pointer">COUPON</a>
                        <a onClick={() => navigate('/admin/chat')} className="px-2.5 py-2 text-gray-700 text-sm transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2  hover:text-blue-500 hover:cursor-pointer">CHAT</a>
                        <a onClick={() => navigate('/admin/bookings')} className="px-2.5 py-2 text-gray-700 text-sm transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2  hover:text-blue-500 hover:cursor-pointer">BOOKINGS</a>
                        

                    </div>

                    <div className="relative mt-4 md:mt-0">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        

                        <input
                            type="text"
                            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                            placeholder="Search"
                        />
                    </div>
                </div>
            {localResponse?  <button className='pl-2.5 py-2 text-gray-700 text-base transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2  hover:text-blue-500 hover:cursor-pointer' onClick={() => handleclick()}>Logout</button>: <button ></button>}

            </div>
        </nav>
    );
}

export default Navbar;
