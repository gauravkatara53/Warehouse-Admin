import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import apiService from "@/Components/APIService/apiService"; // Adjust this path if necessary
import Message from "@/Components/Common/NotFoundPage/Message";

interface Booking {
  _id: string;
  orderId: string;
  orderStatus: string;
  warehouseName: string;
  customerName: string;
  partnerName: string;
  userPhone: string;
}

const RecentBooking: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch recent bookings from API
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await apiService.get<{ data: any[] }>(
          "/admin/dashboard/recent/booking"
        );
        if (response && response.data) {
          // Map API response to the required booking structure
          const formattedBookings = response.data.map((booking) => ({
            _id: booking._id,
            orderId: booking.orderId,
            orderStatus: booking.orderStatus,
            warehouseName: booking.WarehouseDetail?.name || "N/A",
            customerName: booking.customerDetails?.name || "N/A",
            partnerName: booking.partnerDetails,
            userPhone: booking.customerDetails?.phone || "N/A",
          }));
          setBookings(formattedBookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleViewAll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      navigate("/booking");
    }, 100);
  };

  return (
    <section className="px-6 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold sm:text-xl">Recent Booking</h2>
        <button
          onClick={handleViewAll}
          className="text-[#4FD1C5] hover:underline text-sm sm:text-base"
        >
          View All
        </button>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <ClipLoader color="#4FD1C5" loading={loading} size={50} />
        </div>
      ) : error ? (
        <Message message="Something went Wrong" />
      ) : bookings.length === 0 ? (
        <Message message="No booking found" />
      ) : (
        <div className="mt-4 space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-md"
            >
              {/* Booking Info */}
              <div>
                <h3 className="text-sm font-medium">{booking.customerName}</h3>
                <p className="text-sm text-gray-400">
                  Warehouse Name:{" "}
                  <span className="text-gray-600">{booking.warehouseName}</span>
                </p>
                <p className="text-sm text-gray-400">
                  Order ID:{" "}
                  <span className="text-gray-600">{booking.orderId}</span>
                </p>
                <p className="text-sm text-gray-400">
                  Order Status:{" "}
                  <span className="text-gray-600">{booking.orderStatus}</span>
                </p>
              </div>

              {/* Arrow Icon */}
              <div className="flex items-center border border-gray-400 p-2 rounded-full">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-gray-600"
                  onClick={handleViewAll}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentBooking;
