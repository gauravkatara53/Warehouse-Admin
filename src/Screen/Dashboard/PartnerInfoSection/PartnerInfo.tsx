import React from "react";
import CustomButton from "@/Components/Common/button"; // Import your custom button
import { profileList } from "./listData"; // Import the list data

const PartnerInfoSection: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg ">
      {/* Top heading section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-1xl font-semibold">Partners Information</h2>
        <a href="#" className="text-blue-500 hover:underline">
          View All
        </a>
      </div>

      {/* KYC Button */}
      <CustomButton className="text-sm -ml-1 -mt-2">
        KYC to be verified
      </CustomButton>

      {/* Profile List */}
      <ul className="mt-6 space-y-4">
        {profileList.map((profile) => (
          <li
            key={profile.id}
            className="flex justify-between items-center p-4 pl-1] pt-1 border-b border-gray-200"
          >
            {/* Left side: Profile image and name */}
            <div className="flex items-center">
              <img
                src={profile.profileImg}
                alt={profile.name}
                className="w-8 h-8 rounded-full mr-4"
              />
              <span className="text-md text-gray-600 font-semibold">
                {profile.name}
              </span>
            </div>

            {/* Right side: View and Verify buttons */}
            <div className="text-sm flex text-[#47A374] font-medium">
              <p className=" mr-1">View</p>
              <p className="">Verify</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PartnerInfoSection;
