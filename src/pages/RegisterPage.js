import { Footer } from "../components/common/Footer";
import { Navbar } from "../components/common/Navbar";
import registration_illustration from "../assets/register_illustration.png";
import { supabase } from "../App";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpinnerLoader } from "../components/common/SpinnerLoader";
import ARRROW_RIGHT from '../assets/icons/right_arrow.svg'

export const RegisterPage = () => {

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    first_name: '',
    surname: '',
    email: '',
    password: '',
    university: '',
    year_of_study: '',
    nsfas_funded: ''
  });

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
    const { email, password, first_name, surname, university, year_of_study, nsfas_funded} = formData

    const result = await RegisterUser(email, password, {first_name, surname, university, year_of_study, nsfas_funded})

    if(result && result.error){
      console.log("RESULT", result)
      console.log("ERRORR: ", result.error.message)
      setLoading(false)
    }else{
      console.log("ERRORR RESULT: ", result)
      navigate('/find-a-room')
      console.log("User registered successfully")
      setLoading(false)
    }
  }


  const SetUserMetadata = async (id, metadata) => {
        const { data, error: metadataError} = await supabase
        .from('profiles')
        .insert([
          {
            user_id: id,
            first_name: metadata.first_name,
            surname: metadata.surname,
            university: metadata.university,
            year_of_study: metadata.year_of_study,
            nsfas_funded: metadata.nsfas_funded
          }
        ], { returning: 'minimal' })
  
        if (metadataError){
          console.log("ERRORR: ", metadataError)
          throw metadataError
        }
  }

  const RegisterUser = async (email, password, metadata) => {

    try{

      const {data, signUpError} = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            student: true,
            first_name: metadata.first_name,
            surname: metadata.surname
          }
        }
      })

      console.log(data)

      if(signUpError){
        throw signUpError
      }

      if(data){
        console.log("there is user data")
        SetUserMetadata(data.user.id, metadata)
          return {data}
      }
      return {data}
    }catch(error){
      console.log("FATAL_ERROR: ", error)
      return {error}
    }
  }

  return (
    <main>
      <Navbar />
      <section className="flex flex-row px-20 py-10">
        {/* Registration Form */}
        <form className="p-2 w-[680px]" onSubmit={handleSubmit}>
          {/* OSAH Logo */}
          <div className="flex flex-row gap-1 items-center">
            <div className="w-3 h-5 bg-black"></div>
            <p className="text-neutral-400 text-sm">Online Student Accommodation Hub</p>
          </div>
          
          {/* Register Heading */}
          <h1 className="font-bold text-4xl my-2">Register</h1>
          <p className="text-[#7f7f7f]">Gain access to a whole database of residences near you!</p>

            <label htmlFor="first-name" className="text-sm">First Name</label>
            <input
              type="text"
              id="first-name"
              name="first_name"
              placeholder="First Name"
              required
              onChange={(e)=>handleChange(e)}
              className="text-sm border border-[#979797] bg-[#FBFBFB] outline-none rounded-md px-4 py-3 w-full"
            />

            <label htmlFor="surname" className="text-sm">Surname</label>
            <input
              type="text"
              id="surname"
              name="surname"
              placeholder="Surname"
              required
              onChange={(e)=>handleChange(e)}
              className="text-sm border border-[#979797] bg-[#FBFBFB] outline-none rounded-md px-4 py-3 w-full"
            />

            <label htmlFor="email" className="text-sm">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e)=>handleChange(e)}
              className="text-sm border border-[#979797] bg-[#FBFBFB] outline-none rounded-md px-4 py-3 w-full"
            />

            <label htmlFor="university" className="text-sm">University</label>
            <select id="university" name="university" onChange={(e)=>handleChange(e)} required className="text-sm border border-[#979797] bg-[#FBFBFB] outline-none rounded-md px-4 py-3 w-full">
              <option value="" disabled defaultValue>
                Select University
              </option>
              <option value="North West University">North West University</option>
              <option value="University of Capetown">University of Capetown</option>
              <option value="Stellenbosch University">Stellenbosch University</option>
              <option value="University of Johannesburg">University of Johannesburg</option>
            </select>

            <label htmlFor="year-of-study" className="text-sm">Year of Study</label>
            <select id="year-of-study" name="year_of_study" onChange={(e)=>handleChange(e)} required className="text-sm border border-[#979797] bg-[#FBFBFB] outline-none rounded-md px-4 py-3 w-full">
              <option value="" disabled defaultValue>
                Select Year of Study
              </option>
              <option value="year1">1st Year</option>
              <option value="year2">2nd Year</option>
              <option value="year3">3rd Year</option>
              <option value="year4">4th Year</option>
            </select>

            <label htmlFor="password" className="text-sm">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e)=>handleChange(e)}
              className="text-sm border border-[#979797] bg-[#FBFBFB] outline-none rounded-md px-4 py-3 w-full"
            />

            <label className="flex flex-row items-center gap-2 font-semibold text-sm">
              <input type="checkbox" name="nsfas_funded" onChange={(e)=>handleChange(e)} /> I am NSFAS funded.
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex flex-row justify-between items-center bg-blue-500 w-[150px] text-white rounded-lg py-2 px-4 my-4"
            >
              Sign In
              {loading ? <SpinnerLoader/> : <img src={ARRROW_RIGHT} alt=""/>}
            </button>
  
            {/* Already have an account */}
            <label htmlFor="/sign-in" className="text-sm text-gray-700">
              Already have an account?
              <a href="/sign-in" className="text-blue-500 underline"> Sign in</a>
            </label>
            {/* Terms and Conditions */}
            <span htmlFor="terms" className="text-sm text-gray-500">
              By creating an account, you agree to the
              <a href="/terms" className="text-blue-500 underline"> terms & conditions</a> of OSAH.
            </span>
          
        </form>

        {/* Registration Illustration */}
        <div className="flex items-center justify-center w-full">
          <img src={registration_illustration} alt="Register Illustration" className="-mt-60"/>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};
