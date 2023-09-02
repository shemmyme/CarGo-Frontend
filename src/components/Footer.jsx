import React from "react";

const Footer = ()=> {
    return (
        <footer className="bg-black dark:bg-gray-900 h-72">
    <div className="container p-6 mx-auto">
        <div className="lg:flex">
            <div className="mt-6 lg:mt-0 lg:flex-1">
                <div className="grid grid-cols-4 gap-6">
                    <div className="lg:col-span-4">
                        <h3 className="text-gray-700 uppercase dark:text-white">Cities</h3>
                        <div className="flex mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                            <a href="#" className="ml-8">Calicut</a>
                            <a href="#" className="ml-16">Ernakulam</a>
                            <a href="#" className="ml-16">Malappuram</a>
                            <a href="#" className="ml-16">Kannur</a>
                        </div>
                        <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />
                    </div>

                    {/* Blog section */}
                    <div >
                        <h3 className="text-gray-700 uppercase dark:text-white">Helpful Links</h3>
                        <a href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Cars</a>
                        <a href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Offers</a>
                        <a href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">About Us</a>
                    </div>

                    {/* Contact section */}
                    <div>
                        <h3 className="text-gray-700 uppercase dark:text-white">Contact</h3>
                        <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">+1 526 654 8965</span>
                        <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">shemim313@gmail.com</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>


    )
}

export default Footer;