import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DialogCustomAnimation } from "./CancelModal";
import { button } from "@material-tailwind/react";
import { ReviewModal } from "./ReviewModal";
import { toast, Toaster } from "react-hot-toast";
import { BACKEND_BASE_URL } from "../../utils/Config";
import axios from "axios";
import StarRate from './StarRate';


const Booking = () => {
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("authToken");
  const decoded = jwtDecode(token);
  const [user, setUser] = useState("");
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [booking, setBooking] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsAdded, setReviewsAdded] = useState(false);

  const fetchReviews = async (bookingId,userId) => {
    try {
      const response = await axios.get(
        BACKEND_BASE_URL + `/rentals/reviews_user/list/${userId}/${bookingId}/`
      );
      setReviews(response.data);
      console.log(response.data, "hello reviews");
    } catch (error) {
      console.error("Error getting reviews list", error);
    }
  };

  useEffect(() => {
    fetchReviews(decoded.user_id,decoded.user_id);
  }, [decoded.user_id]);

  useEffect(() => {
    fetch(BACKEND_BASE_URL + `/api/profile/${decoded.user_id}/`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  }, [decoded.user_id]);

  useEffect(() => {
    listBookings();
  }, [decoded.user_id]);

  // const handleSearch = (e) => {
  //   setSearch(e.target.value);
  // };

  const listBookings = () => {
    fetch(BACKEND_BASE_URL + `/rentals/profile/bookings`)
      .then((response) => response.json())
      .then((data) => {
        // Filter bookings to include only the ones belonging to the logged-in user
        const filteredBookings = data.filter(
          (booking) => booking.user.id === decoded.user_id
        );

        filteredBookings.sort((a, b) => {
          // Convert creation dates to Date objects for comparison
          const dateA = new Date(a.created_date);
          const dateB = new Date(b.created_date);

          // Sort in descending order
          return dateB - dateA;
        });

        setBookings(data);
        setFilteredBookings(filteredBookings);
        console.log(filteredBookings, "filtered bookings");
      });
  };

  function handlButton(bookingId) {
    // setBookingId(bookingId)
    // nav(`/review/${bookingId}`)
    setBooking(true);
    console.log(bookingId, "selectedbooking");
  }

  const cancelBooking = async (bookingId) => {
    try {
      const response = await fetch(
        BACKEND_BASE_URL + `/rentals/profile/bookings/${bookingId}/cancel`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Booking canceled successfully
        listBookings();
      } else {
        console.error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const [bookingId, setBookingId] = useState("");
  console.log(bookingId);
  // function handleOpen(bookingId,bookingStatus){
  //   if (bookingStatus === 'Rented' || bookingStatus === 'Returned' || bookingStatus === 'Cancelled') {
  //     toast.error('Cannot cancel the booking because of its status.');
  //   } else {
  //     setModalOpen(true)
  //     setBookingId(bookingId)
  //   }
  // }

  function handleOpen(bookingId, bookingStatus) {
    if (bookingStatus === "Rented") {
      toast.error("Cannot cancel once you rent the car");
    } else if (bookingStatus === "Returned") {
      toast.error("You have already returned the car");
    } else if (bookingStatus === "Cancelled") {
      toast.error("Already cancelled, you'll recieve the amount back");
    } else {
      setModalOpen(true);
      setBookingId(bookingId);
    }
  }

  function handleReview(bookingId) {
    setBooking(true);
    setBookingId(bookingId);
  }

  return (
    <>
      <section className="container px-4 mx-auto mt-10">
        <Toaster />
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
                      <th
                        scope="col"
                        className="ptext-sm pr-20 font-normal text-right text-gray-500 dark:text-gray-400"
                      >
                        Review
                      </th>
                      <th
                        scope="col"
                        className="ptext-sm pr-20 font-normal text-right text-gray-500 dark:text-gray-400"
                      >
                        Cancel
                      </th>
                    </tr>
                  </thead>
                  {filteredBookings.length === 0 ? (
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
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="py-3 px-4 text-sm font-medium text-gray-800 dark:text-white">
                            {booking.id}
                            <br />
                          </td>
                          <td className="py-3 px-4 text-sm font-medium text-gray-800 dark:text-white">
                            {booking.car.product_name}
                            <br />
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
                          <td className="text-sm whitespace-nowrap h-20 w-20">
                            <div className="flex items-center justify-center gap-x-6">
                              {booking.booking_status === "Rented" ||
                              booking.booking_status === "Returned" ? (
                                reviews.length > 0 ? (
                                  <div>
                                    <p>{reviews[0].comment}</p>
                                    <StarRate rating={reviews[0].rating} size="text-2xl"
                                    />
                                  </div>
                                ) : (
                                  <button
                                    className="px-2 py-1 text-sm font-medium text-white bg-green-200 rounded-full hover:bg-blue-300 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                                    onClick={() => handleReview(booking.id)}
                                  >
                                    Add
                                  </button>
                                )
                              ) : (
                                <p>You can't make a review about this car</p>
                              )}
                            </div>
                          </td>
                          <td className="text-sm whitespace-nowrap h-20 w-20">
                            <div className="flex items-center justify-center gap-x-6">
                              {booking.booking_status == "Pending" ? (
                                <button
                                  onClick={() =>
                                    handleOpen(
                                      booking.id,
                                      booking.booking_status
                                    )
                                  }
                                  className=" text-gray-500  transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                                >
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
                              ) : (
                                ""
                              )}
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
      <DialogCustomAnimation
        bookingId={bookingId}
        open={modalOpen}
        handler={() => setModalOpen(false)}
        onConfirm={cancelBooking}
        booking={filteredBookings}
        cancelBooking={cancelBooking}
      />

      <ReviewModal
        user={user.id}
        bookingId={bookingId}
        open={booking}
        handler={() => setBooking(false)}
      />
    </>
  );
};

export default Booking;
