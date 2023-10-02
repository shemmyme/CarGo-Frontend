import React from "react";
import { useCarsContext } from "../context/CarsContext";
import { useNavigate } from "react-router-dom";

function CarsList() {
  const {cars} = useCarsContext()
  const navigate = useNavigate()
  return(
     <>
          <section className="w-full ">
              {
                  cars.map(car => {
                      return(
                          <div key={car.id} className="m-6 lg:px-32 mt-10">
                              <a href="" className="lg:flex   items-center bg-white border border-gray-200 rounded-lg shadow w-full h-64 hover:bg-gray-100 ">
                                  <img className=" h-64 w-52 lg:w-1/3 rounded-lg" src={car.image_1} alt="" />
                                  <div className="flex w-full lg:w-2/3 flex-col justify-between p-4 leading-normal">
                                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{car.product_name}</h5>
                                      
                                      <div>
                                          <button className="py-3 w-20 px-3 text-sm font-semibold font-sans focus:outline-none leading-none text-green-700 bg-green-100 rounded">Available</button>
                                      </div>

                                      
                                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-3">{car.description}</p>
                                      <p className="font-bold">Rs.{car.rent_amount}</p>
                                      <button
                                        onClick={() => navigate(`/cars/${car.id}`)} // Remove backticks and curly braces
                                        className="btn rounded-md bg-indigo-500 w-32 btn-sm mt-2 text-white h-8 hover:bg-indigo-700"
                                        type="button"
                                    >
                                        Book now
                                    </button>

                                  </div>
                              </a>

                          </div>
                      )
                  })
              }
          </section>
     </> 

  )
}



export default CarsList;
