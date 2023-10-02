import React from "react";
import { Link } from "react-router-dom";

const ReviewCard = ({ car, review, rating }) => {
  const starIcons = Array.from({ length: rating }).map((_, index) => (
    <svg
      key={index}
      className="w-4 h-4 fill-current text-yellow-500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M10 0l2.36 6.27 6.27.63-4.89 4.56 1.46 6.18L10 14.9l-6.19 3.64 1.46-6.18L1.37 7.9l6.27-.63L10 0z" />
    </svg>
  ));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">{car}</h2>
      <p className="text-gray-600 mb-4">{review}</p>
      <div className="flex items-center">
        {starIcons}
        <span className="text-gray-600 ml-2">{rating} / 5</span>
      </div>
    </div>
  );
};

const ReviewList = () => {
  const dummyReviews = [
    { car: "Suzuki Frox", review: "Great car, loved the features!", rating: 4 },
    { car: "Vittara Brezza", review: "Comfortable and stylish.", rating: 5 },
    { car: "Toyota Fortuner", review: "Powerful engine and smooth ride.", rating: 4 },
    { car: "Mahindra Thar", review: "Best Offroad and gearing.", rating: 4.5 },
    // Add more dummy reviews
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Customer Reviews</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {dummyReviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
