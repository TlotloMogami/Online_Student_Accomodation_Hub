import { useState } from 'react';
import LOGO from '../assets/icons/osah_logo-navbar.svg'
import { supabase } from '../App';
import SUBMIT_ICON from '../assets/icons/stash_ic.svg'
import { SpinnerLoader } from '../components/common/SpinnerLoader';
import { useNavigate } from 'react-router-dom';
export const LandlordRegisterPage = () => {


    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        first_name: '',
        surname: '',
        tel: '',
        email: '',
        province: '',
        city: '',
        nsfas_accredited: '',
        password: ''
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
        const { email, password, first_name, surname, tel, province, city, nsfas_accredited} = formData
    
        const result = await RegisterUser(email, password, {first_name, surname, tel, email, province, city, nsfas_accredited})
    
        if(result && result.error){
          console.log("RESULT", result)
          console.log("ERRORR: ", result.error.message)
          setLoading(false)
          return
        }else{
          console.log("ERRORR RESULT: ", result)
          
          console.log("User registered successfully")
          navigate('/dashboard/home')
          setLoading(false)
          return
        }

    }

    const SetUserMetadata = async (id, metadata) => {
        const { data, error: metadataError} = await supabase
        .from('landlord-profiles')
        .insert([
          {
            user_id: id,
            first_name: metadata.first_name,
            surname: metadata.surname,
            tel: metadata.tel,
            email: metadata.email,
            province: metadata.province,
            city: metadata.city,
            nsfas_accredited: metadata.nsfas_accredited
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
                student: false,
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
                <h1 className="font-bold text-4xl my-2">Register</h1>
                <p className="text-[#7f7f7f]">Advertise your student accomodation residence.</p>

                    <div className='grid grid-cols-2 gap-10'>
                        <div className='flex flex-col gap-2'>
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

                            <label htmlFor="tel" className="text-sm">Phone Number</label>
                            <input
                            type="tel"
                            id="tel"
                            name="tel"
                            placeholder="Phone Number"
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
                        </div>

                    <div>
                        <label htmlFor="province" className="text-sm">Province</label>
                            <select id="province" name="province" onChange={(e)=>handleChange(e)} required className="text-sm border border-[#979797] bg-[#FBFBFB] outline-none rounded-md px-4 py-3 w-full">
                            <option value="" disabled defaultValue>
                                Select Province
                            </option>
                            <option value="Free State">Free State</option>
                            <option value="Western Cape">Western Cape</option>
                            <option value="Northern Cape">Northern Cape</option>
                            <option value="Eastern Cape">Eastern Cape</option>
                            <option value="North West">North West</option>
                            </select>

                            <label htmlFor="city" className="text-sm">City/Town</label>
                            <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="City"
                            required
                            onChange={(e)=>handleChange(e)}
                            className="text-sm border border-[#979797] bg-[#FBFBFB] outline-none rounded-md px-4 py-3 w-full"
                            />

                            <label className="flex flex-row items-center gap-2 font-semibold text-sm">
                            <input type="checkbox" name="nsfas_accredited" onChange={(e)=>handleChange(e)} /> NSFAS accredited.
                            </label>

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

                            {/* Submit Button */}

                            <button
                                type="submit"
                                className="flex flex-row gap-5 items-center justify-between bg-black text-white rounded-lg py-2 px-4 my-4">
                                    
                                 {loading ? 
                                    <SpinnerLoader/>
                                 :
                                    <img src={SUBMIT_ICON} alt=''/>
                                }   
                                
                                
                                Register

                             </button>
                
                            {/* Already have an account */}
                            <label htmlFor="/sign-in" className="text-sm text-gray-700">
                            Already have an account?
                            <a href="/auth/landlord-sign-in" className="text-blue-500 underline"> Sign in</a>
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