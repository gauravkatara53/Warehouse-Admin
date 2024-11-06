import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen pt-10 px-4">
      <div className="self-start mb-4">
        <button className="text-gray-600" onClick={onBackClick}>
          <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
        </button>
      </div>

      <div className="-ml-3 p-2 w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-stretch gap-6">
        <div className="flex-shrink-0 flex items-stretch">
          <img
            src={warehouse?.imageUrl || "wRectangle 5018.png"}
            alt="Profile"
            className="rounded-lg object-cover w-72 h-80"
          />
        </div>

        <div className="flex-1 mx-4 min-h-[22rem] flex flex-col justify-center -mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {warehouse?.name || "N/A"}
          </h2>
          <p className="text-gray-500 mb-6">
            Partner ID: {warehouse?._id || "N/A"}
          </p>

          <div className="grid grid-cols-2 gap-6 text-gray-700 mb-16">
            <div className="mr-4">
              <p className="font-semibold">Partner name</p>
              <p className="text-gray-600">{warehouse?.phone || "N/A"}</p>
              <p className="font-semibold mt-4">Number of bookings</p>
              <p className="text-gray-600">{warehouse?.bookings || "N/A"}</p>
            </div>
            <div className="ml-4">
              <p className="font-semibold">Email</p>
              <p className="text-gray-600">{"N/A"}</p>
              <p className="font-semibold mt-4">Status</p>
              <p className="text-gray-600">{"N/A"}</p>
            </div>
          </div>
          <div className="-mt-12">
            <p className="font-semibold">Description</p>
            <p className="text-gray-600">{warehouse?.about || "N/A"}</p>
          </div>
        </div>
      </div>
      <div className="bg-white mt-6 mb-8 p-3 flex justify-between items-center border rounded-md">
        <h1 className="text-md text-gray-700 font-medium">20 Reviews</h1>
        <button className="text-blue-500 font-medium" onClick={onSelectReviews}>
          View all Reviews
        </button>
      </div>
    </div>
  );
};

export default ProfileAboveSec;
