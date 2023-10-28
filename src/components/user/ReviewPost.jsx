import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../utils/Config';
import jwtDecode from 'jwt-decode';
import { useParams } from 'react-router-dom';
import StarRate from './StarRate';
import { toast, Toaster } from "react-hot-toast";

const ReviewForm = () => {
  const {bookingId} = useParams()
  console.log(bookingId,'id');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(BACKEND_BASE_URL + `/rentals/profile/bookings/${bookingId}`)
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
      });
  }, [bookingId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookingId) {
      // Handle the case where no booking is selected
      console.error('Please select a booking to post a review.');
      return;
    }

    const reviewData = {
      user: bookings.user,
      car: bookings.car,
      booking: bookings.id,
      comment,
      rating,
    };
    console.log(bookings,'ithokkke aan data');



    axios
      .post(BACKEND_BASE_URL + '/rentals/reviews/create', reviewData)
      .then((response) => {
        // Handle success
        toast.success('Review succesfully added')
      })
      .catch((error) => {
        // Handle error
        console.error('Error posting review', error);
      });
  };


    return (
      <div>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <h2>Review Booking ID: {bookings.id}</h2>
        {bookings ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Comment:</label>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
            <div>
              <label>Rating:</label>
              <StarRate rating={rating} /> {/* Use the StarRating component here */}
              <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
            </div>
            <button type="submit">Submit Review</button>
          </form>
        ) : (
          <p>Loading booking details...</p>
        )}
      </div>
    );
};

export default ReviewForm;
