import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import apiService from "@/Components/APIService/apiService";

interface Price {
  title: string;
  amount: number;
  discount: number;
  _id: string;
}

interface Warehouse {
  _id: string;
  name: string;
  about: string;
  price: Price[];
  location: {
    type: string;
    coordinates: [number, number];
  };
  rentOrSell: "Rent" | "Sell";
  warehouseAddress: string;
  imageUrl?: string;
  phone: string;
  createdAt: string;
  bookings: string;
  partnerName: string;
  ratingCount: string;
  state: string;
  city: string;
  pincode: number;
  address: string;
  country: string;
  thumbnail: string;
}

interface ProfileAboveSecProps {
  warehouse?: Warehouse;
  onBackClick: () => void;
  onSelectReviews: () => void;
}

const ProfileAboveSec: React.FC<ProfileAboveSecProps> = ({
  warehouse,
  onBackClick,
  onSelectReviews,
}) => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [detailedData, setDetailedData] = useState<Warehouse | null>(null);

  const getToken = () => localStorage.getItem("token");

  const fetchBookingDetails = async () => {
    const token = getToken();
    if (!token) {
      setErrorMessage("Authentication token is missing.");
      return;
    }

    if (!warehouse?._id) {
      setErrorMessage("Warehouse ID is missing.");
      return;
    }

    try {
      setLoading(true);
      const response = await apiService.get<{
        success: boolean;
        data: Warehouse;
      }>(`/admin/warehouse/get-warehouse-details/${warehouse?._id}`);
      console.log("API Response:", response); // Log the API response

      if (response?.success && response.data) {
        setDetailedData(response.data); // Directly use response.data, assuming it's an object
      } else {
        setErrorMessage("No warehouse data found.");
      }
    } catch (error) {
      console.error("Error fetching warehouse details:", error);
      setErrorMessage("Failed to fetch detailed data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (warehouse?._id) {
      fetchBookingDetails();
    } else {
      setErrorMessage("Warehouse ID is missing.");
      setLoading(false);
    }
  }, [warehouse]); // Only fetch when warehouse changes

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen pt-10 px-4">
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
          <div>
            <div className=" w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-stretch gap-6">
              <div className="flex-shrink-0 flex items-stretch">
                <img
                  src={detailedData?.thumbnail || "default-image.png"} // Using imageUrl from detailedData
                  alt="Warehouse"
                  className="rounded-lg object-cover w-72 h-80"
                />
              </div>

              <div className="flex-1 -mt-10 mx-4 min-h-[22rem] flex flex-col justify-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {detailedData?.name || "No Name Available"}
                </h2>
                <p className="text-gray-500 mb-6">
                  Warehouse ID: {detailedData?._id || "N/A"}
                </p>

                <div className="grid grid-cols-2 gap-6 text-gray-700 mb-16">
                  <div>
                    <p className="font-semibold">Partner Name</p>
                    <p className="text-gray-600">{detailedData?.partnerName}</p>
                    <p className="font-semibold mt-4">Number of Bookings</p>
                    <p className="text-gray-600">
                      {detailedData?.bookings || "0"}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-600">
                      {`${detailedData?.address}, ${detailedData?.city},  ${detailedData?.state}, ${detailedData?.country},${detailedData?.pincode}`}
                    </p>
                  </div>
                </div>

                <div className="-mt-12">
                  <p className="font-semibold">Description</p>
                  <p className="text-gray-600">{detailedData?.about}</p>
                </div>
              </div>
            </div>

            <div className="bg-white mt-6 mb-8 p-3 flex justify-between items-center border rounded-md">
              <h1 className="text-md text-gray-700 font-medium">
                {detailedData?.ratingCount} Reviews
              </h1>
              <button
                className="text-blue-500 font-medium"
                onClick={onSelectReviews}
              >
                View all Reviews
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProfileAboveSec;
