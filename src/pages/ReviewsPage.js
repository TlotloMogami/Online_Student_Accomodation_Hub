import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LOCATION from '../assets/icons/location_ic_red.svg';
import { Footer } from "../components/common/Footer";
import STAR1 from '../assets/icons/star_ic.svg';
import LOGO from '../assets/icons/osah_logo-navbar.svg';
import WRITE from '../assets/icons/write_ic.svg';
import REVIEWS from '../assets/icons/reviews_ic_black.svg';
import BED from '../assets/icons/bed_ic.svg';
import FRIDGE from '../assets/icons/fridge_ic.svg';
import KITCHEN from '../assets/icons/kitchen_ic.svg';
import MICROWAVE from '../assets/icons/microwave_ic.svg';
import SHOWER from '../assets/icons/shower_ic.svg';
import { MahikengResidences } from '../data/residences/residences.js';
import REVIEWS2 from '../assets/icons/reviews_ic.svg';
import ARROW from '../assets/icons/right_arrow.svg';
import { NotFound } from './NotFound.js';

export const ReviewsPage = () => {
  const { id } = useParams(); // Get the id from the URL
  const [residence, setResidence] = useState(null); // Initialize residence as null
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const reviewsPerPage = 5; // Number of reviews per page

  useEffect(() => {
    // Fetch residence data based on the id
    const fetchedResidence = MahikengResidences[0]; // Get the residence by id
    setResidence(fetchedResidence);
  }, [id]); // Depend on id to update when it changes

  if (!residence) {
    return (
      <NotFound/>
    );
  }

  // Get the reviews for the current page
  const totalReviews = residence.reviews.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage); // Calculate total pages
  const currentReviews = residence.reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  // Function to change page
  const changePage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <main>
      {/* Navbar */}
      <nav className="search-navbar flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <div className="logo-bg">
            <img src={LOGO} alt="OSAH Logo" className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold">Reviews</h2>
        </div>
        <button className="accent-link-btn bg-purple-600 text-white px-4 py-2 rounded-lg">
          Sign Out
        </button>
      </nav>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto p-8 flex justify-between items-center">
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
        <div className="bg-gray-100 p-1 space-x-10 rounded-lg flex items-center justify-between shadow-md">
          <p className="text-gray-700 font-semibold pl-4 text-xs">Lived here before?</p>
          <button className="bg-black text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center space-x-2">
            <img src={WRITE} alt="." className="w-4 h-4 mr-1 font-semibold" />
            <span>Write A Review</span>
          </button>
        </div>
      </section>

      <div className="border-t-2 border-gray-300 border-dashed w-full pb-4"></div>
      <div className="bg-white p-3 flex justify-between">
        {/* Reviews Section */}
        <div className="w-[58%] p-4 mr-2 border border-gray-300 rounded-lg">
          <div className="flex items-center pl-4 pr-4 mr-2 mb-1">
            <img src={REVIEWS} alt="." className="w-5 h-5" />
            <h1 className="text-2xl font-semibold pl-4">Reviews</h1>
            <div className="flex flex-col items-center ml-auto">
              <div>
                <div className="flex items-center bg-gray-100 rounded-lg px-1 py-1 mt-2">
                <div className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full">
    <img
      src={STAR1}
      alt="Star"
      className="w-5 h-5"
      style={{ transform: 'rotate(45deg)', filter: 'brightness(0) saturate(0%)' }}
    />
  </div>
                  <span className="text-lg font-semibold ml-2">{residence.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">Avg</span>
                </div>
                <div className="text-sm text-gray-500 ml-6">{totalReviews} Reviews</div>
              </div>
            </div>
          </div>

          <div className="p-2">
            {currentReviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-2 rounded-sm mt-4 relative border border-gray-300"
                style={{ borderRadius: '10px', minHeight: 'auto', paddingBottom: '30px' }} // Increase padding to accommodate the date
              >
                {/* Stars */}
                <div className="absolute gap-1 top-2 right-3 flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <img
                      key={i}
                      src={STAR1}
                      alt="Star Icon"
                      className={`w-4 h-4 ${i < review.stars ? '' : 'opacity-10'}`}
                      style={{ transform: 'rotate(45deg)', filter: 'brightness(0) saturate(90%)' }}
                    />
                  ))}
                </div>

                {/* Name and Comment */}
                <div className="flex flex-col">
                  <span className="font-medium font-inter mb-1 text-gray-800">{review.author}</span>
                  <p className="text-xs p-2 font-inter text-gray-700 break-words">
                    {review.content || "No comment available."}
                  </p>
                </div>

                {/* Date */}
                <span className="absolute pb-2 pt-2 font-inter font-bold right-3 text-gray-800 text-xs">
                  {review.date ? formatDate(review.date) : "Date not available"}
                </span>
              </div>
            ))}
          </div>

          {/* Pagination Section */}
          <div className="flex items-center justify-center   ml-15 w-[50%] space-x-2 bg-gray-100 p-1 rounded-full">
                    <button className="bg-black text-white w-8 h-8 flex items-center justify-center rounded">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="bg-black text-white w-8 h-8 flex items-center justify-center rounded">1</button>
                    <button className="text-black w-8 h-8 flex items-center justify-center">2</button>
                    <button className="text-black w-8 h-8 flex items-center justify-center">3</button>
                    <button className="text-black w-8 h-8 flex items-center justify-center">4</button>
                    <button className="text-black w-8 h-8 flex items-center justify-center">5</button>
                    <button className="bg-black text-white w-8 h-8 flex items-center justify-center rounded">
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        {/* Residence Details Section */}
        <div className="w-[42%] bg-gray-50 border border-gray-300 rounded-xl  ">
          <div className="p-3 max-w-lg mx-auto bg-gray-20 space-y-4">
            <h2 className="text-xl font-semibold">Residence Details</h2>
            <div class="border-t border-gray-300 mt-4"></div>
            <p className="text-gray-600 mb-4">
              Located 5km away from campus, {residence.name} offers comfortable living with all essential amenities.
            </p>

            {/* Features List */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center border-2 border-purple-200 rounded-lg px-2 py-1 text-xs text-purple-500">
                <img src={BED} alt="Single Room" className="w-6 h-6 mr-2" />
                <span>Single Room</span>
              </div>
              <div className="flex items-center border-2 border-purple-200 rounded-lg px-3 py-2 text-xs text-purple-500">
                <img src={KITCHEN} alt="Shared Kitchen" className="w-6 h-6 mr-2" />
                <span>Shared Kitchen</span>
              </div>
              <div className="flex items-center border-2 border-purple-200 rounded-lg px-3 py-2 text-xs text-purple-500">
                <img src={SHOWER} alt="Shared Bathrooms" className="w-6 h-6 mr-2" />
                <span>Shared Bathrooms</span>
              </div>
              <div className="flex items-center border-2 border-purple-200 rounded-lg px-3 py-2 text-xs text-purple-500">
                <img src={MICROWAVE} alt="Microwave Provided" className="w-6 h-6 mr-2" />
                <span>Microwave Provided</span>
              </div>
              <div className="flex items-center border-2 border-purple-200 rounded-lg px-3 py-2 text-xs text-purple-500">
                <img src={FRIDGE} alt="Fridge Provided" className="w-6 h-6 mr-2" />
                <span>Fridge Provided</span>
              </div>
            </div>
            <div class= " pt-6">
            <h2 className="text-xl font-bold">Fees</h2>
            </div>
            <div class="border-t border-gray-300 mt-4"></div>
            <div class="flex justify-between items-baseline mb-2">
            <span class="text-lg">Rent:</span>
            <div class="text-right">
                <span class="text-lg font-semibold">R3 500</span>
                <span class="text-sm">per month</span>
            </div>
        </div>
        <div class="flex justify-between items-baseline">
            <span class="text-lg">Total</span>
            <div class="text-right">
                <span class="text-lg font-semibold">R35 000</span>
                <span class="text-sm">per annum</span>
            </div>
        </div>
      
        </div>
        </div>
      </div>
      {/* Ratings and Reviews Section */}
      <div className="w-[40%] mb-10 p-5 pr-4 mt-10 ml-auto mr-3 border border-gray-300 bg-gray-50 rounded-lg">
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
            filter: i < residence.rating ? 'brightness(0)' : 'brightness(0) saturate(20%)', // Full stars for ratings, dimmed for others
          }}
        />
      ))}
    </div>
  </div>

  <div className="border-t border-gray-300 mt-4"></div>

  {/* Overall Rating */}
  <div className="flex items-center mb-4">
  <div className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full">
    <img
      src={STAR1}
      alt="Star"
      className="w-5 h-5"
      style={{ transform: 'rotate(45deg)', filter: 'brightness(0) saturate(90%)' }}
    />
  </div>
  <div className="ml-2">
    <span className="text-4xl font-semibold">{residence.rating.toFixed(2)}</span>
    <span className="text-gray-500"> Overall Average Rating</span>
  </div>
</div>
  <div className="border-t border-gray-300 mb-2 mt-4"></div>
  <div className="flex justify-between items-center">
    <div className="flex items-center">
    <img src={REVIEWS2} alt="." className="w-5 h-5" />
      <i className="fas fa-comment-alt text-purple-500"></i>
      <span className="ml-2 text-gray-700">{residence.reviews.length} Reviews</span>
    </div>
    <a href="#" className="text-blue-500 flex items-center">
      View all Reviews <img src={ARROW} alt="." className="w-5 h-5 text-blue-500 mr-2 ml-2" style={{ filter: 'brightness(0) saturate(100%) invert(29%) sepia(100%) saturate(6297%) hue-rotate(200deg) brightness(101%) contrast(101%)' }}/> <i className="ml-1"></i>
    </a>
  </div>
</div>
      {/* Footer */}
      <Footer />
    </main>
  );
};
