import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendarAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "@/Components/Common/Pagination/Pagination";
import apiService from "@/Components/APIService/apiService";
import { ClipLoader } from "react-spinners";
import DateRangeModal from "../../../Components/Warehouse/DateRangeModal";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Message from "@/Components/Common/NotFoundPage/Message";

const AllBooking: React.FC<{ onBookingSelect: (booking: any) => void }> = ({
  onBookingSelect,
}) => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await apiService.get<{ data: any[] }>(
          "/admin/bookings"
        );
        if (response?.data) {
          setBookings(response.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load Booking Data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearchTerm = booking.userName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const bookingDate = new Date(booking.createdAt); // Assuming bookingDate is in the transaction object if present
    const isWithinDateRange =
      (!startDate || bookingDate >= startDate) &&
      (!endDate || bookingDate <= endDate);
    return matchesSearchTerm && isWithinDateRange;
  });

  const handleDateSelection = () => {
    setModalOpen(true);
  };

  const handleApplyDateRange = () => {
    setModalOpen(false);
  };

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const currentBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <section className="px-3 lg:px-6 py-8 relative bg-white rounded-md">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium sm:text-xl">
            Booking Information
          </h2>
          <div className="flex items-center space-x-2">
            <span
              className="text-gray-500 flex items-center space-x-1 cursor-pointer"
              onClick={handleDateSelection}
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
              <span>
                {startDate && endDate
                  ? `${format(startDate, "dd/MM/yy")} - ${format(
                      endDate,
                      "dd/MM/yy"
                    )}`
                  : "Select Date Range"}
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center my-4">
            <ClipLoader size={35} color="#4FD1C5" loading={loading} />
          </div>
        ) : error ? (
          <Message message="Something went Wrong" />
        ) : !error && Object.keys(bookings).length === 0 ? (
          <Message message="No transactions available." />
        ) : filteredBookings.length === 0 ? (
          <Message message="No Booking found" />
        ) : (
          <div className="mt-4 space-y-4">
            {currentBookings.map((booking) => (
              <div
                key={booking._id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-md"
              >
                <div>
                  <h3 className="text-sm font-medium">{booking.userName}</h3>
                  <p className="text-sm text-gray-400">
                    Warehouse Name:{" "}
                    <span className="text-gray-600">
                      {booking.warehouseName}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Order Id:{" "}
                    <span className="text-gray-600">{booking.orderId}</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Status:{" "}
                    <span className="text-gray-600">{booking.orderStatus}</span>
                  </p>
                </div>
                <div
                  className="flex items-center border border-gray-400 p-2 rounded-full cursor-pointer"
                  onClick={() => onBookingSelect(booking)}
                >
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-gray-600"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <DateRangeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onApply={handleApplyDateRange}
      />
    </div>
  );
};

export default AllBooking;
