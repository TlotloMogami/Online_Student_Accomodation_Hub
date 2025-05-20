import { Footer } from "../components/common/Footer"
import { Navbar } from "../components/common/Navbar"
import HomePic from "../assets/home_screen_apartment.png"
import UWC from "../assets/uct.png"
import Stellies from "../assets/stell.png"
import Uj from "../assets/uj.png"
import Nwu from "../assets/nwu.png"
import Pic1 from "../assets/res2.jpg"
import Pic2 from "../assets/res1.jpg"
import Pic3 from "../assets/res3.png"
import Pic4 from "../assets/nsfas.png"
import RightArrow from '../assets/icons/right_arrow_black.svg'
import LocationIcon from '../assets/icons/location_ic_red.svg'

import "../App.css"
// import is used to get the components that are outside the current working directry

export const HomePage = () => {
    return(
        <main>
            <Navbar/>
           {/* the classnames are to be used n referenced in the App.css for styling */}
            <div className="flex flex-col-reverse md:grid md:grid-cols-2  h-[600px] gap-2 sm:justify-between"> 
                <div className="flex flex-col justify-center gap-2 px-10">  

                    <div className="flex flex-row gap-1">
                        <div className="w-3 h-5 bg-black"></div>
                        <p className="text-neutral-500">Online Student Accommodation Hub </p>
                    </div>

                    <h1 className="font-bold text-4xl w-3/4">FIND A ROOM FOR A BETTER TOMORROW</h1>
                    <p className="w-1/2 font-light text-neutral-500">Every Student deserves a residence that truly matches their needs</p>
                  
                    <a href="/find-a-room" className="border-2 mt-10 border-black rounded-full text-sm font-semibold flex flex-row justify-between w-fit px-4 py-2 items-center">Find Me A Room! <img className="ml-5" width={25} src={RightArrow} alt=""/> </a>
                    
                </div>

                <div className="flex flex-row px-10 items-center justify-center"> 
                    <img className="w-[70%] md:w-[450px] md:h-[360px]" src={HomePic} alt=""/>
                </div>
            </div>

            <div className="dashed-line my-20"></div>

            <div className="flex flex-row items-center justify-center px-20">
                <div className="flex flex-col md:grid md:grid-cols-2 gap-2 bg-black rounded-[3em] px-20 py-12">
                    
                    <div className="flex flex-row gap-6 ">
                        <img className="w-[60%]" src={Pic1} alt=""/>
                        <div className="flex flex-col gap-2">
                            <img className="w-[80%]" src={Pic2} alt=""/>
                            <img className="w-[70%]" src={Pic3} alt=""/>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 w-fit text-white" >

                        <div className="flex flex-row gap-2 items-start">
                            <img className="mt-[10px] w-6" src={LocationIcon} alt=""/>
                            <h3 className="font-bold text-3xl">Find The Best Student <br/> Accommodation <br/> near you</h3>
                        </div>

                        <p className="text-neutral-400 w-[80%] text-md -ml-10">
                        No need to travel all across the city to find the residence you desire.
                        Simply enter your location and we will provide you with all the best residences near your location or university!
                        </p>
                    </div>
                </div>
            </div>


            <div className="flex flex-col gap-4 items-center p-10 mt-20">
                <div className="message">
                    <p>We've partnered with most major Universities</p>
                </div>

                <div className="flex flex-row max-[1000px]:grid max-[1000px]:grid-cols-2 gap-6" >
                    <div className="flex items-center justify-center shadow-lg bg-white w-[220px]">
                        <img src={UWC} alt=""/>
                    </div>
                    <div className="flex items-center justify-center shadow-lg bg-white w-[220px]">
                        <img src={Stellies} alt=""/>
                    </div>
                    <div className="flex items-center justify-center shadow-lg bg-white w-[220px]">
                        <img src={Uj} alt=""/>
                    </div>
                    <div className="flex items-center justify-center shadow-lg bg-white w-[220px]">
                        <img src={Nwu} alt=""/>
                    </div>
                </div>

            </div>

            <div className="flex flex-col gap-6 items-center my-10 mt-40 mb-20">
            <img className="w-[200px]" src={Pic4} alt=""/>
            <p className="text-[#5d5d5d] font-medium sm:text-3xl">All residences are NSFAS Accredited</p>

            </div>

            <Footer/>
            
        </main>
    )
}