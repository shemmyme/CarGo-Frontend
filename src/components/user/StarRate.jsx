

import React from 'react';

const StarRate = ({ rating, size }) => {
  const stars = [];

  const starSize = size || "text-xl"; // Set the default size to text-xl (you can adjust as needed)

  for (let i = 1; i <= 5; i++) {
    const starClass =
      i <= rating
        ? `${starSize} text-yellow-500` // Filled star
        : `${starSize} text-gray-300`; // Empty star

    stars.push(
      <span key={i} className={starClass}>
        ★
      </span>
    );
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRate;
