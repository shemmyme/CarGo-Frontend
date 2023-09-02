

const Main = () => {
    return (
        <div className="py-6" style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
            <div className="section-container">
                <h2 className="text-black text-center text-2xl mb-6">Know more about our subscriptions</h2>
                <p className="text-sm text-gray-500 max-w-5xl text-center mx-auto">
                    Discover the convenience and benefits of car subscription with CarGo. Our customer-friendly system ensures a seamless experience for your favorite pick. Enjoy zero down payment, free insurance, and complimentary maintenance and service. With the freedom to return or extend your subscription anytime, CarGo guarantees your happiness on the road. Choose CarGo and experience the joy of hassle-free car subscription today.
                </p>
                <div className="mt-6">
                    <div className="relative select-none">
                        <div className="justify-center flex overflow-x-auto overflow-y-hidden hide-scrollbar will-change-transform transition-all duration-300 cursor-grabbing relative gap-x-4 pb-3 pt-1.5 sm:snap-none snap-x">
                            {/* Repeat the following block for each card */}
                            <div className="border-2 border-pear/25 flex flex-col justify-center items-center rounded-2xl animate-fade-in" style={{ minWidth: '192px', minHeight: '144px', color: 'rgb(0, 0, 0)' }}>
                                <div className="border p-2 border-pear shadow-md shadow-pear/60 rounded-lg mb-3 drop-shadow-2xl">
                                    <div className="w-8 h-8">
                                        <div className="w-full h-full">
                                            <img src="https://images.ctfassets.net/cypk3gnrfs78/5ZI7Meh4jw2thup7i8M17Y/98d17aa189bbf64fab28ab13ae3b9c7f/card.svg" alt="..." className="w-8 h-8" width="32" height="32" />
                                        </div>
                                    </div>
                                </div>
                                <span className="text-center text-sm whitespace-pre-wrap">No Extra Pay</span>
                            </div>
                            <div className="border-2 border-pear/25 flex flex-col justify-center items-center rounded-2xl animate-fade-in" style={{ minWidth: '192px', minHeight: '144px', color: 'rgb(0, 0, 0)' }}>
                                <div className="border p-2 border-pear shadow-md shadow-pear/60 rounded-lg mb-3 drop-shadow-2xl">
                                    <div className="w-8 h-8">
                                        <div className="w-full h-full">
                                            <img src="https://images.ctfassets.net/cypk3gnrfs78/5ZI7Meh4jw2thup7i8M17Y/98d17aa189bbf64fab28ab13ae3b9c7f/card.svg" alt="..." className="w-8 h-8" width="32" height="32" />
                                        </div>
                                    </div>
                                </div>
                                <span className="text-center text-sm whitespace-pre-wrap">No Hidden charges</span>
                            </div>
                            <div className="border-2 border-pear/25 flex flex-col justify-center items-center rounded-2xl animate-fade-in" style={{ minWidth: '192px', minHeight: '144px', color: 'rgb(0, 0, 0)' }}>
                                <div className="border p-2 border-pear shadow-md shadow-pear/60 rounded-lg mb-3 drop-shadow-2xl">
                                    <div className="w-8 h-8">
                                        <div className="w-full h-full">
                                            <img src="https://images.ctfassets.net/cypk3gnrfs78/5ZI7Meh4jw2thup7i8M17Y/98d17aa189bbf64fab28ab13ae3b9c7f/card.svg" alt="..." className="w-8 h-8" width="32" height="32" />
                                        </div>
                                    </div>
                                </div>
                                <span className="text-center text-sm whitespace-pre-wrap">Free Insurance </span>
                            </div>
                            <div className="border-2 border-pear/25 flex flex-col justify-center items-center rounded-2xl animate-fade-in" style={{ minWidth: '192px', minHeight: '144px', color: 'rgb(0, 0, 0)' }}>
                                <div className="border p-2 border-pear shadow-md shadow-pear/60 rounded-lg mb-3 drop-shadow-2xl">
                                    <div className="w-8 h-8">
                                        <div className="w-full h-full">
                                            <img src="https://images.ctfassets.net/cypk3gnrfs78/5ZI7Meh4jw2thup7i8M17Y/98d17aa189bbf64fab28ab13ae3b9c7f/card.svg" alt="..." className="w-8 h-8" width="32" height="32" />
                                        </div>
                                    </div>
                                </div>
                                <span className="text-center text-sm whitespace-pre-wrap">Free Servicing</span>
                            </div>
                            <div className="border-2 border-pear/25 flex flex-col justify-center items-center rounded-2xl animate-fade-in" style={{ minWidth: '192px', minHeight: '144px', color: 'rgb(0, 0, 0)' }}>
                                <div className="border p-2 border-pear shadow-md shadow-pear/60 rounded-lg mb-3 drop-shadow-2xl">
                                    <div className="w-8 h-8">
                                        <div className="w-full h-full">
                                            <img src="https://images.ctfassets.net/cypk3gnrfs78/5ZI7Meh4jw2thup7i8M17Y/98d17aa189bbf64fab28ab13ae3b9c7f/card.svg" alt="..." className="w-8 h-8" width="32" height="32" />
                                        </div>
                                    </div>
                                </div>
                                <span className="text-center text-sm whitespace-pre-wrap">No Limits</span>
                            </div>
                            {/* Repeat the block above for other cards */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Main;