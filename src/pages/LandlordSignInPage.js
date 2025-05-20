import { useState } from 'react';
import LOGO from '../assets/icons/osah_logo-navbar.svg'
import { supabase } from '../App';
import SUBMIT_ICON from '../assets/icons/stash_ic.svg'
import { SpinnerLoader } from '../components/common/SpinnerLoader';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../components/auth/AuthProvider';
export const LandlordSignInPage = () => {

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
  
      if(result.data){
        navigate('/landlord/dashboard/home')
      }
  
      if(result && result.error){
        console.log("RESULT", result.error)
        console.log("ERRORR: ", result.error.message)
        setErrorMessage(result.error.message)
      }else{
        setErrorMessage("Unknown error occured please try again.")
        console.log("ERRORR RESULT: ", result.error)
      }
    }

    return(
        <main>
            <nav className="sticky top-0 z-[99999] flex justify-between items-center py-1 bg-white">
                <div className="flex items-center gap-4">
                <div className="logo-bg">
                    <img src={LOGO} alt="OSAH Logo" className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-bold">Landlord Portal</h2>
                </div>
                {/* <button onClick={handleSignOut} className="accent-link-btn bg-purple-600 text-white px-4 py-2 rounded-lg">
                Sign Out
                </button> */}
            </nav>

            <div className='px-16 mt-10'>
                <form className="p-2 w-full" onSubmit={handleSubmit}>
                {/* OSAH Logo */}
                <div className="flex flex-row gap-1 items-center">
                    <div className="w-3 h-5 bg-black"></div>
                    <p className="text-neutral-400 text-sm">Online Student Accommodation Hub</p>
                </div>
                
                {/* Register Heading */}
                <h1 className="font-bold text-4xl my-2">Sign In</h1>
                <p className="text-[#7f7f7f]">Welcome back landlord!</p>

                    <div className='grid grid-cols-2 gap-10'>
                        <div className='flex flex-col gap-2'>
                           
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

                            <label htmlFor="city" className="text-sm">Password</label>
                            <input
                            type="text"
                            id="password"
                            name="password"
                            placeholder="Password"
                            required
                            onChange={(e)=>handleChange(e)}
                            className="text-sm border border-[#979797] bg-[#FBFBFB] outline-none rounded-md px-4 py-3 w-full"
                            />

                                <button
                                type="submit"
                                className="flex flex-row text-sm font-bold gap-5 w-fit items-center justify-between bg-black text-white rounded-lg py-2 px-4 my-4">
                                    
                                 {loading ? 
                                    <SpinnerLoader/>
                                 :
                                    <LogIn className='w-4'/>
                                }   
                                
                                
                                Sign In

                             </button>
                
                            {/* Already have an account */}
                            <label htmlFor="/sign-in" className="text-sm text-gray-700">
                            Don't have an account?
                            <a href="/auth/landlord-register" className="text-blue-500 underline"> Sign Up</a>
                            </label>
                            {/* Terms and Conditions */}
                            <span htmlFor="terms" className="text-sm text-gray-500">
                            By creating an account, you agree to the
                            <a href="/terms" className="text-blue-500 underline"> terms & conditions</a> of OSAH.
                            </span>
                        </div>

                  
                
                    </div>
                </form>
            </div>
        </main>
    )
}