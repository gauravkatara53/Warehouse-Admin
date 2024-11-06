import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface User {
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  profileStatus: string;
  date: string;
  gender: string;
  lastActive: string;
  dob: string;
  createdAt: string;
}

interface ProfileAboveSecProps {
  user: User;
  onBackClick: () => void;
}

const ProfileAboveSec: React.FC<ProfileAboveSecProps> = ({
  user,
  onBackClick,
}) => {
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen pt-10 px-4">
      <div className="self-start mb-4">
        <button className="text-gray-600" onClick={onBackClick}>
          <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
        </button>
      </div>

      <div className="p-2 w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-stretch gap-6">
        <div className="flex-shrink-0 flex items-stretch">
          <img
            src="Rectangle 5018@2x.png"
            alt="Profile"
            className="rounded-lg object-cover w-72 h-80"
          />
        </div>

        <div className="flex-1 mx-4 min-h-[22rem] flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {user.name || "N/A"}
          </h2>
          <p className="text-gray-500 mb-6">Partner ID: {user._id || "N/A"}</p>

          <div className="grid grid-cols-2 gap-6 text-gray-700 mb-16">
            <div className="mr-4">
              <p className="font-semibold">Mobile Number</p>
              <p className="text-gray-600">{user.phone || "N/A"}</p>
              <p className="font-semibold mt-4">Email</p>
              <p className="text-gray-600">{user.email || "N/A"}</p>
              <p className="font-semibold mt-4">Joined Date</p>
              <p className="text-gray-600">{user.date || "N/A"}</p>
            </div>
            <div className="ml-4">
              <p className="font-semibold">DOB</p>
              <p className="text-gray-600">{user.dob || "N/A"}</p>
              <p className="font-semibold mt-4">Gender</p>
              <p className="text-gray-600">{user.gender || "N/A"}</p>
              <p className="font-semibold mt-4">Last Active</p>
              <p className="text-gray-600">{user.lastActive || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAboveSec;
