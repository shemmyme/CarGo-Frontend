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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error
        amet numquam iure provident voluptate esse quasi, veritatis totam
        voluptas nostrum quisquam eum porro a pariatur veniam.
      </p>
    </div>
    <div className="grid gap-6 text-center md:grid-cols-3 lg:gap-12">

{  randomReviews.map((review)=>(
      <div className="mb-12 md:mb-0">
        <div className="mb-6 flex justify-center">
          <img
            src={review.user.profile_img}
            className="w-32 rounded-full shadow-lg dark:shadow-black/30"
            alt="Lisa Cudrow"
          />
        </div>
        <h5 className="mb-4 text-xl font-semibold">{review.user.username}</h5>
    
        <p className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="inline-block h-7 w-7 pr-2"
            viewBox="0 0 24 24"
          >
            <path
              d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z"
            />
          </svg>
{review.comment}
        </p>
        <ul className="mb-0 flex items-center justify-center">
          <li>
           <StarRate rating={review.rating} size="text-3xl"/>
          </li>
        </ul>
      </div>
))}   
    </div>
    </div>
  );
   
};

export default ReviewList;
