import React from 'react';
import BED from '../../assets/icons/bed_ic.svg';
import FRIDGE from '../../assets/icons/fridge_ic.svg';
import KITCHEN from '../../assets/icons/kitchen_ic.svg';
import MICROWAVE from '../../assets/icons/microwave_ic.svg';
import SHOWER from '../../assets/icons/shower_ic.svg';

export const ResidenceDetails = ({ residence }) => {
  return (
    <div className="bg-[#FBFBFB] border border-[#E6E6E6] rounded-xl">
      <div className="p-3 max-w-lg mx-auto bg-gray-20 space-y-4">
        <h2 className="text-lg mt-2 font-semibold">Residence Details</h2>
        <div className="border-t border-gray-300 mt-4"></div>
        <p className="text-gray-600 mb-4 text-sm">
          Located 5km away from campus, {residence.name} offers comfortable living with all essential amenities.
        </p>

        {/* Features List */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center border border-purple-200 rounded-lg px-3 py-1 text-xs text-purple-500">
            <img src={BED} alt="Single Room" className="w-5 h-5 mr-2" />
            <span>Single Room</span>
          </div>
          <div className="flex items-center border border-purple-200 rounded-lg px-3 py-2 text-xs text-purple-500">
            <img src={KITCHEN} alt="Shared Kitchen" className="w-5 h-5 mr-2" />
            <span>Shared Kitchen</span>
          </div>
          <div className="flex items-center border border-purple-200 rounded-lg px-3 py-2 text-xs text-purple-500">
            <img src={SHOWER} alt="Shared Bathrooms" className="w-5 h-5 mr-2" />
            <span>Shared Bathrooms</span>
          </div>
          <div className="flex items-center border border-purple-200 rounded-lg px-3 py-2 text-xs text-purple-500">
            <img src={MICROWAVE} alt="Microwave Provided" className="w-5 h-5 mr-2" />
            <span>Microwave Provided</span>
          </div>
          <div className="flex items-center border border-purple-200 rounded-lg px-3 py-2 text-xs text-purple-500">
            <img src={FRIDGE} alt="Fridge Provided" className="w-5 h-5 mr-2" />
            <span>Fridge Provided</span>
          </div>
        </div>
        <div className="pt-6">
          <h2 className="text-lg font-bold">Fees</h2>
        </div>
        <div className="border-t border-gray-300 mt-4"></div>
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-md">Rent:</span>
          <div className="text-right">
            <span className="text-xl font-semibold">R3 500</span>
            <span className="text-xs text-[#9d9d9d]">per month</span>
          </div>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-md">Total</span>
          <div className="text-right">
            <span className="text-xl font-semibold">R35 000</span>
            <span className="text-xs text-[#9d9d9d]">per annum</span>
          </div>
        </div>
      </div>
    </div>
  );
};
