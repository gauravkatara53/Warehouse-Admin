import React, { useState } from "react";
import { bookings } from "../../../Data/BPAllBooking"; // Ensure this points to your booking data
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendarAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "@/Components/Common/Pagination/Pagination"; // Ensure this points to your Pagination component

const AllBooking: React.FC<{ onBookingSelect: (booking: any) => void }> = ({
  onBookingSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of bookings to display per page

  // Filter the bookings based on the search term
  const filteredBookings = bookings.filter((booking) =>
    booking.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  // Get current bookings based on the current page
  const currentBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <section className="px-3 lg:px-6 py-8 relative bg-white">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium sm:text-xl">
            Booking Information
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

        {/* Search Bar */}
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
          {currentBookings.map((booking, index) => (
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
              <div
                className="flex items-center border border-gray-400 p-2 rounded-full cursor-pointer"
                onClick={() => onBookingSelect(booking)} // Trigger on click
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-gray-600"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
      </section>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default AllBooking;
