import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LOCATION from '../assets/icons/location_ic_red.svg';
import { Footer } from "../components/common/Footer";
import LOGO from '../assets/icons/osah_logo-navbar.svg';
import PHONE from '../assets/icons/phone_book_ic.svg';
import { MahikengResidences } from '../data/residences/residences.js';
import { NotFound } from './NotFound.js';
import { ResidenceDetails } from "../components/common/ResidenceDetails.js";
import { RatingsAndReviews } from "../components/common/RatingsAndReviews.js";
import Alert from "../assets/icons/alert_i_ic.svg"
import Apply from "../assets/icons/apply_ic_white.svg"
import { supabase } from '../App.js';
import { useAuth } from '../components/auth/AuthProvider.js';
import { SpinnerLoader } from '../components/common/SpinnerLoader.js';
import { ArrowRight, Undo2 } from 'lucide-react';
import SENT_IMAGE from '../assets/sent_illus.svg'

export const ApplicationPage = () => {

  const navigate = useNavigate()

  const {user} = useAuth()

  console.log(user)

  const [loading, setLoading] = useState (false)
  const [successfullyApplied, setSuccessfullyApplied] = useState(false)

  const [formData, setFormData] = useState({
      email: '',
      tel: '',
      year_of_application: '',
      nsfas_funded: '',
      bursary_funded: ''
    });

  const { id } = useParams(); // Get the id from the URL
  const [residence, setResidence] = useState(); // Initialize residence as null

  useEffect(() => {
    // Fetch residence data based on the id
    const fetchedResidence = MahikengResidences[id]; // Replace with logic to find the residence by id
    setResidence(fetchedResidence);
  }, [id]); // Depend on id to update when it changes

  if (!residence) {
    return <NotFound />;
  }

  // Get all reviews
  const totalReviews = residence.reviews.length;

  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  
      console.log(formData)
    }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    const { email, tel, year_of_application, nsfas_funded, bursary_funded} = formData

    const {first_name, surname} = user.user_metadata

    const result = await submitApplicationToDB(user.id, id, {email, first_name, surname, tel, year_of_application, nsfas_funded, bursary_funded})

    if(result && result.error){
      console.log("RESULT", result)
      console.log("ERRORR: ", result.error.message)
      setLoading(false)
      return
    }else{
      console.log("ERRORR RESULT: ", result)

      setSuccessfullyApplied(true)
      console.log("User registered successfully")
      // navigate('/find-a-room')
      setLoading(false)
      return
    }

}

  const submitApplicationToDB = async (user_id, res_id, metadata) => {
    const { data, error: metadataError} = await supabase
    .from('applications')
    .insert([
      {
        user_id: user_id,
        res_id: res_id,
        first_name: metadata.first_name,
        surname: metadata.surname,
        tel: metadata.tel,
        email: metadata.email,
        year_of_application: metadata.year_of_application,
        nsfas_funded: metadata.nsfas_funded,
        bursary_funded: metadata.bursary_funded
      }
    ], { returning: 'minimal' })

    if (metadataError){
      console.log("ERRORR: ", metadataError)
      throw metadataError
    }
}

  return (
    <main>
      {/* Navbar */}
      <nav className="search-navbar text-inter flex justify-between items-center p-4 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <div className="logo-bg">
            <img src={LOGO} alt="OSAH Logo" className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold">Application</h2>
        </div>
        <button className="accent-link-btn bg-purple-600 text-white px-4 py-2 rounded-lg">
          Sign Out
        </button>
      </nav>

      {/* Main Content */}
      <section className="text-inter mx-auto p-8 flex justify-between items-center">
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
        <div className="bg-gray-100 ml-auto p-1 space-x-10 rounded-lg flex items-center justify-between shadow-md">
          <p className="text-gray-700 font-semibold pl-4 text-xs">Want to book a room tour?</p>
          <button className="bg-black text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center space-x-2">
            <img src={PHONE} alt="." className="w-4 h-4 mr-1 font-semibold" />
            <span> Contact landlord </span>
          </button>
        </div>
      </section>

      <div className="border-t-2 border-gray-300 border-dashed w-full pb-4"></div>

      <div className="bg-white p-3 flex justify-between">
        {/* APPLICATION SECTION */}
       
      {successfullyApplied ? 
       
          <div className='flex w-[64%] flex-col gap-2 items-center justify-center'>
            <img src={SENT_IMAGE} alt="" className='w-[200px] mb-10'/>
            <h2 className='font-bold text-xl'>Successfully Applied!</h2>
            <span className='text-sm'>Well done your application has been sent through for processing!</span>
            <Link to={'/dashboard/home'}
            type="submit"
            className="flex flex-row gap-5 items-center justify-between bg-black text-white rounded-lg py-2 px-4 my-4">
                <ArrowRight/>
            View in Dashboard
          </Link>
          </div>
      

      :
      
      <div className="flex flex-row w-[63%] p-4 mr-2 border border-gray-300 rounded-lg">
          
      <div className='w-2/3 pr-8'>
      <h2 className="text-2xl font-bold mb-4">Your Contact Details</h2>
    
        {/* Additional application content can go here */}
        <div className='flex flex-row items-center gap-1 mt-2'>
        <div className="flex items-center justify-center bg-[#2f292d] rounded-full px-1 py-1"><img src={Alert} alt="Location Icon" className="w-4 h-4" /></div>         
        <p className="font-light text-neutral-500 text-sm">Please ensure that you can recieve communication from the details you provide</p>
        </div>

      <form className='py-5' onSubmit={(e)=>handleSubmit(e)}>
        <label htmlFor="email"  className="text-sm">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
          onChange={(e)=>handleChange(e)}
          className="text-sm border border-[#979797] bg-[#FBFBFB] outline-none rounded-md px-4 py-3 w-full"
        />

        <label htmlFor="tel"  className="text-sm">Cellphone Number</label>
        <input
          type="tel"
          id="tel"
          name="tel"
          placeholder="Your Cellphone Number"
          required
          onChange={(e)=>handleChange(e)}
          className="text-sm border border-[#979797] bg-[#FBFBFB] outline-none rounded-md px-4 py-3 w-full"
        />

        <label htmlFor="year_of_application" className="text-sm">Year of Application</label>
        <select id="year_of_application" name="year_of_application" onChange={(e)=>handleChange(e)}  required className="text-sm border border-[#979797] bg-[#FBFBFB] outline-none rounded-md px-4 py-3 w-full">
          <option value="" disabled selected>
            Select Year
          </option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>

        <p className="font-light text-neutral-500 mt-2 text-xs">If you have a bursary indicate below otherwise leave unchecked</p>

      <div className='flex flex-col'>{/*Bursary options*/}
          <div className="flex items-center space-x-2">{/*NSFas*/}
              <input id='nsfas_funded' name='nsfas_funded' onChange={(e)=>handleChange(e)} type='checkbox' className='h-4 w-4 border-gray-300 rounded focus:ring-indigo-500'></input>
              <label for="nsfas_funded" className='text-sm text-gray-700'>I am NSFAS funded.</label>          
          </div>
        
          <div className="flex items-center space-x-2">{/*Bursary (other)*/}
              <input id='bursary_funded' name='bursary_funded' onChange={(e)=>handleChange(e)} type='checkbox' className='h-4 w-4 border-gray-300 rounded focus:ring-indigo-500'></input>
              <label for="bursary_funded" className='text-sm text-gray-700'>Funded by Different Bursary.</label>          
          </div>
      </div>
      
      <button
        type="submit"
        className="flex flex-row gap-5 items-center justify-between bg-black text-white rounded-lg py-2 px-4 my-4">
            
          {loading ? 
            <SpinnerLoader/>
          :
            <img src={Apply} alt=''/>
          }
        
        
        Submit Application

      </button>
      
      
      </form>
          </div>
          
          <div className='w-[2px] h-full bg-[#ededed]'></div>

      </div>

      }
        
          
       
      
        {/* Residence Details Section */}
        <div className='flex flex-col gap-4'>
        <ResidenceDetails residence={residence} />
        <RatingsAndReviews rating={residence.rating} totalReviews={totalReviews} reviews={residence.reviews} />
        </div>
      </div>

      <Footer />
    </main>
  );
};

