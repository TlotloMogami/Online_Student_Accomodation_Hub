import React, { useState } from 'react';
import LOGO from '../assets/icons/osah_logo-navbar.svg';
import { Footer } from "../components/common/Footer";
import LOCATION from '../assets/icons/location_ic_red.svg';
import STAR1 from '../assets/icons/star_ic.svg';
import ROOMS from '../assets/icons/rooms_ic.svg';
import APPLY from '../assets/icons/apply_ic.svg';
import ROOM1 from '../assets/room_example_1.jpg';
import ROOM2 from '../assets/room_example_2.jpg';
import ROOM3 from '../assets/room_example_3.jpeg';
import { MahikengResidences } from '../data/residences/residences.js';
import { Link, useParams, useSearchParams } from 'react-router-dom';

export const DetailsPage = () => {
    
    const {id} = useParams();

    const [residence, setResidence] = useState(MahikengResidences[id-1]); // Default to the first residence, change to request other residences

    return (
        <main>
            {/* Navbar */}
            <nav className="search-navbar">
                <div className="row gap_1">
                    <div className="logo-bg">
                        <img src={LOGO} alt="OSAH Logo" />
                    </div>
                    <div className="flex items-center">
                        <h2 className="text-2xl font-bold">Residence</h2>
                    </div>
                </div>
                <button className="accent-link-btn">Sign Out</button>
            </nav>

            {/* Main Content */}
            <div className="bg-white pb-10 pl-4 flex mr-8">
                {/* Property Details */}
                <div className="bg-white p-4 rounded-lg w-2/3 pr-5 mr-6">
                    <img
                        src={residence.image} // Use the selected residence's image
                        alt={residence.name}
                        className="w-full object-cover mb-4"
                        style={{ borderRadius: '32px', height: '210px' }}
                    />
                    <div className="w-full pl-3">
                        <div className='flex justify-between items-center'>
                            <h1 className="text-3xl font-inter font-semibold">{residence.name}</h1>
                            <span className="text-xl font-inter font-bold pt-2 pr-4 flex items-center">
                                <img src={STAR1} alt="Star Icon" className="w-6 h-6 mr-2" /> {residence.rating}
                            </span>
                        </div>
                        <p className="text-gray-500 font-inter font-bold mt-2 text-sm flex items-center">
                            <img src={LOCATION} alt="Location Icon" className="w-4 h-4 mr-1" />
                            {residence.location}
                        </p>
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex space-x-5">
                                {residence.conveniences.map((convenience, index) => (
                                    <button key={index} className="bg-[#FBFBFB] font-inter text-gray-500 px-5 py-0.5 rounded-lg border border-[#979797] w-30">
                                        {convenience}
                                    </button>
                                ))}
                            </div>
                            <div>
                                <span className="text-2xl font-inter font-bold">R{residence.rent}</span>
                                <span className="text-sm"> / month</span>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center">
                            <img src={ROOMS} alt="Rooms Icon" />
                            <span className="text-gray-700 font-inter font-bold">{residence.roomsAvailable} Rooms Available</span>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <Link to={`/application/${id-1}`} className="bg-[#443347] font-inter text-white text-lg px-6 py-1 rounded-lg flex items-center" style={{ borderRadius: '11px' }}>
                                <img src={APPLY} alt="Apply Icon" className="w-4 h-4 mr-1" />
                                Apply Now
                            </Link>
                        </div>
                        <div className="font-inter flex mt-6 pr-10">
                            <p className="text-gray-700 mb-4">
                                {residence.description || "Lorem ipsum dolor sit amet consectetur. Id nisi viverra consectetur iaculis sit nullam neque ut. Donec hendrerit nullam aliquet in diam amet lorem. Etiam fames turpis sit eu pulvinar risus pulvinar urna. Odio nulla purus varius placerat ultrices eget adipiscing tortor. Lorem ipsum dolor sit amet consectetur. Id nisi viverra consectetur iaculis sit nullam neque ut. Donec hendrerit nullam aliquet in diam amet lorem. Etiam fames turpis sit eu pu. Lorem ipsum dolor sit amet consectetur. Id nisi viverra consectetur iaculis sit nullam neque ut. Donec hendrerit nullam aliquet in diam amet lorem. Etiam fames turpis sit eu pulvinar risus pulvinar urna. Odio nulla purus varius placerat ultrices eget adipiscing tortor. Lorem ipsum dolor sit amet consectetur. Id nisi viverra consectetur iaculis sit nullam neque ut. Donec hendrerit nullam aliquet in diam amet lorem. Etiam fames turpis sit eu pulvinar risus pulvinar urna. Odio nulla purus varius placerat ultrices eget adipiscing tortor. Lorem ipsum dolor sit amet consectetur. Id nisi viverra consectetur iaculis sit nullam."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="w-1/3 mt-4">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="col-span-1">
                            <img src={ROOM1} alt="ROOM 1" className="w-full mb-2" style={{ height: '100px' }} />
                            <img src={ROOM2} alt="ROOM 2" className="w-full mt-4" />
                        </div>
                        <img src={ROOM3} alt="ROOM 3" className="w-full col-span-1" style={{ height: '214px' }} />
                    </div>
                    <div className="flex px-2 py-2 items-center text-xs justify-between bg-gray-100 rounded-lg shadow-md">
                        <span className="text-gray-700 text-xs font-bold">Lived here before? Share your experience</span>
                        <Link to={`/write-a-review/${id-1}`} className="px-1 py-3 border border-gray-800 rounded-lg text-gray-700 text-xs font-bold">Write A Review</Link>
                    </div>

                    {/* Reviews List */}
                    <div className="mt-8">
                        <div className="flex justify-between items-center">
                            <h2 className="text-sm font-inter font-bold">Reviews</h2>
                            <span className="text-gray-500 font-inter text-sm pr-3">{residence.reviews.length} Reviews</span>
                        </div>
                        {residence.reviews.map((review, index) => (
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
                                            style={{ filter: 'brightness(0) saturate(90%)' }}
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
                                    {review.date || "No date"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
};
