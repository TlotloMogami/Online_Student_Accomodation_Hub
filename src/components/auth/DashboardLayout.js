import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { Navbar } from "../common/Navbar"
import { Footer } from "../common/Footer"
import LOGO from '../../assets/icons/osah_logo-navbar.svg'
import { useEffect, useRef, useState } from "react"
import { useAuth } from "./AuthProvider"
import { supabase } from "../../App"
import { LandlordDashboardLinks, StudentDashboardLinks } from "../../data/links/links"

export const DashboardLayout = () => {

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

    return(
        <main>
            <nav className="sticky top-0 z-[99999] flex justify-between items-center py-1 bg-white">
                <div className="flex items-center gap-4">
                <Link to="/" className="logo-bg">
                    <img src={LOGO} alt="OSAH Logo" className="w-12 h-12" />
                </Link>
                <div className="flex flex-row items-center gap-2">
                    <h2 className="text-2xl font-normal">Student</h2>
                    <h2 className="text-2xl font-thin">Dashboard</h2>
                    </div>
                </div>
                <button onClick={handleSignOut} className="accent-link-btn bg-purple-600 text-white px-4 py-2 rounded-lg">
                Sign Out
                </button>
            </nav>
            <div className="flex flex-row w-full">
                <div className="h-[100%] sticky top-[4.5rem] w-1/6 bg-[#F9F9F9] pb-5 mt-2 rounded-r-md flex flex-col">
                <div className="pr-4 pt-5">
                    <div className="flex flex-col gap-6 text-sm font-semibold">
                        {data.current.student === true ? 
                            
                            StudentDashboardLinks.map((link)=>{
                                return(
                                    <Link to={link.path}
                                    className={location.pathname === link.path ? 'bg-[#1b1b1bd5] py-4 text-xs text-center rounded-r-md text-white' : 'text-black py-4 text-xs text-center transition-all duration-300'}
                                    >
                                    {link.name}
                                    </Link>
                                )
                            })
                        
                        :
                        
                            LandlordDashboardLinks.map((link)=>{
                                return(
                                    <Link to={link.path}
                                    className={location.pathname === link.path ? 'bg-[#272727] py-4 text-xs text-center rounded-r-3xl text-white' : 'text-black py-4 text-xs text-center transition-all duration-300'}
                                    >
                                    {link.name}
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>

                {/* Sidebar Footer */}
                <div className="mt-auto px-4 pt-40 text-sm font-semibold text-purple-500">
                    <p className='text-xs'>Online Student <br/> Accommodation Hub</p>
                </div>
                <p className="px-4 pb-4 py-2 text-[0.5em] text-gray-500">©2023 - 2024 Cape Town, ZA All Rights Reserved</p>
                </div>
                <div className="h-svh w-full">
                    <Outlet/>
                </div>
            </div>

            <Footer/>
        </main>
    )
}