import PencilIcon from '../assets/icons/write_ic_black.svg';
import GRAYSTAR from '../assets/icons/star_grey_ic.svg';
import SubmitIcon from '../assets/icons/send_ic_white.svg';
import GOLDSTAR from '../assets/icons/star_ic_yellow.svg';
import { Link, useParams } from 'react-router-dom';
import LOCATION from '../assets/icons/location_ic_red.svg';
import { Footer } from "../components/common/Footer";
import LOGO from '../assets/icons/osah_logo-navbar.svg';
import WRITE from '../assets/icons/write_ic.svg';
import { MahikengResidences } from '../data/residences/residences.js';
import { ResidenceDetails } from "../components/common/ResidenceDetails.js";
import { RatingsAndReviews } from "../components/common/RatingsAndReviews.js";
import React, { useState, useEffect } from 'react';
import { NotFound } from './NotFound.js';
  
export const WriteAReviewPagePage = () => {
  const { id } = useParams(); // Get the id from the URL
  const [residence, setResidence] = useState(null); // Initialize residence as null
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const maxWords = 500;

  useEffect(() => {
    // Fetch residence data based on the id
    const fetchedResidence = MahikengResidences[id]; // Replace with logic to find the residence by id
    setResidence(fetchedResidence);
  }, [id]); // Depend on id to update when it changes

  const totalReviews = residence?.reviews ? residence.reviews.length : 0;

  const handleRating = (index) => {
    setRating(index);
  };

  const handleTextChange = (e) => {
    setReviewText(e.target.value);
  };

  if (!residence) {
    return <NotFound />;
  }

  return (
    <main>
      {/* Navbar */}
      <nav className="search-navbar  text-inter flex justify-between items-center p-4 bg-white">
        <div className="flex items-center gap-4">
          <div className="logo-bg">
            <img src={LOGO} alt="OSAH Logo" className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold">Write A Review</h2>
        </div>
        <button className="accent-link-btn bg-purple-600 text-white px-4 py-2 rounded-lg">
          Sign Out
        </button>
      </nav>

      {/* Main Content */}
      <section className=" text-inter mx-auto p-8 flex justify-between items-center">
        {/* Residence Info */}
        <div className="flex items-center gap-6">
          <img src={residence.image} alt="Building" className="rounded-full w-14 h-14 object-cover" />
          <div>
            <h1 className="text-3xl font-semibold">{residence.name}</h1>
            <p className="text-gray-500 font-bold text-xs flex items-center mt-1">
              <img src={LOCATION} alt="Location Icon" className="w-4 h-4 mr-1" />
              {residence.location}
            </p>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="bg-[#F6F6F6] py-2 px-4 space-x-10 rounded-lg flex items-center justify-between ">
          <p className="text-gray-700 font-semibold pl-4 text-xs">Got Questions?</p>
          <Link to={''} className="bg-black text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center space-x-2">
            <img src={WRITE} alt="." className="w-4 h-4 mr-1 font-semibold" />
            <span>Chat with Landlord</span>
          </Link>
        </div>
      </section>

      <div className="border-t-2 border-gray-300 border-dashed w-full pb-4"></div>
      <div className="flex flex-row gap-6 mb-20">
        <div className=" w-[59%] ml-5 text-inter mt-1 p-6 pb-5 bg-white rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <img src={PencilIcon} alt="Pencil" className="w-5 h-5 mr-2" />
            Write A Review
          </h2>

          <div className="mb-4 pt-5 pb-5 text-center">
            <p className="text-sm font-medium text-[#4E4E4E] mb-7">Rate Your Experience</p>
            <div className="flex justify-center space-x-1">
              {/* Star Rating Icons */}
              {[1, 2, 3, 4, 5].map((index) => (
                <img
                  key={index}
                  src={index <= rating ? GOLDSTAR : GRAYSTAR} // Change icon based on rating
                  alt="Star"
                  onClick={() => handleRating(index)}
                  className="w-10 h-10 cursor-pointer transition-transform transform hover:scale-110" // Slight scale on hover for better interaction
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="review" className="block text-lg font-medium mb-2">
              Write your review here
            </label>
            <div className="relative">
              <textarea
                id="review"
                value={reviewText}
                onChange={handleTextChange}
                maxLength={maxWords}
                className="w-full bg-[#FBFBFB] h-32 p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Your review goes here..."
              ></textarea>
              <p className="absolute right-4 top-2 text-red-500 text-sm">
                {reviewText.length}/{maxWords} words
              </p>
            </div>
          </div>

          <button
            className="flex items-center justify-center w-1/3 mx-auto px-4 py-2 mt-4 text-white bg-black rounded-full hover:bg-gray-500 transition duration-300"
            type="submit"
          >
            <img src={SubmitIcon} alt="Submit" className="w-4 h-4 mr-2" />
            Submit Review
          </button>
        </div>
        <div className= "flex flex-col gap-4">
        {/* Residence Details Section */}
        <ResidenceDetails residence={residence} />
        <RatingsAndReviews rating={residence.rating} totalReviews={totalReviews} reviews={residence.reviews} />
         </div>
        {/* Ratings and Reviews Section */}
      </div>
      <Footer />
    </main>
  );
};
