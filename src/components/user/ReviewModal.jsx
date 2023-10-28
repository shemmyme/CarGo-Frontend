import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { BACKEND_BASE_URL } from "../../utils/Config";
import StarRate from "./StarRate";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function ReviewModal({ open, bookingId, handler }) {

  const [review,setReview] = useState('')
  const handleOpen = () => setOpen(!open);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [bookings, setBookings] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    fetch(BACKEND_BASE_URL + `/rentals/profile/bookings/${bookingId}`)
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
      });
  }, [bookingId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      user: bookings.user,
      car: bookings.car,
      booking: bookings.id,
      comment,
      rating,
    };
    console.log(bookings, "ithokkke aan data");

    axios
      .post(BACKEND_BASE_URL + "/rentals/reviews/create", reviewData)
      .then((response) => {
        // Handle success
        toast.success("Review succesfully added");
        setReview(reviewData)

        handler();
      })
      .catch((error) => {
        // Handle error
        console.error("Error posting review", error);
      });
  };

  const handleCancel = () => {
    cancelBooking(bookingId);
    handler();
  };
  return (
    <>
      <Dialog
        open={open}
        // handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <form>
          <div className="flex items-center flex-col">
            <div className="mx-auto p-4 flex flex-col flex-wrap items-center">
              <h2>Review Booking ID: {bookings.id}</h2>

              <div>
                <label className="m-4 ">Comment:</label>
                <textarea
                  className="h-12"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
            <div className="m-4 flex">
              <label>Rating:</label>
              <div>
                <input
                  type="number"
                  max="5"
                  min="0"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                <StarRate rating={rating} />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handler}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>

            <Button variant="gradient" color="green" onClick={handleSubmit}>
              <span>Submit</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
