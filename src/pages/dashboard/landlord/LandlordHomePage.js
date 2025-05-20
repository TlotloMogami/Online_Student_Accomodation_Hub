import INSTITUTION from '../../../assets/icons/institution_ic_blue.svg';
import LOCATION from '../../../assets/icons/location_pin_blue.svg';
import PERSON from '../../../assets/icons/person-2.svg';
import INBOX from '../../../assets/icons/inbox.svg';
import NOTIFICATION from '../../../assets/icons/notification.svg';
import ISSUES from '../../../assets/icons/issues.svg';
import PENDING from '../../../assets/icons/pending.svg';

export const LandlordHomePage = () => {
    return (
        <main>
            <div className="flex flex-row h-svh">
           
           {/* Main Content */}
           <div className="flex flex-col w-4/6 px-4 py-4">
           {/* Content with SVG Icons */}
           <div className="flex justify-between px-10 py-2 border border-[#f3f3f3] items-center bg-[#fbfafa] rounded-md">
               {/* Left: Person Icon */}
               <div className="flex items-center space-x-3">
               <div className="bg-[#b2e3fd] p-1 rounded-full">
                   <img src={PERSON} alt="Person Icon" className="w-4 h-4 " />
               </div>
               <span className="text-gray-500 text-sm">Ntate Jacobs</span>
               </div>

               {/* Center: Location Icon */}
               <div className="flex items-center space-x-4">
               <div className="p-1 bg-[#b2e3fd] rounded-full">
                   <img src={LOCATION} alt="Location Icon" className="w-4 h-4" />
               </div>
               <span className="text-gray-500 text-sm">Mahikeng</span>
               </div>

               {/* Right: Institution Icon */}
               <div className="flex items-center space-x-4">
               <div className="bg-[#b2e3fd] p-1 rounded-full">
                   <img src={INSTITUTION} alt="Institution Icon" className="w-4 h-4" />
               </div>
               <span className="text-gray-500 text-sm">North West University Mahikeng</span>
               </div>
           </div>
           <div className="px-8 py-8">
               <div className="flex pb-2 text-gray-500 text-sm text-inter font-semibold space-x-3">
               <img src={PENDING} alt="Pending Applications" className="w-5 h-5" />
               <span className="pb-4 text-bold text-sm">Pending Applications: 0</span>
               </div>
               <div className="flex pb-4 text-gray-500 text-sm text-inter font-semibold space-x-3">
               <img src={ISSUES} alt="Issues" className="w-5 h-5 text-gray-400" />
               <span className='text-sm'>Issues: 0</span>
               </div>
           </div>
           </div>
           <div className="flex space-x-4 justify-between items-center h-fit mt-3 px-4 py-3 bg-[#F2F2F2] rounded-l-full ml-auto">
           {/* Notification Icons */}
           <div className="border border-1 border-[#CBCBCB] bg-[#E7E7E7] p-2 rounded-full">
               <img src={INBOX} alt="Inbox" className="w-3 h-3" />
           </div>
           <div className="border border-1 border-[#CBCBCB] bg-[#E7E7E7] p-[0.35em] rounded-full">
               <img src={NOTIFICATION} alt="Notification" className="w-4 h-4" />
           </div>
           </div>
       </div>
        </main>
    )
}