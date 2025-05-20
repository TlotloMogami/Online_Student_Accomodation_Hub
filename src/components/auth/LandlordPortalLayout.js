import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { Navbar } from "../common/Navbar"
import { Footer } from "../common/Footer"
import LOGO from '../../assets/icons/osah_logo-navbar.svg'
import { useEffect, useRef, useState } from "react"
import { useAuth } from "./AuthProvider"
import { supabase } from "../../App"
import { LandlordDashboardLinks, StudentDashboardLinks } from "../../data/links/links"

export const LandlordPortalLayout = () => {

    const {SignOut, user} = useAuth()

    const navigate = useNavigate()

    const location = useLocation()

    const handleSignOut = async () => {
        console.log("Signed Out!")
       const {error} = await SignOut()

       if(!error){
        navigate("/")
       }

    }

  

    let data = useRef(user?.user_metadata)

    if(!user){
        navigate('/auth/landlord-sign-in')
    }else{
        return(
            <main>
                <nav className="sticky top-0 z-[99999] flex justify-between items-center py-1 bg-white">
                    <div className="flex items-center gap-4">
                    <div className="logo-bg">
                        <img src={LOGO} alt="OSAH Logo" className="w-12 h-12" />
                    </div>
                    <div className="flex flex-row items-center gap-2">
                    <h2 className="text-2xl font-normal">{data.current.student === true ? 'Student' : 'Landlord'} </h2>
                    <h2 className="text-2xl font-thin">Dashboard</h2>
                    </div>
                    </div>
                    <button onClick={handleSignOut} className="rounded-full text-xs mr-5 bg-[#f5e0df] border border-[#fc7c7c] text-[#fb2424] px-4 py-2">
                    Sign Out
                    </button>
                </nav>
                <div className="flex flex-row w-full h-svh">
                    <div className="h-1/2 sticky top-[4.5rem] w-1/6 border-r pb-5 mt-2  flex flex-col">
                    <div className="pr-4 pt-5">
                        <div className="flex flex-col gap-6 text-sm font-semibold">
                            {data.current.student === true ? 
                                
                                StudentDashboardLinks.map((link)=>{
                                    return(
                                        <Link to={link.path}
                                        className={location.pathname === link.path ? 'bg-[#272727] py-4 text-xs text-center rounded-r-md text-white' : 'text-black py-4 text-xs text-center transition-all duration-300'}
                                        >
                                        {link.name}
                                        </Link>
                                    )
                                })
                            
                            :
                            
                                LandlordDashboardLinks.map((link)=>{
                                    return(
                                        <Link to={link.path}
                                        className={location.pathname === link.path ? 'bg-[#dfeef5] border border-[#7cbcfc] py-4 text-xs text-center rounded-r-md text-[#0783fe]' : 'text-black py-4 text-xs text-center transition-all duration-300'}
                                        >
                                        {link.name}
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                    </div>
                    <div className="h-svh w-full">
                        <Outlet/>
                    </div>
                </div>
    
                <Footer/>
            </main>
        )
    }
   
}