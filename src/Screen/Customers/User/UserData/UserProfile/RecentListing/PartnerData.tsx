import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "@/Components/Common/Pagination/Pagination";
import apiService from "@/Components/APIService/apiService";
import Message from "@/Components/Common/NotFoundPage/Message";

interface BookingListing {
  _id: string;
  orderId: string;
  warehouseName: string;
  sellOrRent: string;
  createdAt?: string;
  price: number;
  date?: string;
}

interface RecentListingsProps {
  user: {
    _id: string;
  };
}

const RecentListings = ({ user }: RecentListingsProps) => {
  const [page, setPage] = useState(1);
  const [listingData, setListingData] = useState<BookingListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10; // Define a constant for items per page

  useEffect(() => {
    const fetchRecentListings = async () => {
      setLoading(true);
      try {
        const response = await apiService.get<{
          success: boolean;
          message: string;
          data: BookingListing[];
          totalRecords: number;
          page: number;
          totalPages: number;
        }>(`/admin/order/user/${user._id}?page=${page}`);

        if (response?.success && response?.data) {
          const formattedData = response.data.map((bookingListing) => ({
            ...bookingListing,
            date: bookingListing.createdAt
              ? new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).format(new Date(bookingListing.createdAt))
              : "N/A",
          }));
          setListingData(formattedData);
          setTotalPages(response.totalPages);
        } else {
          setError(response?.message || "Failed to fetch listings.");
        }
      } catch (err) {
        setError("Failed to fetch listings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentListings();
  }, [user._id, page]);

  return (
    <div className="relative overflow-hidden -mt-80">
      {error && <div className="error-message">{error}</div>}
      <div className="relative overflow-x-auto my-4">
        <h1 className="text-3xl font-semibold text-gray-700 mb-4">
          Recent Listings
        </h1>
        <table className="min-w-full table-auto text-sm text-left rtl:text-right font-sm text-gray-500 border-b border-gray-300">
          <thead className="text-xs text-gray-500 bg-gray-100">
            <tr>
              <th className="px-8 py-3 border-b border-gray-300">Sn.no</th>
              <th className="px-8 py-3 border-b border-gray-300">Warehouse</th>
              <th className="px-8 py-3 border-b border-gray-300">
                Date Booked
              </th>
              <th className="px-8 py-3 border-b border-gray-300">Amount</th>
              <th className="px-8 py-3 border-b border-gray-300">Booking ID</th>
              <th className="px-8 py-3 border-b border-gray-300 whitespace-nowrap">
                Order Type
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  <ClipLoader size={50} color="#4FD1C5" loading={loading} />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  <Message message="Something went wrong" />
                </td>
              </tr>
            ) : listingData.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  <Message message="No listings found." />
                </td>
              </tr>
            ) : (
              listingData.map((listing, index) => (
                <tr key={listing._id} className="border-b border-gray-300">
                  <td className="px-8 py-4 font-medium whitespace-nowrap">
                    {index + 1 + (page - 1) * itemsPerPage}
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap">
                    {listing.warehouseName || "N/A"}
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap">
                    {listing.date || "N/A"}
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap">
                    ₹{" "}
                    {typeof listing.price === "number" ? listing.price : "N/A"}
                  </td>
                  <td className="px-8 py-4 whitespace-nowrap">
                    {listing.orderId || "N/A"}
                  </td>
                  <td className="px-8 py-4 text-blue-600">
                    {listing.sellOrRent || "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        setCurrentPage={setPage}
      />
    </div>
  );
};

export default RecentListings;
