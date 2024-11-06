import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface BookingModalProps {
  booking: any;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ booking, onClose }) => {
  return (
    <div className="relative bg-white w-full max-w-md p-6 pb-1 rounded-lg ">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-500"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      {/* Modal Content */}
      <h2 className="text-lg font-bold mb-4">
        Booking Detail: {booking.idNumber}
      </h2>
      <div className="flex mb-4">
        <div className="w-1/2 flex items-center">
          <img
            src="Mask Group.png"
            alt="Logo"
            className="h-12 w-12 border rounded-md mr-2"
          />
          <h1 className="text-gray-800 text-lg">{booking.warehouseName}</h1>
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
          <span className="text-right">{booking.name}</span>
        </div>
        <div className="bg-gray-100 mb-4 p-3 rounded-xl">
          <h3 className="font-semibold mb-2 text-gray-600">Booking Details</h3>
          <div className="grid grid-cols-2 gap-2 text-gray-600">
            <span>Booking Start On</span>
            <span className="text-right">{booking.startDate}</span>
            <span>Booking End On</span>
            <span className="text-right">{booking.endDate}</span>
            <span>Duration</span>
            <span className="text-right">1 Month</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-gray-600 bg-gray-100 p-3 rounded-xl">
          <span>Address</span>
          <span className="text-right">{booking.address}</span>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4 text-gray-600 bg-gray-100 p-3 rounded-xl">
          <span>Contact Details</span>
          <div className="flex justify-between">
            <span>{booking.phoneNumber}</span>
            <button className="text-[#47A374]">Call Customer</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-gray-600 bg-gray-100 p-3 rounded-xl">
          <span>Subtotal</span>
          <span className="text-right">₹{booking.subtotal}</span>

          <span>GST</span>
          <span className="text-right">₹{booking.gst}</span>

          <span className="col-span-2">
            <hr className="border-t border-dashed border-gray-400" />
          </span>

          <span>Total</span>
          <span className="text-right">₹{booking.subtotal + booking.gst}</span>
        </div>

        {/* Download Invoice Button */}
        <button className="bg-[#47A374] w-full text-white py-2 px-4 rounded">
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
