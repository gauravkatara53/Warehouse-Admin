import React, { useState } from "react";
import { bookings } from "./AllBooking";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendarAlt,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const AllBooking: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  // Filter the bookings based on the search term
  const filteredBookings = bookings.filter((booking) =>
    booking.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleArrowClick = (booking: any) => {
    setSelectedBooking(booking); // Set the selected booking to show in the pop-up
  };

  const handleClosePopUp = () => {
    setSelectedBooking(null); // Close the pop-up
  };

  return (
    <section className="px-3 lg:px-6 py-8 relative">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium sm:text-xl">Booking Information</h2>
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
        {filteredBookings.map((booking, index) => (
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
              onClick={() => handleArrowClick(booking)} // Show pop-up on click
            >
              <FontAwesomeIcon icon={faArrowRight} className="text-gray-600" />
            </div>
          </div>
        ))}
      </div>

      {/* Pop-up Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 p-6 rounded-lg relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500"
              onClick={handleClosePopUp}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            {/* Modal Content */}
            <h2 className="text-lg font-bold mb-4">
              Booking Detail: {selectedBooking.idNumber}
            </h2>
            <div className="flex mb-4">
              <div className="w-1/2 flex items-center">
                <img src="user5.png" alt="Logo" className="h-16 w-16" />
                <h1 className="text-gray-800 text-lg">
                  {selectedBooking.warehouseName}
                </h1>
              </div>
              <div className="w-1/2 flex items-center justify-end">
                <span className="bg-white border text-green-500 px-3 py-1 rounded">
                  Active
                </span>
              </div>
            </div>

            {/* Booking Details */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-100 p-3 rounded-xl">
                <span className="text-gray-600 text-lg">Customer Name</span>
                <span className="text-right">{selectedBooking.name}</span>
              </div>
              <div className="">
                <div className="bg-gray-100 mb-4 p-3 rounded-xl">
                  <h3 className="font-semibold mb-2">Booking Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <span>Booking Start On</span>
                    <span className="text-right">
                      {selectedBooking.startDate}
                    </span>
                    <span>Booking End On</span>
                    <span className="text-right">
                      {selectedBooking.endDate}
                    </span>
                    <span>Duration</span>
                    <span className="text-right">1 Month</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-100 p-3 rounded-xl">
                <span>Address</span>
                <span className="text-right">{selectedBooking.address}</span>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-4 bg-gray-100 p-3 rounded-xl">
                <span>Contact Details</span>
                <div className="flex justify-between">
                  <span>{selectedBooking.phoneNumber}</span>
                  <button className="text-[#47A374] ">Call Customer</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-100 p-3 rounded-xl">
                <span>Subtotal</span>
                <span className="text-right">₹{selectedBooking.subtotal}</span>

                <span>GST</span>
                <span className="text-right">₹{selectedBooking.gst}</span>

                {/* Add a dashed line below GST */}
                <span className="col-span-2">
                  <hr className="border-t border-dashed border-gray-400 " />
                </span>

                <span>Total</span>
                <span className="text-right">
                  ₹{selectedBooking.subtotal + selectedBooking.gst}
                </span>
              </div>

              {/* Download Invoice Button */}
              <button className="bg-[#47A374] text-white py-2 px-4 rounded">
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AllBooking;
