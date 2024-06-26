import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = ()=> {
    const navigate = useNavigate()
    return (
        <footer className="bg-black dark:bg-gray-900 h-72">
    <div className="container p-6 mx-auto">
        <div className="lg:flex">
            <div className="mt-6 lg:mt-0 lg:flex-1">
                <div className="grid grid-cols-4 gap-6">
                    <div className="lg:col-span-4">
                        <h3 className="text-gray-700 uppercase dark:text-white">Cities</h3>
                        <div className="flex mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <a href="#" className="ml-8 hover:underline">Calicut</a>
                            <a href="#" className="ml-16 hover:underline">Ernakulam</a>
                            <a href="#" className="ml-16 hover:underline">Malappuram</a>
                            <a href="#" className="ml-16 hover:underline">Kannur</a>
                        </div>
                        <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />
                    </div>

                    {/* Blog section */}
                    <div >
                        <h3 className="text-gray-700 uppercase dark:text-white">Helpful Links</h3>
                        <a onClick={() => navigate("/cars")} className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Cars</a>
                        <a href="" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Offers</a>
                        <a href="" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">About Us</a>
                    </div>

                    {/* Contact section */}
                    <div>
                        <h3 className="text-gray-700 uppercase dark:text-white">Contact</h3>
                        <a href="" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">+1 526 654 8965</a>
                        <a href="" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">shemim313@gmail.com</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>


    )
}

export default Footer;