import {  MapPin } from "lucide-react";
import { useEffect, useState } from "react"
import LOGO from '../assets/icons/osah_logo-navbar.svg'
import SEARCH_ICON from '../assets/icons/search_ic.svg'
import { MahikengResidences } from "../data/residences/residences";
import { AdvancedMarker, APIProvider, Map, Pin, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useAuth } from "../components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import NO_DATA from '../assets/not_found.svg'

export const FindARoomPage = () => {

    const {user, SignOut} = useAuth()
    const navigate = useNavigate()

    const [minPrice, setMinPrice] = useState(2500);
    const [maxPrice, setMaxPrice] = useState(7500);
    const priceGap = 1000;

    const [conveniences, setConveniences] = useState(["WiFi", "Study Area", "CCTV Cameras", "Backup Power"]);
    const [selectedConveniences, setSelectedConveniences] = useState([])
    const [filtredResidences, setFilteredResidences] = useState(MahikengResidences)

    const [selectedRoomType, setSelectedRoomType] = useState('all');

    const [searchInput, setSearchInput] = useState("")

    const handleSelectedRoomType = (event) => {
        setSelectedRoomType(event.target.value)
    }

    const resetFilters = () => {
        setMinPrice(2500)
        setMaxPrice(7500)
        setSelectedConveniences([])
        setSelectedRoomType('all')
    }

    const toggleSelection = (item) =>{
        setSelectedConveniences((prevSelected) => {
            if(prevSelected.includes(item)){
                return prevSelected.filter((i) => i !== item) // remove item
            }else{
                return [...prevSelected, item]; // add item
            }
        })
    }
  
    const handleMinChange = (e) => {
      const value = Math.min(Number(e.target.value), maxPrice - priceGap);
      setMinPrice(value);
    };
  
    const handleMaxChange = (e) => {
      const value = Math.max(Number(e.target.value), minPrice + priceGap);
      setMaxPrice(value);
    };
  
    const handleSliderChange = (e) => {
      if (e.target.className === 'range-min') {
        setMinPrice(Number(e.target.value));
      } else {
        setMaxPrice(Number(e.target.value));
      }
    };

    // const [markerRef, marker] = useMarkerRef();
    const [markerRef, marker] = useAdvancedMarkerRef()

    useEffect(()=> {
        
        const filtered = MahikengResidences.filter((residence) => {
            const withinPriceRange = residence.rent >= minPrice && residence.rent <= maxPrice;
            const hasSelectedConviences = selectedConveniences.every((conv) => 
            residence.conveniences.includes(conv))
            let roomType = 1
            if(selectedRoomType !== 'all'){
                roomType = residence.roomType === selectedRoomType
            }

            const byName = residence.name.toLowerCase().includes(searchInput.toLowerCase())

            return withinPriceRange && hasSelectedConviences && roomType && byName
        })

        setFilteredResidences(filtered)

    },[minPrice, maxPrice, selectedConveniences, selectedRoomType, searchInput])

    useEffect(() => {
        if (!marker) {
          return;
        }

        // do something with marker instance here
      }, [marker]);


    const handleSearchInput = (e) => {
        setSearchInput(e.target.value)
    }

    return (
        <main>
            <nav className="sticky top-0 bg-white flex flex-row justify-between items-center pr-10 py-2 shadow-sm border-b-[#f9f9f9] z-[99999]">
                <div className='flex flex-row items-center gap-7'>
                    <div className="bg-black rounded-tr-full rounded-br-full pl-10 py-2 pr-5">
                    <a href='/'><img src = {LOGO} alt=''/></a>
                    </div>
                    <div className="flex flex-row items-center gap-2 bg-[#F4F4F4] rounded-full px-4 py-2 w-[300px]">
                        <img src={SEARCH_ICON} className="w-4" alt=""/>
                        <input type="text" placeholder="search by name or location" onChange={handleSearchInput} className="bg-transparent text-sm w-full outline-none"/>
                    </div>
                </div>
                <button onClick={user ? ()=>navigate('/dashboard/home') : ()=>navigate('/auth/sign-in')} className='rounded-full bg-[#B365FF] hover:bg-[#9f3fff] text-white flex items-center justify-center h-8 px-8 text-xs transition-all duration-300'>{user ? 'Dashboard' : 'Sign In'}</button>
            </nav>
            <div className="flex flex-col sm:flex-row mt-5">
            {/* Filter Bar */}
            <div className="filter-results-container sticky top-20">
                 
                 <div className="flex flex-row justify-between my-2">
                     <h2 className="font-bold text-2xl">Filters</h2>
                     <button onClick={resetFilters} className="text-[#B365FF] hover:text-[#7b42af] text-sm hover:bg-[#f2e7ff] px-4 rounded-full transition-all">reset</button>
                 </div>
 
                 <div className="flex flex-col gap-4">
                     <span className="font-bold text-sm">Price</span>
 
                     <div className="price-input">
                     <div className="field">
                     <span className="text-xs">Min</span>
                     <input type="number" className="input-min" value={minPrice} onChange={(e)=> handleMinChange}/>
                     </div>
                     <div className="separator">-</div>
                     <div className="field">
                     <span className="text-xs">Max</span>
                     <input type="number" className="input-max" value={maxPrice} onChange={(e)=> handleMaxChange}/>
                     </div>
                     </div>
 
 
                     <div className="slider">
                     <div className="progress" style={{ left: `${(minPrice / 10000) * 100}%`, right: `${100 - (maxPrice / 10000) * 100}%` }}></div>
                     </div>
 
                     <div className="range-input">
                     <input type="range" className="range-min" min="0" max="10000" value={minPrice} step="100" onChange={handleSliderChange}/>
                     <input type="range" className="range-max" min="0" max="10000" value={maxPrice} step="100" onChange={handleSliderChange}/>
                     </div>
 
                 </div>
 
                 <div className="flex flex-col gap-4">
                     <span className="font-bold text-sm">Room Type</span>
                     <select  className="options-input border outline-none text-[#6c6c6c] border-[#d9d9d9] rounded-md p-2 text-sm" id="room-type" name="room-type" value={selectedRoomType} onChange={handleSelectedRoomType} required>
                     <option value="all" selected>All</option>
                     <option value="both" selected>Both</option>
                     <option value="single">Single</option>
                     <option value="sharing">Sharing</option>
                     </select>
                 </div>
 
                 <div className="filter-option-column">
                     <span className="filter-label">Conveniences</span>
                     <div className="chip-grid">
                        {conveniences.map((item)=> {
                            return(
                                <div key={item} className={selectedConveniences.includes(item) ? "selectable-chip active" : "selectable-chip"}
                                onClick={()=>toggleSelection(item)}
                                >
                                {item}
                                </div>
                            )
                        })}
                     </div>
                 </div>
 
                 {/* <button className="bg-[#B365FF] rounded-lg text-white text-sm font-semibold py-2 mt-14">Apply Filter</button> */}
             </div>
 
             {/* Results Section */}
             <div className="search-results-container">
                
                    <div className="rounded-2xl overflow-hidden mt-4 mb-5">
                    <APIProvider libraries={['marker']} apiKey={"AIzaSyDZGcwVnsNhfSpqEXcTNqTLUrMK6YD37vQ"}>
                        <Map
                            mapId={"96c55b40bb242bfc"}
                            style={{width: '100%', height: '300px'}}
                            defaultCenter={{lat: -25.830190829241612, lng: 25.608273881684262}}
                            defaultZoom={14}
                            gestureHandling={'greedy'}
                            disableDefaultUI={true}
                            >
                                {
                                    filtredResidences.map((res)=>{
                                        return (
                                            <AdvancedMarker ref={markerRef} position={{lat: res.lat, lng: res.lng}}>
                                            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                                            </AdvancedMarker>
                                        )
                                    })
                                }
                            </Map>
                        </APIProvider>
                    </div>
                
                
                
                 <div id="map">

                 </div>
                 {/* List of Residences */}
                 <h2 className="font-bold text-lg text-[#000000]">{filtredResidences.length} Results</h2>
                 <div className="grid grid-cols-auto-fit">

                    {filtredResidences.length > 0 ? 
                    
                    filtredResidences.map((res) => {
                        return(
                            <a key={res.name}
                                className="flex flex-col bg-[#f9f9f9] border border-[#ececec] m-2 pb-2 shadow-sm rounded-xl w-[300px] cursor-pointer hover:shadow-md transition-shadow duration-500"
                                href={"/residence-details/" + res.id}
                            >
                                <img className="rounded-xl w-[300px] h-[165px]" src={res.image} alt=""/>
                                <div className="px-2">
                                <h2 className="font-bold text-lg my-2 truncate">{res.name}</h2>
                                <div className="flex flex-row items-center gap-2 text-sm text-[#7c7c7c]">
                                <MapPin size={14}/>
                                <span className="text-xs">{res.location}</span>
                                </div>
                                <div className="flex flex-row items-center justify-between mt-8">
                                <span className="text-[#6d6464]">Rent</span>
                                <div className="flex flex-row items-baseline">
                                <h3 className="font-bold text-2xl">{res.rent}</h3>
                                <span className="font-light text-sm">/month</span>
                                </div>
                                </div>
                                </div>
                            </a>
                        )
                    })
                    
                    : 
       
                    <div className="border mt-4 rounded-md border-dotted bg-[#f9f9f9] h-[450px] w-full flex flex-col gap-4 items-center justify-center">
                    <img src={NO_DATA} alt="" className="w-28"/>
                    <span className="text-[#898989]">No Search results matching filter</span>
                    </div>
                    
                    }                    
                 </div>
             </div>
            </div>
        </main>
    )
}