import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/admin/Navbar';

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

  const listBookings = () =>{
    fetch(`http://localhost:8000/rentals/profile/bookings`)
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
        console.log(bookings, 'filtered bookings');
      });
  }
 

// const cancelBooking = async (bookingId) => {
//     try {
//       const response = await fetch(`http://localhost:8000/rentals/profile/bookings/${bookingId}/cancel`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (response.ok) {
//         // Remove the canceled booking from the frontend list
//         const updatedBookings = bookings.filter((booking) => booking.id !== bookingId);
//         // setBookings(updatedBookings);
//         listBookings();
//       } else {
//         console.error('Failed to cancel booking');
//       }
//     } catch (error) {
//       console.error('Error canceling booking:', error);
//     }
//   };  

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
                          {/* <td className="text-sm whitespace-nowrap h-20 w-20">
                            <div className="flex items-center gap-x-6">
                            <button onClick={()=>cancelBooking(booking.id)} className=" text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                            </div>
                          </td> */}
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
