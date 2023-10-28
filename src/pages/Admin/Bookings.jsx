import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/admin/Navbar';
import { BACKEND_BASE_URL } from '../../utils/Config';

const Booking = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [bookings, setBookings] = useState([]);


  useEffect(() => {
    listBookings();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };


 
  const listBookings = () => {
    fetch(BACKEND_BASE_URL + `/rentals/profile/bookings`)
      .then((response) => response.json())
      .then((data) => {
        // Sort data by created_at in descending order
        data.sort((a, b) => {
          const dateA = new Date(a.created_date);
          const dateB = new Date(b.created_date);
          return dateB - dateA;
        });
  
        setBookings(data);
        console.log(data, 'sorted bookings');
      });
  }

  return (
    <>
      <Navbar />

      <section className="container px-4 mx-auto mt-10">
        <div className="relative mt-4 md:mt- w-1/2">
          {/* Your search input code here */}
        </div>
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            All Bookings
          </h2>
        </div>

        <div className="flex flex-col mt-4">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Booking Id
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Car Booked
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        User Booked
                      </th>
            
                      <th
                        scope="col"
                        className="p-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Car Photo
                      </th>
                      <th
                        scope="col"
                        className="p-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Starting Date
                      </th>
                      <th
                        scope="col"
                        className="p-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Ending Date
                      </th>
                      <th
                        scope="col"
                        className="ptext-sm pr-20 font-normal text-right text-gray-500 dark:text-gray-400"
                      >
                        Status
                      </th>
                      {/* <th
                        scope="col"
                        className="ptext-sm pr-20 font-normal text-right text-gray-500 dark:text-gray-400"
                      >
                        Cancell
                      </th> */}
                    </tr>
                  </thead>
                  {bookings.length === 0 ? (
                    <tbody>
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center text-gray-500 dark:text-white"
                        >
                          No Bookings
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="py-3 px-4 text-sm font-medium text-gray-800 dark:text-white">
                            {booking.id}<br/>
                          </td>
                          <td className="py-3 px-4 text-sm font-medium text-gray-800 dark:text-white">
                            {booking.car.product_name}<br/>
                          </td>
                          <td className="py-3 px-4 text-sm font-medium text-gray-800 dark:text-white">
                            {booking.user.username}<br/>
                          </td>
                          <td className="p-3 text-sm text-gray-800 dark:text-gray-400">
                            <img
                              className="w-40 h-32 rounded-lg"
                              src={booking.car.image_1}
                              alt={booking.car.product_name}
                            />
                          </td>
                          <td className="p-3 text-sm text-gray-800 dark:text-gray-400">
                            {booking.start_date}
                          </td>
                          <td className="p-3 text-sm text-gray-800 dark:text-gray-400">
                            {booking.end_date}
                          </td>
                          <td className="text-sm whitespace-nowrap h-20 w-20">
                            <div className="flex items-center gap-x-6">
                              {booking.booking_status}
                            </div>
                          </td>
                          
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Booking;
