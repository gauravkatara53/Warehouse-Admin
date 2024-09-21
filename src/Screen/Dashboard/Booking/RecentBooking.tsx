import React from "react";
import { bookings } from "./bookingData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const RecentBooking: React.FC = () => {
  return (
    <section className="px-6 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold sm:text-xl">Recent Transactions</h2>
        <a
          href="#"
          className="text-[#4FD1C5] hover:underline text-sm sm:text-base"
        >
          View All
        </a>
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

export default RecentBooking;
