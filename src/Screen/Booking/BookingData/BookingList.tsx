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
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiService.get<{
          statusCode: number;
          data: {
            orders: any[];
            totalPages: number;
          };
        }>(
          `/order/all/order?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`
        );

        if (response?.data) {
          setBookings(response.data.orders);
          setTotalPages(response.data.totalPages);
          const firstBooking = response.data.orders[0];
          setSelectedBookingId(firstBooking._id);
          onBookingSelect(firstBooking);
        } else {
          setError("Failed to fetch bookings.");
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load Booking Data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [currentPage, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search term change
  };

  const handleBookingClick = (booking: any) => {
    setSelectedBookingId(booking._id); // Update selected booking ID
    onBookingSelect(booking); // Call the parent function
  };

  const filterBookingsByDate = () => {
    if (!startDate || !endDate) return bookings;

    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.createdAt); // Assuming booking.createdAt is the date field
      return bookingDate >= startDate && bookingDate <= endDate;
    });
  };

  const filteredBookings = filterBookingsByDate();

  const Spinner = () => (
    <div className="flex justify-center items-center mt-4">
      <ClipLoader size={50} color={"#4FD1C5"} loading={loading} />
    </div>
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
              onClick={() => setModalOpen(true)}
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
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : error ? (
          <Message message={error} />
        ) : filteredBookings.length === 0 ? (
          <Message message="No Booking found" />
        ) : (
          <div className="mt-4 space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className={`flex justify-between items-center p-4 rounded-md cursor-pointer ${
                  booking._id === selectedBookingId
                    ? "bg-gray-50 border border-[#4FD1C5]"
                    : "bg-gray-100"
                }`}
                onClick={() => handleBookingClick(booking)}
              >
                <div>
                  <h3 className="text-sm font-medium">
                    {booking.customerDetails.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Order Id:{" "}
                    <span className="text-gray-600">{booking.orderId}</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Status:{" "}
                    <span className="text-gray-600">{booking.orderStatus}</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Partner Name:{" "}
                    <span className="text-gray-600">
                      {booking.partnerDetails.name}
                    </span>
                  </p>
                </div>
                <div className="flex items-center border border-gray-400 p-2 rounded-full">
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
        onApply={() => {
          setModalOpen(false);
          // Apply filters when modal is closed
          filterBookingsByDate();
        }}
      />
    </div>
  );
};

export default AllBooking;
