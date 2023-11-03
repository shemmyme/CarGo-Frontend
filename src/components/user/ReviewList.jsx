import axios from "axios";
import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../utils/Config";
import StarRate from "./StarRate";



const ReviewList = () => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          BACKEND_BASE_URL + '/rentals/reviews/list/');
        setReviews(response.data);
      } catch (error) {
        console.error('Error getting reviews list', error);
      }
    };
  
    fetchReviews();
  },[] );

  // Function to shuffle an array
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Shuffle and select the first 3 reviews
  const randomReviews = shuffleArray(reviews).slice(0, 3);

  console.log(reviews)
  return (
    <div>
    <div className="mx-auto text-center md:max-w-xl lg:max-w-3xl">
      <h3 className="mb-6 text-3xl font-bold text-neutral-800 dark:text-neutral-200">
        Testimonials
      </h3>
      <p className="mb-6 pb-2 md:mb-12 md:pb-0">
      testimonial is an honest endorsement of the product 
      that usually comes from a customer peer who has benefited
       from or experienced success as a result of the work we did for them.
      </p>
    </div>
    <div className="grid gap-6 text-center md:grid-cols-3 lg:gap-12">

{  randomReviews.map((review)=>(
      <div className="mb-12 md:mb-0">
        <div className="mb-6 flex justify-center">
          <img
            src={review.user.profile_img}
            className="w-28 rounded-full shadow-lg dark:shadow-black/30"
            alt="Lisa Cudrow"
          />
        </div>
        <h5 className="text-lg font-semibold text-blue-500">{review.user.username}</h5>

  <p className="text-gray-700 text-sm mt-2">
    {review.comment}
  </p>
  <p className="text-gray-500 text-xs mt-2">
    Car: {review.car.product_name}
  </p>

  <div className="mt-4">
    <StarRate rating={review.rating} size="text-2xl" />
  </div>
      </div>
))}   
    </div>
    </div>
  );
   
};

export default ReviewList;
