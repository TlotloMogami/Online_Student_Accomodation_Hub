import { Footer } from "../components/common/Footer";
import { Navbar } from "../components/common/Navbar";
import sign_in_illustration from "../assets/sign_in_illustration.png";
import { useAuth } from "../components/auth/AuthProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { ArrowRight } from "lucide-react";
import ARRROW_RIGHT from '../assets/icons/right_arrow.svg'
import { SpinnerLoader } from "../components/common/SpinnerLoader";

export const SignInPage = () => {

  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {loading, SignIn} = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    console.log(formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    const {email, password} = formData

    const result = await SignIn(email, password)

    if(result && result.error){
      console.log("RESULT", result.error)
      console.log("ERRORR: ", result.error.message)
      setErrorMessage(result.error.message)
    }else{
      navigate('/find-a-room')
    }
  }

  return (
    <main>
      <Navbar />
      <section className="flex flex-row px-20 py-10">
        <form className="p-2 w-[680px]" onSubmit={(e)=>handleSubmit(e)}>
          {/* OSAH Logo */}
          <div className="flex flex-row gap-1 items-center">
            <div className="w-3 h-5 bg-black"></div>
            <p className="text-neutral-400 text-sm">Online Student Accommodation Hub</p>
          </div>
          
          {/* Sign In Heading */}
          <h1 className="font-bold text-4xl my-2">Sign In</h1>
          <p className="text-[#7f7f7f]">Gain access to a whole database of residences near you!</p>

          {/* Sign In Form */}
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

            <label htmlFor="password"  className="text-sm">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e)=>handleChange(e)}
              className="text-sm border border-[#979797] bg-[#FBFBFB] outline-none rounded-md px-4 py-3 w-full"
            />

            <span className="text-xs text-red-400">{errorMessage}</span>
            {/* Submit Button */}
            <button
              type="submit"
              className="flex flex-row justify-between items-center bg-blue-500 w-[150px] text-white rounded-lg py-2 px-4 my-4"
            >
              Sign In
              {loading ? <SpinnerLoader/> : <img src={ARRROW_RIGHT} alt=""/>}
            </button>

            {/* Sign Up Link */}
            <p>
              Don't have an account? <a href="/auth/register" className="text-blue-500 text-sm underline font-bold">Sign up</a>
            </p>
          </form>

        {/* Sign In Illustration */}
        <div className="flex items-center justify-center w-full">
          <img src={sign_in_illustration} alt="Sign In Illustration" className="h-2/3"/>
        </div>
      </section>

      <Footer />
    </main>
  );
};
