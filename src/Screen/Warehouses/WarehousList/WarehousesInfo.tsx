import React, { useState } from "react";
import { ListData } from "./ListData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendarAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const WarehouseInfo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter the ListData based on the search term
  const filteredData = ListData.filter((booking) =>
    booking.warehouseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="px-3 lg:px-6 py-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg lg:text-md font-medium sm:text-xl">
          Warehouses Listing Information
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 flex items-center space-x-1">
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          />
        </div>
      </div>

      {/* Booking Cards */}
      <div className="mt-4 space-y-4">
        {filteredData.map((booking, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-md"
          >
            {/* Image and Booking Info */}
            <div className="flex items-center space-x-4">
              {/* Image */}
              <img
                src={booking.imageSrc} // Image URL from the ListData
                alt={`${booking.warehouseNumber}`}
                className="w-20 h-20 object-cover rounded-md"
              />

              {/* Booking Info */}
              <div>
                <h3 className="text-sm font-medium">
                  {booking.warehouseNumber}
                </h3>
                <p className="text-sm text-gray-400">
                  Rent: <span className="text-gray-600">{booking.rent}</span>
                </p>
                <p className="text-sm text-gray-400">
                  Address:{" "}
                  <span className="text-gray-600">{booking.address}</span>
                </p>
                <p className="text-sm text-gray-400">
                  Partner ID:{" "}
                  <span className="text-gray-600">{booking.partnerId}</span>
                </p>
              </div>
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

export default WarehouseInfo;
