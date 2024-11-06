// RecentListings.tsx
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "@/Components/Common/Pagination/Pagination";
import ListingDatas, {
  ListingData,
} from "../../../../../../Data/UserProfileList"; // Ensure the correct path

const RecentListings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [listingData, setListingData] = useState<ListingData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const usersPerPage = 5;

  // Simulating data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate an API call
        const data = ListingDatas; // Replace with apiService call if needed
        setListingData(data);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(listingData.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentPartners = listingData.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="relative overflow-hidden -mt-80 ">
      {error && <div className="error-message">{error}</div>}
      <div className="relative overflow-x-auto my-4">
        <h1 className="text-3xl font-semibold text-gray-700 mb-4">
          Recent Bookings
        </h1>
        <div className="table-responsive">
          <table className="min-w-full table-auto text-sm text-left rtl:text-right font-sm text-gray-500 border-b border-gray-300">
            <thead className="text-xs text-gray-500 bg-gray-100">
              <tr>
                <th scope="col" className="px-8 py-3 border-b border-gray-300">
                  {" "}
                  {/* Increased padding */}
                  Sn.no
                </th>
                <th scope="col" className="px-8 py-3 border-b border-gray-300">
                  Warehouse
                </th>
                <th scope="col" className="px-8 py-3 border-b border-gray-300">
                  Date Booked
                </th>
                <th scope="col" className="px-8 py-3 border-b border-gray-300">
                  Amount
                </th>
                <th scope="col" className="px-8 py-3 border-b border-gray-300">
                  Booking ID
                </th>
                <th scope="col" className="px-8 py-3 border-b border-gray-300">
                  No of Payments
                </th>
                <th scope="col" className="px-8 py-3 border-b border-gray-300">
                  Order Type
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-6">
                    <div className="flex justify-center items-center">
                      <ClipLoader
                        size={50}
                        color={"#4FD1C5"}
                        loading={loading}
                      />
                    </div>
                  </td>
                </tr>
              ) : (
                currentPartners.map((listing) => (
                  <tr key={listing.SnNo} className="border-b border-gray-300">
                    <th
                      scope="row"
                      className="px-8 py-4 font-medium whitespace-nowrap"
                    >
                      {listing.SnNo || "N/A"}
                    </th>
                    <td className="px-8 py-4">{listing.Warehouse || "N/A"}</td>
                    <td className="px-8 py-4">{listing.datebooked || "N/A"}</td>
                    <td className="px-8 py-4">
                      <span className="mr-2">₹</span>
                      {listing.amount || "N/A"}
                    </td>
                    <td className="px-8 py-4">{listing.bookingid || "N/A"}</td>
                    <td className="px-8 py-4">
                      {listing.noOfPayment || "N/A"}
                    </td>

                    <td className="px-8 py-4">
                      {listing.warehousetype || "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default RecentListings;
