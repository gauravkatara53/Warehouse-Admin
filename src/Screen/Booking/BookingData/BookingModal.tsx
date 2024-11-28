import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import apiService from "@/Components/APIService/apiService";
import "jspdf-autotable";
import { generateInvoice } from "./InvoiceGenerator";
import { ClipLoader } from "react-spinners";

interface Service {
  description: string;
  hours: number;
  rate: number;
  amount: number;
}

interface Booking {
  _id: string;
  orderId: string;
  invoiceDate: string;
  dueDate: string;
  userName: string;
  companyName: string;
  userAddress: string;
  userPhone: string;
  userEmail: string;
  services: Service[];
  subtotal: number;
  vatPercent: number;
  total: number;
  thumbnail?: string;
  warehouseName: string;
  startDate: string;
  endDate: string;
  duration: string;
  warehouseAddress: string;
  gst: number;
  totalPaid: number;
  subTotal: number;
  customerPhone: string;
  orderDate: string;
  customerName: string;
  sellOrRent: string;
}

interface BookingModalProps {
  booking: Booking;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ booking, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [detailedData, setDetailedData] = useState<Booking | null>(null);

  const getToken = () => localStorage.getItem("token");

  const fetchBookingDetails = async () => {
    const token = getToken();
    if (!token) {
      setErrorMessage("Authentication token is missing.");
      return;
    }

    try {
      setLoading(true);
      const response = await apiService.get<{ data: Booking[] }>(
        `/admin/booking/${booking._id}`
      );
      if (response && response.data.length > 0) {
        setDetailedData(response.data[0]); // Access the first item in the array
      }
    } catch (error) {
      setErrorMessage("Failed to fetch detailed data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getDisplayValue = (key: keyof Booking) => {
    const value =
      detailedData && detailedData[key] !== undefined
        ? detailedData[key]
        : booking[key];

    // Handle the case where the value is an array of services
    if (Array.isArray(value)) {
      return value.map((service, index) => (
        <div key={index} className="flex justify-between">
          <span>{service.description}</span>
          <span>₹{service.amount}</span>
        </div>
      ));
    }

    // Otherwise, return the value as a string or number
    return value;
  };

  useEffect(() => {
    fetchBookingDetails();
  }, [booking]);
  console.log(detailedData);
  // Helper to get data from `detailedData` or fallback to `booking`

  // Ensure the result of getDisplayValue for image src is always a string
  const getThumbnailSrc = () => {
    const thumbnail = getDisplayValue("thumbnail");
    return typeof thumbnail === "string" ? thumbnail : "Mask Group.png";
  };

  // Ensure the subtotal and gst are numbers for addition
  // const getTotalAmount = () => {
  //   const subtotal = getDisplayValue("subtotal");
  //   const gst = getDisplayValue("gst") || 0;
  //   return (
  //     (typeof subtotal === "number" ? subtotal : 0) +
  //     (typeof gst === "number" ? gst : 0)
  //   );
  // };

  return (
    <div className="relative bg-white w-full max-w-md p-6 pb-1 rounded-lg">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-500"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      {/* Modal Content */}
      <h2 className="text-lg font-semibold mb-4">
        Booking Detail: {getDisplayValue("orderId") || "N/A"}
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
              <img
                src={getThumbnailSrc()}
                alt="Logo"
                className="h-12 w-12 border rounded-md mr-2"
              />
              <h1 className="text-gray-800 text-lg whitespace-nowrap">
                {getDisplayValue("warehouseName") || "N/A"}
              </h1>
            </div>
            <div className="w-1/2 flex items-center justify-end">
              <span className="bg-white border text-green-500 px-3 py-1 rounded">
                Active
              </span>
            </div>
          </div>
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-100 p-3 rounded-xl">
              <span className="text-gray-600 text-lg">Customer Name</span>
              <span className="text-right">
                {getDisplayValue("userName") || "N/A"}
              </span>
            </div>
            <div className="bg-gray-100 mb-4 p-3 rounded-xl">
              <h3 className="font-semibold mb-2 text-gray-600">
                Booking Details
              </h3>
              <div className="grid grid-cols-2 gap-2 text-gray-600">
                <span>Booking Start On</span>
                <span className="text-right">
                  {getDisplayValue("startDate") || "N/A"}
                </span>
                <span>Booking End On</span>
                <span className="text-right">
                  {getDisplayValue("endDate") || "N/A"}
                </span>
                <span>Duration</span>
                <span className="text-right">
                  {getDisplayValue("duration") || "N/A"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-gray-600 bg-gray-100 p-3 rounded-xl">
              <span>Address</span>
              <span className="text-right">
                {getDisplayValue("warehouseAddress") || "N/A"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 text-gray-600 bg-gray-100 p-3 rounded-xl">
              <span>Contact Details</span>
              <div className="flex justify-between">
                <span>{getDisplayValue("userPhone") || "N/A"}</span>
                <button className="text-[#47A374]">Call Customer</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-gray-600 bg-gray-100 p-3 rounded-xl">
              <span>Subtotal</span>
              <span className="text-right">
                ₹{getDisplayValue("subTotal") || "N/A"}
              </span>

              <span>GST</span>
              <span className="text-right">
                ₹{getDisplayValue("gst") || "N/A"}
              </span>

              <span className="col-span-2">
                <hr className="border-t border-dashed border-gray-400" />
              </span>

              <span>Total</span>
              <span className="text-right">
                ₹{getDisplayValue("totalPaid") || "N/A"}
              </span>
            </div>

            <button
              className="bg-[#47A374] w-full text-white py-2 px-4 rounded"
              onClick={() =>
                generateInvoice(
                  detailedData ? { ...booking, ...detailedData } : booking
                )
              }
            >
              Download Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingModal;
