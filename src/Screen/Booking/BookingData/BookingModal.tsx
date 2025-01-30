import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";

interface BookingModalProps {
  booking: any;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ booking, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoading(false);
    console.log("Booking Data:", booking); // Debug: Check if the booking data is being passed correctly
  }, [booking]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  if (!booking) {
    console.log("No booking data available.");
    setErrorMessage("No booking details available.");
    return (
      <div className="text-center p-6 text-red-500">
        <p>No booking details available.</p>
      </div>
    );
  }

  return (
    <div className="relative bg-white w-full max-w-md p-6 pb-1 rounded-lg">
      <button
        className="absolute top-4 right-4 text-gray-500"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      <h2 className="text-lg font-semibold mb-4">
        Booking Detail: {booking?.orderId || "N/A"}
      </h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={30} color="#4A90E2" className="my-8" />
        </div>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <div>
          <div className="flex mb-4">
            <div className="w-1/2 flex items-center">
              <h1 className="text-gray-800 text-lg whitespace-nowrap">
                {booking?.WarehouseDetail?.name ||
                  "Warehouse Name Not Available"}
              </h1>
            </div>
            <div className="w-1/2 flex items-center justify-end">
              <span
                className={`px-3 py-1 rounded border ${
                  booking?.orderStatus === "Pending"
                    ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                    : booking?.orderStatus === "Processing"
                    ? "bg-blue-100 text-blue-700 border-blue-300"
                    : booking?.orderStatus === "Completed"
                    ? "bg-green-100 text-green-700 border-green-300"
                    : booking?.orderStatus === "Cancelled" ||
                      booking?.orderStatus === "Failed"
                    ? "bg-red-100 text-red-700 border-red-300"
                    : "bg-white text-gray-500 border-gray-300"
                }`}
              >
                {booking?.orderStatus || "Status Not Available"}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-100 p-3 rounded-xl">
              <span className="text-gray-600 text-lg">Customer Name</span>
              <span className="text-right">
                {booking?.customerDetails?.name ||
                  "Customer Name Not Available"}
              </span>
            </div>

            <div className="bg-gray-100 mb-4 p-3 rounded-xl">
              <h3 className="font-semibold mb-2 text-gray-600">
                Booking Details
              </h3>

              <div className="grid grid-cols-2 gap-2 text-gray-600">
                <span>Booking Start On</span>
                <span className="text-right">
                  {formatDate(booking?.startDate)}
                </span>
                <span>Booking End On</span>
                <span className="text-right">
                  {formatDate(booking?.endDate)}
                </span>
                <span>Duration</span>
                <span className="text-right">
                  {booking?.duration || "Duration Not Available"} Months
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-gray-600 bg-gray-100 p-3 rounded-xl">
              <span>Warehouse Address</span>
              <span className="text-right">
                {booking?.WarehouseDetail?.address
                  ? `${booking?.WarehouseDetail?.address}, ${booking?.WarehouseDetail?.city}, ${booking?.WarehouseDetail?.state} - ${booking?.WarehouseDetail?.pincode}, ${booking?.WarehouseDetail?.country}`
                  : "Warehouse Location Not Available"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 text-gray-600 bg-gray-100 p-3 rounded-xl">
              <span>Contact Details</span>
              <div className="flex justify-between">
                <span>
                  {booking?.customerDetails?.phone ||
                    "User Phone Not Available"}
                </span>
                <button className="text-[#47A374]">Call Customer</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-gray-600 bg-gray-100 p-3 rounded-xl">
              <span>Subtotal</span>
              <span className="text-right">
                ₹{booking?.subTotalPrice || "0"}
              </span>

              <span>Discount</span>
              <span className="text-right">
                ₹{booking?.totalDiscount || "0"}
              </span>

              <span className="col-span-2">
                <hr className="border-t border-dashed border-gray-400" />
              </span>

              <span>Total</span>
              <span className="text-right">₹{booking?.totalPrice || "0"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingModal;
