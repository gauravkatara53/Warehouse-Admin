import React from "react";
import { bookings } from "./AllBooking";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendarAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const AllBooking: React.FC = () => {
  return (
    <section className="px-3 lg:px-6  py-8">
      {/* Search Bar */}

      {/* Header Section */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium sm:text-xl">Booking Information</h2>
        <div className="flex items-center  space-x-2">
          <span className="text-gray-500  flex items-center space-x-1">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
            <span className="lg:text-sm text-sm md:text-sm">
              23-30 July 2024
            </span>
          </span>
        </div>
      </div>
      <div className="mb-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
          </span>
          <input
            type="text"
            placeholder="Search Booking"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5] focus:border-transparent"
          />
        </div>
      </div>

      {/* Booking Cards */}
      <div className="mt-4 space-y-4">
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-md"
          >
            {/* Booking Info */}
            <div>
              <h3 className="text-sm font-medium">{booking.name}</h3>
              <p className="text-sm text-gray-400">
                Warehouse Name:{" "}
                <span className="text-gray-600">{booking.warehouseName}</span>
              </p>
              <p className="text-sm text-gray-400">
                Email: <span className="text-gray-600">{booking.email}</span>
              </p>
              <p className="text-sm text-gray-400">
                ID Number:{" "}
                <span className="text-gray-600">{booking.idNumber}</span>
              </p>
            </div>

            {/* Arrow Icon */}
            <div className="flex items-center border border-gray-400 p-2 rounded-full">
              <FontAwesomeIcon icon={faArrowRight} className="text-gray-600" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllBooking;
