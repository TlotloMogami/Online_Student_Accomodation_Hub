import React from 'react';
import STAR1 from '../../assets/icons/star_ic.svg';
import REVIEWS2 from '../../assets/icons/reviews_ic.svg';
import ARROW from '../../assets/icons/right_arrow.svg';
import { Link } from 'react-router-dom';

export const RatingsAndReviews = ({ rating, totalReviews }) => {
  return (
    <div className="p-5 border border-[#E6E6E6] bg-[#FBFBFB] rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Ratings and Reviews</h2>
        <div className="flex items-center space-x-2">
          {/* Render stars dynamically based on residence rating */}
          {Array.from({ length: 5 }, (_, i) => (
            <img
              key={i}
              src={STAR1}
              alt="Star"
              className="w-5 h-5"
              style={{
                transform: 'rotate(45deg)',
                filter: i < rating ? 'brightness(0)' : 'brightness(0) saturate(20%)',
              }}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-gray-300 mb-4"></div>

      {/* Overall Rating */}
      <div className="flex flex-row gap-2 items-center">
        <div className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full">
          <img
            src={STAR1}
            alt="Star"
            className="w-5 h-5"
            style={{ transform: 'rotate(45deg)', filter: 'brightness(0) saturate(90%)' }}
          />
        </div>
        <div className="">
          <span className="text-3xl font-semibold">{rating.toFixed(2)}</span>
          <span className="text-gray-500 text-sm"> Overall Average Rating</span>
        </div>
      </div>

      <div className="border-t border-gray-300 mb-2 mt-4"></div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={REVIEWS2} alt="." className="w-5 h-5" />
          <span className="ml-2 text-gray-700">{totalReviews} Reviews</span>
        </div>
        <Link to={''} className="text-blue-500 flex items-center">
          View all Reviews
          <img
            src={ARROW}
            alt="."
            className="w-5 h-5 text-blue-500 mr-2 ml-2"
            style={{
              filter:
                'brightness(0) saturate(100%) invert(29%) sepia(100%) saturate(6297%) hue-rotate(200deg) brightness(101%) contrast(101%)',
            }}
          />
        </Link>
      </div>
    </div>
  );
};
