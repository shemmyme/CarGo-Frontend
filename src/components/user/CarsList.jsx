import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../utils/Config";
import Spinner from "./Spinner";

function CarsList() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [search, setSearch] = useState("");
    const [start_date, setStartDate] = useState(searchParams.get("start_date") || ""); 
    const [end_date, setEndDate] = useState(searchParams.get("end_date") || ""); 
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 3;
    const [cars, setCars] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            BACKEND_BASE_URL + '/admin/listcar/',
            {
              params: {
                search: search,
                start_date, // Include start_date in the API request
                end_date,   // Include end_date in the API request
              },
            }
          );
          if (response.status === 200) {
            const data = response.data;
            setCars(data);
          } else {
            console.error('Failed to fetch car data.');
          }
        } catch (error) {
          console.log('Error fetching car data:', error);
        }
      };
  
      fetchData();
    }, [search, start_date, end_date]);
    
      const handleSearch = (e) => {
        setSearch(e.target.value);
      };
    
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    
      const currentDate = new Date().toISOString().split('T')[0];
  
      // Calculate the range of cars to display on the current page
      const startIndex = (currentPage - 1) * carsPerPage;
      const endIndex = startIndex + carsPerPage;
      const carsToDisplay = cars.slice(startIndex, endIndex);

      if (!carsToDisplay) {
        return <div className="h-screen flex items-center justify-center">
        <Spinner color="text-primary" />
        <Spinner color="text-secondary" />
        <Spinner color="text-success" />
        <Spinner color="text-danger" />
        <Spinner color="text-warning" />
        <Spinner color="text-info" />
        <Spinner color="text-neutral-100" />
      </div>
      }

  return (
    <>
      <section className="w-full">
  <div className="flex">
    {/* Left Half: Search Box */}
    <div className="w-2/3 p-3">
      <div className="relative text-gray-600">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6 text-gray-300"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </span>
        <input
          type="search"
          className="block w-full py-2 pl-10 bg-gray-100 rounded-xl outline-none"
          name="search"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
      </div>
    </div>

    {/* Right Half: Date Inputs */}
    <div className="w-half p-3 grid grid-cols-2 gap-3">
      <div className="relative text-gray-600">
        <input
          type="date"
          className="block py-2 pl-10 bg-gray-100 rounded-xl outline-none"
          name="start_date"
          placeholder="Start Date"
          value={start_date}
          min={currentDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="relative text-gray-600">
        <input
          type="date"
          className="block py-2 pl-10 bg-gray-100 rounded-xl outline-none"
          name="end_date"
          placeholder="End Date"
          value={end_date}
          min={start_date}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </div>
  </div>
        
        {carsToDisplay.length === 0 ? (
          <div className="h-screen flex items-center justify-center">
          <Spinner color="text-primary" />
          <Spinner color="text-secondary" />
          <Spinner color="text-success" />
          <Spinner color="text-danger" />
          <Spinner color="text-warning" />
          <Spinner color="text-info" />
          <Spinner color="text-neutral-100" />
        </div>
        ) : (
          carsToDisplay.map((car) => (
            <div key={car.id} className="m-6 lg:px-32 mt-10">
              <button
                onClick={() => navigate(`/cars/${car.id}`)}
                className="lg:flex   items-center bg-white border border-gray-200 rounded-lg shadow w-full h-64 hover:bg-gray-100"
              >
                <img
                  className=" h-64 w-52 lg:w-1/3 rounded-lg"
                  src={car.image_1}
                  alt=""
                />
                <div className="flex w-full lg:w-2/3 flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {car.product_name}
                  </h5>

                  {/* <div>
                    <button className="py-3 w-20 px-3 text-sm font-semibold font-sans focus:outline-none leading-none text-green-700 bg-green-100 rounded">
                      Available
                    </button>
                  </div> */}

                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-3">
                    {car.description}
                  </p>
                  <p className="font-bold">Rs.{car.rent_amount}</p>
                  <button
                    onClick={() => navigate(`/cars/${car.id}`)}
                    className="btn rounded-md bg-indigo-500 w-32 btn-sm mt-2 text-white h-8 hover:bg-indigo-700"
                    type="button"
                  >
                    Book now
                  </button>
                </div>
              </button>
            </div>
          ))
        )}
        {/* Pagination */}
        <div className="flex justify-center m-2">
          {Array.from({ length: Math.ceil(cars.length / carsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`mx-2 px-3 py-1 rounded-md ${
                currentPage === i + 1 ? "bg-indigo-500 text-white" : "bg-gray-300 text-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

export default CarsList;
