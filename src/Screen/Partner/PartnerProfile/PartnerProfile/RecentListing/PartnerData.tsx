import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "@/Components/Common/Pagination/Pagination";
import apiService from "@/Components/APIService/apiService";
import Message from "@/Components/Common/NotFoundPage/Message";

interface WarehouseListing {
  _id: string;
  name: string;
  rentOrSell: string;
  createdAt: string;
  date: string;
  address: string;
  numberOfBooking: string;
  price: { amount: number; title: string; discount: number }[];
}

interface ProfileListingProps {
  partnerId: string; // Accept partnerId instead of partner
}

const RecentListings: React.FC<ProfileListingProps> = ({ partnerId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [listingData, setListingData] = useState<WarehouseListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchRecentListings = async () => {
      setLoading(true);
      let page = 1;
      let fetchedList: WarehouseListing[] = [];
      let totalFetchedList = 0;
      try {
        do {
          const response = await apiService.get<{
            data: WarehouseListing[];
            page: number;
            pages: number;
            limit: number;
            totalCount: number;
          }>(
            `/admin/partner-recent-warehouse/${partnerId}?page=${page}&limit=${usersPerPage}`
          );
          if (response && response.data) {
            const formattedData = response.data.map((warehouseListing) => ({
              ...warehouseListing,
              date: warehouseListing.createdAt
                ? new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(warehouseListing.createdAt))
                : "N/A",
            }));
            fetchedList = [...fetchedList, ...formattedData];
            totalFetchedList = response.totalCount;
            page++;
          }
        } while (page <= Math.ceil(totalFetchedList / usersPerPage));
        setListingData(fetchedList);
      } catch (err) {
        setError("Failed to fetch listings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentListings();
  }, [partnerId]); // Fetch listings when partnerId changes

  const totalPages = Math.ceil(listingData.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentPartners = listingData.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="relative overflow-hidden p-6 rounded-lg">
      <div className="relative overflow-x-auto my-4">
        <h1 className="text-3xl font-semibold text-gray-700 mb-6">
          Recent Listings
        </h1>
        <table className="min-w-full table-auto text-sm text-left rtl:text-right font-sm text-gray-500 border-b border-gray-300">
          <thead className="text-xs text-gray-500 bg-gray-100">
            <tr>
              <th className="px-8 py-3 border-b border-gray-300">Sn.no</th>
              <th className="px-8 py-3 border-b border-gray-300">Warehouse</th>
              <th className="px-8 py-3 border-b border-gray-300">
                Date created
              </th>
              <th className="px-8 py-3 border-b border-gray-300">Amount</th>
              <th className="px-8 py-3 border-b border-gray-300">Address</th>
              <th className="px-8 py-3 border-b border-gray-300">
                No of Bookings
              </th>
              <th className="px-8 py-3 border-b border-gray-300 whitespace-nowrap">
                Warehouse Type
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center py-6">
                  <ClipLoader size={50} color="#4FD1C5" loading={loading} />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="text-center py-6">
                  <Message message="Something went wrong" />
                </td>
              </tr>
            ) : currentPartners.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6">
                  <Message message="No listings found." />
                </td>
              </tr>
            ) : (
              currentPartners.map((listing, index) => {
                const totalAmount = listing.price.reduce(
                  (acc, item) => acc + item.amount - item.discount,
                  0
                );
                return (
                  <tr key={listing._id} className="border-b border-gray-300">
                    <td className="px-8 py-4 font-medium whitespace-nowrap">
                      {indexOfFirstUser + index + 1}
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap">
                      {listing.name || "N/A"}
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap">
                      {listing.date || "N/A"}
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap">
                      ₹ {totalAmount || "N/A"}
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap">
                      {listing.address || "N/A"}
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap">
                      {listing.numberOfBooking || "N/A"}
                    </td>
                    <td className="px-8 py-4 text-blue-600">
                      {listing.rentOrSell || "N/A"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
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
