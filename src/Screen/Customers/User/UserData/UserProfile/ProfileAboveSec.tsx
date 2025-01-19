import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import apiService from "@/Components/APIService/apiService"; // Import your apiService here
import { format } from "date-fns"; // Import format from date-fns

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
  username: string;
  avatar: string;
}

interface ProfileAboveSecProps {
  user: User;
  onBackClick: () => void;
}

const ProfileAboveSec: React.FC<ProfileAboveSecProps> = ({
  user,
  onBackClick,
}) => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [detailedData, setDetailedData] = useState<User | null>(null);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      // Replace axios call with apiService
      const response = await apiService.get<{ data: User }>(
        `/admin/user/${user._id}`
      );

      if (response) {
        setDetailedData(response.data);
      }
    } catch (error) {
      setErrorMessage("Failed to fetch detailed data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [user]);
  const formattedDate = user.createdAt
    ? format(new Date(user.createdAt), "d MMM yyyy 'at' h:mm a")
    : "N/A";

  return (
    <div className="flex flex-col bg-gray-100 pt-10 px-4">
      <div className="self-start mb-4">
        <button className="text-gray-600" onClick={onBackClick}>
          <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={30} color="#4A90E2" />
        </div>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        detailedData && (
          <div className="p-2 w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-stretch gap-6">
            <div className="flex-shrink-0 flex items-stretch">
              <img
                src={
                  detailedData.avatar ||
                  "https://pub-50749ce34b5e4abfa121ac60a6fdd9b2.r2.dev/AVATAR/ca6ea07a-fae9-4d78-834c-53a1adfd9ab7.jpg"
                }
                alt="Profile"
                className="rounded-lg object-cover w-72 h-80"
              />
            </div>

            <div className="flex-1 mx-4 min-h-[22rem] flex flex-col justify-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {user.name || "N/A"}
              </h2>
              <p className="text-gray-500 mb-6">User ID: {user._id || "N/A"}</p>

              <div className="grid grid-cols-2 gap-6 text-gray-700 mb-16">
                <div className="mr-4">
                  <p className="font-semibold">Mobile Number</p>
                  <p className="text-gray-600">{user.phone || "N/A"}</p>
                  <p className="font-semibold mt-4">Email</p>
                  <p className="text-gray-600">{user.email || "N/A"}</p>
                  <p className="font-semibold mt-4">Joined Date</p>
                  <p className="text-gray-600">{formattedDate || "N/A"}</p>
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Username</p>
                  <p className="text-gray-600">
                    {detailedData.username || "N/A"}
                  </p>
                  <p className="font-semibold mt-4">Gender</p>
                  <p className="text-gray-600">
                    {detailedData.gender || "N/A"}
                  </p>
                  <p className="font-semibold mt-4">Last Active</p>
                  <p className="text-gray-600">{user.lastActive || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProfileAboveSec;
